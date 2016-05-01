module.exports = {
	before: function (browser) {
		browser.app = browser.page.app();
		browser.signinScreen = browser.page.signin();
		browser.homeScreen = browser.page.home();

		browser.app.navigate();
		browser.app.waitForElementVisible('@signinScreen');

		browser.signinScreen.signin();
		browser.app.waitForElementVisible('@homeScreen');
	},
	after: function (browser) {
		browser.app.signout();
		browser.end();
	},
	'AdminUI should have a home view': function (browser) {
		browser.app.expect.element('@homeScreen')
			.to.be.visible;
	},
	'Home view should have a home icon': function (browser) {
		browser.app.expect.element('@homeIcon')
			.to.be.visible;
	},
	'Home view should have a home icon': function (browser) {
		browser.app.expect.element('@homeIconLink')
			.to.have.attribute('title').which.contains('Dashboard - e2e');
	},
	'Home view should have an Access menu': function (browser) {
		browser.app.expect.element('@accessMenu')
			.text.to.equal('Access');
	},
	'Home view should have an Fields menu': function (browser) {
		browser.app.expect.element('@fieldListsMenu')
			.text.to.equal('Fields');
	},
	'Home view should have a Front Page Icon': function (browser) {
		browser.app.expect.element('@frontPageIcon')
			.to.be.visible;
	},
	'Home view should have a Front Page link': function (browser) {
		browser.app.expect.element('@frontPageIconLink')
			.to.have.attribute('title').which.contains('Front page - e2e');
	},
	'Home view should have a Logout icon': function (browser) {
		browser.app.expect.element('@logoutIcon')
			.to.be.visible;
	},
	'Home view should have a Logout link': function (browser) {
		browser.app.expect.element('@logoutIconLink')
			.to.have.attribute('title').which.contains('Sign Out');
	},
	'Home view should have a dashboard header': function (browser) {
		browser.homeScreen.expect.element('@dashboardHeader')
			.text.to.equal('e2e');
	},
	'Home view should have a Access dashboard sub-heading': function (browser) {
		browser.homeScreen.section.accessGroup.expect.element('@subheading')
			.text.to.equal('Access');
	},
	'Home view should have a Fields dashboard sub-heading': function (browser) {
		browser.homeScreen.section.fieldsGroup.expect.element('@subheading')
			.text.to.equal('Fields');
	},
	'Home view should have a Other dashboard sub-heading': function (browser) {
		browser.homeScreen.section.otherGroup.expect.element('@subheading')
			.text.to.equal('Other');
	},
};
