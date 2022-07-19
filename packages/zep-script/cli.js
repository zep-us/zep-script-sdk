#!/usr/bin/env node

'use strict';

var cli = require('@zep.us/zep-script-cli');

if (require.main === module) {
  cli.run();
}

module.exports = cli;
