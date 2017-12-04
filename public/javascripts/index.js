$(function () {
    var accordion = new Accordion($('.accordion-menu'), false);
    var programs = new Accordion($('.programs-menu'), false);
    initChevron()
    $("#profile").show();
    $("#programs").hide();
    $("#skills").hide();
    $("#other").hide();
    $("[data-target]").on('click', function (e) {
        switch ($(this).data('target')) {
            case 'profile':
                $("#profile").show()
                $("#programs").hide()
                $("#skills").hide()
                $("#other").hide()
                break;
            case 'programs':
                $("#programs").show()
                $("#profile").hide()
                $("#skills").hide()
                $("#other").hide()
                setTimeout(function () {
                    $("#xxxxx").trigger("click");
                },5000)
                break;
            case 'skills':
                $("#skills").show()
                $("#programs").hide()
                $("#profile").hide()
                $("#other").hide()
                break;
            case 'other':
                $("#other").show()
                $("#programs").hide()
                $("#skills").hide()
                $("#profile").hide()
                initImage()
                break;
            default:
                return
        }
    });
    $("[data-program]").on('click', function (e) {
        var a = "[data-pro="+$(this).data('program')+"]"
        $(a).trigger("click")

    });
    $('.programs-menu>li').on('click', function () {
        if (!$(this).hasClass('open')){
            console.log('all close')
        }else{
            console.log('some open')
        }
    })
});

function Accordion(el, multiple) {
    this.el = el || {};
    this.multiple = multiple || false;

    // Variables privadas
    var links = this.el.find('.link');
    // Evento
    links.on('click', {el: this.el, multiple: this.multiple}, this.dropdown)
}

Accordion.prototype.dropdown = function (e) {
    var $el = e.data.el,
        $this = $(this),
        $next = $this.next();

    $next.slideToggle();
    $this.parent().toggleClass('open');

    if (!e.data.multiple) {
        $el.find('.submenu').not($next).slideUp().parent().removeClass('open');
    }
    ;
}

function initImage() {
    var imgUrl = [
        {title: '毕业证书', url: 'https://www.maoniangv5.win/images/c0485aa1d2e710abf7c0fdce7c5868e2.jpeg'},
        {title: '学位证书', url: 'https://www.maoniangv5.win/images/dee87a47edb37334a41f3583bccc9aef.jpeg'},
        {title: '卓越证书', url: 'https://www.maoniangv5.win/images/ef393098d9395e6e64ec0b596261d6c2.jpeg'}
    ]
    var str = '';
    imgUrl.map(function (index) {
        str += '<div class="col-md-4 col-xs-6">' +
            '<div>' +
            '<a class="zooming" href="' + index.url + '" title="' + index.title + '">' +
            '<img src="' + index.url + '" class="img-responsive" alt="' + index.title + '" height="100%" width="auto">' +
            '</a>' +
            '<div>' +
            '<p>' + index.title + '</p>' +
            '</div> </div> </div>'
    })
    $('#img-show-list').html(str);
    initImgMasonry()
}

// 初始化图片zoom
function initImgMasonry() {
    if ($('.magnific-popup-wrap').length > 0) {
        $('.magnific-popup-wrap').each(function () {
            "use strict";
            $(this).magnificPopup({
                delegate: 'a.zooming',
                type: 'image',
                removalDelay: 300,
                mainClass: 'mfp-fade',
                gallery: {
                    enabled: true
                }
            });
        });
    }

    if ($('.inline-popups').length > 0) {
        $('.inline-popups').magnificPopup({
            delegate: 'a',
            removalDelay: 500,
            callbacks: {
                beforeOpen: function () {
                    this.st.mainClass = this.st.el.attr('data-effect');
                }
            },
            midClick: true
        });
    }
    $('.magnific-img').magnificPopup({
        type: 'image',
        removalDelay: 300,
        mainClass: 'mfp-fade'
    });
}
function initChevron() {
    $('.collapse').on('show.bs.collapse', function() {
        var id = $(this).attr('id');
        $('a.block-collapse[href="#' + id + '"] span.right-icon').html('<i class="fa fa-chevron-up"></i>');
    });
    $('.collapse').on('hide.bs.collapse', function() {
        var id = $(this).attr('id');
        $('a.block-collapse[href="#' + id + '"] span.right-icon').html('<i class="fa fa-chevron-down"></i>');
    });
}
