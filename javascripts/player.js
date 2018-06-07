function MusicPlayer(el) {
    this.el = el;
    this.el.addEventListener('click', this.handleEvent.bind(this));
    this.createAudio();
    this.progress = new ProgressBar(this.el.querySelector('.progress'));
    this.lyrics = new LyricsPlayer(this.el.querySelector('.lyrics-wrapper'));

}

MusicPlayer.prototype = {
    createAudio: function () {
        this.audio = document.createElement('audio');
        document.body.appendChild(this.audio)
    },
    handleEvent: function (event) {
        let target = event.target;
        switch (true) {
            case target.matches('.play-btn'):
                this.onPlay(event);
                break;
            case target.matches('.pause-btn'):
                this.onPause(event);
                break;
            case target.matches('.back'):
                this.hide();
                break;
        }
    },
    onPlay: function (event) {
        this.audio.play();
        this.lyrics.start();
        this.progress.start();
        event.target.classList.remove('pause-btn');
        event.target.classList.add('play-btn');
    },
    onPause: function (event) {
        this.audio.pause();
        this.lyrics.pause();
        this.progress.pause();
        event.target.classList.remove('play-btn');
        event.target.classList.add('pause-btn');
    },
    play: function(options){

        if(!options) return ;
        let backgroundUrl = `https://y.gtimg.cn/music/photo_new/T002R300x300M000${options.albummid}.jpg?max_age=2592000`;
        let lyricsUrl = `https://qq-music-api.now.sh/lyrics?id=${options.songid}`;
        this.el.querySelector('.background').style.backgroundImage = `url(${backgroundUrl})`;
        this.el.querySelector('.play-songname').innerText = options.songname;
        this.el.querySelector('.play-singer').innerText = options.artist;
        this.progress.reset(options.duration);
        this.audio.src =  `http://dl.stream.qqmusic.qq.com/C400${options.songmid}.m4a?guid=5767905817&vkey=643FBDDA855D15CE3413FB5CCC1918383772414B0CFCACF14A10B12598A35C62BD69B01FB478159D54DF75B23136A787ED6610CF0221B499&uin=0&fromtag=38`;
        let _this = this;
        ajax({
            url: lyricsUrl,
            onsuccess: function(ret){
                _this.lyrics.reset(ret.lyric)
            },
            onerror: function(){
                _this.lyrics.reset('歌词获取失败啦~~~');
            }
        });
        this.show();
    },


    show: function () {
        this.el.style.transform = 'translateX(0)';
    },
    hide: function () {
        this.el.style.transform = 'translateX(100%)';
    }
};

/*  歌词部分 */
function LyricsPlayer(el) {
    this.el = el;
    this.el.innerHTML = `<div class="lyrics"></div>`;
    this.lines = this.el.querySelector('.lyrics');
    this.text = '';
    this.index = 0;
    this.lyrics = [];
    this.reset(this.text)
}

LyricsPlayer.prototype = {
    LINE_HEIGHT: 35,
    render: function(){
        let html = this.lyrics.map((line,index) =>`<p> ${line.slice(10)}</p>`).join('');
        this.lines.innerHTML = html;
    },
    formateText: function(text){
        let div = document.createElement('div');
        div.innerHTML = text;
        return div.innerText
    },
    start: function(){
        this.intervalId = setInterval(this.update.bind(this),1000)
    },
    pause: function(){
        clearInterval(this.intervalId)
    },
    update: function(){
        this.elapsed += 1;
        if(this.index === this.lyrics.length - 1) return this.reset();
        for(let i = this.index + 1;i< this.lyrics.length;i++){
            let seconds = this.getSeconds(this.lyrics[i]);
            if(this.elapsed === seconds && (!this.lyrics[i+1] || this.elapsed < this.getSeconds(this.lyrics[i+1]))){
                this.lines.children[this.index].classList.remove('active');
                this.lines.children[i].classList.add('active');
                this.index = i;
                break;
            }
        }
        if(this.index>2){
            let y = - (this.index - 2) * this.LINE_HEIGHT;
            this.lines.style.transform = `translateY(${y}px)`
        }
    },
    getSeconds: function(lyric){
        let seconds = lyric.replace(/\[(\d{2}):(\d{2}).+/,(match,p1,p2) => (+p1)*60 + (+p2));
        return +seconds
    },
    reset: function(text){
        this.pause();
        this.elapsed = 0;
        if(text){
            this.text = this.formateText(text) || '';
            this.lyrics = this.text.match(/^\[\d{2}:\d{2}.\d{2}\](.+)$/gm)  || [];
            if(this.lyrics.length){
                this.render();
                this.lines.children[this.index].classList.add('.active')
            }
        }
    },
    restart: function(){
        this.reset();
        this.start()
    }
};


/* 进度条 */
function ProgressBar(el,duration,start) {
    this.el = el;
    this.elapsed = 0;
    this.duration = duration || 0;
    this.now = 0;
    this.render();
    this.$elapsed = this.el.querySelector('.progress-elapsed');
    this.$duration = this.el.querySelector('.progress-duration');
    this.$now = this.el.querySelector('.now');
    this.$elapsed.innerText = this.formateTime(this.elapsed);
    this.$duration.innerText = this.formateTime(this.duration);

    if (start) this.start()

}

ProgressBar.prototype = {
    render: function () {
        this.el.innerHTML = `
           <div class="progress-elapsed"> </div>
                <div class="progress-bar">
                    <div class="now"></div>
                </div>
                <div class="progress-duration"> </div> `
    },

    formateTime: function (t) {
        let min = Math.floor(t / 60);
        let sec = Math.floor(t % 60);
        if (min < 10) min = '0' + min;
        if (sec < 10) sec = '0' + sec;
        return min + ':' + sec
    },
    start: function(){
        this.intervalId = setInterval(this.update.bind(this),50)
    },
    pause: function(){
        clearInterval(this.intervalId)
    },
    update: function(){
      this.elapsed += 0.05;
      if(this.elapsed >= this.duration) this.reset();
      this.progress = this.elapsed / this.duration;
      this.$now.style.transform = `translateX(${-100 + this.progress * 100} +'%')`;
      this.$elapsed.innerText = this.formateTime(this.elapsed);

    },
    reset: function (duration) {
        this.pause();
        this.elapsed = 0;
        this.now = 0;
        this.$now.style.transform = `translateX(-100%)`;
        if(duration){
            this.duration = duration;
            this.duration.innerText = this.formateTime(this.duration)
        }
    },
};