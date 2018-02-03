
const path = require('path');
const baseNetAppPath = path.join(__dirname, '\\src\\QuickStart.Core\\bin\\Debug\\netcoreapp2.0');

process.env.EDGE_USE_CORECLR = 1;
process.env.EDGE_APP_ROOT = baseNetAppPath;

var edge = require('edge-js');

var baseDll = path.join(baseNetAppPath, 'QuickStart.Core.dll');

var getAppDomainDirectory = edge.func({
    assemblyFile: baseDll,
    typeName: 'QuickStart.Core.LocalMethods',
    methodName: 'GetAppDomainDirectory'
});

var getCurrentTime = edge.func({
    assemblyFile: baseDll,
    typeName: 'QuickStart.Core.LocalMethods',
    methodName: 'GetCurrentTime'
});

var useDynamicInput = edge.func({
    assemblyFile: baseDll,
    typeName: 'QuickStart.Core.LocalMethods',
    methodName: 'UseDynamicInput'
});

var getPerson = edge.func({
    assemblyFile: baseDll,
    typeName: 'QuickStart.Core.ExternalMethods',
    methodName: 'GetPersonInfo'
});

console.log('### Calling local methods from QuickStart.Core.dll')
console.log();
getAppDomainDirectory('', function(error, result) {
    if (error) throw error;
    console.log('QuickStart.Core.LocalMethods.GetAppDomainDirectory');
    console.log(result);
    console.log();
});

getCurrentTime('', function(error, result) {
    if (error) throw error;
    console.log('QuickStart.Core.LocalMethods.GetCurrentTime');
    console.log(result);
    console.log();
});

useDynamicInput('Node.Js', function(error, result) {
    if (error) throw error;
    console.log('QuickStart.Core.LocalMethods.UseDynamicInput');
    console.log(result);
    console.log();
});

console.log();
console.log('### Calling external library methods using QuickStart.Core.dll wrapper');
console.log();
getPerson('', function(error, result) {
    if (error) throw error;
    console.log('QuickStart.Core.ExternalMethods.GetPersonInfo');
    console.log(JSON.stringify(result));
});
