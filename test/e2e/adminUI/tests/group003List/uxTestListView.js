var NameModelTestConfig = require('../../../modelTestConfig/NameModelTestConfig');

module.exports = {
	before: function (browser) {
		browser.adminUIApp = browser.page.adminUIApp();
		browser.adminUISignin = browser.page.adminUISignin();
		browser.adminUIListScreen = browser.page.adminUIListScreen();
		browser.adminUIItemScreen = browser.page.adminUIItemScreen();
		browser.adminUIInitialFormScreen = browser.page.adminUIInitialForm();
		browser.adminUIDeleteConfirmation = browser.page.adminUIDeleteConfirmation();

		browser.adminUIApp.gotoHomeScreen();
		browser.adminUIApp.waitForSigninScreen();

		browser.adminUISignin.signin();

		browser.adminUIApp.waitForHomeScreen();
	},
	after: function (browser) {
		browser.adminUIApp.signout();
		browser.end();
	},
	'List view should allow users to create a new list item': function (browser) {
		browser.adminUIApp.click('@fieldListsMenu').click('@nameListSubmenu').waitForListScreen();

		browser.adminUIListScreen.clickCreateItemButton();

		browser.adminUIApp.waitForInitialFormScreen();

		browser.adminUIInitialFormScreen.fillFieldInputs({
			modelTestConfig: NameModelTestConfig,
			fields: {
				'name': { value: 'Name Field Test 1' },
				'fieldA': { firstName: 'First 1', lastName: 'Last 1' },
			}
		});

		browser.adminUIInitialFormScreen.save();

		browser.adminUIApp.waitForItemScreen();

		browser.adminUIApp.click('@fieldListsMenu').click('@nameListSubmenu').waitForListScreen();

		browser.adminUIListScreen.assertPageItemCountTextEquals('Showing 1 Name');

		browser.adminUIListScreen.assertItemFieldValueEquals([
			{ row: 1, column: 2, name: 'name', value: 'Name Field Test 1', modelTestConfig: NameModelTestConfig }
		]);
	},
	'List view should allow users to create more new list items': function (browser) {
		browser.adminUIApp.click('@fieldListsMenu').click('@nameListSubmenu').waitForListScreen();

		browser.adminUIListScreen.clickCreateItemButton();

		browser.adminUIApp.waitForInitialFormScreen();

		browser.adminUIInitialFormScreen.fillFieldInputs({
			modelTestConfig: NameModelTestConfig,
			fields: {
				'name': { value: 'Name Field Test 2' },
				'fieldA': { firstName: 'First 2', lastName: 'Last 2' },
			}
		});

		// TODO: refactor
		browser.adminUIInitialFormScreen.section.form
			.click('@createButton');

		browser.adminUIApp.waitForItemScreen();

		browser.adminUIApp.click('@fieldListsMenu').click('@nameListSubmenu').waitForListScreen();

		browser.adminUIListScreen.assertPageItemCountTextEquals('Showing 2 Names');

		browser.adminUIListScreen.assertItemFieldValueEquals([
			{ row: 1, column: 2, name: 'name', value: 'Name Field Test 1', modelTestConfig: NameModelTestConfig, },
			{ row: 2, column: 2, name: 'name', value: 'Name Field Test 2', modelTestConfig: NameModelTestConfig, }
		]);
	},
	'List view should allow users to browse an item by clicking the item name': function (browser) {
		browser.adminUIApp.click('@fieldListsMenu').click('@nameListSubmenu').waitForListScreen();

		browser.adminUIListScreen.clickItemFieldValue([
			{ row: 1, column: 2, name: 'name', modelTestConfig: NameModelTestConfig, }
		]);

		browser.adminUIApp.waitForItemScreen();
	},
	'List view should allow users to browse back to list view from an item view by using the crum links': function (browser) {
		browser.adminUIApp.click('@fieldListsMenu').click('@nameListSubmenu').waitForListScreen();

		browser.adminUIListScreen.clickItemFieldValue([
			{ row: 1, column: 2, name: 'name', modelTestConfig: NameModelTestConfig, }
		]);

		browser.adminUIApp.waitForItemScreen();

		// TODO: refactor
		browser.adminUIItemScreen.click('@listBreadcrumb');

		browser.adminUIApp.waitForListScreen();
	},
	'List view should allow users to search for items': function (browser) {
		browser.adminUIApp.click('@fieldListsMenu').click('@nameListSubmenu').waitForListScreen();

		// TODO: refactor
		browser.adminUIListScreen
			.setValue('@searchInputField', 'Name Field Test 2');

		browser.adminUIApp.waitForListScreen();

		browser.adminUIListScreen.assertPageItemCountTextEquals('Showing 1 Name');

		browser.adminUIListScreen.assertItemFieldValueEquals([
			{ row: 1, column: 2, name: 'name', value: 'Name Field Test 2', modelTestConfig: NameModelTestConfig, },
		]);
	},
	'List view should allow users to clear search filter': function (browser) {
		browser.adminUIListScreen.clickSearchInputClearIcon();

		browser.adminUIApp.waitForListScreen();

		browser.adminUIListScreen.assertPageItemCountTextEquals('Showing 2 Names');

		browser.adminUIListScreen.assertItemFieldValueEquals([
			{ row: 1, column: 2, name: 'name', value: 'Name Field Test 1', modelTestConfig: NameModelTestConfig, },
			{ row: 2, column: 2, name: 'name', value: 'Name Field Test 2', modelTestConfig: NameModelTestConfig, },
		]);
	},
	'List view should allow users to delete items': function (browser) {
		browser.adminUIListScreen.clickDeleteItemIcon([
			{ row: 1, column: 1 }
		])

		browser.adminUIApp.waitForDeleteConfirmationScreen();

		// TODO: refactor
		browser.adminUIDeleteConfirmation.click('@deleteButton');

		browser.adminUIApp.waitForListScreen();

		browser.adminUIListScreen.assertPageItemCountTextEquals('Showing 1 Name');

		browser.adminUIListScreen.assertItemFieldValueEquals([
			{ row: 1, column: 2, name: 'name', value: 'Name Field Test 2', modelTestConfig: NameModelTestConfig, },
		]);
	},
	'List view should allow users to delete last item': function (browser) {
		browser.adminUIApp.click('@fieldListsMenu').click('@nameListSubmenu').waitForListScreen();

		browser.adminUIListScreen.clickDeleteItemIcon([
			{ row: 1, column: 1 }
		])

		browser.adminUIApp.waitForDeleteConfirmationScreen();

		// TODO: refactor
		browser.adminUIDeleteConfirmation.click('@deleteButton');

		browser.adminUIApp.waitForListScreen();

		browser.adminUIListScreen.assertNoItemsFoundTextEquals('No names found…');
	},

	// UNDO ANY STATE CHANGES -- THIS TEST SHOULD RUN LAST
	'List view ... resetting state changes': function (browser) {
	},
};
