// /*global jasmine, __karma__, window*/
Error.stackTraceLimit = Infinity; // "No stacktrace"" is usually best for app testing.

// Uncomment to get full stacktrace output. Sometimes helpful, usually not.
// Error.stackTraceLimit = Infinity; //

jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;

// builtPaths: root paths for output ("built") files
// get from karma.config.js, then prefix with '/base/' (default is 'app/')
var builtPaths = (__karma__.config.builtPaths || ['app/'])
                 .map(function(p) { return '/base/'+p;});

__karma__.loaded = function () { };

function isJsFile(path) {
  return path.slice(-3) == '.js';
}

function isSpecFile(path) {
  return /\.spec\.(.*\.)?js$/.test(path);
}

// Is a "built" file if is JavaScript file in one of the "built" folders
function isBuiltFile(path) {
  return isJsFile(path) &&
         builtPaths.reduce(function(keep, bp) {
           return keep || (path.substr(0, bp.length) === bp);
         }, false);
}

var allSpecFiles = Object.keys(window.__karma__.files)
  .filter(isSpecFile)
  .filter(isBuiltFile);

System.config({
  baseURL: 'base',
  // Extend usual application package list with test folder
  packages: { 'testing': { main: 'index.js', defaultExtension: 'js' } },
  defaultJSExtensions: true,
  // Assume npm: is set in `paths` in systemjs.config
  // Map the angular testing umd bundles
  map: {
    '@angular/core/testing': 'npm:@angular/core/bundles/core-testing.umd.js',
    '@angular/common/testing': 'npm:@angular/common/bundles/common-testing.umd.js',
    '@angular/compiler/testing': 'npm:@angular/compiler/bundles/compiler-testing.umd.js',
    '@angular/platform-browser/testing': 'npm:@angular/platform-browser/bundles/platform-browser-testing.umd.js',
    '@angular/platform-browser-dynamic/testing': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic-testing.umd.js',
    '@angular/http/testing': 'npm:@angular/http/bundles/http-testing.umd.js',
    '@angular/router/testing': 'npm:@angular/router/bundles/router-testing.umd.js',
    '@angular/forms/testing': 'npm:@angular/forms/bundles/forms-testing.umd.js',
  },
});

System.import('systemjs.config.js')
  .then(importSystemJsExtras)
  .then(initTestBed)
  .then(initTesting);

/** Optional SystemJS configuration extras. Keep going w/o it */
function importSystemJsExtras(){
  return System.import('systemjs.config.extras.js')
  .catch(function(reason) {
    console.log(
      'Warning: System.import could not load the optional "systemjs.config.extras.js". Did you omit it by accident? Continuing without it.'
    );
    console.log(reason);
  });
}

function initTestBed(){
  return Promise.all([
    System.import('@angular/core/testing'),
    System.import('@angular/platform-browser-dynamic/testing')
  ])

  .then(function (providers) {
    var coreTesting    = providers[0];
    var browserTesting = providers[1];

    coreTesting.TestBed.initTestEnvironment(
      browserTesting.BrowserDynamicTestingModule,
      browserTesting.platformBrowserDynamicTesting());
  })
  .then(function() {
  return Promise.all(
    Object.keys(window.__karma__.files) // All files served by Karma.
    .filter(onlySpecFiles)
    .map(file2moduleName)
    .map(function(path) {
      return System.import(path).then(function(module) {
        if (module.hasOwnProperty('main')) {
          module.main();
        } else {
          throw new Error('Module ' + path + ' does not implement main() method.');
        }
      });
    }));
})
}
function onlySpecFiles(path) {
  // check for individual files, if not given, always matches to all
  var patternMatched = __karma__.config.files ?
    path.match(new RegExp(__karma__.config.files)) : true;

  return patternMatched && /[\.|_]spec\.js$/.test(path);
}
function file2moduleName(filePath) {
  return filePath.replace(/\\/g, '/')
    .replace(/^\/base\//, '')
    .replace(/\.js/, '');
}
// Import all spec files and start karma
function initTesting () {
  return Promise.all(
    allSpecFiles.map(function (moduleName) {
      return System.import(moduleName);
    })
  )
  .then(__karma__.start, __karma__.error);
}
