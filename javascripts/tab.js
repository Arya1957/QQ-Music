document.addEventListener('click', function (e) {
    let target = e.target;
    if (target.dataset.role !== 'tab') return;
    [].forEach.call( target.parentElement.children , (child) =>{
        child.classList.remove('active')
    });
    target.classList.add('active');
    let content = document.querySelector(target.dataset.view);
    console.log(content);
    // content === document.getElementById('search-panel')
    if(content.getAttribute('id') !== 'search-panel'){
        document.body.classList.add('active');  // 如果当前页面不是搜索页面，将背景色改为灰色
    } else{
        document.body.classList.remove('active');
    }
    if (content) {
        [].forEach.call(content.parentElement.children, (child) => {
            child.style.display = 'none';
        });
        content.style.display = 'block';  //  切换界面
        window.dispatchEvent(new Event('scroll')) //  为了刚开始时懒加载图片

    }
});  // 给 tab item 添加自定义属性，并且将这个属性与panel  的类名对应起来

