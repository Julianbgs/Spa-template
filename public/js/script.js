if ($('#map').length > 0) {
    /*yandex map*/
    var map = new Map();
    map.init({
        selector: '#map2',
        center: 'г. Донецк, ул. Артема 75',
        zoom: 12,
        placemarks: [
            {
                address: 'г. Донецк, ул. Артема 75',
                options: [
                    {key: 'draggable', value: true}
                ],
                properties: [
                    {key: 'hintContent', value: 'Тыц'},
                    {key: 'balloonContentHeader', value: "Предприятия Донецка"},
                    {key: 'balloonContentBody', value: "<h1>ArtCraft</h1>"}
                ]
            },
            {
                address: 'г. Донецк, ул. Артема 100',
                options: [
                    {key: 'draggable', value: true}
                ],
                properties: [
                    {key: 'hintContent', value: 'Пока'}
                ]
            }
        ]
    });
    /*close yandex map*/
}
document.addEventListener('DOMContentLoaded', function() {
    /*header mobile menu*/
    $(document).on('click', '#header-burger', function (event) {
        var pull = $('#header-burger'),
            menu = $('.header__nav');
        event.preventDefault();
        if (pull.hasClass('show')) {
            pull.removeClass('show');
            menu.slideUp('fast');
        } else {
            pull.addClass('show');
            menu.slideDown('fast');
        }
    });
    if (window.innerWidth < 670) {
        $(document).on('click', function (e) {
            if ($(e.target).closest('.header__navigation').length != 1) {
                $('.header__nav').slideUp('fast');
                $('#burger').removeClass('show');
            }
        });
    }
    /*close header mobile menu*/

    /*animate scroll menu*/
    $(document).on('click', '.nav-top a', function (event) {/*функция прокрутки на блок страницы при клике по элементам меню */
        event.preventDefault();
        var href = $(this).attr('href');
        var target = $(href);
        var top = target.offset().top;
        $('html,body').animate({scrollTop: top}, 1000);
        return false;
    });
    /*close animate scroll menu*/

    /*block animation*/
    var windowHeight = $(window).height();//переменная для определения высоты окна
    var elements = $('.how'),//блок элементов
        item = $('.how__box--item');//скрытый елемент

    $(window).scroll(function () {//при прокрутке окна
        if (($(this).scrollTop() + windowHeight) >= elements.offset().top) {//до начала блока с классом how
            item.each(function (i) {//функция задержки появления каждого элемента
                $(this).delay((i++) * 500).fadeTo(1000, 1);
            });
        }
    });
    /*close block animation*/

    /*go to top*/
    $('#go-top').click(function (event) {
        event.preventDefault();
        $("html, body").animate({scrollTop: 0}, "slow")
    });

    $(window).scroll(function () {
        if ($(this).scrollTop() != 0) {
            $('#go-top').fadeIn();
        } else {
            $('#go-top').fadeOut();
        }
    });
    /*close script*/

    /*contacts form*/
    $('#contact-name, #contact-email, #contact-phone, #contact-text').unbind().blur(function () {

        var id = $(this).attr('id');
        var val = $(this).val();

        switch (id) {
            case 'contact-name':
                var rv_name = /^[a-zA-Zа-яА-Я]+$/;
                if (val.length > 2 && val != '' && rv_name.test(val)) {
                    $(this).removeClass('error').addClass('not_error');
                } else {
                    $(this).removeClass('not_error').addClass('error');
                }
                break;

            case 'contact-email':
                var rv_email = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;
                if (val != '' && rv_email.test(val)) {
                    $(this).removeClass('error').addClass('not_error');
                } else {
                    $(this).removeClass('not_error').addClass('error');
                }
                break;

            case 'contact-phone':
                var rv_phone = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
                if (val != '' && rv_phone.test(val)) {
                    $(this).removeClass('error').addClass('not_error');
                } else {
                    $(this).removeClass('not_error').addClass('error');
                }
                break;

            case 'contact-text':
                if (val != '' && val.length < 5000) {
                    $(this).removeClass('error').addClass('not_error');
                } else {
                    $(this).removeClass('not_error').addClass('error');
                }
                break;

        } // end switch(...)

    }); // end blur()
    $('#contact-form').submit(function (event) {
        event.preventDefault();
        var name = $('#contact-name').val(),
            mail = $('#contact-email').val(),
            phone = $('#contact-phone').val(),
            message = $('#contact-text').val();
        $.ajax({
            url: myajax.url,
            type: "POST",
            data: {
                action: 'contact',
                name: name,
                mail: mail,
                phone: phone,
                message: message
            },
            success: function(data){
                $('#contact-form input, textarea').val('').removeClass('error, not_error').text('');
                // alert(data);
            }
        }); // end ajax({...})
        return false;
    }); // end submit()
    /*close*/

    /*fileinput script*/
    $('#fileinput-1').fileinput();
    /*close fileinput script*/

    /*scroll block*/
    var element = $('#sidebar');//елемент, который необходимо сделать фиксированным
    if (element.length > 0) {//проверка наличия элемента на странице
        var elementPosition = element.offset().top;//определяем позицию элемента относительно верха документа
        $(window).scroll(function () {//при прокрутке окна браузера
            fixedScroll(element,
                elementPosition, $('#footer'));//вызывается функция с заданными селекторами
        });
    }
    /*close scroll block*/

    /*add form fields in wrapper*/
    $(document).on('click', '.add-field', function (event) {
        event.preventDefault();
        var wrapper = $(this).closest('.cabinet__add-company-form--wrapper').next('.cabinet__add-company-form--hover-wrapper'),//влок в который добовляются поля
            count = wrapper.attr('data-count');//счетчик

        if (count < 10) { //условие на максимум 10 полей
            $(this).closest('.cabinet__add-company-form--wrapper').next('.cabinet__add-company-form--hover-wrapper').attr('data-count', parseInt(count) + 1);//увеличиваем счетчик на 1
            $(wrapper).append('<div class="cabinet__add-company-form--hover-elements">' +
                '<p class="cabinet__add-company-form--title"></p>' +
                '<input class="cabinet__add-company-form--field" type="text" name="mytext[]">' +
                '<a href="#" class="show-more remove-field">удалить</a>' +
                '<p class="cabinet__add-company-form--notice"></p>' +
                '</div>');//добавляем поля
        }

    });
    $(document).on('click', '.remove-field', function (event) {
        event.preventDefault();
        var wrapper = $(this).closest('.cabinet__add-company-form--hover-wrapper'),//влок в который добовляются поля
            addedBox = $(this).closest('.cabinet__add-company-form--hover-elements'),//элементы, которые добавляются
            count = wrapper.attr('data-count');//счетчик
        addedBox.remove();
        wrapper.attr('data-count', parseInt(count) - 1);//увеличиваем счетчик на 1
    });
    /*close add form fields in wrapper*/

    /*find img-tag in text block and wraps it up in "a"-tag*/
    $('.business__descr p').find('img').each(function () {
        $(this).addClass('newsImg');
        $(this).wrap('<a href="' + $(this).attr('src') + '" data-lightbox="image-1"></a>');
        $(this).css({width: '100%', height: '100%'});
    });
    /*close find img in text block and wraps it up in "a"-tag*/

    /*tabs*/
    $('.tab-content__wrapper').each(function (i) {
        if (i != 0) {
            $(this).hide(0)
        }
    });
    $(document).on('click', 'tab-links a', function (e) {
        e.preventDefault();
        var tabId = $(this).attr('href');
        $('.tab-links a').removeClass('active');
        $(this).addClass('active');
        $('.tab-content__wrapper').hide(0);
        $(tabId).fadeIn();
    });
    /*close business pkg tabs*/

    /*basket counters*/
    $(document).on('click', '.plus', function () {
        event.preventDefault();
        var count = $('.product__content--counter').find('.number'),
            val = parseInt($('.product__content--counter').find('.number').val());
        if (val == 999) {
            return false;
        } else {
            count.val(val + 1);
            $('.js-single-addtocart').attr('data-quantity', count.val());
            $('.js-single-favorites').attr('data-quantity', count.val());
        }
        return false;
    });

    $(document).on('click', '.minus', function () {
        event.preventDefault();
        var count = $('.product__content--counter').find('.number');
        var counter = parseInt(count.val()) - 1;
        counter = counter < 1 ? 1 : counter;
        count.val(counter);
        count.change();
        $('.js-single-addtocart').attr('data-quantity', counter);
        $('.js-single-favorites').attr('data-quantity', counter);
        return false;
    });

    $(document).on('keyup', '.product__content--counter .number', function () {
        var count = $(this),
            val = parseInt(count.val()),
            box = $(this).closest('.header__basket--item'),
            list = box.closest('.header__basket--inner').find('.header__basket--field');

        if (val > 999) {
            count.val(999).attr('value', 999);
        } else if (val < 1) {
            count.val(1).attr('value', 1);
        }

        if (count.hasClass('number')) {
            $('.js-single-favorites').attr('data-quantity', count.val());
        } else if (count.hasClass('modal__number')) {
            $('.js-modal-favorites').attr('data-quantity', count.val());
        }

        var itemPrice = parseInt(box.find('.header__basket--counter').find('.header__basket--price span').html()),
            counterItems = parseInt(box.find('.header__basket--field').val());
        if (isNaN(counterItems)) {
            counterItems = 1;
            box.find('.header__basket--field').val(1).attr('val', 1);
        }
        var total = itemPrice * counterItems,
            totalPrice = '<span>' + total + '</span>' + '<i class="fa fa-rub" aria-hidden="true"></i>';
        box.find('.header__basket--total').html(totalPrice);
        box.find('.header__basket--to-basket').attr('data-quantity', counterItems);
        box.find('.product__like').attr('data-quantity', counterItems);

        var totalCount = 0;
        $.each(list, function () {
            totalCount += parseInt($(this).val());
        });
        box.closest('.full').find('.js-basket-total').text(totalCount);

        var type = box.data('type');
        if (type !== null) {
            updateFavoritesQuantity(type, counterItems);
        }

        var hash = box.data('hash');
        if (typeof hash !== 'undefined' && hash !== '') {
            updateCartQuantity(hash, counterItems);
        }
        return false;
    });

    $(document).on('blur', '.product__content--counter .number', function () {
        var count = $(this),//находим поле с цифрой
            val = parseInt(count.val());//переводим значение в цифровой формат
        if (isNaN(val)) {//если значение нет
            count.val(1);//присваиваем значение 1
        }

        if (count.hasClass('number')) {
            $('.js-single-favorites').attr('data-quantity', count.val());
        } else if (count.hasClass('modal__number')) {
            $('.js-modal-favorites').attr('data-quantity', count.val());
        }
    });
    /*close*/


    /*password*/
    $(document).on('input', '.top__form--field.second', function (event) {//функция ввода текста в поле "пароль"
        var value = $(this).val();//получаем значение поля
        var indicator = $(this).next('.pass-value');//находим блок с индикатором, рассположенный за полем
        var value_label = indicator.find('.pass-value__title');//находим заголовок индикатора
        var confirm = $(this).closest('.top__form--fields-wrapper').find('.top__form--field.third');//находим поле для проверки пароля

        if ( value.length < 8 && value.match(/[a-zA-Z0-9]/) ) {//при проверке ввода в поле менне 8 символов с обязательным наличием больших латинских букв и цифр
            $(this).removeClass('valid').addClass('invalid');//полю добавляется класс invalid
            confirm.attr('disabled', false);//убираем у поля проверки запрет на ввод
        } else {// если услови выполнено
            $(this).removeClass('invalid').addClass('valid');//полю добавляется класс valid
            confirm.attr('disabled', true);//добовляем полю проверки запрет на ввод
        }
        if ( $(this).hasClass('invalid') ) {//при наличии у поля класса invalid
            indicator.show().removeClass('strong');//показывается блок индикатора и ему убирается класс strong
            value_label.text('Heslo je středně silné');//заголовку добовляется нужная надпись
        } else if ( $(this).hasClass('valid') ){//при наличии у поля класса valid
            indicator.addClass('strong');//показывается блок индикатора и ему добавляется класс strong
            value_label.text('Heslo je silné');//заголовку добовляется нужная надпись
        }
        if ( value.length < 1 ) {//если поле не заполнено
            indicator.hide().removeClass('strong');//блок индикатора скрывается
            value_label.text('Heslo je středně silné');//заголовок ставиться по умолчанию
        }
    });

    $(document).on('input', '.top__form--field.third', function (event) {//функция проверки повтора паролля
        var value = $(this).val();//получаем значение поля
        var main_passw = $(this).closest('.top__form--fields-wrapper').find('.top__form--field.second');//находим поле ранее введеного пароля
        var indicator = $(this).next('.pass-value');//находим блок с индикатором, рассположенный за полем
        var value_label = indicator.find('.pass-value__title');//находим заголовок индикатора

        if( value == main_passw.val()) {//при совпадении значения обоих полей
            $(this).removeClass('invalid').addClass('valid');//полю проверки добавляется класс valid
        } else {// если услови не выполнено
            $(this).removeClass('valid').addClass('invalid');//полю проверки добавляется класс invalid
        }
        if ( $(this).hasClass('invalid') ) {//при проверке наличия у поля проверки класса invalid
            indicator.show().removeClass('strong');//показывается индикатор и ему удаляется класс strong
            value_label.text('Heslo neodpovídá');//заголовку добовляется нужная надпись
        } else if ( $(this).hasClass('valid') ){//при проверке наличия у поля проверки класса valid
            indicator.addClass('strong');//индикатору добавляется класс strong
            value_label.text('Hesla se shodují');//заголовку добовляется нужная надпись
        }
        if ( value.length < 1 ) {//если поле не заполнено
            indicator.hide().removeClass('strong');//индикатор скрывается и у него убирается класс strong
            value_label.text('Heslo neodpovídá');//заголовок ставиться по умолчанию
        }
    });
    /*close password*/
    /*password*/
    $(document).on('input', '.top__form--field.second', function (event) {//функция ввода текста в поле "пароль"
        var value = $(this).val();//получаем значение поля
        var indicator = $(this).next('.pass-value');//находим блок с индикатором, рассположенный за полем
        var value_label = indicator.find('.pass-value__title');//находим заголовок индикатора
        var confirm = $(this).closest('.top__form--fields-wrapper').find('.top__form--field.third');//находим поле для проверки пароля

        if (value.length != 0) {//при заполнении поля пароля
            confirm.attr('disabled', false);//убираем у поля проверки запрет на ввод
        } else {//при пустом поле пароля
            confirm.attr('disabled', true);//добавляем запрет на ввод
            confirm.val('');//задаем полю пустое значение
            confirm.next('.pass-value').hide().removeClass('strong');//прячем блок и убираем у него класс strong
        }

        if (value.length < 8 && value.match(/[a-zA-Z0-9]/)) {//при проверке ввода в поле менне 8 символов с обязательным наличием больших латинских букв и цифр
            $(this).removeClass('valid').addClass('invalid');//полю добавляется класс invalid
        } else {// если услови выполнено
            $(this).removeClass('invalid').addClass('valid');//полю добавляется класс valid
        }
        if ($(this).hasClass('invalid')) {//при наличии у поля класса invalid
            indicator.show().removeClass('strong');//показывается блок индикатора и ему убирается класс strong
            value_label.text('Heslo je středně silné');//заголовку добовляется нужная надпись
        } else if ($(this).hasClass('valid')) {//при наличии у поля класса valid
            indicator.addClass('strong');//показывается блок индикатора и ему добавляется класс strong
            value_label.text('Heslo je silné');//заголовку добовляется нужная надпись
        }
        if (value.length < 1) {//если поле не заполнено
            indicator.hide().removeClass('strong');//блок индикатора скрывается
            value_label.text('Heslo je středně silné');//заголовок ставиться по умолчанию
        }
    });

    $(document).on('input', '.top__form--field.third', function (event) {//функция проверки повтора паролля
        var value = $(this).val();//получаем значение поля
        var main_passw = $(this).closest('.top__form--fields-wrapper').find('.top__form--field.second');//находим поле ранее введеного пароля
        var indicator = $(this).next('.pass-value');//находим блок с индикатором, рассположенный за полем
        var value_label = indicator.find('.pass-value__title');//находим заголовок индикатора

        if (value == main_passw.val()) {//при совпадении значения обоих полей
            $(this).removeClass('invalid').addClass('valid');//полю проверки добавляется класс valid
        } else {// если услови не выполнено
            $(this).removeClass('valid').addClass('invalid');//полю проверки добавляется класс invalid
        }
        if ($(this).hasClass('invalid')) {//при проверке наличия у поля проверки класса invalid
            indicator.show().removeClass('strong');//показывается индикатор и ему удаляется класс strong
            value_label.text('Heslo neodpovídá');//заголовку добовляется нужная надпись
        } else if ($(this).hasClass('valid')) {//при проверке наличия у поля проверки класса valid
            indicator.addClass('strong');//индикатору добавляется класс strong
            value_label.text('Hesla se shodují');//заголовку добовляется нужная надпись
        }
        if (value.length < 1) {//если поле не заполнено
            indicator.hide().removeClass('strong');//индикатор скрывается и у него убирается класс strong
            value_label.text('Heslo neodpovídá');//заголовок ставиться по умолчанию
        }
    });
    /*close password*/


    /*modal*/
    $(document).on('click', '.footer__send', function () {
        event.preventDefault();
        $('#overlay').fadeIn(400,
            function () {
                $('.modal-send').css('display', 'block').animate({opacity: 1}, 200);
            });
    });
    $(document).on('click', '.modal-send__close, #overlay', function () {
        $('.modal-send').animate({opacity: 0}, 200,
            function () {
                $(this).css('display', 'none');
                $('#overlay').fadeOut(400);
            }
        );
    });
    /*close*/
});

