var body = $response.body;
var obj = JSON.parse(body);

console.log(body);
obj['result']['username'] = "12345678";
modifiedBody = JSON.stringify(obj);

console.log(modifiedBody);

$done({ 'body': modifiedBody });
