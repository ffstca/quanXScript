
function work() {
    var body = $response.body;
    var obj = JSON.parse(body);
    var retList = obj['data']
    if (retList.length === 0) {
        $done(body);
        return;
    }
    console.log(retList[0]);
    var currentTime = new Date();
    var newReportTime=genNewDate(currentTime);
    var newCollectTime=genNewDate(newReportTime);
    var newSampleTime=genNewDate(newCollectTime);

    retList[0]['report_date']=dateFormat("YYYY-mm-dd HH:MM:SS", newReportTime);
    retList[0]['collect_date']=dateFormat("YYYY-mm-dd HH:MM:SS", newCollectTime);
    retList[0]['sample_date']=dateFormat("YYYY-mm-dd HH:MM:SS", newSampleTime);
    console.log(retList[0]);
    obj['data']=retList;
    body = JSON.stringify(obj);
    console.log(body);
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
    newDate.setSeconds(newDate.getSeconds() - getRndInteger(14400, 25200));
    return newDate
}
work();