$(function() {
    var small = $('.small'),
        movebox = $('.movebox'),
        big = $('.big'),
        bigpic = $('.bigpic'),
        scale = $('.scale');

    small.on('mouseover', function() {
        movebox.removeClass('hide').addClass('show');
        big.removeClass('hide').addClass('show');

        // 1. 比例计算 计算movebox大小 movebox:small = big:bigpic   movebox:big = small:bigpic
        movebox.css({
            'width': small.outerWidth() * big.outerWidth() / bigpic.outerWidth() + 'px',
            'height': small.outerHeight() * big.outerHeight() / bigpic.outerHeight() + 'px'
        });


        // 2. 鼠标跟随
        small.on('mousemove', function(ev) {
            ev = ev || event;

            // 移动的距离计算
            var left = ev.clientX - scale.offset().left - (movebox.outerWidth() / 2);
            var top = ev.clientY - scale.offset().top - (movebox.outerHeight() / 2);

            // 大图移动比例计算
            var ratio = bigpic.outerWidth() / small.outerWidth(); //比例必须大于1

            // 3. 管理边界
            if (left < 0) {
                left = 0;
            } else if (left > small.outerWidth() - movebox.outerWidth()) {
                left = small.outerWidth() - movebox.outerWidth() - 2;
            }

            if (top < 0) {
                top = 0;
            } else if (top > small.outerHeight() - movebox.outerHeight()) {
                top = small.outerHeight() - movebox.outerHeight() - 2;
            }

            // movebox跟随位置
            movebox.css({
                left: left + 'px',
                top: top + 'px'
            });

            // 大图移动位置
            bigpic.css({
                left: -left * ratio + 'px',
                top: -top * ratio + 'px'
            });
        });
    });

    small.on('mouseout', function() {
        movebox.removeClass('show').addClass('hide');
        big.removeClass('show').addClass('hide');
    });
});