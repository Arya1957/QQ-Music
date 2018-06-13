/*  获取排行榜数据  */
import {ajax} from "./helper.js";
import {lazyLoad} from "./lazyload.js";

export class Ranking {
    constructor(el){
        this.$el = el;
    }
    launch(){
        ajax({
            url: 'https://qq-music-api.now.sh/top',
            onsuccess:  (ret)=>{
                this.renderRanking(ret.data.topList);
                lazyLoad(this.$el.querySelectorAll('.lazyload'))
            }
        });
    }

    //  渲染排行榜

    renderRanking(lists) {
        this.$el.querySelector('#ranking-wrapper').innerHTML = lists.map(list => {
            return `<li class="ranking-item clearfix">
            <a href="#" class=ranking-cover>
             <img class="lazyload" src="./images/loading.png" data-src="${list.picUrl}" alt=""> 
             <span class="listeners">
               <i class="listen"></i> ${(list.listenCount / 10000).toFixed(1)}万
             </span>
           </a>
           <div class="ranking-details">
            <div class="ranking-list">
             <h4 class="ranking intro-title "> ${list.topTitle}</h4>
              ${this.songlist(list.songList)}
            </div>
           </div>
         </li>`
        }).join('');
    }

    songlist(songs) {
        return songs.map((item, i) => `<p> ${i + 1} <span class="songname"> ${item.songname} </span> - ${item.singername}</p>`
        ).join('')
    }

    /*  或者直接把下面这一段写到 renderRanking 里
        <p> 1 <span class="songname"> ${list['songList'][0].songname} </span> - ${list['songList'][0].singername}</p>
        <p> 2 <span class="songname"> ${list['songList'][1].songname} </span> - ${list['songList'][1].singername}</p>
       <p> 3 <span class="songname"> ${list['songList'][2].songname} </span> - ${list['songList'][2].singername}</p>

    */



}

