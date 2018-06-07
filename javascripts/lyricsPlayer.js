
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
