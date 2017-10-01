

export default class DateUtils{
    static getYMDHMS(date){
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        var d = date.getDate();
        var h = date.getHours();
        var min = date.getMinutes();
        var s = date.getSeconds();
        return y + "/" + m + "/" + d + " " + h + ":" + min + ":" + s;
    }

    static getYMD(date){
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        var d = date.getDate();
        return y + "/" + m + "/" + d ;
    }
}