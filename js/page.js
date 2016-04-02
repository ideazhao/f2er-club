$(function () {
    var $li = $('aside ul li');
    var $area = $('article.mainarea.item');
    var $win = $(window).height();

    // 渲染页面
    var renderUi = function () {
        var index = getCurrentIndex();

        $li.eq(index).addClass('cur').siblings().removeClass('cur');
        $area.eq(index).show().siblings('article').hide();

        window.scrollTo(0, 0);
    };

    // 获取当前需要显示的搜索
    var getCurrentIndex = function () {
        var hash = window.location.hash.substr(1);
        var $elem;

        if (hash) {
            $elem = $li.find('a[href="#' + hash + '"]');
        }

        // 如果没有hash或者hash错误则默认为第0个
        return $elem && $elem.length ? $elem.parent().index() : 0;
    };

    // 绑定hash改变时触发渲染
    $(window).on('hashchange', renderUi);

    // 默认根据hash渲染
    renderUi();

    /*页面向下滚动侧边栏和主内容进行相应行为*/
    $(window).scroll(function () {
        var $Height = $(window).scrollTop();

        if ($Height > 105) {
            $('.sidebar_list').addClass('over');
        }
        else {
            $('.sidebar_list').removeClass('over');
        }
    });
    $('.col-main .mainarea').css('min-height', $win - 269 + 'px');
});
