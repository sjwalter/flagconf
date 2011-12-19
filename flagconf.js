function showHelp_(desc, flags) {
  console.log(desc);
  console.log();
  flags.forEach(function(flag) {
    console.log('\t-' + flag['short'] + ' | --' + flag['long']);
    console.log('\t\t\t' + flag.desc +
        (flag['default'] ? ' (Default: ' + flag['default'] + ')' : ''));

  });
  console.log('\t-f | --config-file');
  console.log('\t\t\tConfig file');
  console.log('\t-h | --help');
  console.log('\t\t\tYou\'re staring at it');
  console.log();
  process.exit(1);
};

function assignValue_(config, configSpec, value) {
  var tmp = config;
  configSpec.forEach(function(fragment, index) {
    if (index === configSpec.length - 1) {
      tmp[fragment] = value;
    } else {
      if (!tmp[fragment]) {
        tmp[fragment] = {};
      }
      tmp = tmp[fragment];
    }
  });
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

