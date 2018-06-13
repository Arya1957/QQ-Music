/*  获取推荐页数据 */
import {ajax} from "./helper.js"
import {lazyLoad} from "./lazyload.js";
import {Slider} from "./slider.js";


export class Recommend {
    constructor(el) {
        this.$el = el;
    }

    lanuch() {
        ajax({
            url: 'https://qq-music-api.now.sh',
            onsuccess:  (ret) => {
                this.renderSlider(ret.data.slider);
                this.renderRadios(ret.data.radioList);
                this.renderSonglist(ret.data.songList);

                lazyLoad(this.$el.querySelectorAll('.lazyload')) //懒加载
            }
        });
    }


    renderSlider(slide) {
        let slides = slide.map(slide => {
            return {link: slide.linkUrl, image: slide.picUrl}
        });
        new Slider({
            el: this.$el.querySelector('.slider'),
            slides
        })
    }

//  渲染电台部分


    renderRadios(radios) {
        this.$el.querySelector('#radio-wrapper').innerHTML = radios.map(radio => `<li class="radio-item ">
        <a class=" radio " href="#">
        <img class = "lazyload" src="./images/loading.png" data-src= "${radio.picUrl}"
    alt="">
        <span class="play"></span>
        </a>
        <div class="list-intro">
                <h4 class="radios intro-title">${radio.Ftitle}</h4>
        </div>
        </li>`).join('')
    }

//  渲染热门歌单部分

    renderSonglist(list) {
        this.$el.querySelector('#songlist-wrapper').innerHTML = list.map(list =>
            `<li class="songlist-item">
                    <a href="#" class="songlist">
                    <img class = "lazyload" src="./images/loading.png" data-src="${list.picUrl}" alt="">
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

}

