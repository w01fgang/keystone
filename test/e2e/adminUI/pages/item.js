var CodeList = require('./lists/code');
var NameList = require('./lists/name');
var SelectList = require('./lists/select');
var TextList = require('./lists/text');

module.exports = {
	sections: {
		form: {
			selector: '.keystone-body',
			sections: {
				//
				// DEFINE ALL LISTS
				//
				codeList: new CodeList(),
				nameList: new NameList(),
				selectList: new SelectList(),
				textList: new TextList(),
			},
			elements: {
				//
				// FORM LEVEL ELEMENTS
				//
				saveButton: 'button[class="Button Button--primary"]',
				resetButton: 'button[class="Button Button--link-cancel"]',
				deleteButton: 'button[class="Button Button--link-delete u-float-right"]',
			},
			commands: [{
				//
				// FORM LEVEL COMMANDS
				//
			}],
		},
	},
	elements: {
		//
		// PAGE LEVEL ELEMENTS
		//
		listBreadcrumb: 'a.Button',
		flashMessage: '.Alert > span:nth-child(1)',
	},
	commands: [{
		//
		// PAGE LEVEL COMMANDS
		//
	}],
};
