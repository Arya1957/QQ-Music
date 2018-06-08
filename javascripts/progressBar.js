/* 进度条 */
class ProgressBar {
    constructor(el, duration, start) {
        this.$el = el;
        this.elapsed = 0;
        this.duration = duration || 0;
        this.now = 0;
        this.render();
        this.$elapsed = this.$el.querySelector('.progress-elapsed');
        this.$duration = this.$el.querySelector('.progress-duration');
        this.$now = this.$el.querySelector('.now');
        this.$elapsed.innerText = this.formatTime(this.elapsed);
        this.$duration.innerText = this.formatTime(this.duration);
        if (start) this.start()
    }

    render() {
        this.$el.innerHTML = `
           <div class="progress-elapsed"> </div>
                <div class="progress-bar">
                    <div class="now"></div>
                </div>
                <div class="progress-duration"> </div> `
    }

    start() {
      //  this.pause();
        this.intervalId = setInterval(this.update.bind(this), 50);
    }


    pause() {
        clearInterval(this.intervalId)
    }


    update() {
        this.elapsed += 0.05;
        if (this.elapsed >= this.duration) this.reset();
        this.now = this.elapsed / this.duration;
        this.$now.style.transform = `translateX(${-100 + this.now * 100}%)`;
        this.$elapsed.innerText = this.formateTime(this.elapsed);

    }


    reset(duration) {
        this.pause();
        this.elapsed = 0;
        this.now = 0;
        this.$now.style.transform = `translateX(-100%)`;
        if (duration) {  //  换歌的时候重置 duration
            this.duration = +duration;
            this.$duration.innerText = this.formatTime(this.duration)
        }
    }

    formatTime(t) {
        let min = Math.floor(t / 60);
        let sec = Math.floor(t % 60);
        if (min < 10) min = '0' + min;
        if (sec < 10) sec = '0' + sec;
        return min + ':' + sec
    }

    restart(){
        this.reset();
        this.start();
    }


}
