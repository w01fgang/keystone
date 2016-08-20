var utils = require('../../../utils');

module.exports = function DatetimeType(config) {
	var self = {
		selector: '.field-type-datetime[for="' + config.fieldName + '"]',
		elements: {
			label: '.FormLabel',
			nowButton: '.Button--default',
			date: 'input[name="' + config.fieldName + '_date"]',
			datePlaceholder: 'input[placeholder="YYYY-MM-DD"]',
			time: 'input[name="' + config.fieldName + '_time"]',
			timePlaceholder: 'input[placeholder="HH:MM:SS am/pm"]',
		},
		commands: [{
			assertUI: function() {
				this
					.expect.element('@label').to.be.visible;
				this
					.expect.element('@label').text.to.equal(utils.titlecase(config.fieldName));
				this
					.expect.element('@nowButton').to.be.visible;
				this
					.expect.element('@date').to.be.visible;
				this
					.expect.element('@datePlaceholder').to.be.visible;
				this
					.expect.element('@time').to.be.visible;
				this
					.expect.element('@timePlaceholder').to.be.visible;
				return this;
			},
			fillInput: function(input) {
				this
					.clearValue('@date')
					.setValue('@date', input.date)
					.clearValue('@time')
					.setValue('@time', input.time)

				return this;
			},
			assertInput: function(input) {
				this
					.getValue('@date', function(result) {
						this.api.assert.equal(result.value, input.date);
					}.bind(this));
				this
					.getValue('@time', function(result) {
						this.api.assert.equal(result.value, input.time);
					}.bind(this));
				return this;
			},
		}],
	};

	return self;
};
