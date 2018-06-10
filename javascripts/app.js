/*  获取推荐页数据 */

ajax({
    url: 'https://qq-music-api.now.sh',
    onsuccess: function (ret) {
        renderSlider(ret.data.slider);
        renderRadios(ret.data.radioList);
        renderSonglist(ret.data.songList);
        lazyLoad(document.querySelectorAll('.lazyload')) //懒加载
    },
    onerror: function () {
        alert('获取数据失败！')
    }

});


function renderSlider(slide) {
    let slides = slide.map(slide => {
        return {link: slide.linkUrl, image: slide.picUrl}
    });
    new Slider({
        el: document.querySelector('.slider'),
        slides
    })
}

//  渲染电台部分
function renderRadios(radios) {
    document.querySelector('#radio-wrapper').innerHTML = radios.map(radio =>
        `<li class="radio-item ">
        <a class=" radio " href="#">
        <img class = "lazyload" data-src= "${radio.picUrl.replace('http://', 'https://')}"
    alt="">
        <span class="play"></span>
        </a>
        <div class="list-intro">
                <h4 class="radios intro-title">${radio.Ftitle}</h4>
        </div>
        </li>`).join('')
}

//  渲染热门歌单部分
function renderSonglist(list) {
    document.querySelector('#songlist-wrapper').innerHTML = list.map(list =>
        `<li class="songlist-item">
                    <a href="#" class="songlist">
                    <img class = "lazyload" data-src="${list.picUrl.replace('http://', 'https://')}" alt="">
                        <span class="listeners">
                           <i class="listen"></i>${(list.accessnum / 10000).toFixed(1)}万 </span>
                        <span class = play></span>
                    </a>
                    <div class="list-intro">
                      <h4 class="songlist intro-title">${list.songListDesc}</h4>
                      <p class = "songlist author">${list.songListAuthor}</p>
                    </div>
                </li>`).join('')
}


/*  搜索 页面*/

let search = new Search(document.querySelector('#search-panel'));

ajax({  //  获取hotkey
    url: 'https://qq-music-api.now.sh/hotkey',
    onsuccess: function (ret) {
        let html = ret.data.hotkey.slice(0, 11).map(hotkey =>
            `<a href="#" class="hotkey"> ${hotkey.k}</a>`
        ).join('');

        document.querySelector('#search-panel .hot>.hot-tags').insertAdjacentHTML('beforeend', html);
    }
});
let hotTags = document.querySelector('#search-panel .hot>.hot-tags');
hotTags.addEventListener('click', function (e) {
    let target = e.target;
    if (target.tagName.toLocaleLowerCase() === 'a') {
        let text = target.innerText;
        search.search(text);
    }
});


function getSongs() {
    let songList = document.querySelectorAll('.results .song'); // 把a 都找出来
    let songUrls = [];
    for (let i = 0; i < songList.length; i++) {
        songUrls.push(decodeURIComponent(songList[i].href).match(/#player?.+/gi)[0]);  //  利用正则将链接里无关部分去掉，方便后面处理
    }

    for (let i = 0, len = songUrls.length; i < len; i++) {
        songUrls[i] = songUrls[i].slice(songUrls[i].indexOf('?') + 1).split('&');
        let songUrl = songUrls[i];
        //songUrls[i] => ["artist=JC", "songid=107283617", "songmid=0000IMz11ZP6GY", "songname=说散就散", "albummid=003Mq67P3OVLXo", "duration=232"];
        let song = {};
        for (let i = 0; i < songUrl.length; i++) {
            let temp = songUrl[i].split('=');
            song[temp[0]] = temp[1];
            song = Object.assign(song)
            //{artist: "任然", songid: "212676452", songmid: "001OFCtb1K2hBU", songname: "空空如也", albummid: "001cZsHj3fzHH5", …}
        }
        songUrls[i] = song
    }
    return songUrls
}


/*播放器*/

document.querySelector('.show-player').addEventListener('click', () => player.show());
let player;
let songs = document.querySelector('#search-panel .results');
songs.addEventListener('click', function (e) {
    let target = e.target;
    let songUrls = getSongs();// 当页面出现搜索结果后，获取歌曲链接
    while (target !== songs) {  // 递归调用
        if (target.tagName.toLowerCase() === 'li') {
            let index = target.querySelector('.song').dataset.id;
            // console.log(songUrls[index]);
            // console.log(index);
            player = new MusicPlayer(document.querySelector('#player'), index, songUrls);  //  将歌曲信息传给musicPlayer
            player.reset(songUrls[index]);
            break;
        }
        target = target.parentNode;
    }
    //  console.log(target);


});


//  下面是（只传入一个song的是否 ）通过监听 HashChange 事件来判断是否要播放的写法
/*
function onHashChange(){
    let hash = decodeURIComponent(location.hash);
    // #player?artist=房东的猫&songid=204586755&songmid=001yYM0I30CzdP&songname=云烟成雨&albummid=004NFJ230yX0Nz&duration=240
    if(/^#player\?.+/.test(hash)){
        let matches = hash.slice(hash.indexOf('?')+1).split('&');
//["artist=房东的猫", "songid=204586755", "songmid=001yYM0I30CzdP", "songname=云烟成雨", "albummid=004NFJ230yX0Nz", "duration=240"]
        let options= {};
        for(let i =0;i< matches.length;i++){
           let temp =  matches[i].split('=');
            options[temp[0]] = temp[1];
            options = Object.assign(options);
        }
        //  也可以这样写
        // let options = matches && matches.reduce((res,cur) => {
        //     let arr = cur.split('=');
        //      console.log(arr);
        //      console.log(res);
        //     res[arr[0]] = arr[1];
        //     return res
        // },{});
        player.play(options);
        console.log(options);
        // {artist: "房东的猫", songid: "204586755", songmid: "001yYM0I30CzdP", songname: "云烟成雨", albummid: "004NFJ230yX0Nz", …}
    } else {
        player.hide()
    }
}

onHashChange();
window.addEventListener('hashchange',onHashChange);
*/




