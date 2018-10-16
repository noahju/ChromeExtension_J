
;var Bori9th = function (isLogin, userId, userNm) {

    this.isFrame = (window != parent) ? true : false;
    this.isLogin = isLogin || 'False';
    this.userId = userId || '';
    this.userNm = userNm || '';
    this.container;
    this.msg = {};
    this.init();
};
Bori9th.prototype.init = function () {

    this.styleInit();
    this.iframeResize();
    this.loginChk();
    this.attachEvent();
    this.getRelayTimeSpecialPrice();    // 릴레이 타임특가
    this.getRequestPouchLog();      // 파우치 신청내역 체크
    this.getMyMemorials();          // 나의 기억 템플릿 로드
    this.getPopularSearchBrand9thTourStamp();   // 9단투어 스탬프 확인
    this.getVipData();
};
Bori9th.prototype.styleInit = function () {

    var $btnModalPop = $('.pop_open');
    var $popLayer = $('#popLayer');
	var $modalDim = $('#modalDim');
    var $btnClose = $('.btn_close');
	$btnModalPop.click(function (e) {
	    e.preventDefault();
	    var $bodyHeight = $(document).height();
        var $scrollTop = $(document).scrollTop();
		var $idx = $(this).attr('href');
	    $modalDim.css('height', $bodyHeight).show();
	    //$('.' + $idx).css("top", (($(window).height() - $('.' + $idx).outerHeight()) / 2) + $(window).scrollTop() + "px").show();
        if (window == parent) {
            $('.' + $idx).css("top", (($(window).height() - $('.' + $idx).outerHeight()) / 2) + $(window).scrollTop() + "px").show();
        } else {
            if ($(this).hasClass('pouch')) {
                $('.' + $idx).css('top', '5645');
            }
            $('.' + $idx).show();
        }

	});
	/* Modal close */
	$btnClose.click(function () {
	    var $this = $(this);
	    $modalDim.hide();
	    $this.parents('.pop_layer').hide();
	});
};
Bori9th.prototype.iframeResize = function () {

    if (this.isFrame) {
        $("#leftWing", parent.document).hide();
        var opt = {
            //frameId : "iframePromotion",  // 필요없음
            fixMenuClass: "fix-menu",  // 화면스크롤시 프레임내에 고정메뉴의 클래스명 ("middle" 클래스 추가시 고정메뉴가 가운데 정렬됨.)
            resizeEventClass: "click-resize",  // 프레임내에 클릭이벤트가 발생시 프레임 사이즈에 영향을 주는 클래스명
            scrollEventClass: "click-scroll"  // 프레임내에 클릭이벤트가 발생시 프레임 스크롤에  영향을 주는 클래스명
        }
        var k = new parentInIframeCtl(opt);
    }
};
Bori9th.prototype.loginChk = function () {
    var tmpFn = function () {
        window.open("https://member.boribori.co.kr/login", "로그인", "width=420 height=450,left=300,top=100,toolbar=no,menubar=no,scrollbars=no,resizable=yes");
    }
    var a = "<a href='#login'><img src='http://cdn.halfclub.com/Images_Web/2017/20170327_br_9th/web/btn_login.png' alt='로그인하기' /></a>";
    var b = "<a href='http://www.boribori.co.kr/PlanShop?ThemeSeq=70645' target='_blank'><img src='http://cdn.halfclub.com/Images_Web/2017/20170327_br_9th/web/btn_newm.png' alt='신규회원이라면?' /></a>";
    var c = "<a href='vipMember' target='_blank' class='pop_open'><img src='http://cdn.halfclub.com/Images_Web/2017/20170410_br_9th3/web/btn_vipm.jpg' alt='VIP회원이라면?' /></a>";

    $('.btn_area.getMyMemorial > a').hide();
    if (this.isLogin != 'False') {
        $('.btn_area.getMyMemorial > a').eq(1).show();
    } else {
        $('.btn_area.getMyMemorial > a').eq(0).show();
    }
    // vip 회원이면 레이어팝업 추가!!!
};
Bori9th.prototype.attachEvent = function () {

    // sns facebook
    $('#shareFacebookBtn').on('click', $.proxy(function (e) {
        this.shareSns('F');
        return false;
    }, this));
    // sns kakaostory
    $('#shareKakaostoryBtn').on('click', $.proxy(function (e) {
        this.shareSns('S');
        return false;
    }, this));
    // urllink
    $('#shareUrlLinkBtn').on('click', $.proxy(function (e) {
        this.shareSns('B');
        return false;
    }, this));

    // 9단투어 쿠폰받기
    $('#nineTourCouponBtn').on('click', $.proxy(function () {
        this.requestPopularSearchBrand9thTourCoupon();
        return false;
    }, this));
    // 파우치 신청 이벤트
    $('#aRequestPouch').on('click', $.proxy(function (e) {
        this.requestPouch();
        return false;
    }, this));
};
Bori9th.prototype.loginConfirm = function (msg) {

    var _tmpMsg = msg || '로그인 후 이용해주세요.';
    if (this.isLogin == 'False') {
        if (confirm(_tmpMsg)) {
            if (this.isFrame) {
                parent.LoginWindows();
            } else {
                //top.location.href = "http://www.boribori.co.kr/Member/Login.asp?rurl=" + escape(parent.location.href);
                window.open("https://member.boribori.co.kr/login", "로그인", "width=420 height=450,left=300,top=100,toolbar=no,menubar=no,scrollbars=no,resizable=yes");
            }
        }
        return false;
    } else {
        return true;
    }
};
// 3주차에는 파우치 마감
Bori9th.prototype.getRequestPouchLog = function () {
    
    // 파우치 신청자가 너무 많아서 조기 종료
    $('.pop_open.pouch').off().on('click', function (e) {
        alert('성원에 힘입어 조기 종료되었습니다. 감사합니다!');
        e.stopImmediatePropagation();
        return false;
    });
    return;

//    if (this.isLogin == 'False') {

//        $('.pop_open.pouch').off().on('click', function (e) {
//            alert('로그인 후 참여해주세요.');
//            e.stopImmediatePropagation();
//            return false;
//        });
//    } else {

//        $.post("Theme_70482.aspx", { action: 'RequestPouch', type: 'S' }, function (rtn) {
//            if (rtn < 90000) {

//                $('.pop_open.pouch').off().on('click', function (e) {
//                    alert('이벤트기간 내 9만원 이상 구매 시 신청 가능합니다');
//                    e.stopImmediatePropagation();
//                    return false;
//                });
//            } else {

//                $.post("Theme_70482.aspx", { action: 'RequestPouch', type: 'D' }, function (rtn2) {
//                    if (rtn2) {
//                        $('.pop_open.pouch').off().on('click', function (e) {
//                            alert('이미 신청하셨습니다. 이벤트기간 내 ID당 1회만 신청 가능합니다.');
//                            e.stopImmediatePropagation();
//                            return false;
//                        });
//                    }
//                });
//            }
//        });
//    }
};
// 보리 나의 기록
Bori9th.prototype.getMyMemorials = function () {

    var 
        that = this;

    if (this.isLogin != 'False') {
        $.post("Theme_70482.aspx", { action: "GetMyMemorials", UserID: this.userId }, function (rtn) {
            var a = { data: rtn };
            $('.txtbox_area').empty();
            $('#sampleTmpl').tmpl(a, { comma: that.fnComma }).appendTo(".txtbox_area");
        });
    } else {
        var a = { data: '' };
        $('#sampleTmpl').tmpl(a).appendTo(".txtbox_area");
    }
};
// 파우치 신청 - 1주차 재사용
Bori9th.prototype.requestPouch = function () {

    if (!this.loginConfirm()) return;

    //알파벳 대문자만 입력 가능합니다
    var $a = $('input:radio[name=pawReq_input]').is(':checked');
    if (!$a) {
        alert('디자인을 선택 후 신청해주세요');
        return;
    }
    var $b = $('input:radio[name=pawReq_input]').val();
    var arr = $('input:text[name=requestPouchTxt]');
    var len = arr.length;
    var tmp = '';
    for (var i = 0; i < len; i++) {
        if (arr[i]) {
            tmp += arr[i].value;
        }
    }
    if (!tmp) {
        alert('텍스트를 입력 후 신청해주세요');
        return;
    }
    if (tmp && tmp.length === 9) {
        tmp = tmp.toUpperCase();

        var param = { action: 'RequestPouch', txt: tmp, colorType: $b, type: 'I' };
        var msg = {
            m00: '신청에 실패하였습니다.',    // default
            m01: '신청되었습니다. 회원정보에 등록되어있는 주소로 5/6 일괄배송 됩니다',
            m60: '이미 신청하셨습니다. 이벤트기간 내 ID당 1회만 신청 가능합니다.',
            m90: '이벤트기간 내 9만원 이상 구매 시 신청 가능합니다',
            m97: '이벤트 기간이 아닙니다.',
            m98: '로그인 후 참여해주세요.',
            m99: '로그인 후 참여해주세요.'
        };
        this.fnAjax(param, msg, 'Theme_70482.aspx');

    } else {
        alert('알파벳 9자를 전부 입력해주세요');
        return;
    }
};
// 보리 브랜드 9단 투어
Bori9th.prototype.getPopularSearchBrand9thTourStamp = function () {

    var 
        __self = this;

    $.post('Theme_70484.aspx', { action: 'GetBoriBrandNineTour' }, function (rtn) {

        $('.mable_area a').each(function (i) {
            var that = this;
            $(that).removeClass('current');
            $.each(rtn[0], function (i, v) {
                if ($(that).data('brdcd') == i && v > 0) {
                    $(that).addClass('current');
                }
            });
            $(this).on('click', function () {
                __self.setPopularSearchBrand9thTourStamp($(that).data('brdcd'), this);
                return false;
            });
        });
    });
};
Bori9th.prototype.setPopularSearchBrand9thTourStamp = function (brdCd, target) {

    if (!this.loginConfirm()) return;

    $.post('Theme_70484.aspx', { action: 'SetBoriBrandNineTour', brdCd: brdCd }, function (rtn) {
        $(target).addClass('current');
    });

    window.open($(target).attr('href'), '_blank');
};
Bori9th.prototype.requestPopularSearchBrand9thTourCoupon = function () {

    if (!this.loginConfirm()) return;

    if ($('.mable_area a.current').length !== 9) {
        alert('스탬프를 모두 찍어야 쿠폰을 받으실 수 있습니다.');
        return;
    }

    var param = { action: 'RequestBoriBrandNineTourCoupon' };
    var msg = {
        m00: '다운로드에 실패하였습니다.',    // default
        m01: '쿠폰이 발급되었습니다.',
        m40: '이벤트 기간이 아닙니다.',
        m50: '로그인 후 참여해주세요.',
        m60: '로그인 후 참여해주세요.',
        m70: '이벤트 기간 내 ID당 1회만 받으실 수 있습니다.',
        m80: '스탬프를 모두 찍어야 쿠폰을 받으실 수 있습니다.',
    };
    this.fnAjax(param, msg);
};
Bori9th.prototype.fnRemoveTag = function (html) {
    return html.replace(/(<([^>]+)>)/gi, "");
};
Bori9th.prototype.fnComma = function (x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
Bori9th.prototype.fnAjax = function (param, msg, url) {

    var isCpDown;
    var __msg = {
        m00: '다운로드에 실패하였습니다.',    // default
        m01: '쿠폰이 발급되었습니다.',
        m60: '이벤트 기간 내 ID당 1회만 받으실 수 있습니다.',
        m70: '스탬프를 모두 찍어야 쿠폰을 받으실 수 있습니다.',
        m97: '이벤트 기간이 아닙니다.',
        m98: '로그인 후 참여해주세요.',
        m99: '로그인 후 참여해주세요.'
    };
    $.extend(this.__msg, msg);

    $.ajax({
        type: 'POST',
        url: url || 'Theme_70484.aspx',
        data: param,
        beforeSend: function (jqXHR, opts) {
            //전송중일때
            if (isCpDown) {
                jqXHR.abort();
                alert("응모중입니다.");
            }
            else { //전송중이 아닐때
                isCpDown = true;
            }
        },
        success: function (results) {
            switch (results.toString()) {
                case "1":
                    alert(msg.m01);
                    break;
                case "20": alert(msg.m20); break;
                case "40": alert(msg.m40); break;
                case "50": alert(msg.m50); break;
                case "60": alert(msg.m60); break;
                case "65": alert(msg.m65); break;
                case "70": alert(msg.m70); break;
                case "80": alert(msg.m80); break;
                case "90": alert(msg.m90); break;
                case "97":
                    alert(msg.m97);
                    break;
                case "98":
                case "99":
                    alert(msg.m99);
                    break;
                default:
                    alert(msg.m00);
                    break;
            }
        },
        complete: function (results) {
            isCpDown = false;
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert('서버와 통신중 에러가 발생했습니다. ' + errorThrown);
        }
    });
};
Bori9th.prototype.shareSns = function (stype) {

    //Views/PlanShop/Index.cshtml 파일에 이미지 및 문구 저장되어 있음
    var snsURL = "https://goo.gl/Dcba9x";

    if (stype == "F") {
        var url = "http://www.facebook.com/sharer.php?u=" + snsURL;
        window.open(url, "SNS_facebook", "width=500,height=300,toolbar=no,left=150,right=200");
    }
    else if (stype == "B") {
        prompt('CTRL+C를 눌러 클립보드로 복사하세요', snsURL);
    }
    else if (stype == "S") {
        window.open('https://story.kakao.com/share?url=' + snsURL, "SNS_Kakaostory", "width=500,height=650,toolbar=no,left=150,right=200");
    }
    else {
        if (is_ie()) {
            if (confirm("개똥이네 전문관 주소를 복사하시겠습니까?")) {
                window.clipboardData.setData("Text", snsURL);
            }
        }
        else {
            prompt("주소를 복사하여 블로그/까페에 붙여넣기(CTRL+V) 해주세요!", snsURL);
        }
    }
};
// VIP 데이터 로드
Bori9th.prototype.getVipData = function() {
    var 
        that = this;
    
    if (this.isLogin != 'False') {
        $.post('Theme_70484.aspx', { action: 'GetVip', UserID: this.userId }, function (rtn) {
            // TEST 데이터
            //rtn = {
            //    UserNm: '홍길동',
            //    rnkPercent: '77',
            //    avgQty: '11'
            //};
            var a = { data: rtn };
            if (a.data.length) {
                $('.txtbox_area.vip').empty();
                $('#vipLayerTmpl').tmpl(a, { comma: that.fnComma }).appendTo('.popTxt.vip');
                $('.btn_area.getMyMemorial > a').eq(2).show(); 
            }
        });
    } else {
        var a = { data: '' };
        $('#vipLayerTmpl').tmpl(a).appendTo(".popTxt.vip");
    }
};
// 타임특가 상품로드
Bori9th.prototype.getRelayTimeSpecialPrice = function() {
    var 
        that = this;
    $.post('Theme_70484.aspx', { action: 'GetRelayTimeSpecialPrice' }, function (rtn) {
        var a = { data: rtn };
        if (a.data.length) {
            var nd = Date.now();
            var cd = new Date(2017, 3, 19, 15, 0, 0);
            var cd2 = new Date(2017, 3, 20, 9, 0, 0);
            if (nd > cd && nd < cd2) {
                a.data[0].PrstCd = 'elle_bori_deal12';
                a.data[0].ColorCd = 'ZZ9';
                a.data[1].PrstCd = 'toytronboy01';
                a.data[1].ColorCd = 'ZZ9';
            }
            var cd3 = new Date(2017, 3, 20, 15, 0, 0);
            var cd4 = new Date(2017, 3, 21, 9, 0, 0);
            if (nd > cd3 && nd < cd4) {
                a.data[0].PrstCd = '201704120110413000';
                a.data[0].ColorCd = 'ZZ9';
                a.data[1].PrstCd = 'bbz20170420_one';
                a.data[1].ColorCd = 'ZZ9';
            }
            //$('.txtbox_area.vip').empty();
            $('#relayTimeSpecialPrice').tmpl(a, { comma: that.fnComma }).appendTo('#body1 .contentWrap');
        }
        // 타임특가 재고체크
        that.getRelayTimeSpecialPriceCheck();
    });
};
// 타임특가 재고체크
Bori9th.prototype.getRelayTimeSpecialPriceCheck = function() {
    
    var prstCd1 = $('map[name=Map_w01] area').eq(0).attr('PrstCd');
    var colorCd1 = $('map[name=Map_w01] area').eq(0).attr('ColorCd');
    var prstCd2 = $('map[name=Map_w01] area').eq(1).attr('PrstCd');
    var colorCd2 = $('map[name=Map_w01] area').eq(1).attr('ColorCd');

    var chDate = new Date(2017, 3, 17, 9, 0, 0);
    if (Date.now() < chDate.getTime()) {
        $('map[name=Map_w01] area').eq(0).attr('target', "");
        $('map[name=Map_w01] area').eq(0).attr('href', "javascript:alert('오전 9시에 오픈됩니다.');");
        $('map[name=Map_w01] area').eq(1).attr('target', "");
        $('map[name=Map_w01] area').eq(1).attr('href', "javascript:alert('오전 9시에 오픈됩니다.');");
    }
            
    $.post('Theme_70484.aspx', { action: 'GetRelayTimeSpecialPriceCheck', PrstCd: prstCd1, ColorCd: colorCd1 }, function (rtn) {
        if (!rtn) {
            $('.soldout.left').css('display', 'block');
        }
    });
    $.post('Theme_70484.aspx', { action: 'GetRelayTimeSpecialPriceCheck', PrstCd: prstCd2, ColorCd: colorCd2 }, function (rtn) {
        if (!rtn) {
            $('.soldout.right').css('display', 'block');
        }
    });
};