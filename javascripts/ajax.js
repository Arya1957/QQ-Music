function ajax(options) {
    let url = options.url;
    let type = 'GET';
    let dataType = options.dataType || 'json';
    let onsuccess = options.onsuccess || function () { };
    let onerror = options.onerror || function () { };

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



