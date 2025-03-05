$(function() {
    // 초기 이미지 설정
    handleResize();

    // 리사이즈 이벤트 핸들러 설정
    $(window).resize(function() {
        handleResize();
    });

    function handleResize() {
        const windowWidth = $(window).width();
        if (windowWidth > 1280) {
            setupDesktopMenu(); // 데스크탑 메뉴 설정
        } else {
            setupMobileMenu(); // 모바일 메뉴 설정
        }

        // 스타일 초기화: 화면 크기가 변경될 때만
        resetCategoryStyles(); // 스타일 초기화
    }

    function setupDesktopMenu() {
        $('.inb-wrap').css('display', 'block'); // .inb-wrap 보이기
        $('.inb-wrap > .depth1 > a').show();   // .depth1 보이기
        $('.depth2').hide();
        $('.language').show();
        $('.inb-bottom').hide();
        $('.menu').hide();

        // 로고 이미지 변경
        $('.logo-change').attr('src', './imgs/nonfiction_mowh.png');
        $('.search').attr('src', './imgs/search_wh.png');
        $('.user').attr('src', './imgs/user_wh.png');
        $('.cart').attr('src', './imgs/cart_wh.png');

        // 클릭 이벤트 설정
        $('.inb-nav > .depth1 > a').off('click').on('click', function (e) {
            e.preventDefault();
            const $this = $(this);
            const $depth2 = $this.next('.depth2');

            // 슬라이드 토글
            $depth2.slideToggle(300);
            $this.parent().toggleClass('active');

            // 다른 서브 메뉴 숨기기
            $('.depth2').not($depth2).slideUp(300);
            $('.depth1').not($this.parent()).removeClass('active');
        });

        // 카테고리 클릭 이벤트 추가
        setupCategoryClickEvents();
    }

    function setupMobileMenu() {
        $('.inb-wrap').css('display', 'none'); // .inb-wrap 숨기기
        $('.inb-wrap > .depth1 > a').hide();   // .depth1 숨기기
        $('.depth2').hide();
        $('.language').hide();
        $('.inb-bottom').hide();
        $('.menu').show();

        // 로고 이미지 변경
        $('.logo-change').attr('src', './imgs/logo.png');
        $('.search').attr('src', './imgs/search.png');
        $('.user').attr('src', './imgs/user.png');
        $('.cart').attr('src', './imgs/cart.png');

        // 모바일 메뉴 설정
        renderTypeMobile();
        // 카테고리 클릭 이벤트 추가
        setupCategoryClickEvents();
    }

    function setupCategoryClickEvents() {
        // 모든 박스 숨기기
        $('.sec_best .swiper_cont').hide();
        // 기본적으로 .hand_box 보이기
        $('.sec_best .hand_box').show();
        // 기본적으로 .hand 항목에 스타일 적용
        $('.category_list > .hand').css({
            'color': '#fff',
            'background-color': '#535353'
        });

        // 카테고리 클릭 이벤트 설정
        $('.category_list > li').on('click', function() { 
            $('.sec_best .swiper_cont').hide();

            // 클릭한 카테고리에 따라 해당 박스 보이기
            const categoryClass = $(this).attr('class');
            if (categoryClass) {
                $('.sec_best .' + categoryClass + '_box').show();
            }
            // 모든 li의 css스타일 초기화
            $('.category_list li').removeAttr('style');

            // 클릭한 li에 색상 적용
            $(this).css('color','#fff');
            $(this).css('background-color','#535353');
        });
    }

    // 스타일 초기화 함수
    function resetCategoryStyles() {
        const windowWidth = $(window).width(); // 현재 윈도우 너비 가져오기
        // 너비가 1280px보다 변경될 때만 스타일 초기화
        if (windowWidth !== 1280) { 
            $('.category_list li').removeAttr('style'); // 모든 li의 스타일 초기화
            $('.category_list > .hand').css({
                'color': '#fff',
                'background-color': '#535353' // .hand 항목의 스타일 유지
            });
        }
    }

    // 모바일 메뉴 클릭 이벤트 설정
    function renderTypeMobile() {
        // 메뉴 클릭 이벤트
        $('.menu').off('click').on('click', function () {
            if ($('.inb-wrap').is(':visible')) {
                // 보일 때 클릭하면 숨기기
                $('.inb-wrap').fadeOut(300); // 부드럽게 사라지기
            } else {
                // 숨겨져 있을 때 클릭하면 보이기
                $('.inb-wrap').fadeIn(300); // 부드럽게 나타나기
            }
        });

        // 서브 메뉴 클릭 이벤트
        $('.inb-nav > .depth1 > a').off('click').on('click', function (e) {
            e.preventDefault();
            const $this = $(this);
            const $depth2 = $this.next('.depth2'); // 현재 클릭한 a의 다음 형제 요소인 .depth2 선택

            // 현재의 .depth2가 보이는지 확인하고 슬라이드 토글
            $depth2.slideToggle(300); // 슬라이드 토글
            $this.parent().toggleClass('active'); // 현재 항목에 active 클래스 토글

            // 다른 모든 서브 메뉴 숨기기
            $('.depth2').not($depth2).slideUp(300); // 다른 서브 메뉴 숨기기
            $('.depth1').not($this.parent()).removeClass('active'); // active 클래스 제거
        });
    }

    // Hover 효과 추가
    function addHoverEffect() {
        const inbNav = document.querySelector('.inb-nav');
        const inbNavPc = document.querySelector('.inb-nav_pc');

        inbNav.addEventListener('mouseenter', () => {
            inbNavPc.style.display = 'block'; // 마우스를 올리면 보이게
        });

        inbNav.addEventListener('mouseleave', () => {
            inbNavPc.style.display = 'none'; // 마우스를 떼면 숨김
        });
    }

    function removeHoverEffect() {
        const inbNav = document.querySelector('.inb-nav');
        const inbNavPc = document.querySelector('.inb-nav_pc');

        // 이벤트 제거
        inbNav.removeEventListener('mouseenter', () => {
            inbNavPc.style.display = 'block';
        });

        inbNav.removeEventListener('mouseleave', () => {
            inbNavPc.style.display = 'none';
        });
    }
});
