function showHelp_(desc, flags) {
  console.log(desc);
  console.log();
  flags.forEach(function(flag) {
    console.log('\t-' + flag['short'] + ' | --' + flag['long']);
    console.log('\t\t\t' + flag.desc +
        (flag['default'] ? '(Default: ' + flag['default'] + ')' : ''));

  });
  console.log('\t-f | --config-file');
  console.log('\t\t\tConfig file');
  console.log('\t-h | --help');
  console.log('\t\t\tYou\'re staring at it');
  console.log();
};

function assignValue_(config, configSpec, value) {
  for(var i = 0; i < configSpec.length - 1; i++) {
    if (!config[configSpec[i]]) {
      config[configSpec[i]] = {};
    }
  }
  config[configSpec[i]] = value;
};

module.exports = function(desc, flags, argv) {
  if (!flags) return;

  argv = argv || require('optimist').argv;

  if (argv.h || argv['help']) return showHelp_(desc, flags);
  
  var configFile = argv.f || argv['config-file'];
  var config = {};
  if (configFile) {
    config = require(configFile);
  }

  flags.forEach(function(flag) {
    var value = argv[flag['short']] || argv[flag['long']] || flag['default'];
    if (value) {
      assignValue_(config, flag.configVal, value);
    }
  });

  return config;
};

