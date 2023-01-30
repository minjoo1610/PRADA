$(document).ready(function(){
    gnbControl();
    customBxSlider(".mainSlider",1,1,0,0,true,null);
    customBxSlider(".pscarousel",1,1,0,0,true,".customPager");
    toggleFunc(".wishNcart [id$='Container'] ol.wishBox li figure figcaption input[value='spicon']");
    toggleFunc(".wishNcart [id$='Container'] .cartBox ol li figure figcaption input[value='whicon']");
    toggleFunc("input[value='hticon']");
    toggleFunc(".storecontainer div fieldset:nth-of-type(2) input[type='button']");
    toggleFunc(".faq_Area .faq_Detail ul li");
    if (window.matchMedia("(max-width: 767px)").matches) {
        toggleFunc("#fnbContainer div ul li:first-child");
    }
    tabControl(".ppmenu div ul li h3","[id^='ppName']");
    tabControl(".ppmenu div ul li h3","[id^='tsName']");
    tabControl(".ppmenu div ul li h3","[id^='tuName']");
    detailScroll(".detailContainer aside");
    $(".fitvidsElement").fitVids();
    asideControl("header nav ul li input[type='button']:not(#fnbButton)");
    asideTabControl(".wishNcart ul li",".wishNcart > div");
    popupControl('.btn_confirm');
    popupControl('.btn_confirmM');
    popupControl("header div nav ul li:first-child input[type='button']");
    popupControl(".storecontainer > div > form div:last-of-type input[type='button']");
    wishBoxSwap();
    detailCartCall();
    tabControl(".faq_Area nav ul li",".faq_Detail");
    dummyLogin();
});
function customBxSlider(target,maxVal,minVal,marginVal,wVal,pagVal,pagCusVal){
    $(target).bxSlider({
        maxSlides: maxVal,
        minSlides: minVal,
        slideMargin: marginVal,
        slideWidth: wVal,
        pager: pagVal,
        pagerCustom : pagCusVal
    });
}
function gnbControl(){
    $("#fnbButton").click(function(){ // fnbButton 아이디를 클릭 했을때 익명함수 실행
        var currentTxt = $(this).text(); // currentTxt 라는 변수에 this(#fnbButton)의 글자(menu)를 담아라
        var openTarget = $(this).attr('data-container'); // openTarget 이라는 변수에 this(#fnbButton)의 속성(attribute) data-container(fnbContainer) 값을 담아라.

        if(currentTxt == "close"){ // currentTxt라는 변수에 close 가 적혀 있을 땐 menu라는 글자를 넣어주고
            $(this).text("menu");
        }else if(currentTxt == "menu"){ // 그게아니라 menu라는 글자가 적혀 있을 땐 close라는 글자를 넣어줘라.
            $(this).text("close");
        }

        $("#" + openTarget).toggleClass("active"); // # + fnbContainer = #fnbContainer에 active라는 class를 toggle(한번누를땐 넣었다가 또 누르면 빼기) 시켜라.
    });
}

function toggleFunc(target){
    $(target).click(function(){
        $(this).toggleClass('active');
    });
    /*
        toggleFunc의 target 이라는 매개변수를 통해 대상이 들어오면
        그 대상이 클릭되었을때 클릭한 당사자(this)만 class를 toggle 한다.(toggleClass)
    */
}

function detailScroll(target){ //.detailContainer aside가 대상임 
    if (window.matchMedia("(min-width: 1280px)").matches) {
        var containerH = $(target).height(); // 우측면 aside의 높이 구하기.
        var scrollLock = containerH / 2; // 그 높이가 절반이 지나갔을때 수치를 구하기.
        $(window).scroll(function(){ // browser에 scroll이 작동 되었을 때
            if($(this).scrollTop() > scrollLock){ // 만약 browser의 scrollTop(스크롤막대의윗면)이 aside 높이의 절반보다 커지면
                $(target).addClass("lock"); // aside에 lock 걸기
            }else{ // 그 외 나머지 상황엔
                $(target).removeClass("lock"); // aside에 lock 풀기
            }
        });
    }else if(window.matchMedia("(max-width: 1279px)").matches){
        var toggleStatus = false;
        $(target).children(".toggleBtn").click(function(){
            toggleStatus = !toggleStatus;
            if(toggleStatus == false){
                $(this).val("OPEN");
            }else{
                $(this).val("CLOSE");
            }
            $(target).toggleClass("open");
        });
    }
}
function popupControl(openBtn){ // 팝업컨트롤 오픈버튼 
    var popupName = null;
    $(openBtn).click(function(){ // 오픈 버튼을 클릭했을 때 실행해라
        popupName = "#" + $(this).attr('data-popup'); //팝업네임은 이 아이디 데이터파업을 찾아라 
        $(popupName).addClass("active"); // 팝업네임은 클래스 엑티브를 추가해라 
    });
    $(".btn_close").click(function(){ // 닫기 버튼을 클릭했을때 실행해라 
        $(popupName).removeClass("active"); // 실행했을때 팝업네임은 클래스 엑티브를 제거해라 
    });
}

function asideControl(openBtn){
    var containerName = null;
    var currentTabName = null;
    $(openBtn).click(function(){
        containerName = "." + $(this).attr('data-container');
        currentTabName = $(this).val();
        $(".wishNcart ul li").removeClass("active");
        if(currentTabName == "wishContainer"){
            $(".wishNcart ul li:first-child").addClass("active");
        }else if(currentTabName == "cartContainer"){
            $(".wishNcart ul li:nth-child(2)").addClass("active");
        }
        depth2Name = "#" + $(this).val();
        $(containerName).toggleClass("active");
        $(containerName).children("div").removeClass("active");
        $(containerName).children(depth2Name).addClass("active");
    });
    $(".btn_close").click(function(){ // 닫기 버튼을 클릭했을때 실행해라 
        $(containerName).removeClass("active"); // 실행했을때 팝업네임은 클래스 엑티브를 제거해라 
    });
}
function asideTabControl(menu,box){
    var boxName = null;
    $(menu).click(function(){
        boxName = "#" + $(this).attr('data-container');
        $(box).removeClass("active");
        $(boxName).addClass("active");
        $(menu).removeClass("active");
        $(this).addClass("active");
    });
}
function detailCartCall(){
    $(".detailContainer a.btn.blackWhite").click(function(){
        $(".wishNcart").addClass("active");
        $(".wishNcart ul li:nth-child(2)").addClass("active");
    });
    $(".btn_close").click(function(){
        $(".wishNcart").removeClass("active"); 
    });
}

function tabControl(target,panel){
    var currentTab = null;
    var thisOffSet = $("header").height();
    $(target).click(function(){
        currentTab = "#" + $(this).attr("data-tabname");
        $(target).removeClass("active");
        $(this).addClass("active");
        $(panel).removeClass("active");
        $(currentTab).addClass("active");
        $(window).scrollTop(thisOffSet);
    });
}
function wishBoxSwap(){
    $("input[value='delete']").click(function(){
        // console.log($(this));
        $(this).closest("[class*='Box']").removeClass("active");
        $(".emptyBox").addClass("active");
    });
}
function dummyLogin(){
    $(".notSignin > *").click(function(){
        $("#gotoSignIn").addClass("active");
    });
}