var utils = require('../../../utils');

module.exports = function ColorType(config) {
	return {
		selector: '.field-type-color[for="' + config.fieldName + '"]',
		elements: {
			label: '.FormLabel',
			value: 'input[name="' + config.fieldName + '"]',
			button: '.e2e-type-color__button',
			swatch: '.e2e-type-color__swatch',
		},
		commands: [{
			assertUI: function() {
				this
					.expect.element('@label').to.be.visible;
				this
					.expect.element('@label').text.to.equal(utils.titlecase(config.fieldName));
				this
					.expect.element('@value').to.be.visible;
				this
					.expect.element('@button').to.be.visible;
				return this;
			},
			fillInput: function(input) {
				this
					.clearValue('@value')
					.setValue('@value', input.value);
				return this;
			},
			assertInput: function(input) {
				this
					.waitForElementVisible('@value');
				this
					.getValue('@value', function (result) {
						this.api.assert.equal(result.state, "success");
						this.api.assert.equal(result.value, input.value);
					}.bind(this));
				return this;
			},
		}],
	};
};
