'use strict';

/**
 * Server Info module
 * @module app/utils/srv-info
 */

const os = require('os');
const exec = require('child_process').execSync;

/**
 * @function npmVersion
 * @description Returns installed NPM version
 * @return {string} installed NPM version or 'N/A' if the app is packed in Electron or if npm --version returns error
 */
function npmVersion() {
  require('dotenv').load();
  if (process.env.ELECTRON) return 'N/A';
  let version;
  try {
    version = exec('npm --version').toString().replace(os.EOL, '');
  } catch (e) {
    version = 'N/A';
  }
  return version;
}

/**
 * Returns Static server data
 * @return {array} Static server data
 */
exports.static = () => {
  return [
    {
      name: 'Node.js Version',
      value: process.version.replace('v', ''),
    },
    {
      name: 'NPM Version',
      value: npmVersion(),
    },
    {
      name: 'OS Type',
      value: os.type(),
    },
    {
      name: 'OS Platform',
      value: os.platform(),
    },
    {
      name: 'OS Architecture',
      value: os.arch(),
    },
    {
      name: 'OS Release',
      value: os.release(),
    },
    {
      name: 'CPU Cores',
      value: os.cpus().length,
    },
  ];
};

/**
 * Returns Dymanic server data
 * @return {array} Dynamic server data
 */
exports.dynamic = () => {
  return [
    {
      name: 'Free Memory',
      value: `${Math.round(os.freemem() / 1048576)}MB`,
    },
    {
      name: 'Uptime',
      value: `${os.uptime()}s`,
    },
  ];
};
