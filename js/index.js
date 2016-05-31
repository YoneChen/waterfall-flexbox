; (function (win, $) {
    var self = this;
    var imgMaxWidth, imgMaxHeight;
    var init = function () {
        self.imgMaxWidth = win.innerWidth - 80;
        self.imgMaxHeight = win.innerHeight - 80;
    };
    // 添加事件监听
    var handler = function () {
        //返回顶部按钮点击事件
        $(".iterm").on("click", function (e) {
			if (!isMove) {
				var $pic = $(this).children('img');
				var src = $pic.attr('src');
				var img = new Image();
				img.src = src;
				var width = img.width;
				var height = img.height;
				$('.diag>img').attr('width', '');
				$('.diag>img').attr('height', '');
				$('.diag>img').attr('src', src);
				if (width < self.imgMaxWidth && height < self.imgMaxHeight) {
					$('.diag>img').attr('width', width);
				} else if (self.imgMaxWidth < self.imgMaxHeight) {
					$('.diag>img').attr('width', self.imgMaxWidth);
				} else {
					$('.diag>img').attr('height', self.imgMaxHeight);
				}
				$('.mask-wrapper').removeClass('hide');
			}
        });
        var $Pic, picDom, startX, startY, moveX, moveY, isDown, isMove, $movePic, isValid,Ti;
        $(".iterm").on("mousedown", function (e) {
            $Pic = $(this);
            isDown = true;
            isMove = false;
            picDom = $Pic.get(0);
			startX = e.pageX;
			startY = e.pageY;
			$Pic.css('z-index', '1');
			
        });
        $(document).on("mousemove", function (e) {
            e.preventDefault();
			clearTimeout(Ti);
			moveX = e.pageX;
			moveY = e.pageY;
			var x = (moveX - startX) + 'px';
			var y = (moveY - startY) + 'px';
			// console.log('x:' + x + ',y:' + y);
			if (isDown) {
				isMove = true;
				$Pic.css({
					left: x,
					top: y
				});
			}
        });
        $(".iterm").on("mouseup", function (e) {
			isDown = false;
            if (isValid) {
				$Pic.remove();
				$Pic.css('z-index', '0');
				$Pic.parent('.box').eq(0).insertAfter();
            } else {
				$Pic.animate({
					left: 0,
					top: 0
				}, function () {
					$Pic.css('z-index', '0');
				});
            }
        });
        $(".close").on("click", function (e) {
            $('.mask-wrapper').addClass('hide');
        });
    };
    $(function () {
        init();
        handler();
    });
})(this, jQuery);
