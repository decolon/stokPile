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

	it('should navigate to user home when form submitted from signup', function(){
		element('.submit').click();
		sleep(.1);
		expect(browser().window().path()).toBe('/user');
		expect(element('h1:first').html()).toContain('USER HOME');
	});

	it('should navigate to user home when form submitted from signin', function(){
		element('#signin').click();
		element('.submit').click();
		sleep(.1);
		expect(browser().window().path()).toBe('/user');
		expect(element('h1:first').html()).toContain('USER HOME');
	});

});
