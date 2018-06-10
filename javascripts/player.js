//   this.elapsed = Math.round(this.audio ? this.audio.currentTime : this.elapsed +1 );

class MusicPlayer {
    constructor(el,index,songsUrls) {
        this.$el = el;
        this.$el.addEventListener('click', this.handleEvent.bind(this));
        this.$audio = this.createAudio();
        this.progress = new ProgressBar(this.$el.querySelector('.progress'));
        // this.progress = new ProgressBar(this.el.querySelector('.progress'),true);
        this.lyrics = new LyricsPlayer(this.$el.querySelector('.lyrics-wrapper')); // this.$audio 暂时没传
        this.$songs = document.querySelector('.results');

        this.songsUrls = songsUrls;
        this.length =  this.songsUrls.length;
        this.index = (+index);  //  传进来的index 是字符串，将其转为数字
        this.$action = this.$el.querySelector('.action');
    }


    show() {
        this.$el.style.transform = 'translateX(0)';
        document.body.style.overflow = 'hidden';
    }


    hide() {
        this.$el.style.transform = 'translateX(-100%)';
        document.body.style.overflow = 'auto';

    }

    createAudio() {
        let audio = document.createElement('audio');
        audio.id = `player-${Math.floor(Math.random() * 100)}-${+new Date()}`;
        audio.addEventListener('ended', () => { // 播放结束后重新播放
            document.querySelector('#player .action').className = 'action pause-btn';
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
                this.play();
                break;
            case target.matches('.pause-btn'):
                this.pause();
                break;
            case target.matches('.back'):
                this.hide();
                break;
            case target.matches('.prev-btn'):
                this.prev();
                break;
            case target.matches('.next-btn'):
                this.next();
                break;
        }
    }


    reset(song) {
        if (!song) return;
        let backgroundUrl = `https://y.gtimg.cn/music/photo_new/T002R300x300M000${song.albummid}.jpg?max_age=2592000`;
        let lyricsUrl = `https://qq-music-api.now.sh/lyrics?id=${song.songid}`;
        this.$el.querySelector('.background').style.backgroundImage = `url(${backgroundUrl})`;
        this.$el.querySelector('.play-songname').innerText = song.songname;
        this.$el.querySelector('.play-singer').innerText = song.artist;
        this.progress.reset(song.duration);
        this.$action.className = 'action play-btn';


        // 不稳定
        //     this.$audio.src = `https://dl.stream.qqmusic.qq.com/C400${song.songmid}.m4a?guid=5767905817&vkey=8B710A8B1942B84E1ACFE5D68C2A66083D1FCA1ECF0F0C89142F1092CDD668307992070E3A83C77D5B1314014635CEF856525EA4D018553F&uin=0&fromtag=38 `;

        if (song.songid) {
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

    next(){
        if(this.index === (this.length - 1)) {
            this.index = 0;
        } else {
            this.index += 1 ;
        }

        this.pause();
        this.reset(this.songsUrls[this.index]);
        this.play()

    }

    prev(){
        if(this.index === 0) {
            this.index = this.length -1;
        } else {
            this.index -= 1 ;
        }
        this.pause();
        this.reset(this.songsUrls[this.index]);
        this.play()


    }


    play() {
        console.log(typeof (this.index));
        console.log(this.index);


        this.$audio.play();
        this.progress.start();
        this.lyrics.start();
        this.$action.className = 'action pause-btn';
        // 也可以用  event.target，但是这里为了其他地方也能调用这个函数，就没有用这个
        // event.target.classList.remove('play-btn');
        //  event.target.classList.add('pause-btn');

    }

    pause() {
        this.$audio.pause();
        this.progress.pause();
        this.lyrics.pause();
        this.$action.className = 'action play-btn';
        //  event.target.classList.remove('pause-btn');
        //  event.target.classList.add('play-btn');
    }

}

//   vkey 的长度是 112  随机数
// http://dl.stream.qqmusic.qq.com/C4000034l4sI0OhoUj.m4a?guid=5767905817&vkey=643FBDDA855D15CE3413FB5CCC1918383772414B0CFCACF14A10B12598A35C62BD69B01FB478159D54DF75B23136A787ED6610CF0221B499&uin=0&fromtag=38

//  下面这个是QQ音乐的audio链接
// http://dl.stream.qqmusic.qq.com/C400001yYM0I30CzdP.m4a?guid=5767905817&vkey=84D4695EB409CE89552BA52FA68E85DF7A3B156164521ED0F3AE21B4A65101296D6D53EA1CEF2877E4CC880460957A9502279EB119DBF539&uin=0&fromtag=38