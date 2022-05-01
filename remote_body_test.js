function work1(){
    var body = $response.body;
    var obj = JSON.parse(body);
    console.log('================')
    console.log(obj)
    obj['result']['username'] = "12345678";
    obj['result']['count_like'] = 99999;
    
    modifiedBody = JSON.stringify(obj);
    setTimeout(function() { console.log("abc22222"); }, 1000);
    console.log(modifiedBody);
    $done(modifiedBody);
}

work();