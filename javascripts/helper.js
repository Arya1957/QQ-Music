export function ajax(options) {
    let url = options.url;
    let type = 'GET';
    let dataType = options.dataType || 'json';
    let onsuccess = options.onsuccess || function () {
    };
    let onerror = options.onerror || function () {
    };

    let xhr = new XMLHttpRequest();
    xhr.open(type, url, true);
    xhr.onload = function () {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
            //成功了
            if (dataType === 'json') {
                onsuccess(JSON.parse(xhr.responseText))
            } else {
                onsuccess(xhr.responseText)
            }
        } else {
            onerror()
        }
    };
    xhr.onerror = onerror;
    xhr.send()
}


export function getSongInfo(songUrl) {
    let match = decodeURIComponent(songUrl).match(/#player?.+/gi)[0];
    let song = match.slice(match.indexOf('?') + 1).split('&');
    // 利用正则match将链接里无关部分去掉 ,然后再split
    //songUrl  => ["artist=JC", "songid=107283617", "songmid=0000IMz11ZP6GY", "songname=说散就散", "albummid=003Mq67P3OVLXo", "duration=232"];
    let options= {};
    for(let i =0;i< song.length;i++){
        let temp =  song[i].split('=');
        options[temp[0]] = temp[1];
        options = Object.assign(options);
    }
    return options;
    //  也可以这样写
    // let options = matches && matches.reduce((res,cur) => {
    //     let arr = cur.split('=');
    //     res[arr[0]] = arr[1];
    //     return res
    // },{});
}


/*
   this.songs = [{
artist: "房东的猫",
    songid: "204586755",
    songmid: "001yYM0I30CzdP",
    songname: "云烟成雨",
    albummid: "004NFJ230yX0Nz",
    duration: "240"
}];

*/
