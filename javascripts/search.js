//   搜索结果
import {ajax} from "./helper.js";


export class Search {
    constructor(el) {
        this.$el = el;
        this.$input = this.$el.querySelector('.search-input');
        this.$input.addEventListener('keyup', this.onKeyUp.bind(this));
        this.keyword = '';
        this.songs = {};
        this.page = 1;
        // this.pageCount = 20;
        this.$songs = this.$el.querySelector('.results-wrapper>.results');
        this.nomore = false;
        this.loading = false;
        this.scroll = this.onScroll.bind(this);
        window.addEventListener('scroll', this.scroll);
        this.$cancelBtn = this.$el.querySelector('.cancel-btn');
        this.$delete = this.$el.querySelector('.delete-icon');
        this.$hot = this.$el.querySelector('.hot');
        this.$status = this.$el.querySelector('.search-status');

        this.$input.addEventListener('input', () => {
            this.$hot.style.display = 'none';
            this.$cancelBtn.style.display = 'block';
            this.$songs.style.display = 'block';
            if (this.$input.value) this.$delete.classList.add('active');
        });

        this.$el.addEventListener('click', this.handleEvent.bind(this));
    }

    launch() {
        ajax({  //  获取hotkey
            url: 'https://qq-music-api.now.sh/hotkey',
            onsuccess:  (ret) =>{
                this.renderHotkey(ret.data.hotkey);
                return this;
            }
        });
    }

    renderHotkey(key) {
        let html = key.slice(0, 11).map(hotkey =>
            `<a href="#" class="hotkey"> ${hotkey.k}</a>`
        ).join('');
        this.$el.querySelector('.hot>.hot-tags').insertAdjacentHTML('beforeend', html);
    }


    handleEvent(event) {

        let target = event.target;
        switch (true) {
            case target.matches('.delete-icon'):
                this.$input.value = '';
                this.$songs.innerHTML = '';
                this.$delete.classList.remove('active');
                break;

            case target.matches('.cancel-btn'):
                this.$input.value = '';
                this.$cancelBtn.style.display = 'none';
                this.$songs.innerText = '';
                this.$delete.classList.remove('active');
                this.$hot.style.display = 'block';
                break;
            case target.matches('.hotkey'):
                this.$input.value = target.innerText;
                this.search(this.$input.value);
                this.$hot.style.display = 'none';
        }
    }

    onKeyUp(event) {
        let keyword = event.target.value.trim();
        if (!keyword) this.reset();   // 当关键词为空时，reset

        if (event.keyCode !== 13) return;
        // 等同于  if (event.key !== 'Enter') return;
        this.search(keyword);  //  当enter 事件触发时，开始搜索

    }

    search(word, page) { // 搜索结果
        this.keyword = word;
        this.loading = true;
        let _this = this;

        ajax({
            url: `https://qq-music-api.now.sh/search?keyword=${this.keyword}&page=${this.page || page}`,
            onsuccess: function (ret) {
                _this.appendList(ret);

            },
            onerror: function () {
                alert('获取数据失败！')
            }
        })
    }

    appendList(ret) {
        this.songs = ret.data.song.list;
        let html = this.songs.map((song, i) => {
            let singers = song.singer.map(singer => singer.name).join(' / ');
            return `<li class="result-item">
                <a class="song" data-id="${i}" href="#player?artist=${singers}&songid=${
                song.songid}&songmid=${song.songmid}&songname=${song.songname}&albummid=${song.albummid}&duration=${song.interval}">
                   <i class="search_icon"></i>
                   <h3>${song.songname}</h3>
                   <p>${singers}</p>
                </a>
             </li>`
        }).join('');

        this.$songs.insertAdjacentHTML('beforeend', html); // 将搜索结果渲染到页面
        this.page = ret.data.song.curpage + 1;
        this.nomore = (ret.message === 'no results');
    }

    reset() {
        this.keyword = '';
        this.page = 1;
        this.songs = {};
        this.nomore = false;
        this.$songs.innerHTML = '';
        this.$delete.classList.remove('active');
    }


    onScroll() {
        if (this.loading) return; // 如果此时正在fetching 数据，就什么都不做
        if (this.nomore) window.removeEventListener('scroll', this.scroll);
        // 如果没有更多了移除监听事件

        if (document.documentElement.clientHeight + pageYOffset > document.body.scrollHeight - 100) {
            this.search(this.keyword, this.page + 1);  // 不用this.page++ 是因为万一数据获取失败了  还得减掉
        }
    }

}


