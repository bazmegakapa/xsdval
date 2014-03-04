define(['underscore', 'objTools', 'xsd', 'xsdval/nodeValidator/NodeValidator',
	'xsdval/primitiveUnserializers', 'xsdval/XmlValidationResult', 'xsdval/XmlValidationError'],
function (_, objTools, xsd, NodeValidator, primitiveUnserializers,
	XmlValidationResult, XmlValidationError) {
	
	/**
	 * @constructor SimpleTypeNodeValidator
	 * @classdesc Serves as a base for node validators that validate simple types.
	 * @extends NodeValidator
	 * @abstract
	 * @param {Element} node - The XML node validated by this validator.
	 * @param {Element} definition - The XSD node to be used for validation by this validator.
	 * @param {NodeValidatorFactory} validatorFactory - The validator factory that can be used to spawn further validators if needed.
	 */
	var simpleTypeNodeValidator = objTools.make(NodeValidator, 
	/**
	 * @lends SimpleTypeNodeValidator.prototype
	 */
	{
		/**
		 * Must be overridden to specify the type this validator can be used to validate.
		 * For example 'string', 'anyType', 'dateTime', etc.
		 * @member {string} type
		 * @memberof SimpleTypeNodeValidator#
		 * @protected
		 */		
		type: '',
		/**
		 * Get the base facets used by this validator. Derived node validators should override this method and add their own base facets.
		 * @returns {Object.<string, *>}
		 * @protected
		 */
		getBaseFacets: function () {
			return {};
		},
		/**
		 * Get the facets that are allowed to be used by this validator. Derived node validators should override this method and add their own allowed facets.
		 * @returns {string[]}
		 * @protected
		 */
		getAllowedFacets: function () {
			return [];
		},
		/**
		 * Receives a map of facets and returns only those that are allowed to be used by this validator.
		 * @param {Object.<string, *>} extensions - The facets you want to filter.
		 * @returns {Object.<string, *>} The filtered facets that are allowed to be used.
		 * @protected
		 */
		getFacets: function (extensions) {
			return _(extensions).pick(this.getAllowedFacets());
		},
		/**
		 * Validates the XML node against the XSD node. Validates by base type, base facets and facets given in the XSD node.
		 * @returns {XmlValidationResult}
		 */
		validate: function () {
			var res = new XmlValidationResult();
			res.add([].concat(
				this.validateBaseType(), 
				this.validateBaseFacets(), 
				this.validateFacets()
			));
			return res;
		},
		/**
		 * Gets the plain XML string value of the node.
		 * Used for validations where the XML string representation needs to be checked.
		 * @returns {string}
		 * @protected
		 */
		getNodeValue: function () {
			return xsd.getNodeText(this.node);
		},
		/**
		 * Gets the value of the node in a way that can be used correctly by XPath. 
		 * Used for XPath based facet validation.
		 * Can be safely overridden in case XPath will have problems with the plain XML representation of certain datatypes.
		 * @returns {string}
		 * @protected
		 */
		getXpathValue: function () {
			return this.getNodeValue();
		},
		/**
		 * Computes the real typed value of the XML string representation. 
		 * Used to validate facets that are based on the real value, not the string representation.
		 * @param {string} type - The XSD base type to be used.
		 * @param {string} [value] - If given, this will be used instead of the value read from the XML node.
		 * @returns {*}
		 * @protected
		 */
		getTypedNodeValue: function (type, value) {
			var v = value || this.getNodeValue();
			return (type in primitiveUnserializers)	?
				primitiveUnserializers[type](v) : 
				v;
		},
		/**
		 * Can be ovverridden to run special validations for a certain data type.
		 * @returns {Array.<XmlValidationError>}
		 * @protected
		 */
		validateBaseType: function () {
			return [];
		},
		/**
		 * Runs the validation for the base facets defined in the node validator.
		 * Override [getBaseFacets()]{@link SimpleTypeNodeValidator#getBaseFacets} to provide base facets.
		 * @returns {Array.<XmlValidationError>}
		 * @protected
		 */
		validateBaseFacets: function () {
			var findings = _(this.getBaseFacets())
				.map(_(function (value, name) { 
					this.invokeFacetValidation(name, value);
				}).bind(this));
			return _(findings).compact();
		},
		/**
		 * Runs the validation for facets defined in the XSD definition.
		 * Takes inherited facets into account, travelling up the tree.
		 * @returns {Array.<XmlValidationError>}
		 * @protected
		 */
		validateFacets: function () {
			var errors = [];	
			var type = xsd.getTypeFromNodeAttr(this.definition, 'type');
			var current = this.validatorFactory.getXsdDefinition(this.definition, type);
			var findings, facets, enums;
			var validatedFacets = [];
			var facetMapper = _(function (elem) {
				if (elem.localName === 'enumeration') {
					enums.push(elem);
				}
				else return this.validateFacet(elem, validatedFacets);
			}).bind(this);
			while (current) {
				facets = xsd.findRestrictingFacets(current);
				enums = [];
				findings = _(facets).map(facetMapper);
				if (enums.length) {
					findings.push(this.validateFacet(enums, validatedFacets));
				}
				errors = errors.concat(_(findings).compact());
				type = xsd.getRestrictedType(current);
				current = this.validatorFactory.getXsdDefinition(this.definition, type);
			}
			return errors;
		},
		/**
		 * Used to run validation defined by a certain facet node.
		 * @param {Element|Array.<Element>} facetNode - The facet node to base validation on. In the case of an enumeration,  all the enumeration facet nodes should be passed as an array.
		 * @param {string[]} validatedFacets - Facet types not to be validated. There are two exceptions: assertion facets and facet nodes having a "fixed" attribute, these will be processed anyways. This parameter is used to prevent processing facets that were overridden by a derived type definition.
		 * @returns {XmlValidationError|undefined}
		 * @protected
		 */
		validateFacet: function (facetNode, validatedFacets) {
			var enumMode = _(facetNode).isArray();
			var facetName = enumMode ? facetNode[0].localName : facetNode.localName;
			var valueAttr = facetName === 'assertion' ? 'test' : 'value';
			var facetValue = enumMode ? 
				_(facetNode).map(function (elem) {
					return elem.getAttribute(valueAttr);
				}) :
				facetNode.getAttribute(valueAttr);
			
			if (this.getAllowedFacets().indexOf(facetName) === -1) {
				return;
			}
			
			var fixed = enumMode ? false : facetNode.getAttribute('fixed') === 'true';
			if (!fixed && validatedFacets.indexOf(facetName) !== -1) {
				return;
			}

			if (facetName !== 'assertion') {
				validatedFacets.push(facetName);
			}
			return this.invokeFacetValidation(facetName, facetValue, facetNode);
		},
		/**
		 * Invokes the right facet validation method for the given facet type.
		 * @param {string} facetName - The name of the facet.
		 * @param {string|string[]} facetValue - The value of the facet (array is used for enumeration).
		 * @param {Element} [facetNode] - The facet node (used for error reporting purposes only).
		 * @returns {XmlValidationError|undefined}
		 * @protected
		 */
		invokeFacetValidation: function (facetName, facetValue, facetNode) {
			var method = 'validate' + facetName[0].toUpperCase() + facetName.slice(1);
			var text = facetNode ? facetName : 'baseType';
			facetNode = facetNode || this.definition;
			if (method in this) {
				if (!this[method](facetValue)) {
					return new XmlValidationError(this.node, facetNode, text);
				}
			}
		},
		/**
		 * Used to validate by pattern (regex). Override if needed.
		 * @param {string|RegExp} facetValue - The pattern.
		 * @returns {boolean}
		 * @protected
		 */
		validatePattern: function (facetValue) {
			var r = _(facetValue).isRegExp() ? 
				facetValue :
				new RegExp(['^', facetValue, '$'].join(''));
			return r.test(this.getNodeValue());
		},
		/**
		 * Used to validate maxInclusive. Override if needed.
		 * @param {string} facetValue
		 * @returns {boolean}
		 * @protected
		 */
		validateMaxInclusive: function (facetValue) {
			return this.getTypedNodeValue(this.type) <= this.getTypedNodeValue(this.type, facetValue);
		},
		/**
		 * Used to validate minInclusive. Override if needed.
		 * @param {string} facetValue
		 * @returns {boolean}
		 * @protected
		 */
		validateMinInclusive: function (facetValue) {
			return this.getTypedNodeValue(this.type) >= this.getTypedNodeValue(this.type, facetValue);
		},
		/**
		 * Used to validate maxExclusive. Override if needed.
		 * @param {string} facetValue
		 * @returns {boolean}
		 * @protected
		 */
		validateMaxExclusive: function (facetValue) {
			return this.getTypedNodeValue(this.type) < this.getTypedNodeValue(this.type, facetValue);
		},
		/**
		 * Used to validate minExclusive. Override if needed.
		 * @param {string} facetValue
		 * @returns {boolean}
		 * @protected
		 */
		validateMinExclusive: function (facetValue) {
			return this.getTypedNodeValue(this.type) > this.getTypedNodeValue(this.type, facetValue);
		},
		/**
		 * Used to validate enumeration. Override if needed.
		 * @param {string[]} values
		 * @returns {boolean}
		 * @protected
		 */
		validateEnumeration: function (values) {
			return values.indexOf(this.getNodeValue()) !== -1;
		},
		/**
		 * Used to validate assertion. Override if needed.
		 * @param {string} xpath - An XPath expression. $value will be substituted with the result of [getXpathValue()]{@link SimpleTypeNodeValidator#getXpathValue}.
		 * @returns {boolean}
		 * @protected
		 */
		validateAssertion: function (xpath) {
			xpath = xpath.replace(/\$value/, this.getXpathValue());
			var res =  document.evaluate(xpath, this.node, null, XPathResult.BOOLEAN_TYPE);
			return res.booleanValue;
		}
	});

	return objTools.makeConstructor(
		function SimpleTypeNodeValidator () {}, 
		simpleTypeNodeValidator
	);


});