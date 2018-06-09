# 原生JS实现QQ音乐

###  在线预览
[在线预览]()

### 项目截图

### 主要技术


### 实现功能

- 移动 web 端模仿 QQ 音乐，采用原生 JS 实现推荐页、排行榜页和搜索页
- 采用模块化的思想实现: Tab组件、推荐页rec组件、排行榜rank组件、搜索search组件、播放器player组件、歌词lyric组件和进度条progress bar 组件
- 图片懒加载


###  项目总结
###### 代码规范方面
1. 构造函数中， DOM 元素都加上 $ 符号，与其他区分开

###### 技术要点

 1. 派发一个 scroll 事件，防止在页面刚加载并且没有滚动时产生空白

  ` window.dispatchEvent(new Event('scroll')) `

 2. 懒加载函数和节流函数








音频的问题：
原本通过拼接url 可以到获取 QQ 音乐的音频，没想到过了几天链接又失效了
音频的链接是这样：

`http://dl.stream.qqmusic.qq.com/C400001yYM0I30CzdP.m4a?guid=5767905817&vkey=84D4695EB409CE89552BA52FA68E85DF7A3B156164521ED0F3AE21B4A65101296D6D53EA1CEF2877E4CC880460957A9502279EB119DBF539&uin=0&fromtag=38`

最关键的是 C400 后面的那一串字符（介于C400和.m4a之间）和后面的vkey ，那串字符串songmid，可以在获取歌曲信息的时候一起抓取，vkey是随机的

我拼接的 音频链接如下：
   this.$audio.src = `http://dl.stream.qqmusic.qq.com/C400${options.songmid}.m4a?guid=5767905817&vkey=643FBDDA855D15CE3413FB5CCC1918383772414B0CFCACF14A10B12598A35C62BD69B01FB478159D54DF75B23136A787ED6610CF0221B499&uin=0&fromtag=38`

由于不稳定，加上GitHub 也不支持 http ,就暂时放弃了寻找音频链接












