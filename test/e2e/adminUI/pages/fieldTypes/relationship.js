var utils = require('../../../utils');

module.exports = function RelationshipType(config) {
	var self = {
		selector: '.field-type-relationship[for="' + config.fieldName + '"]',
		elements: {
			label: '.FormLabel',
			placeholder: '.Select-placeholder',
			value: 'input',
			filledValue: '.Select-value-label',
			arrow: '.Select-arrow-zone',
			clear: '.Select-clear-zone',
			option1: '.Select-option:nth-of-type(1)',
			option2: '.Select-option:nth-of-type(2)'
		},
		commands: [{
			assertUI: function() {
				this
					.expect.element('@label').to.be.visible;
				this
					.expect.element('@label').text.to.equal(utils.titlecase(config.fieldName));
				this
					.expect.element('@placeholder').to.be.visible;
				return this;
			},
			fillInput: function(input) {
				if (input.option) {
					this
						.click('@arrow')
						.waitForElementVisible('@option1')
						.click('@' + input.option);
				} else if (input.value) {
					this
						.clearValue('@value')
						.api.keys([input.value, this.api.Keys.ENTER]);
				}
				return this;
			},
			assertInput: function(input) {
				this
					.waitForElementVisible('@filledValue');
				this
					.getText('@filledValue', function (result) {
						this.api.assert.equal(result.state, "success");
						this.api.assert.equal(result.value, input.value);
					}.bind(this));
				return this;
			},
		}],
	};

	return self;
};
