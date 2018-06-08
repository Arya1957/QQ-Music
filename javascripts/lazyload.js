function lazyLoad(images) {
    let imgs = [].slice.call(images) || document.querySelectorAll('.lazyload');


    let onscroll = throttle(
        function scroll() {
            if (imgs.length === 0) return window.removeEventListener('scroll', onscroll); // 如果都加载完了，移除监听事件
            imgs = imgs.filter(img => img.classList.contains('lazyload'));
            imgs.forEach(img => {
                if (isVisible(img)) {
                    loadImg(img);
                }
            })
        }, 500);
    window.addEventListener('scroll', onscroll);
    window.dispatchEvent(new Event('scroll'));  //  派发一个 scroll 事件，防止在页面刚加载并且没有滚动时产生空白



    function throttle(func, wait) {  //  节流函数
        let prev, timer;  //  上一次调用的时间
        return function fn() {
            let curr = Date.now();
            let diff = curr - prev;
            if (!prev || diff >= wait) {  // 第一次调用或者离上一次调用时间间隔大于或等于延迟时间
                func();
                prev = curr;
            } else if (diff < wait) {
                clearTimeout(timer);
                timer = setTimeout(func, wait - diff)
            }
        }
    }

    function isVisible(img) {  // 判断元素是否在可视范围
        let {top, right, bottom, left} = img.getBoundingClientRect();
        let vpWidth = document.documentElement.clientWidth;
        let vpHeight = document.documentElement.clientHeight;
        if (((top > 0 && top < vpHeight) || (bottom > 0 && bottom < vpHeight )) && ((right > 0 && right < vpWidth) || (left > 0 && left < vpWidth))) {
            return true
        }
    }

    function loadImg(image) {     //  加载图片
        let img = new Image();
        img.src = image.dataset.src;
        img.onload = function () {
            image.src =  img.src;
            image.classList.remove('lazyload')  // 图片加载后就不再遍历
        }
    }
}


