var body = $response.body;
var obj = JSON.parse(body);

obj['result'][username] = "1234";
body = JSON.stringify(obj);

console.log(body);

$done(body);
