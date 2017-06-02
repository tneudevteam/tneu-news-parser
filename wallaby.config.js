module.exports = function() {
  return {
    files: [
      'index.js',
      'lib/*.js',
      'test/**/*.test.html'
    ],

    tests: [
      'test/**/*.test.js'
    ],

    testFramework: 'jest',

    env: {
      type: 'node'
    }
  };
};
