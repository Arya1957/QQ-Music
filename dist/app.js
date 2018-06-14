!function(e){var t={};function n(i){if(t[i])return t[i].exports;var s=t[i]={i:i,l:!1,exports:{}};return e[i].call(s.exports,s,s.exports,n),s.l=!0,s.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)n.d(i,s,function(t){return e[t]}.bind(null,s));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=10)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.ajax=function(e){var t=e.url,n=e.dataType||"json",i=e.onsuccess||function(){},s=e.onerror||function(){},r=new XMLHttpRequest;r.open("GET",t,!0),r.onload=function(){r.status>=200&&r.status<300||304===r.status?i("json"===n?JSON.parse(r.responseText):r.responseText):s()},r.onerror=s,r.send()},t.getSongInfo=function(e){for(var t=decodeURIComponent(e).match(/#player?.+/gi)[0],n=t.slice(t.indexOf("?")+1).split("&"),i={},s=0;s<n.length;s++){var r=n[s].split("=");i[r[0]]=r[1],i=Object.assign(i)}return i}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.lazyLoad=function(e){var t=[].slice.call(e)||document.querySelectorAll(".lazyload"),n=(i=function(){if(0===t.length)return window.removeEventListener("scroll",n);(t=t.filter(function(e){return e.classList.contains("lazyload")})).forEach(function(e){(function(e){var t=e.getBoundingClientRect(),n=t.top,i=t.right,s=t.bottom,r=t.left,a=document.documentElement.clientWidth,l=document.documentElement.clientHeight;if((n>0&&n<l||s>0&&s<l)&&(i>0&&i<a||r>0&&r<a))return!0})(e)&&function(e){var t=new Image;t.src=e.dataset.src.replace("http://","https://"),t.onload=function(){e.src=t.src,e.classList.remove("lazyload")}}(e)})},s=500,r=void 0,a=void 0,function(){var e=Date.now(),t=e-r;!r||t>=s?(i(),r=e):t<s&&(clearTimeout(a),a=setTimeout(i,s-t))});var i,s,r,a;window.addEventListener("scroll",n),window.dispatchEvent(new Event("scroll"))}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}();t.ProgressBar=function(){function e(t,n,i){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.$el=t,this.elapsed=0,this.duration=n||0,this.now=0,this.render(),this.$elapsed=this.$el.querySelector(".progress-elapsed"),this.$duration=this.$el.querySelector(".progress-duration"),this.$now=this.$el.querySelector(".now"),this.$elapsed.innerText=this.formatTime(this.elapsed),this.$duration.innerText=this.formatTime(this.duration),i&&this.start()}return i(e,[{key:"render",value:function(){this.$el.innerHTML='\n           <div class="progress-elapsed"> </div>\n                <div class="progress-bar">\n                    <div class="now"></div>\n                </div>\n                <div class="progress-duration"> </div> '}},{key:"start",value:function(){this.intervalId=setInterval(this.update.bind(this),50)}},{key:"pause",value:function(){clearInterval(this.intervalId)}},{key:"update",value:function(){this.elapsed+=.05,this.elapsed>=this.duration&&(this.reset(),document.querySelector("#player .action").className="action play-btn"),this.now=this.elapsed/this.duration,this.$now.style.transform="translateX("+(100*this.now-100)+"%)",this.$elapsed.innerText=this.formatTime(this.elapsed)}},{key:"reset",value:function(e){this.pause(),this.elapsed=0,this.now=0,this.$now.style.transform="translateX(-100%)",e&&(this.duration=+e,this.$duration.innerText=this.formatTime(this.duration))}},{key:"formatTime",value:function(e){var t=Math.floor(e/60),n=Math.floor(e%60);return t<10&&(t="0"+t),n<10&&(n="0"+n),t+":"+n}},{key:"restart",value:function(){this.reset(),this.start()}}]),e}()},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}();(t.LyricsPlayer=function(){function e(t,n,i){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.$el=t,this.$audio=n,this.$el.innerHTML='<div class="lyrics"></div>',this.$lyricsCt=this.$el.querySelector(".lyrics"),this.text="",this.index=0,this.lyrics=[],this.reset(this.text)}return i(e,[{key:"render",value:function(){this.$lyricsCt.innerHTML=this.lyrics.map(function(e){return"<p>"+e.slice(10)+"</p>"}).join("")}},{key:"formatText",value:function(e){var t=document.createElement("div");return t.innerHTML=e,t.innerText}},{key:"start",value:function(){this.intervalId=setInterval(this.update.bind(this),1e3)}},{key:"pause",value:function(){clearInterval(this.intervalId)}},{key:"update",value:function(){if(this.elapsed=Math.round(this.$audio.currentTime?this.$audio.currentTime:this.elapsed+1),this.index!==this.lyrics.length-1){for(var e=this.index+1;e<this.lyrics.length;e++){var t=this.getSeconds(this.lyrics[e]);if(this.elapsed===t&&(!this.lyrics[e+1]||this.elapsed<this.getSeconds(this.lyrics[e+1]))){this.$lyricsCt.children[this.index].classList.remove("active"),this.$lyricsCt.children[e].classList.add("active"),this.index=e;break}}if(this.index>3){var n=-(this.index-3)*this.LINE_HEIGHT;this.$lyricsCt.style.transform="translateY("+n+"px)"}}}},{key:"getSeconds",value:function(e){return+e.replace(/^\[(\d{2}):(\d{2}).+/,function(e,t,n){return 60*+t+ +n})}},{key:"reset",value:function(e){this.pause(),this.index=0,this.elapsed=0,this.$lyricsCt.style.transform="translateY(0)";var t=this.$lyricsCt.querySelector(".active");t&&t.classList.remove("active"),e&&(this.text=this.formatText(e)||"",this.lyrics=this.text.match(/^\[\d{2}:\d{2}.\d{2}\](.+)$/gm)||[],this.lyrics.length&&(this.render(),this.$lyricsCt.children[this.index].classList.add(".active")))}},{key:"restart",value:function(){this.reset(),this.start()}}]),e}()).prototype.LINE_HEIGHT=40},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.MusicPlayer=void 0;var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),s=n(3),r=n(2),a=n(0);t.MusicPlayer=function(){function e(t,n,i){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.$el=t,this.$audio=this.createAudio(),this.$action=this.$el.querySelector(".action"),this.songsUrls=i,this.index=n,this.length=this.songsUrls.length,this.progress=new r.ProgressBar(this.$el.querySelector(".progress")),this.lyrics=new s.LyricsPlayer(this.$el.querySelector(".lyrics-wrapper"),this.$audio),this.$el.addEventListener("click",this.handleEvent.bind(this))}return i(e,[{key:"show",value:function(){this.$el.style.transform="translateX(0)",document.body.style.overflow="hidden"}},{key:"hide",value:function(){this.$el.style.transform="translateX(-100%)",document.body.style.overflow="auto"}},{key:"createAudio",value:function(){var e=this,t=document.createElement("audio");return t.id="player-"+Math.floor(100*Math.random())+"-"+ +new Date,t.addEventListener("ended",function(){document.querySelector("#player .action").className="action pause-btn",e.next(),e.lyrics.restart(),e.progress.restart()}),document.body.appendChild(t),t}},{key:"handleEvent",value:function(e){var t=e.target;switch(!0){case t.matches(".play-btn"):this.play();break;case t.matches(".pause-btn"):this.pause();break;case t.matches(".back"):this.hide();break;case t.matches(".prev-btn"):this.prev();break;case t.matches(".next-btn"):this.next()}}},{key:"reset",value:function(e){if(e){var t="https://y.gtimg.cn/music/photo_new/T002R300x300M000"+e.albummid+".jpg?max_age=2592000",n="https://qq-music-api.now.sh/lyrics?id="+e.songid;if(this.$el.querySelector(".background").style.backgroundImage="url("+t+")",this.$el.querySelector(".play-songname").innerText=e.songname,this.$el.querySelector(".play-singer").innerText=e.artist,this.progress.reset(e.duration),this.$action.className="action play-btn",this.$audio.src="https://dl.stream.qqmusic.qq.com/C400"+e.songmid+".m4a?guid=5767905817&vkey=DD153BFD61C666A664783AE6869165CF2D4FDF3016F852C21AB0A78838EC0B1BA2F685D3B3A207452DF999093A441DE13DD11CADFC56E3D9&uin=0&fromtag=38",e.songid){var i=this;(0,a.ajax)({url:n,onsuccess:function(e){i.lyrics.reset(e.lyric)}}),this.show(),document.querySelector(".show-player").style.display="block"}}}},{key:"next",value:function(){this.index===this.length-1?this.index=0:this.index+=1,this.pause(),this.reset(this.songsUrls[this.index]),this.play()}},{key:"prev",value:function(){0===this.index?this.index=this.length-1:this.index-=1,this.pause(),this.reset(this.songsUrls[this.index]),this.play()}},{key:"play",value:function(){this.$audio.play(),this.progress.start(),this.lyrics.start(),this.$action.className="action pause-btn"}},{key:"pause",value:function(){this.$audio.pause(),this.progress.pause(),this.lyrics.pause(),this.$action.className="action play-btn"}}]),e}()},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.Search=void 0;var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),s=n(0);t.Search=function(){function e(t){var n=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.$el=t,this.$input=this.$el.querySelector(".search-input"),this.$input.addEventListener("keyup",this.onKeyUp.bind(this)),this.keyword="",this.songs={},this.page=1,this.$songs=this.$el.querySelector(".results-wrapper>.results"),this.nomore=!1,this.loading=!1,this.scroll=this.onScroll.bind(this),window.addEventListener("scroll",this.scroll),this.$cancelBtn=this.$el.querySelector(".cancel-btn"),this.$delete=this.$el.querySelector(".delete-icon"),this.$hot=this.$el.querySelector(".hot"),this.$status=this.$el.querySelector(".search-status"),this.$input.addEventListener("input",function(){n.$hot.style.display="none",n.$cancelBtn.style.display="block",n.$songs.style.display="block",n.$input.value&&n.$delete.classList.add("active")}),this.$el.addEventListener("click",this.handleEvent.bind(this))}return i(e,[{key:"launch",value:function(){var e=this;(0,s.ajax)({url:"https://qq-music-api.now.sh/hotkey",onsuccess:function(t){return e.renderHotkey(t.data.hotkey),e}})}},{key:"renderHotkey",value:function(e){var t=e.slice(0,11).map(function(e){return'<a href="#" class="hotkey"> '+e.k+"</a>"}).join("");this.$el.querySelector(".hot>.hot-tags").insertAdjacentHTML("beforeend",t)}},{key:"handleEvent",value:function(e){var t=e.target;switch(!0){case t.matches(".delete-icon"):this.$input.value="",this.$songs.innerHTML="",this.$delete.classList.remove("active");break;case t.matches(".cancel-btn"):this.$input.value="",this.$cancelBtn.style.display="none",this.$songs.innerText="",this.$delete.classList.remove("active"),this.$hot.style.display="block";break;case t.matches(".hotkey"):this.$input.value=t.innerText,this.search(this.$input.value),this.$hot.style.display="none"}}},{key:"onKeyUp",value:function(e){var t=e.target.value.trim();t||this.reset(),13===e.keyCode&&this.search(t)}},{key:"search",value:function(e,t){this.keyword=e,this.loading=!0;var n=this;(0,s.ajax)({url:"https://qq-music-api.now.sh/search?keyword="+this.keyword+"&page="+(this.page||t),onsuccess:function(e){n.appendList(e)},onerror:function(){alert("获取数据失败！")}})}},{key:"appendList",value:function(e){this.songs=e.data.song.list;var t=this.songs.map(function(e,t){var n=e.singer.map(function(e){return e.name}).join(" / ");return'<li class="result-item">\n                <a class="song" data-id="'+t+'" href="#player?artist='+n+"&songid="+e.songid+"&songmid="+e.songmid+"&songname="+e.songname+"&albummid="+e.albummid+"&duration="+e.interval+'">\n                   <i class="search_icon"></i>\n                   <h3>'+e.songname+"</h3>\n                   <p>"+n+"</p>\n                </a>\n             </li>"}).join("");this.$songs.insertAdjacentHTML("beforeend",t),this.page=e.data.song.curpage+1,this.nomore="no results"===e.message}},{key:"reset",value:function(){this.keyword="",this.page=1,this.songs={},this.nomore=!1,this.$songs.innerHTML="",this.$delete.classList.remove("active")}},{key:"onScroll",value:function(){this.loading||(this.nomore&&window.removeEventListener("scroll",this.scroll),document.documentElement.clientHeight+pageYOffset>document.body.scrollHeight-100&&this.search(this.keyword,this.page+1))}}]),e}()},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.Ranking=void 0;var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),s=n(0),r=n(1);t.Ranking=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.$el=t}return i(e,[{key:"launch",value:function(){var e=this;(0,s.ajax)({url:"https://qq-music-api.now.sh/top",onsuccess:function(t){e.renderRanking(t.data.topList),(0,r.lazyLoad)(e.$el.querySelectorAll(".lazyload"))}})}},{key:"renderRanking",value:function(e){var t=this;this.$el.querySelector("#ranking-wrapper").innerHTML=e.map(function(e){return'<li class="ranking-item clearfix">\n            <a href="#" class=ranking-cover>\n             <img class="lazyload" src="./images/loading.png" data-src="'+e.picUrl+'" alt=""> \n             <span class="listeners">\n               <i class="listen"></i> '+(e.listenCount/1e4).toFixed(1)+'万\n             </span>\n           </a>\n           <div class="ranking-details">\n            <div class="ranking-list">\n             <h4 class="ranking intro-title "> '+e.topTitle+"</h4>\n              "+t.songlist(e.songList)+"\n            </div>\n           </div>\n         </li>"}).join("")}},{key:"songlist",value:function(e){return e.map(function(e,t){return"<p> "+(t+1)+' <span class="songname"> '+e.songname+" </span> - "+e.singername+"</p>"}).join("")}}]),e}()},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}();t.Slider=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.$el=t.el,this.interval=t.interval||3e3,this.index=0,this.slides=t.slides,this.length=this.slides.length,this.renderImg(),this.renderBullet(),this.start()}return i(e,[{key:"renderImg",value:function(){return this.$el.innerHTML='<ul class="slider-group"></ul><ul class="bullets"></ul>',this.$sliderCt=this.$el.firstElementChild,this.$sliderCt.style.width=100*this.length+"%",this.$sliderCt.innerHTML=this.slides.map(function(e){return'<li  class="slider-item">\n              <a href="'+e.link+'">\n                 <img src=" '+e.image.replace("http://","https://")+'" alt="">\n              </a>\n             </li>'}).join(""),this.$sliderCt&&this.$bulletCt}},{key:"renderBullet",value:function(){this.$bulletCt=this.$el.lastElementChild;for(var e="",t=0;t<this.length;t++)e+='<li class="bullet-item"  ></li>';this.$bulletCt.innerHTML=e,this.$bulletCt.children[0].className+=" active"}},{key:"setBullet",value:function(e){this.$bullets=this.$bulletCt.children;for(var t=0;t<this.length;t++)this.$bullets[t].classList.remove("active");this.$bullets[e].classList.add("active")}},{key:"next",value:function(){this.index+=1,this.index===this.length&&(this.index=0,this.$sliderCt.style.transform="translate(0)"),this.$sliderCt.style.transform="translateX(-"+100*this.index/this.length+"%)",this.setBullet(this.index)}},{key:"start",value:function(){var e=this;setInterval(function(){e.next()},this.interval)}}]),e}()},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.Recommend=void 0;var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),s=n(0),r=n(1),a=n(7);t.Recommend=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.$el=t}return i(e,[{key:"lanuch",value:function(){var e=this;(0,s.ajax)({url:"https://qq-music-api.now.sh",onsuccess:function(t){e.renderSlider(t.data.slider),e.renderRadios(t.data.radioList),e.renderSonglist(t.data.songList),(0,r.lazyLoad)(e.$el.querySelectorAll(".lazyload"))}})}},{key:"renderSlider",value:function(e){var t=e.map(function(e){return{link:e.linkUrl,image:e.picUrl}});new a.Slider({el:this.$el.querySelector(".slider"),slides:t})}},{key:"renderRadios",value:function(e){this.$el.querySelector("#radio-wrapper").innerHTML=e.map(function(e){return'<li class="radio-item ">\n        <a class=" radio " href="#">\n        <img class = "lazyload" src="./images/loading.png" data-src= "'+e.picUrl+'"\n    alt="">\n        <span class="play"></span>\n        </a>\n        <div class="list-intro">\n                <h4 class="radios intro-title">'+e.Ftitle+"</h4>\n        </div>\n        </li>"}).join("")}},{key:"renderSonglist",value:function(e){this.$el.querySelector("#songlist-wrapper").innerHTML=e.map(function(e){return'<li class="songlist-item">\n                    <a href="#" class="songlist">\n                    <img class = "lazyload" src="./images/loading.png" data-src="'+e.picUrl+'" alt="">\n                        <span class="listeners">\n                           <i class="listen"></i>'+(e.accessnum/1e4).toFixed(1)+'万 </span>\n                        <span class = play></span>\n                    </a>\n                    <div class="list-intro">\n                      <h4 class="songlist intro-title">'+e.songListDesc+'</h4>\n                      <p class = "songlist author">'+e.songListAuthor+"</p>\n                    </div>\n                </li>"}).join("")}}]),e}()},function(e,t,n){"use strict";document.addEventListener("click",function(e){var t=e.target;if("tab"===t.dataset.role){[].forEach.call(t.parentElement.children,function(e){e.classList.remove("active")}),t.classList.add("active");var n=document.querySelector(t.dataset.view);"search-panel"!==n.getAttribute("id")?document.body.classList.add("active"):document.body.classList.remove("active"),n&&([].forEach.call(n.parentElement.children,function(e){e.style.display="none"}),n.style.display="block",window.dispatchEvent(new Event("scroll")))}})},function(e,t,n){"use strict";n(9);var i=n(8),s=n(6),r=n(5),a=n(4),l=n(0),o=(new i.Recommend(document.querySelector("#recommend-panel")).lanuch(),new s.Ranking(document.querySelector("#ranking-panel")).launch(),new r.Search(document.querySelector("#search-panel")).launch(),void 0),c=document.querySelector("#search-panel .results");c.addEventListener("click",function(e){for(var t=e.target,n=[],i=document.querySelectorAll(".results .song");t!==c;){if("li"===t.tagName.toLowerCase()){var s=Number(t.querySelector(".song").dataset.id);n=[].map.call(i,function(e){return e.href});for(var r=0;r<n.length;r++)n[r]=(0,l.getSongInfo)(n[r]);this.songsUrls=n,(o=new a.MusicPlayer(document.querySelector("#player"),s,n)).reset(n[s]);break}t=t.parentNode}}),document.querySelector(".show-player").addEventListener("click",function(){return o.show()})}]);