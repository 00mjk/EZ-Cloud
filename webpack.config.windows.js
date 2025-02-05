const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const WebpackShellPluginNext = require('webpack-shell-plugin-next');
const path = require('path');
const { version } = require('./package.json');

// For the file download of the NodeJS installer
const nodeJS = {
  version: 'v16.16.0',
  filename: 'node-v16.16.0-x64.msi'
};

module.exports = {
  entry: {
    service: './src/index.js', // The main code of trhe service
    // installService: './installer/installService.dist.js',
    // uninstallService: './installer/uninstallService.dist.js',
    serviceWrapper: './node_modules/node-windows/lib/wrapper.js'
  },
  output: {
    path: path.join(__dirname, 'dist', `OC-Admin.v${version}`, 'bin'),
    filename: '[name].js'
  },
  mode: 'production',
  target: 'node',
  stats: {
    errorDetails: true
  },
  module: {
    // This rule is to allow SSH2 and CPU-FEATURE compiled code (.node files) to be embedded:
    rules: [{ test: /\.node$/, use: 'raw-loader' }]
  },
  plugins: [
    // Ignore absence of optional module `pg-native` of module `pg` (pg/lib/native)
    new webpack.IgnorePlugin({
      resourceRegExp: /pg-native/,
      contextRegExp: /pg\\lib\\native$/
    }),
    // Ignore absence of optional module `cpu-features` of module `ssh2` (ssh2/lib/protocol)
    new webpack.IgnorePlugin({
      resourceRegExp: /cpu-features/,
      contextRegExp: /ssh2\\lib\\protocol$/
    }),
    // Ignore absence of optional module `sshcrypto.node` of module `ssh2` (ssh2/lib/protocol)
    new webpack.IgnorePlugin({
      resourceRegExp: /sshcrypto.node/,
      contextRegExp: /ssh2\\lib\\protocol$/
    }),
    // Copy all the necessary sample files to the relevant place under dist/
    new CopyPlugin({
      patterns: [
        { from: 'config.dist', to: path.join('..', 'config'), toType: 'dir' },
        { from: 'config.sample', to: path.join('..', 'config.sample'), toType: 'dir' },
        { from: 'public_web_root', to: path.join('..', 'public_web_root'), toType: 'dir' },
        { from: '.env.sample', to: path.join('..', '.env.sample'), toType: 'file' },
        { from: '.env.dist.windows', to: path.join('..', '.env'), toType: 'file' },
        { from: 'database', to: path.join('..', 'database'), toType: 'dir' },
        { from: 'LICENSE', to: path.join('..', 'License.txt'), toType: 'file' },
        { from: 'resources', to: path.join('..', 'resources'), toType: 'dir' },
        // Service and wrapper support files:
        { from: 'node_modules/node-windows/bin/winsw/winsw.exe', to: 'ocadminserver.exe', toType: 'file' },
        { from: 'node_modules/node-windows/bin/winsw/winsw.exe.config', to: 'ocadminserver.exe.config', toType: 'file' },
        { from: 'installer/ocadminserver.xml', to: 'ocadminserver.xml', toType: 'file' },
        // String obfuscation tool from LogRhythm
        { from: 'src/shared/encryptionTool.exe', to: 'encryptionTool.exe', toType: 'file' },
        { from: 'src/shared/encryptionTool.hashes.txt', to: 'encryptionTool.hashes.txt', toType: 'file' },
        // Small helpers for the Service management by user
        { from: 'installer/installService.bat', to: './', toType: 'dir' },
        { from: 'installer/uninstallService.bat', to: './', toType: 'dir' },
        { from: 'installer/restartService.bat', to: './', toType: 'dir' }
      ]
    }),

    new WebpackShellPluginNext({
      onBuildExit: {
        scripts: [
          // Create a Zip file for this packaged version, without NodeJS
          // eslint-disable-next-line prefer-template
          'PowerShell.exe -Command Compress-Archive -Path "' + path.join(__dirname, 'dist', `OC-Admin.v${version}`) + '" -DestinationPath "' + path.join(__dirname, 'dist', `OC-Admin_v${version}.NoNodeJS.zip`) + '" -Force -CompressionLevel Fastest',

          // Downloading NodeJS
          // eslint-disable-next-line prefer-template
          'PowerShell.exe -Command if (!(Test-Path "' + path.join(__dirname, 'dist', 'NodeJS_Installer', nodeJS.filename) + '")) { New-Item -Path "' + path.join(__dirname, 'dist', 'NodeJS_Installer') + `" -ItemType Directory -Force ; Invoke-WebRequest -Uri "https://nodejs.org/dist/${nodeJS.version}/${nodeJS.filename}" -OutFile "` + path.join(__dirname, 'dist', 'NodeJS_Installer', nodeJS.filename) + '" }',
          // 'PowerShell.exe -Command if (!(Test-Path "' + path.join(__dirname, 'dist', `OC-Admin.v${version}`, 'NodeJS_Installer', nodeJS.filename) + '")) { New-Item -Path "' + path.join(__dirname, 'dist', `OC-Admin.v${version}`, 'NodeJS_Installer') + `" -ItemType Directory -Force ; Invoke-WebRequest -Uri "https://nodejs.org/dist/${nodeJS.version}/${nodeJS.filename}" -OutFile "` + path.join(__dirname, 'dist', `OC-Admin.v${version}`, 'NodeJS_Installer', nodeJS.filename) + '" }',

          // Creating second Zip file, with NodeJS
          // eslint-disable-next-line prefer-template
          'PowerShell.exe -Command Compress-Archive -Path "' + path.join(__dirname, 'dist', `OC-Admin.v${version}`) + '", "' + path.join(__dirname, 'dist', 'NodeJS_Installer') + '" -DestinationPath "' + path.join(__dirname, 'dist', `OC-Admin_v${version}.WithNodeJS.zip`) + '" -Force -CompressionLevel Fastest',
          // eslint-disable-next-line max-len
          // 'PowerShell.exe -Command Compress-Archive -Path "' + path.join(__dirname, 'dist', `OC-Admin.v${version}`) + '"  -DestinationPath "' + path.join(__dirname, 'dist', `OC-Admin_v${version}.WithNodeJS.zip` + '" -Force -CompressionLevel Fastest'),

          // Build the self contained Installer
          `node ${path.join(__dirname, 'installer', 'installerBuilder')} --installerHelper "${path.join(__dirname, 'installer')}" --distDirectory "${path.join(__dirname, 'dist')}" --distSubDirectory "${path.join(__dirname, 'dist', `OC-Admin.v${version}`)}" `
        ],
        blocking: false,
        parallel: false
      }
    })
  ]
};
