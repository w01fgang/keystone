var BooleanType = require('../../fieldTypes/boolean');
var SelectType = require('../../fieldTypes/select');

module.exports = function DependsOnList(config) {
	return {
		selector: '.Form',
		sections: {
			dependency: new BooleanType({fieldName: 'dependency'}),
			dependent: new SelectType({fieldName: 'dependent'}),
		},
	};
};
