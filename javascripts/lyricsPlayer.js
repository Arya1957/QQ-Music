/*  歌词部分 */
export class LyricsPlayer {
    constructor(el, audio,duration) {
        this.$el = el;
        this.$audio = audio;
        this.$el.innerHTML = `<div class="lyrics"></div>`;
        this.$lyricsCt = this.$el.querySelector('.lyrics');
        this.text = '';
        this.index = 0;
        this.lyrics = [];
        this.reset(this.text);
    }


    render() {
        this.$lyricsCt.innerHTML = this.lyrics.map(line =>
            `<p>${line.slice(10)}</p>`
        ).join('');
    }

    formatText(text) {
        let div = document.createElement('div');
        div.innerHTML = text;
        return div.innerText
    }

    start() {
        this.intervalId = setInterval(this.update.bind(this), 1000)
    }

    pause() {
        clearInterval(this.intervalId)
    }

    update() {
        this.elapsed = Math.round(this.$audio.currentTime ? this.$audio.currentTime : this.elapsed + 1);

        if (this.index === this.lyrics.length - 1) return;
        for (let i = this.index + 1; i < this.lyrics.length; i++) {
            let seconds = this.getSeconds(this.lyrics[i]);
            if (this.elapsed === seconds && (!this.lyrics[i + 1] || this.elapsed < this.getSeconds(this.lyrics[i + 1]))) {
                this.$lyricsCt.children[this.index].classList.remove('active');
                this.$lyricsCt.children[i].classList.add('active');
                this.index = i;

                break;
            }
        }
        if (this.index > 3) {
            let y = -(this.index - 3) * this.LINE_HEIGHT;
            this.$lyricsCt.style.transform = `translateY(${y}px)`
        }
    }

    getSeconds(lyric) {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace
        let seconds = lyric.replace(/^\[(\d{2}):(\d{2}).+/, (match, p1, p2) => (+p1) * 60 + (+p2));
        return +seconds
    }

    reset(text) {
        this.pause();
        this.index = 0;
        this.elapsed = 0;

        this.$lyricsCt.style.transform = `translateY(0)`;
        let $active = this.$lyricsCt.querySelector('.active');
        if($active){
            $active.classList.remove('active');
        }

        if (text) {
            this.text = this.formatText(text) || '';
            this.lyrics = this.text.match(/^\[\d{2}:\d{2}.\d{2}\](.+)$/gm) || [];
            if (this.lyrics.length) {
                this.render();
                this.$lyricsCt.children[this.index].classList.add('.active')
            }
        }
    }

    restart() {
        this.reset();
        this.start()
    }
}

LyricsPlayer.prototype.LINE_HEIGHT =  40;
