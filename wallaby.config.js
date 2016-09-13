module.exports = function() {
  return {
    files: [
      'index.js'
    ],

    tests: [
      'test.js'
    ],

    testFramework: 'mocha',

    env: {
      type: 'node'
    }
  };
};
