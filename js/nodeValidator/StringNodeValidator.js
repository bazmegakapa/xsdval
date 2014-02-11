define(['underscore', 'objTools', 'Xml', 'xsdval/nodeValidator/SimpleTypeNodeValidator',
	 'xsdval/XmlValidationResult', 'xsdval/XmlValidationError'],
function (_, objTools, Xml, SimpleTypeNodeValidator, XmlValidationResult, XmlValidationError) {
	
	var stringNodeValidator = objTools.make(SimpleTypeNodeValidator, {
		type: 'string',
		getAllowedFacets: function () {
			return [
				'length', 
				'minLength', 
				'maxLength', 
				'pattern', 
				'enumeration', 
				'assertions'
			];
		},
		validateMaxLength: function (facetValue) {
			return this.getValue().length <= facetValue;
		},
		validateMinLength: function (facetValue) {
			return this.getValue().length >= facetValue;
		},
		validateLength: function (facetValue) {
			return this.getValue().length == facetValue;
		}
	});

	return function StringNodeValidator () {
		var obj = objTools.construct(stringNodeValidator, StringNodeValidator);
		return obj.init.apply(obj, arguments);
	}

});