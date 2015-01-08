/**
    Licensed to the Apache Software Foundation (ASF) under one
    or more contributor license agreements.  See the NOTICE file
    distributed with this work for additional information
    regarding copyright ownership.  The ASF licenses this file
    to you under the Apache License, Version 2.0 (the
    "License"); you may not use this file except in compliance
    with the License.  You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing,
    software distributed under the License is distributed on an
    "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, either express or implied.  See the License for the
    specific language governing permissions and limitations
    under the License.
*/

var path = require('path'),
    findup,
    nopt,
    shelljs;

function init() {
    try {
        findup= require('findup-sync');
        shelljs = require('shelljs');
        nopt = require('nopt');
    } catch (e) {
        console.error(
            'Please run npm install from this directory:\n\t' +
            path.dirname(__dirname)
        );
        process.exit(2);
    }
};

module.exports = cordovalocal
function cordovalocal(inputArgs) {
    var cordovapath;

    var knownOpts =
        { 'incglobal' : Boolean
        };

    var shortHands =
        { 'g' : '--incglobal'
        };

    inputArgs = inputArgs || process.argv

    init();

    var options = nopt(knownOpts, shortHands, inputArgs);

    cordovapath = findup('node_modules/cordova/bin/cordova');
    if (!cordovapath) {
        console.log('Could not find a local cordova install.');
        if (options.incglobal) {
            console.log('Attempting to use a global installation.');
            cordovapath = 'cordova';
        }
    }

    var args = inputArgs.slice(2).join(' ');
    if (cordovapath) {
        var cmd = cordovapath + ' ' + args;
        var results = shelljs.exec(cmd, {silent:true}).output;
        console.log(results);
    }
}
