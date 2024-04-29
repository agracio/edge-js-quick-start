const path = require('path');
var net = process.argv[2];
var framework = net.charAt(0).toUpperCase() + net.substr(1);
var namespace = 'QuickStart.' + framework;
if(net === 'core') net = '';
var version = net == 'standard' ? '2.0' : '7.0'

const baseNetAppPath = path.join(__dirname, '/src/'+ namespace +'/bin/Debug/net'+ net + version);

process.env.EDGE_USE_CORECLR = 1;
if(net !== 'standard')
    process.env.EDGE_APP_ROOT = baseNetAppPath;

var edge = require('edge-js');

var baseDll = path.join(baseNetAppPath, namespace + '.dll');

console.log('### Application base path: '+ baseNetAppPath);
console.log('### Application dll: '+ baseDll);
console.log();
console.log();

var localTypeName = 'QuickStart.LocalMethods';
var externalTypeName = 'QuickStart.ExternalMethods';

var getAppDomainDirectory = edge.func({
    assemblyFile: baseDll,
    typeName: localTypeName,
    methodName: 'GetAppDomainDirectory'
});

var getCurrentTime = edge.func({
    assemblyFile: baseDll,
    typeName: localTypeName,
    methodName: 'GetCurrentTime'
});

var useDynamicInput = edge.func({
    assemblyFile: baseDll,
    typeName: localTypeName,
    methodName: 'UseDynamicInput'
});

var handleException = edge.func({
    assemblyFile: baseDll,
    typeName: localTypeName,
    methodName: 'ThrowException'
});

var getPerson = edge.func({
    assemblyFile: baseDll,
    typeName: externalTypeName,
    methodName: 'GetPersonInfo'
});

var listCertificates = edge.func({
    assemblyFile: baseDll,
    typeName: localTypeName,
    methodName: 'ListCertificates'
});

var getInlinePerson = edge.func({
    source: function () {/* 
        using System.Threading.Tasks;
        using System;

        public class Person
        {
            public Person(string name, string email, int age)
            {
                Id =  Guid.NewGuid();
                Name = name;
                Email = email;
                Age = age;
            }
            public Guid Id {get;}
            public string Name {get;set;}
            public string Email {get;set;}
            public int Age {get;set;}
        }

        public class Startup
        {
            public async Task<object> Invoke(dynamic input)
            {
                return new Person(input.name, input.email, input.age);
            }
        }
    */}
});


console.log('### Calling inline c# code with multiple parameters')
console.log();
getInlinePerson({name: 'Peter Smith', email: 'peter.smith@edge-js-quick-start.com', age: 30}, function(error, result) {
    if (error) throw error;
    console.log(result);
    console.log();
});


console.log();
console.log('### Calling local methods from ' + namespace +'.dll')
console.log();
getAppDomainDirectory('', function(error, result) {
    if (error) throw error;
    console.log(localTypeName + '.GetAppDomainDirectory');
    console.log(result);
    console.log();
});

getCurrentTime('', function(error, result) {
    if (error) throw error;
    console.log(localTypeName + '.GetCurrentTime');
    console.log(result);
    console.log();
});

useDynamicInput({framework: framework, node: 'Node.Js'}, function(error, result) {
    if (error) throw error;
    console.log(localTypeName + '.UseDynamicInput');
    console.log(result);
    console.log();
});

if(process.platform !== 'linux'){
    listCertificates({ storeName: 'My', storeLocation: 'LocalMachine' }, function(error, result) {
        if (error) throw error;
        console.log(localTypeName + '.ListCertificates');
        console.log(result);
        console.log();
    });
}

console.log();
console.log('### Handling exception');
console.log();
try{
    handleException('', function(error, result) {
    });
}catch(e){
    console.log('.NET Exception: ' + e.Message);
}

console.log();
console.log('### Calling external library methods using '+ namespace +'.dll wrapper');
console.log();
getPerson({name: 'John Smith', email: 'john.smith@edge-js-quick-start.com', age: 35}, function(error, result) {
    if (error) throw error;
    console.log(externalTypeName + '.GetPersonInfo');
    console.log(result);
});