window.onload = function () {
    var width = document.documentElement.clientWidth;
    var trigger = $('.catalog').find('#catalog-trigger');

    if (width < 991) {
        trigger.removeClass('js-trigger-list-active');
    } else {
        trigger.addClass('js-trigger-list-active');
    }
};
window.addEventListener('resize', function () {
    var width = document.documentElement.clientWidth;
    var trigger = $('.catalog').find('#catalog-trigger');

    if (width < 991) {
        trigger.removeClass('js-trigger-list-active');
    } else {
        trigger.addClass('js-trigger-list-active');
    }
});

function fixedScroll(element, elementPosition, blockElement) {//функция фиксированногоблока, с селекторами элемента, его позиционирования и преграждающего блока
    var top = $(document).scrollTop(),//значение отступа прокрутки сверху для первого элемента
        blockingElement = blockElement.offset().top,//позиция блокирующего блока отностительно верха документа
        height = element.outerHeight();//высота элемента, включающая внутренние и внешние отступы
    if (top > elementPosition && top < blockingElement - height) {//
        element.addClass('fixed').removeAttr("style");
    }
    else if (top > blockingElement - height) {
        element.removeClass('fixed').css({'position': 'absolute', 'bottom': '50px', 'right': '0'});
    }
    else {
        element.removeClass('fixed');
    }
}