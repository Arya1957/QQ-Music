//   this.elapsed = Math.round(this.audio ? this.audio.currentTime : this.elapsed +1 );

class MusicPlayer {
    constructor(el) {
        this.$el = el;
        this.$el.addEventListener('click', this.handleEvent.bind(this));
        this.$audio = this.createAudio();
        this.progress = new ProgressBar(this.$el.querySelector('.progress'));
        // this.progress = new ProgressBar(this.el.querySelector('.progress'),true);
        this.lyrics = new LyricsPlayer(this.$el.querySelector('.lyrics-wrapper'), this.$audio);

    }

    createAudio() {
        let audio = document.createElement('audio');
        audio.id = `player-${Math.floor(Math.random()*100)}-${+new Date()}`;
        audio.addEventListener('ended',()=>{ // 播放结束后重新播放
            this.$audio.play();
            this.lyrics.restart();
            this.progress.restart()
        });
        document.body.appendChild(audio);
        return audio
    }


    handleEvent(event) {
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
    }



    onPlay(event) {
        this.$audio.play();
        this.lyrics.start();
        this.progress.start();
        event.target.classList.remove('play-btn');
        event.target.classList.add('pause-btn');
        // if (this.progress.elapsed >= this.progress.duration) this.onPause()
    }


    onPause(event) {
        this.$audio.pause();
        this.lyrics.pause();
        this.progress.pause();
        event.target.classList.remove('pause-btn');
        event.target.classList.add('play-btn');
    }


    play(options) {
        if (!options) return;
        let backgroundUrl = `https://y.gtimg.cn/music/photo_new/T002R300x300M000${options.albummid}.jpg?max_age=2592000`;
        let lyricsUrl = `https://qq-music-api.now.sh/lyrics?id=${options.songid}`;
        this.$el.querySelector('.background').style.backgroundImage = `url(${backgroundUrl})`;
        this.$el.querySelector('.play-songname').innerText = options.songname;
        this.$el.querySelector('.play-singer').innerText = options.artist;
        this.progress.reset(options.duration);

        this.$audio.src = `http://dl.stream.qqmusic.qq.com/C400${options.songmid}.m4a?guid=5767905817&vkey=643FBDDA855D15CE3413FB5CCC1918383772414B0CFCACF14A10B12598A35C62BD69B01FB478159D54DF75B23136A787ED6610CF0221B499&uin=0&fromtag=38`;
        if (options.songid) {
            let _this = this;
            ajax({
                url: lyricsUrl,
                onsuccess(ret) {
                    _this.lyrics.reset(ret.lyric)
                },
                onerror() {
                    _this.lyrics.reset('歌词获取失败啦~~~');
                }

            });
            this.show();
        }
    }


    show() {
        this.$el.style.transform = 'translateX(0)';
        document.body.style.overflow = 'hidden';
    }



    hide() {
        this.$el.style.transform = 'translateX(100%)';
        document.body.style.overflow = 'auto';

    }
}

//   vkey 的长度是 112  产生一个随机数
// http://dl.stream.qqmusic.qq.com/C4000034l4sI0OhoUj.m4a?guid=5767905817&vkey=643FBDDA855D15CE3413FB5CCC1918383772414B0CFCACF14A10B12598A35C62BD69B01FB478159D54DF75B23136A787ED6610CF0221B499&uin=0&fromtag=38

//  下面这个是QQ音乐的audio链接
// http://dl.stream.qqmusic.qq.com/C400001yYM0I30CzdP.m4a?guid=5767905817&vkey=84D4695EB409CE89552BA52FA68E85DF7A3B156164521ED0F3AE21B4A65101296D6D53EA1CEF2877E4CC880460957A9502279EB119DBF539&uin=0&fromtag=38