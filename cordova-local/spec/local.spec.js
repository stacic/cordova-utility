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
    cordovalocal = require('../src/cordova-local.js');

var shelljs,
    globalVersion;

var savepath = __dirname;
var localPath = path.join(savepath, '..', 'fixtures', 'cordova-stub-one');
var localNestedPath = path.join(localPath, 'cordova-stub-two');
var localVersion = require(path.join(localPath, 'node_modules', 'cordova', 'package')).version;
var localNestedVersion = require(path.join(localNestedPath, 'node_modules', 'cordova', 'package')).version;

function init() {
    try {
        shelljs = require('shelljs');
    } catch (e) {
        console.log(e);
        console.error(
            'Please run npm install from this directory:\n\t' +
            path.dirname(__dirname)
        );
        process.exit(2);
    }
};

init();

describe("cordova-local", function(){

    beforeEach(function() {
        spyOn(console, 'log');

    });

    var output;

    it("spec.1 invoke the correct local installation of Cordova", function() {
        shelljs.pushd(localPath);
        cordovalocal(['node', 'cordova-local', '--version']);
        expect(console.log.mostRecentCall.args[0]).toMatch(localVersion);
        shelljs.popd();
    });

    it("spec.2 invoke the closest local installation when installations are nested", function() {
        shelljs.pushd(localNestedPath);
        cordovalocal(['node', 'cordova-local', '--version']);
        expect(console.log.mostRecentCall.args[0]).toMatch(localNestedVersion);
        shelljs.popd();
    });

    it("spec.3 invoke an applicable local installation correctly even if --incglobal is used", function() {
        shelljs.pushd(localNestedPath);
        cordovalocal(['node', 'cordova-local', '--version', '--incglobal']);
        expect(console.log.mostRecentCall.args[0]).toMatch(localNestedVersion);
        shelljs.popd();
    });

    describe("cordova-local --incglobal", function() {
        function checkGlobal() {
            if (globalVersion) {
                expect(console.log.mostRecentCall.args[0]).toMatch(globalVersion);
            } else {
                expect(true).toFailWithMessage('No global installation of Cordova found. Please run `npm install -g cordova` in order to complete this test.');
            }
        }

        beforeEach(function(done){
            // Custom Matcher
            this.addMatchers({
                toFailWithMessage : function (failmessage) {
                    this.message = function() { return failmessage };
                    return false;
                }
            });

            // Check if there is a copy of cordova installed globally
            shelljs.exec('cordova --version', {silent: true}, function(code, output){
                if (code == 0) {
                    globalVersion = output;
                }
                done();
            });
        });

        it("spec.4 invoke the global installation if run in a tree with no local installation and the --incglobal flag is included", function() {
            shelljs.pushd(savepath);
            cordovalocal(['node', 'cordova-local', '--version', '--incglobal']);
            checkGlobal();
            shelljs.popd();
        });

        it("spec.4 invoke the global installation if run in a tree with no local installation and the -g flag is included", function() {
            shelljs.pushd(savepath);
            cordovalocal(['node', 'cordova-local', '--version', '-g']);
            checkGlobal();
            shelljs.popd();
        });
    });

});
