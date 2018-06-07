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
        event.target.classList.remove('play-btn');
        event.target.classList.add('pause-btn');
        if (this.progress.elapsed >= this.progress.duration) this.onPause()
    }
    ,
    onPause: function (event) {
        this.audio.pause();
        this.lyrics.pause();
        this.progress.pause();
        event.target.classList.remove('pause-btn');
        event.target.classList.add('play-btn');
    },
    play: function(options) {

        if (!options) return;
        this.audio.src = `http://dl.stream.qqmusic.qq.com/C400${options.songmid}.m4a?guid=5767905817&vkey=643FBDDA855D15CE3413FB5CCC1918383772414B0CFCACF14A10B12598A35C62BD69B01FB478159D54DF75B23136A787ED6610CF0221B499&uin=0&fromtag=38`;
        let backgroundUrl = `https://y.gtimg.cn/music/photo_new/T002R300x300M000${options.albummid}.jpg?max_age=2592000`;
        let lyricsUrl = `https://qq-music-api.now.sh/lyrics?id=${options.songid}`;
        this.el.querySelector('.background').style.backgroundImage = `url(${backgroundUrl})`;
        this.el.querySelector('.play-songname').innerText = options.songname;
        this.el.querySelector('.play-singer').innerText = options.artist;
        this.progress.reset(options.duration);

        if (options.songid) {
            let _this = this;
            ajax({
                url: lyricsUrl,
                onsuccess: function (ret) {
                    _this.lyrics.reset(ret.lyric)
                },
                onerror: function () {
                    _this.lyrics.reset('歌词获取失败啦~~~');
                }

            });
            this.show();
        }
    },

    show: function () {
        this.el.style.transform = 'translateX(0)';
        document.body.style.overflow = 'hidden';
    },
    hide: function () {
        this.el.style.transform = 'translateX(100%)';
        document.body.style.overflow = 'auto';

    }
};

