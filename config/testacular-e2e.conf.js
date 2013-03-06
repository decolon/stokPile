// Testacular configuration
// Generated on Sat Mar 02 2013 17:13:43 GMT-0800 (PST)


// base path, that will be used to resolve files and exclude
basePath = '../';


// list of files / patterns to load in the browser
files = [
  ANGULAR_SCENARIO,
  ANGULAR_SCENARIO_ADAPTER,
  'test/e2e/**/*.js',
];

// list of files to exclude
exclude = [
  
];


// test results reporter to use
// possible values: 'dots', 'progress', 'junit'
reporter = ['dots'];

// enable / disable watching file and executing tests whenever any file changes
autoWatch = false;


// Start these browsers, currently available:
// - Chrome
// - ChromeCanary
// - Firefox
// - Opera
// - Safari (only Mac)
// - PhantomJS
// - IE (only Windows)
browsers = ['Chrome'];

//In tests it will now treat / as http://localhost:3000/
proxies = {
	'/': 'http://localhost:3000/'
};


// If browser does not capture in given timeout [ms], kill it


// Continuous Integration mode
// if true, it capture browsers, run tests and exit
singleRun = true;

//User when the proxy is on
urlRoot = '/__testacular/';
