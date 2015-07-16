// $.datepicker.regional['ru'] = { 
// closeText: 'Закрыть', 
// prevText: '&#x3c;Пред', 
// nextText: 'След&#x3e;', 
// currentText: 'Сегодня', 
// monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь', 
// 'Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'], 
// monthNamesShort: ['Янв','Фев','Мар','Апр','Май','Июн', 
// 'Июл','Авг','Сен','Окт','Ноя','Дек'], 
// dayNames: ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'], 
// dayNamesShort: ['вск','пнд','втр','срд','чтв','птн','сбт'], 
// dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'], 
// dateFormat: 'dd.mm.yy', 
// firstDay: 1, 
// isRTL: false 
// }; 
// $.datepicker.setDefaults($.datepicker.regional['ru']); 

// 'use strict';

// if (typeof Object.create !== 'function') {
//     Object.create = function (obj) {
//         function F() {}
//         F.prototype = obj;
//         return new F();
//     };
// }

'use strict';

if (typeof Object.create !== 'function') {
    Object.create = function (obj) {
        function F() {}
        F.prototype = obj;
        return new F();
    };
}

(function ($, window, document, undefined) {

    var Slider = {
        init: function (options, elem) {

            var self = this;

            self.maxScrollPosition = 0;
            self.switcher = 0;   
            self.elem = elem;
            self.$elem = $ (elem);

            self.options = $.extend({}, $.fn.sliderGoods.options, options);

            self.calcConst();

            $(this.elem).find('.carousel__btn--prev').on('click', function (e) {
                e.preventDefault();
                var $targetItem = self.$elem.find('.carousel__item--edge').prev();

                self.toGalleryItem($targetItem);
            });

            $(this.elem).find('.carousel__btn--next').on('click', function (e) {
                e.preventDefault();
                var $targetItem = self.$elem.find('.carousel__item--edge').next();

                self.toGalleryItem($targetItem);
            });

        },

        calcConst: function () {
            var self = this,
                totalWidth = 0,
                totalHeigt = 0,

                category = $(this.elem).find('.category'),
                section = $(this.elem).outerWidth() - 95,
                contentWidth = section / this.options.caseLimit - this.options.spaceSection * 2;
                

            $(this.elem).find('.carousel__swither').width(section);

            $(this.elem).find('.carousel__item')
                            .css({
                                    width:contentWidth + this.options.spaceSection * 2,
                                    'padding-left': this.options.spaceSection,
                                    'padding-right': this.options.spaceSection
                                })
                                .each(function() {
                                    totalWidth = totalWidth + $(this).outerWidth(true);
                                });

            self.maxScrollPosition = totalWidth - $(this.elem).find('.carousel__swither').outerWidth();
            self.switcher = $(this.elem).find('.carousel__wrapper');

            self.switcher.width(totalWidth + 20);

            $(this.elem).find('.carousel__item:first').addClass('carousel__item--edge');

            if (this.options.autoHeight === 'true') {
                $(this.elem).find('.carousel__item').height(contentWidth);
                $(this.elem).find('.carousel__swither').height(totalHeigt + contentWidth);
                $(this.elem).height(totalHeigt + contentWidth + 40 );
            } else {
                $(this.elem).find('.carousel__item').height(this.options.autoHeight);
            }

        },

        toGalleryItem:  function ($targetItem) {
            var self = this;

            if($targetItem.length) {

                var newPosition = $targetItem.position().left;

                if(newPosition <= self.maxScrollPosition) {

                    $targetItem.addClass('carousel__item--edge');
                    $targetItem.siblings().removeClass('carousel__item--edge');

                    self.switcher.animate({
                        left : - newPosition
                    });
                } else {
                    self.switcher.animate({
                        left : - self.maxScrollPosition
                    });
                }
            }
        } 
    };

    $.fn.sliderGoods = function (options) {
        return this.each(function() {
            
            var slider = Object.create( Slider );
            slider.init( options, this );
        });
    };   

    $.fn.sliderGoods.options = {
        autoHeight: 'false', // высота всего слайдера
        caseLimit: 4, //кол-во товаров в витрине
        spaceSection: 15, //расстояние между секциями
    };

// ===============	tabs begin ===============

$('.tabs__container').hide();
    $('.tabs__1').show();

    $('.tab').on('click', function( e ) {
        e.preventDefault();

        if ($(this).hasClass('active')) return;

        var $this = $(this);

        $('.tab').removeClass('active');
        $('.tabs__container').hide();

        $this.addClass('active');
        $('.' + $this.data('tab')).fadeToggle(300);
    });

// ===============	tabs end =================


(function($){

	// $('.navbar').addClass('navbar');
	// $('.categories-menu>ul').addClass('nav navbar-nav');

	var menuCell = $('.navbar>ul>li>ul').hide(),
		menuButton = $('.navbar>ul>li');

	// menuCell
	// .addClass('nav-list')
	// .hide()
	// .children('li')
	// .show();


		menuButton.hover(function() {
			$(this).children('ul').show(100);
			$(this).addClass('active');
		},
		function() {
			$(this).children('ul').hide(100);
			$(this).removeClass('active');
		}
		);
	
})(jQuery);

})( jQuery, window, document );


