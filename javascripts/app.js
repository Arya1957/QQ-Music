import "./tab.js";
import {Recommend} from "./recommend.js";
import {Ranking} from "./ranking.js";
import {Search} from "./search.js";
import {MusicPlayer} from "./player.js";
import {getSongInfo} from "./helper.js";


let recommend = new Recommend(document.querySelector('#recommend-panel')).lanuch();
let ranking = new Ranking(document.querySelector('#ranking-panel')).launch();
let search = new Search(document.querySelector('#search-panel')).launch();
let player;

let songs = document.querySelector('#search-panel .results');

songs.addEventListener('click', function (e) {
    let target = e.target;
    let songUrls = [];
    let songList = document.querySelectorAll('.results .song');
    while (target !== songs) {  // 递归调用
        if (target.tagName.toLowerCase() === 'li') {
            let index = Number(target.querySelector('.song').dataset.id);
            songUrls = [].map.call(songList, song => song.href);
            for (let i = 0; i < songUrls.length; i++) {
                songUrls[i] = getSongInfo(songUrls[i]);
            }
            this.songsUrls = songUrls;
           // console.log(songUrls);
            player = new MusicPlayer(document.querySelector('#player'), index, songUrls);  //  将歌曲信息传给musicPlayer
            player.reset(songUrls[index]);
            break;
        }
        target = target.parentNode;
    }
    //  console.log(target);
});

document.querySelector('.show-player').addEventListener('click', ()=>player.show());


/*
onHashChange();
window.addEventListener('hashchange',onHashChange);

function onHashChange(){
    let hash = location.hash;
    // #player?artist=房东的猫&songid=204586755&songmid=001yYM0I30CzdP&songname=云烟成雨&albummid=004NFJ230yX0Nz&duration=240
    if(/^#player\?.+/.test(hash)){
        let song = getSongInfo(hash);
        player.reset(song);
        // console.log(song);
    } else {
        player.hide()
    }
}

document.querySelector('.show-player').addEventListener('click', () => player.show());

*/





