@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe"  "%~dp0\node_modules\cordova-local\bin\cordova-local.js" %*
) ELSE (
  node  "%~dp0\node_modules\cordova-local\bin\cordova-local.js" %*
)
