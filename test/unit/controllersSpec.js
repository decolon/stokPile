//Testing Stokpile controllers
//
//controllers located at public/js/controllers.js
//

describe('Public Pages Controllers', function(){
	describe('Test: WelcomeCtl', function(){
		var WelcomeCtl;
		beforeEach(function(){
			WelcomeCtl = new WelcomeCtl();
		});

		it('Should exist', function(){
			expect(WelcomeCtl).not.to.equal(null);
		});
	
	});
});
