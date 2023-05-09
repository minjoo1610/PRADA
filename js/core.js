$(document).ready(function(){
    gnbControl();
    customBxSlider(".mainSlider",1,1,0,0,true,null);
    customBxSlider(".pscarousel",1,1,0,0,true,".customPager");
    toggleFunc(".wishNcart [id$='Container'] ol.wishBox li figure figcaption input[value='spicon']");
    toggleFunc(".wishNcart [id$='Container'] .cartBox ol li figure figcaption input[value='whicon']");
    toggleFunc("[class$='List'] ul li figure figcaption input[type='button']");
    toggleFunc(".detailContainer aside h2 a");
    toggleFunc(".storecontainer div fieldset:nth-of-type(2) input[type='button']");
    toggleFunc(".faq_Area .faq_Detail ul li");
    toggleFunc(".detailContainer aside h2 a");
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
function customBxSlider(target,pagCusVal){
    $(target).bxSlider({
        pagerCustom : pagCusVal
    });
}
function gnbControl(){
    $("#fnbButton").click(function(){ 
        var currentTxt = $(this).text(); 
        var openTarget = $(this).attr('data-container'); 

        if(currentTxt == "close"){ 
            $(this).text("menu");
        }else if(currentTxt == "menu"){ 
            $(this).text("close");
        }
        $("#" + openTarget).toggleClass("active"); 
    });
}

function toggleFunc(target){
    $(target).click(function(){
        $(this).toggleClass('active');
    });
}

function detailScroll(target){ 
    if (window.matchMedia("(min-width: 1280px)").matches) {
        var containerH = $(target).height(); 
        var scrollLock = containerH; 
        $(window).scroll(function(){ 
            if($(this).scrollTop() > scrollLock){ 
                $(target).addClass("lock"); 
            }else{ 
                $(target).removeClass("lock"); 
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
function popupControl(openBtn){  
    var popupName = null;
    $(openBtn).click(function(){
        popupName = "#" + $(this).attr('data-popup'); 
        $(popupName).addClass("active"); 
    });
    $(".btn_close").click(function(){ 
        $(popupName).removeClass("active");  
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
    $(".btn_close").click(function(){ 
        $(containerName).removeClass("active");  
    });
}
function asideTabControl(menu,box){
    var boxName = null;
    $(menu).click(function(){
        boxName = "#" + $(this).attr("data-container");
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
        $(this).closest("[class*='Box']").removeClass("active"); 
        $(".emptyBox").addClass("active"); 
    });
}
function dummyLogin(){
    $(".notSignin > *").click(function(){ 
        $("#gotoSignIn").addClass("active"); 
    });
}