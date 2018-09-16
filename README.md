# 原生JS实现QQ音乐
###  在线预览
[**在线预览**](https://arya1957.github.io/QQ-Music/index.html)

###  项目截图

<div align=center>
	<img src="http://pf39hp3g2.bkt.clouddn.com/qq-music1.jpg" width="25%">
        <img src="http://pf39hp3g2.bkt.clouddn.com/qq-music2.jpg" width="25%">
        <img src="http://pf39hp3g2.bkt.clouddn.com/qq-music3.jpg" width="25%">	
</div>

### 实现功能
- 采用原生 JS 实现 QQ 音乐推荐页、排行榜页和搜索页
- 搜索页，实现了搜索关键词、清空关键词、取消搜索等功能
- 播放器页面可以进行播放、暂停、上一首、下一首以及歌词同步滚动高亮显示等功能
- 采用模块化的思想实现: 轮播组件、Tab组件、搜索search组件、播放器player组件、歌词lyric组件和进度条progress bar 组件

###  总结
##### 1. 图片
######  懒加载，滚动优化节流 （throttle 函数）
- 将图片链接都设置为同一个链接，将图片真实链接存储在data-src属性里
- 判断元素是否在可视范围
监听scroll 事件，通过 `Element.getBoundingClientRect()方法`获取元素相对于视口的位置，从而判断元素是否出现在视口内
```
function isVisible(img) {  // 判断元素是否在可视范围
    let {top, right, bottom, left} = img.getBoundingClientRect();
    let vpWidth = document.documentElement.clientWidth;
    let vpHeight = document.documentElement.clientHeight;
    if (((top > 0 && top < vpHeight) || (bottom > 0 && bottom < vpHeight )) && ((right > 0 && right < vpWidth) || (left > 0 && left < vpWidth))) {
        return true
    }
}
```
- 当img 元素出现在视口时，加载图片
```
function loadImg(image) {     //  加载图片
    let img = new Image();
    img.src = image.dataset.src.replace('http://', 'https://');
    img.onload = function () {
        image.src =  img.src;
        image.classList.remove('lazyload')  // 图片加载后就不再遍历
    }
}
```
- 节流函数
由于滚动页面时，scroll 事件会被非常频繁的触发，比较消耗性能，所以我们需要小小的限制一下
```
//  节流函数
function throttle(func, wait) {   
    let prev, timerId;  //  上一次调用的时间和计时器id
    return function fn() {
        let curr = Date.now(); 
        let diff = curr - prev;
        if (!prev || diff >= wait) {  // 如果第一次调用或者离上一次调用时间间隔大于或等于延迟时间，直接调用函数
            func();
            prev = curr;
        } else if (diff < wait) { //  相反，如果间隔时间小于我们设置的延迟时间，过（wait - diff）毫秒后再调用函数
            clearTimeout(timerId);
            timerId = setTimeout(func, wait - diff)
        }
    }
}
```
- 移除监听事件
```
 if (imgs.length === 0) return window.removeEventListener('scroll', onscroll); // 如果都加载完了，移除监听事件
```
######  dispatchEvent
由于图片都是懒加载，所以在一开始先派发一个 scroll 事件，防止在页面刚加载并且没有滚动时产生空白：
  ` window.dispatchEvent(new Event('scroll')) `
###### 将图片的链接由 http 协议换成https ：
   ` picUrl.replace('http://','https://') `


##### 2. 音频的问题：
通过拼接url 可以到获取 QQ 音乐的音频，但是不是很稳定。
QQ音乐的音频的链接是这样：

`http://dl.stream.qqmusic.qq.com/C400001yYM0I30CzdP.m4a?guid=5767905817&vkey=84D4695EB409CE89552BA52FA68E85DF7A3B156164521ED0F3AE21B4A65101296D6D53EA1CEF2877E4CC880460957A9502279EB119DBF539&uin=0&fromtag=38`

最关键的是 C400 后面的那一串字符（介于C400和.m4a之间）和后面的vkey ，那串字符串songmid，可以在获取歌曲信息的时候一起抓取，vkey是随机的

  拼接的音频链接如下（同样，把http 改成了https）：
   this.$audio.src = `https://dl.stream.qqmusic.qq.com/C400${options.songmid}.m4a?guid=5767905817&vkey=8B710A8B1942B84E1ACFE5D68C2A66083D1FCA1ECF0F0C89142F1092CDD668307992070E3A83C77D5B1314014635CEF856525EA4D018553F&uin=0&fromtag=38 `


#####  3. 编译、打包
######  CSS
- 将scss编译并压缩：
`sass --style compressed scss/app.scss dist/app.css`
- 使用Autoprefixer给css 加浏览器前缀
`npm install --global autoprefixer-cli `
`autoprefixer-cli -o dist/app.css dist/app.css`

###### JS
使用 Babel 将代码转成 ES5 以兼容其他浏览器 ，对JS 文件进行压缩打包
引入打包后的脚本
```
<script type="module" src="javascripts/app.js"></script>  <!-- 已支持 ES6 模块的浏览器 -->
<script nomodule src="dist/app.js"></script>              <!-- 不支持 ES6 模块的浏览器 -->
```
###### 简化操作
为了方便后续更改操作，将上述命令都写在了package.json 里

```
 "scripts": {
   "dist": "sass --style compressed scss/app.scss dist/app.css && autoprefixer-cli -o dist/app.css dist/app.css && node_modules/.bin/webpack -p"
  }
```
这样每次更改后只需要重新运行命令 `npm run dist`就可以了。









