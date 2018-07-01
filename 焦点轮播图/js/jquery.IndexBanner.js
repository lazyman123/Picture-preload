;(function ($) {
  $.fn.jquerySlider = function(options) {
    var defaults = {
      auto: false, //是否自动播放
      slider: '#list', //图片列表
      dotli: '#button span', //小圆点
      prev: '#prev', //上一个
      next: '#next', //下一个
      times: 300, //动画完成速度
      actions: "click"
    };

    //可以被扩展的默认设置（通过使用$.extend）
    var options = $.extend({}, defaults, options);

    this.each(function () {
      var _this = $(this),
          index = 1,
          slider = $(options.slider, _this),
          dotli = $(options.dotli, _this),
          next = $(options.next, _this),
          prev = $(options.prev, _this),
          interval = null; // 定时器
          
      function animate(offset) {
        var left = parseInt(slider.css('left')) + offset + 'px';
        slider.animate({
          left: left
        }, options.times);
      }

      prev.on('click', function (event) {
        event.preventDefault();
        if (slider.is('animated')) {
          return
        }

        if (parseInt(slider.css('left')) >= -600) {
          slider.css('left', '-3600px');
        }
        animate(600)
        if (index == 1) {
          index = 5;
        } else {
          index--;
        }
        showButton();
      })

      next.on('click', function (event) {
        event.preventDefault();
        if (slider.is(':animated')) {
          return;
        }
        if (parseInt(slider.css('left')) <= -3000) {
          slider.css('left', '0px');
        }
        // debugger;
        animate(-600);
        if (index == 5) {
          index = 1
        } else {
          index++;
        }
        showButton();
      })

      function showButton() {
        dotli.eq(index - 1).addClass("on").siblings().removeClass("on");
      }

      function autoPlay() {
        interval = setInterval(function(){
          next.click();
        }, 3000)
      }

      function stop() {
        clearInterval(interval)
      }


      $.each(dotli, function () {
        $(this).on(options.actions, function () {
          if (slider.is(':animated') || $(this).hasClass('on')) {
            return;
          }

          var onIndex = parseInt($(this).attr("data-index"));
          var offset = (onIndex - index) * -600;

          animate(offset);
          index = onIndex;
          showButton();
        })
      })

      options.auto ? autoPlay() : stop()
      
      if (options.auto === true) {
        slider.on('mouseover', function () {
          stop()
        });
        slider.on('mouseout', function () {
          autoPlay()
        });
      }

    })

    return this;
  }
})(jQuery);