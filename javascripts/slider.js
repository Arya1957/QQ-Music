function Slider(options) {
    this.el = options.el;
    this.interval = options.interval || 3000;
    this.index = 0;
    this.slides = options.slides;
    this.length = this.slides.length;
    this.renderImg();
    this.renderBullet();
    this.start();

}

Slider.prototype = {
    renderImg: function () {
        this.el.innerHTML = '<ul class="slider-group"></ul><ul class="bullets"></ul>';
        this.sliderCt = this.el.firstElementChild;
        this.sliderCt.style.width = this.length * 100 + '%';
        this.sliderCt.innerHTML = this.slides.map(slide =>
            '<li  class="slider-item"><a href="' + slide.link + '"><img src=" ' + slide.image + ' " alt=""></a></li>'
        ).join('');

    },
    renderBullet: function () {
        this.bulletCt = this.el.lastElementChild;
        let str = '';
        for (let i = 0; i < this.length; i++) {
            str += '<li class="bullet-item"  ></li>';
        }
        this.bulletCt.innerHTML = str;
        this.bulletCt.children[0].className += ' active';   // 先给第一个 bullet  item  加上 active 类  ，防止未调用 start时时，样式不对
       // this.bulletCt.firstElementChild.className += ' active';   //同上，只是换种写法
    },
    setBullet: function (index) {
        bullets = this.bulletCt.children;
        for (let i = 0; i < this.length; i++) {
            bullets[i].classList.remove('active');
        }
        bullets[index].classList.add('active');
    },

    next: function () {
        this.index++;
        if (this.index === this.length) {
            this.index = 0;
        }
        let x = '-' + (this.index * 100 / this.length + '%');
        this.sliderCt.style.transform = 'translateX(' + x + ')';
        this.setBullet(this.index);
    },

    start: function () {
        setInterval(() => {
            this.next()
        }, this.interval)
    }
};


