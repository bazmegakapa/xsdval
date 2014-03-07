define(['objTools', 'Library', 'xsd'],
function (objTools, Library, xsd) {

var text_basetypesxsd = '<?xml version=\'1.0\'?>\n<!DOCTYPE xs:schema SYSTEM "../namespace/XMLSchema.dtd" [\n\n<!--\n     keep this schema XML1.0 DTD valid\n  -->\n        <!ENTITY % schemaAttrs \'xmlns:hfp CDATA #IMPLIED\'>\n\n        <!ELEMENT hfp:hasFacet EMPTY>\n        <!ATTLIST hfp:hasFacet\n                name NMTOKEN #REQUIRED>\n\n        <!ELEMENT hfp:hasProperty EMPTY>\n        <!ATTLIST hfp:hasProperty\n                name NMTOKEN #REQUIRED\n                value CDATA #REQUIRED>\n\n]>\n<xs:schema\n  xmlns:hfp="http://www.w3.org/2001/XMLSchema-hasFacetAndProperty"\n  xmlns:xs="http://www.w3.org/2001/XMLSchema"\n  elementFormDefault="qualified" \n  xml:lang="en" \n  targetNamespace="http://www.w3.org/2001/XMLSchema">\n <xs:annotation>\n    <xs:documentation>\n      This document contains XML representations for the \n     ordinary non-primitive built-in datatypes\n    </xs:documentation>\n  </xs:annotation>\n  <xs:simpleType name="normalizedString" id="normalizedString">\n    <xs:annotation>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#normalizedString"/>\n    </xs:annotation>\n    <xs:restriction base="xs:string">\n      <xs:whiteSpace value="replace" id="normalizedString.whiteSpace"/>\n    </xs:restriction>\n  </xs:simpleType>\n  <xs:simpleType name="token" id="token">\n    <xs:annotation>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#token"/>\n    </xs:annotation>\n    <xs:restriction base="xs:normalizedString">\n      <xs:whiteSpace value="collapse" id="token.whiteSpace"/>\n    </xs:restriction>\n  </xs:simpleType>\n  <xs:simpleType name="language" id="language">\n    <xs:annotation>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#language"/>\n    </xs:annotation>\n    <xs:restriction base="xs:token">\n      <xs:pattern value="[a-zA-Z]{1,8}(-[a-zA-Z0-9]{1,8})*" id="language.pattern">\n        <xs:annotation>\n          <xs:documentation source="http://www.ietf.org/rfc/bcp/bcp47.txt">\n            pattern specifies the content of section 2.12 of XML 1.0e2\n            and RFC 3066 (Revised version of RFC 1766).  N.B. RFC 3066 is now\n            obsolete; the grammar of RFC4646 is more restrictive.  So strict\n            conformance to the rules for language codes requires extra checking\n            beyond validation against this type.\n          </xs:documentation>\n        </xs:annotation>\n      </xs:pattern>\n    </xs:restriction>\n  </xs:simpleType>\n  <xs:simpleType name="IDREFS" id="IDREFS">\n    <xs:annotation>\n      <xs:appinfo>\n        <hfp:hasFacet name="length"/>\n        <hfp:hasFacet name="minLength"/>\n        <hfp:hasFacet name="maxLength"/>\n        <hfp:hasFacet name="enumeration"/>\n        <hfp:hasFacet name="whiteSpace"/>\n        <hfp:hasFacet name="pattern"/>\n        <hfp:hasFacet name="assertions"/>\n        <hfp:hasProperty name="ordered" value="false"/>\n        <hfp:hasProperty name="bounded" value="false"/>\n        <hfp:hasProperty name="cardinality" value="countably infinite"/>\n        <hfp:hasProperty name="numeric" value="false"/>\n      </xs:appinfo>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#IDREFS"/>\n    </xs:annotation>\n    <xs:restriction>\n      <xs:simpleType>\n        <xs:list itemType="xs:IDREF"/>\n      </xs:simpleType>\n      <xs:minLength value="1" id="IDREFS.minLength"/>\n    </xs:restriction>\n  </xs:simpleType>\n  <xs:simpleType name="ENTITIES" id="ENTITIES">\n    <xs:annotation>\n      <xs:appinfo>\n        <hfp:hasFacet name="length"/>\n        <hfp:hasFacet name="minLength"/>\n        <hfp:hasFacet name="maxLength"/>\n        <hfp:hasFacet name="enumeration"/>\n        <hfp:hasFacet name="whiteSpace"/>\n        <hfp:hasFacet name="pattern"/>\n        <hfp:hasFacet name="assertions"/>\n        <hfp:hasProperty name="ordered" value="false"/>\n        <hfp:hasProperty name="bounded" value="false"/>\n        <hfp:hasProperty name="cardinality" value="countably infinite"/>\n        <hfp:hasProperty name="numeric" value="false"/>\n      </xs:appinfo>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#ENTITIES"/>\n    </xs:annotation>\n    <xs:restriction>\n      <xs:simpleType>\n        <xs:list itemType="xs:ENTITY"/>\n      </xs:simpleType>\n      <xs:minLength value="1" id="ENTITIES.minLength"/>\n    </xs:restriction>\n  </xs:simpleType>\n  <xs:simpleType name="NMTOKEN" id="NMTOKEN">\n    <xs:annotation>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#NMTOKEN"/>\n    </xs:annotation>\n    <xs:restriction base="xs:token">\n      <xs:pattern value="\\c+" id="NMTOKEN.pattern">\n        <xs:annotation>\n          <xs:documentation source="http://www.w3.org/TR/REC-xml#NT-Nmtoken">\n            pattern matches production 7 from the XML spec\n          </xs:documentation>\n        </xs:annotation>\n      </xs:pattern>\n    </xs:restriction>\n  </xs:simpleType>\n  <xs:simpleType name="NMTOKENS" id="NMTOKENS">\n    <xs:annotation>\n      <xs:appinfo>\n        <hfp:hasFacet name="length"/>\n        <hfp:hasFacet name="minLength"/>\n        <hfp:hasFacet name="maxLength"/>\n        <hfp:hasFacet name="enumeration"/>\n        <hfp:hasFacet name="whiteSpace"/>\n        <hfp:hasFacet name="pattern"/>\n        <hfp:hasFacet name="assertions"/>\n        <hfp:hasProperty name="ordered" value="false"/>\n        <hfp:hasProperty name="bounded" value="false"/>\n        <hfp:hasProperty name="cardinality" value="countably infinite"/>\n        <hfp:hasProperty name="numeric" value="false"/>\n      </xs:appinfo>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#NMTOKENS"/>\n    </xs:annotation>\n    <xs:restriction>\n      <xs:simpleType>\n        <xs:list itemType="xs:NMTOKEN"/>\n      </xs:simpleType>\n      <xs:minLength value="1" id="NMTOKENS.minLength"/>\n    </xs:restriction>\n  </xs:simpleType>\n  <xs:simpleType name="Name" id="Name">\n    <xs:annotation>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#Name"/>\n    </xs:annotation>\n    <xs:restriction base="xs:token">\n      <xs:pattern value="\\i\\c*" id="Name.pattern">\n        <xs:annotation>\n          <xs:documentation source="http://www.w3.org/TR/REC-xml#NT-Name">\n            pattern matches production 5 from the XML spec\n          </xs:documentation>\n        </xs:annotation>\n      </xs:pattern>\n    </xs:restriction>\n  </xs:simpleType>\n  <xs:simpleType name="NCName" id="NCName">\n    <xs:annotation>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#NCName"/>\n    </xs:annotation>\n    <xs:restriction base="xs:Name">\n      <xs:pattern value="[\\i-[:]][\\c-[:]]*" id="NCName.pattern">\n        <xs:annotation>\n          <xs:documentation source="http://www.w3.org/TR/REC-xml-names/#NT-NCName">\n            pattern matches production 4 from the Namespaces in XML spec\n          </xs:documentation>\n        </xs:annotation>\n      </xs:pattern>\n    </xs:restriction>\n  </xs:simpleType>\n  <xs:simpleType name="ID" id="ID">\n    <xs:annotation>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#ID"/>\n    </xs:annotation>\n    <xs:restriction base="xs:NCName"/>\n  </xs:simpleType>\n  <xs:simpleType name="IDREF" id="IDREF">\n    <xs:annotation>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#IDREF"/>\n    </xs:annotation>\n    <xs:restriction base="xs:NCName"/>\n  </xs:simpleType>\n  <xs:simpleType name="ENTITY" id="ENTITY">\n    <xs:annotation>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#ENTITY"/>\n    </xs:annotation>\n    <xs:restriction base="xs:NCName"/>\n  </xs:simpleType>\n  <xs:simpleType name="integer" id="integer">\n    <xs:annotation>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#integer"/>\n    </xs:annotation>\n    <xs:restriction base="xs:decimal">\n      <xs:fractionDigits fixed="true" value="0" id="integer.fractionDigits"/>\n      <xs:pattern value="[\\-+]?[0-9]+" id="integer.pattern"/>\n      \n    </xs:restriction>\n  </xs:simpleType>\n  <xs:simpleType name="nonPositiveInteger" id="nonPositiveInteger">\n    <xs:annotation>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#nonPositiveInteger"/>\n    </xs:annotation>\n    <xs:restriction base="xs:integer">\n      <xs:maxInclusive value="0" id="nonPositiveInteger.maxInclusive"/>\n    </xs:restriction>\n  </xs:simpleType>\n  <xs:simpleType name="negativeInteger" id="negativeInteger">\n    <xs:annotation>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#negativeInteger"/>\n    </xs:annotation>\n    <xs:restriction base="xs:nonPositiveInteger">\n      <xs:maxInclusive value="-1" id="negativeInteger.maxInclusive"/>\n    </xs:restriction>\n  </xs:simpleType>\n  <xs:simpleType name="long" id="long">\n    <xs:annotation>\n      <xs:appinfo>\n        <hfp:hasProperty name="bounded" value="true"/>\n        <hfp:hasProperty name="cardinality" value="finite"/>\n      </xs:appinfo>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#long"/>\n    </xs:annotation>\n    <xs:restriction base="xs:integer">\n      <xs:minInclusive value="-9223372036854775808" id="long.minInclusive"/>\n      <xs:maxInclusive value="9223372036854775807" id="long.maxInclusive"/>\n    </xs:restriction>\n  </xs:simpleType>\n  <xs:simpleType name="int" id="int">\n    <xs:annotation>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#int"/>\n    </xs:annotation>\n    <xs:restriction base="xs:long">\n      <xs:minInclusive value="-2147483648" id="int.minInclusive"/>\n      <xs:maxInclusive value="2147483647" id="int.maxInclusive"/>\n    </xs:restriction>\n  </xs:simpleType>\n  <xs:simpleType name="short" id="short">\n    <xs:annotation>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#short"/>\n    </xs:annotation>\n    <xs:restriction base="xs:int">\n      <xs:minInclusive value="-32768" id="short.minInclusive"/>\n      <xs:maxInclusive value="32767" id="short.maxInclusive"/>\n    </xs:restriction>\n  </xs:simpleType>\n  <xs:simpleType name="byte" id="byte">\n    <xs:annotation>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#byte"/>\n    </xs:annotation>\n    <xs:restriction base="xs:short">\n      <xs:minInclusive value="-128" id="byte.minInclusive"/>\n      <xs:maxInclusive value="127" id="byte.maxInclusive"/>\n    </xs:restriction>\n  </xs:simpleType>\n  <xs:simpleType name="nonNegativeInteger" id="nonNegativeInteger">\n    <xs:annotation>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#nonNegativeInteger"/>\n    </xs:annotation>\n    <xs:restriction base="xs:integer">\n      <xs:minInclusive value="0" id="nonNegativeInteger.minInclusive"/>\n    </xs:restriction>\n  </xs:simpleType>\n  <xs:simpleType name="unsignedLong" id="unsignedLong">\n    <xs:annotation>\n      <xs:appinfo>\n        <hfp:hasProperty name="bounded" value="true"/>\n        <hfp:hasProperty name="cardinality" value="finite"/>\n      </xs:appinfo>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#unsignedLong"/>\n    </xs:annotation>\n    <xs:restriction base="xs:nonNegativeInteger">\n      <xs:maxInclusive value="18446744073709551615" id="unsignedLong.maxInclusive"/>\n    </xs:restriction>\n  </xs:simpleType>\n  <xs:simpleType name="unsignedInt" id="unsignedInt">\n    <xs:annotation>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#unsignedInt"/>\n    </xs:annotation>\n    <xs:restriction base="xs:unsignedLong">\n      <xs:maxInclusive value="4294967295" id="unsignedInt.maxInclusive"/>\n    </xs:restriction>\n  </xs:simpleType>\n  <xs:simpleType name="unsignedShort" id="unsignedShort">\n    <xs:annotation>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#unsignedShort"/>\n    </xs:annotation>\n    <xs:restriction base="xs:unsignedInt">\n      <xs:maxInclusive value="65535" id="unsignedShort.maxInclusive"/>\n    </xs:restriction>\n  </xs:simpleType>\n  <xs:simpleType name="unsignedByte" id="unsignedByte">\n    <xs:annotation>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#unsignedByte"/>\n    </xs:annotation>\n    <xs:restriction base="xs:unsignedShort">\n      <xs:maxInclusive value="255" id="unsignedByte.maxInclusive"/>\n    </xs:restriction>\n  </xs:simpleType>\n  <xs:simpleType name="positiveInteger" id="positiveInteger">\n    <xs:annotation>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#positiveInteger"/>\n    </xs:annotation>\n    <xs:restriction base="xs:nonNegativeInteger">\n      <xs:minInclusive value="1" id="positiveInteger.minInclusive"/>\n    </xs:restriction>\n  </xs:simpleType>\n\n  <xs:simpleType name="yearMonthDuration">\n    <xs:annotation>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#yearMonthDuration">\n        This type includes just those durations expressed in years and months.\n        Since the pattern given excludes days, hours, minutes, and seconds,\n        the values of this type have a seconds property of zero.  They are\n        totally ordered.\n      </xs:documentation>\n    </xs:annotation>\n    <xs:restriction base="xs:duration">\n      <xs:pattern id="yearMonthDuration.pattern" value="[^DT]*"/>\n    </xs:restriction>\n  </xs:simpleType>\n  <xs:simpleType name="dayTimeDuration">\n    <xs:annotation>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#dayTimeDuration">\n        This type includes just those durations expressed in days, hours, minutes, and seconds.\n        The pattern given excludes years and months, so the values of this type \n        have a months property of zero.  They are totally ordered.\n      </xs:documentation>\n    </xs:annotation>\n    <xs:restriction base="xs:duration">\n      <xs:pattern id="dayTimeDuration.pattern" value="[^YM]*(T.*)?"/>\n     </xs:restriction>\n  </xs:simpleType>\n    <xs:simpleType name="dateTimeStamp" id="dateTimeStamp">\n    <xs:annotation>\n      <xs:documentation source="http://www.w3.org/TR/xmlschema11-2/#dateTimeStamp">\n        This datatype includes just those dateTime values Whose explicitTimezone\n        is present.  They are totally ordered.\n      </xs:documentation>\n    </xs:annotation>\n    <xs:restriction base="xs:dateTime">\n      <xs:explicitTimezone fixed="true"\n        id="dateTimeStamp.explicitTimezone" value="required"/>\n     </xs:restriction>\n  </xs:simpleType>\n\n</xs:schema>';
var XsdLibrary = function (objTools, Library, xsd, basetypesXsd) {
        var xsdLibrary = objTools.make(Library, {
                init: function (defs) {
                    defs = defs || [];
                    var initDefs = [xsd.parseToDom(basetypesXsd)].concat(defs);
                    return new Library().init.call(this, initDefs);
                },
                addItem: function (def, name) {
                    var ns = name || def.documentElement.getAttributeNS(null, 'targetNamespace');
                    var xsdCollection = this.exists(ns) ? this.getItem(ns) : [];
                    xsdCollection.push(def);
                    this.items[ns] = xsdCollection;
                },
                findElement: function (namespace, name) {
                    var xsds = this.getItem(namespace) || [];
                    var element;
                    for (var i = 0, l = xsds.length; i < l; i++) {
                        element = xsd.findElement(xsds[i], name);
                        if (element) {
                            return element;
                        }
                    }
                    return null;
                },
                findTypeDefinition: function (namespace, name) {
                    var xsds = this.getItem(namespace) || [];
                    var xsdNodes;
                    for (var i = 0, l = xsds.length; i < l; i++) {
                        xsdNodes = xsd.findTypeDefinition(xsds[i], name);
                        if (xsdNodes.length > 0) {
                            return xsdNodes[0];
                        }
                    }
                    return null;
                },
                findTypeDefinitionFromNodeAttr: function (node, typeAttr, typeAttrNS) {
                    var type = xsd.getTypeFromNodeAttr(node, typeAttr, typeAttrNS);
                    return type ? this.findTypeDefinition(type.namespaceURI, type.name) : null;
                },
                findBaseTypeFor: function (node) {
                    var xsdNow = node;
                    var basetype;
                    do {
                        basetype = xsd.getRestrictedType(xsdNow);
                        xsdNow = this.findTypeDefinition(basetype.namespaceURI, basetype.name);
                    } while (xsdNow !== null);
                    return basetype.name;
                }
            });
        return objTools.makeConstructor(function XsdLibrary() {
        }, xsdLibrary);
    }(objTools, Library, xsd, text_basetypesxsd);

	return XsdLibrary;

});