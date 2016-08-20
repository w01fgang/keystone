var utils = require('../../../utils');

module.exports = function FileType(config) {
	return {
		selector: '[data-field-name=' + config.fieldName + '][data-field-type=file]',
		elements: {
			label: '.FormLabel',
			button: '.Button.Button--default',
		},
		commands: [{
			assertUI: function() {
				this
					.expect.element('@label').to.be.visible;
				this
					.expect.element('@label').text.to.equal(utils.titlecase(config.fieldName));
				this
					.expect.element('@button').to.be.visible;
				return this;
			},
		}],
	};
};
