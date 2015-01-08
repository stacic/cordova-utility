<!--
#
# Licensed to the Apache Software Foundation (ASF) under one
# or more contributor license agreements.  See the NOTICE file
# distributed with this work for additional information
# regarding copyright ownership.  The ASF licenses this file
# to you under the Apache License, Version 2.0 (the
# "License"); you may not use this file except in compliance
# with the License.  You may obtain a copy of the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing,
# software distributed under the License is distributed on an
# "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
#  KIND, either express or implied.  See the License for the
# specific language governing permissions and limitations
# under the License.
#
-->

# cordova-local

The cordova-local utility enables a developer to easily switch between multiple local installations of cordova with a single command. It is meant to be installed globally with `npm install -g cordova-local`.

To use the utility, use the command `cordova-local` in place of `cordova` in your regular cordova workflow. This will call the globally installed cordova-local command, which invokes the closest local installation of cordova in the current directory or its ancestors.

If the `--inclglobal` or `-g` flag is added, cordova-local will attempt to invoke a global installation of cordova in the event that no local installation is found.
