'use strict'

describe('myApp', function(){
	beforeEach(function(){
		browser().navigateTo('/');
	});

	it('should start out at the signup page', function(){
        expect(browser().window().path()).toBe('/signup');
		expect(element('#signup').html()).toContain('Sign Up');	
	});

	it('should navigate to sign in when the button is clicked', function(){
		element('#signin').click();
		expect(browser().window().path()).toBe('/signin');
		expect(element('h3:first').html()).toContain('Sign In');
	});

	it('should be able to navigate back to signup page', function(){
		element('#signin').click();
		element('#signup').click();
		expect(browser().window().path()).toBe('/signup');
		expect(element('h3:first').html()).toContain('Sign Up');
	});
});
