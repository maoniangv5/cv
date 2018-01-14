$(function () {
    var accordion = new Accordion($('.accordion-menu'), false);
    initChevron()
    $("#profile").show();
    $("#programs").hide();
    $("#skills").hide();
    $("#other").hide();
    $("[data-target]").on('click', function (e) {
        switch ($(this).data('target')) {
            case 'profile':
                $(".nav-li").text('基本信息')
                $("#profile").show()
                $("#programs").hide()
                $("#skills").hide()
                $("#other").hide()
                break;
            case 'programs':
                $(".nav-li").text('项目经验')
                $("#programs").show()
                $("#profile").hide()
                $("#skills").hide()
                $("#other").hide()
                break;
            case 'skills':
                $(".nav-li").text('技能')
                $("#skills").show()
                $("#programs").hide()
                $("#profile").hide()
                $("#other").hide()
                break;
            case 'other':
                $(".nav-li").text('其他')
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
        {title: '毕业证书', url: 'images/coll/img1.jpg'},
        {title: '学位证书', url: 'images/coll/img2.jpg'}
    ]
    var str = '';
    imgUrl.map(function (index) {
        str += '<div class="col-md-6 col-xs-12">' +
            '<div>' +
            '<a class="zooming" href="' + index.url + '" title="' + index.title + '">' +
            '<img src="' + index.url + '" class="img-responsive" alt="' + index.title + '" height="100%" width="auto">' +
            '</a>' +
            '<div>' +
            '<p class="img-p">' + index.title + '</p>' +
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
