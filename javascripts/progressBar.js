
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
        this.intervalId = setInterval(this.update.bind(this),100);
    },
    pause: function(){
        clearInterval(this.intervalId)
    },
    update: function(){
        this.elapsed += 0.1;
        if(this.elapsed >= this.duration) this.reset();
        this.now = this.elapsed / this.duration;
        this.$now.style.transform = `translateX(${-100 + this.now * 100}%)`;
        this.$elapsed.innerText = this.formateTime(this.elapsed);

    },
    reset: function (duration) {
        this.pause();
        this.elapsed = 0;
        this.now = 0;
        this.$now.style.transform = `translateX(-100%)`;
        if(duration){
            this.duration = +duration;
            this.$duration.innerText = this.formateTime(this.duration)
        }
    },
};