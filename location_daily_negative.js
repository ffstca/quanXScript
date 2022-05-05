function work() {
    var body = $response.body;
    // var body = "{\"userInfo\":\"范枫顺,**************1515\",\"code\":\"200\",\"data\":[{\"sample_date\":\"2022-05-05 12:25:42\",\"nat_result_name\":\"阴性\",\"nat_result\":\"1\",\"collect_mode\":\"10\"}],\"sysTime\":\"2022/05/05 21:54:03\",\"sessionId\":\"75676f1b494e4fbd8216878a309c3883\",\"message\":\"success\"}";
    var obj = JSON.parse(body);
    var retList = obj['data']
    if (retList.length === 0) {
        $done(body);
        return;
    }
    var currentTime = new Date();
    var newSampleTime = genNewDate(currentTime);
    retList[0]['sample_date'] = dateFormat("YYYY-mm-dd HH:MM:SS", newSampleTime);
    retList[0]['nat_result'] = "1";
    retList[0]['nat_result_name'] = "阴性";
    console.log(JSON.stringify(retList));
    obj['data'] = retList;
    body = JSON.stringify(obj);
    $done(body);
}

function dateFormat(fmt, date) {
    let ret;
    const opt = {
        "Y+": date.getFullYear().toString(),        // 年
        "m+": (date.getMonth() + 1).toString(),     // 月
        "d+": date.getDate().toString(),            // 日
        "H+": date.getHours().toString(),           // 时
        "M+": date.getMinutes().toString(),         // 分
        "S+": date.getSeconds().toString()          // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        };
    };
    return fmt;
}
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function genNewDate(targetDate) {
    var newDate = new Date(targetDate);
    newDate.setSeconds(newDate.getSeconds() - getRndInteger(50400, 86400));
    return newDate
}
work();