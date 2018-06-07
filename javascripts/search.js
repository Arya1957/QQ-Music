//   搜索结果

function Search(el) {
    this.el = el;
    this.input = this.el.querySelector('.search-input');
    this.input.addEventListener('keyup', this.onKeyUp.bind(this));
    this.keyword = '';
    this.page = 1;
    //this.pageCount = 20;
    this.songs = this.el.querySelector('.results-wrapper>.results');
    this.nomore = false;
    this.loading = false;
    window.addEventListener('scroll', this.onScroll.bind(this));
    if (this.keyword) {
        this.el.querySelector('.delete-icon').style.display = 'block';
    }
    this.input.onfocus = function () {
        document.querySelector('#search-panel .hot').style.display = 'none'
    };
    this.input.onblur = function () {
        document.querySelector('#search-panel .hot').style.display = 'block';
    }
}


Search.prototype = {
    onKeyUp: function (event) {
        let keyword = event.target.value.trim();
        if (!keyword) return this.reset(); //  // 当关键词为空时，reset
        if (event.key !== 'Enter') return;
        this.search(keyword);  //  当enter 事件触发时，开始搜索
    },
    search: function (word, page) { // 搜索结果
        this.loading = true;
        this.keyword = word;
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

    },

    appendList: function (ret) {
        let songs = ret.data.song.list;
        let html = songs.map(song => {
            let singers = song.singer.map(singer => singer.name).join(' / ');
            return `<li class="result-item">
                <a class="song" href="#player?artist=${singers}&songid=${
                song.songid}&songmid=${song.songmid}&songname=${song.songname}&albummid=${song.albummid}&duration=${song.interval}">
                   <i class="search_icon"></i>
                   <h3>${song.songname}</h3>
                   <p>${singers}</p>
                </a>
             </li>`
        }).join('');
        this.songs.insertAdjacentHTML('beforeend', html); // 将搜索结果渲染到页面
        this.page = ret.data.song.curpage + 1;
        this.nomore = (ret.message === 'no results');
        this.loading = false;
},

    reset : function () {
    this.keyword = '';
    this.page = 1;
    this.songs.innerHTML = '';
}

,

onScroll: function () {
    if (this.loading) return; // 如果此时正在fetching 数据，就什么都不做
    if (this.nomore) return window.removeEventListener('scroll', onScroll); // 如果没有更多了移除监听事件
    if (document.documentElement.clientHeight + pageYOffset > document.body.scrollHeight - 100) {
        this.search(this.keyword, this.page + 1);  // 不用this.page++ 是因为万一数据获取失败了  还得减掉
    }
}
}
;


