// 头部引入
$(".topnav").load("head&foot/head.html")
$.getScript("js/head.js");
// 底部引入
$(".foot").load("head&foot/foot.html")
$.getScript("js/foot.js");


// 主导航栏变橙色
$(".orange1").hover(function () {
    $(this).css({ "color": "#ff5900" })
}, function () {
    $(this).css({ "color": "#9f9f9f" })
})

// 子导航栏
$(".write").hover(function () {
    $(this).css({ "color": "#fff" })
}, function () {
    $(this).css({ "color": "#9f9f9f" })
})
// 滑过变绿
$(".green1").hover(function () {
    $(this).css({ "color": "#36ab87" })
}, function () {
    $(this).css({ "color": "#000" })
})




// 输入框的内容定时切换
let str1 = ["儿童劫皮肤", "小学生诺手", "无敌托儿索"];
let i = -1;
setInterval(function () {
    i++;
    if (i == str1.length) {
        i = 0;
    };
    $(".qiehuan").attr("placeholder", str1[i])
}, 1000)

// // 倒计时
// let myDate = new Date();
// let h =24-myDate.getHours();
// daoTime(24, 00, 00)
// function daoTime(h, m, s) {
//     let time;
//     clearInterval(time);
//     time = setInterval(function () {
//         s--;
//         if (h == 0 && m == 0 & s == 0) {
//             clearInterval(time);
//         }
//         if (s == -1) {
//             s = 59;
//             m--;
//             if (m == -1) {
//                 m = 59;
//                 h--;
//             }
//         }
//         show();
//     }, 1000);
//     //输入框显示内容
//     function show() {
//         $(".hour").html(h < 10 ? "0" + h : h);
//         $(".min").html(m < 10 ? "0" + m : m);
//         $(".ss").html(s < 10 ? "0" + s : s);
//     }
// }
//秒杀倒计时
setInterval(function () { //  使用定时器获取现在的时间
    let nowtime = new Date(); //获取现在的时间
    let h = J0(24 - (nowtime.getHours() + 1));
    let min = J0(59 - nowtime.getMinutes());
    let sec = J0(60 - nowtime.getSeconds());

    $(".min").html(min);
    $(".ss").html(sec);
    // console.log(h)
    $(".hour").html(h);
})

function J0(num) { //用函数把数字小于10时在数字前面添加"0"封装
    if (num < 10) {
        num = "0" + num;
    }
    return num;
}



// 获取商品
$.get("getGoodsList.php", getgoods);
// 加载商品列表
// 限时抢购
// $.get("getGoodsList.php",getgoods);
function getgoods(p) {
    let data = JSON.parse(p);
    console.log(data);
    let obj = "";
    let obj1 = "";
    for (let i in data) {
        if (data[i].goodsDesc == "限时抢购") {
            obj += `
                <li class="opct">
                    <div class="likediv">
                        <span class="likedivid" style="display:none;">${data[i].goodsId}</span>
                        <p class="zj">直降<b>49.50Q币</b></p>
                        <a class="godetails1" href="details.html?goodsId=${data[i].goodsId}"><img src="${data[i].goodsImg}" alt=""></a>
                        <p class="djname"><a href="">${data[i].goodsName}</a></p>
                        <p class="orange">
                            <strong>${data[i].goodsPrice}</strong>元
                            <del>(99QB)</del>
                        </p>
                        <p>剩余时间: <span class="hour"></span>时<span class="min"></span>分<span
                                class="ss"></span>秒</p>
                        <a class="btncom dr" href="javascript:">立即购买</a>
                    </div>
                </li>
            `
        }
        if (data[i].goodsDesc == "新品上架") {
            obj1 += `
                <li>
                    <a class="imgtop" href=""details.html?goodsId=${data[i].goodsId}""><img src="${data[i].goodsImg}" alt=""></a>
                    <div class="imgbot">
                        <span style="display:none">${data[i].goodsId}</span>
                        <a href="javascript:"><strong>${data[i].goodsName}</strong></a>
                        <p>Q币价：<span>${data[i].beiyong1} Q币</span></p>
                        <p>微信价：<strong> ¥&nbsp;${data[i].goodsPrice}</strong></p>
                        <p class="pt dr"><a href="javascript:">立即购买</a> </p>
                    </div>
                </li>
            `
        }
    }
    // 限时抢购
    $(".likebox>ul").append(obj);
    // 新品上架
    $(".platelist").append(obj1)

    // 限时抢购加透明度
    $(".opct").mouseover(function () {
        $(this).css("opacity", 0.6)
    }).mouseout(function () {
        $(this).css("opacity", 1)

    })

    // ---改变限时购买下面的字体颜色
    $(".hred").mouseover(function () {
        $(this).css("color", "red")
    }).mouseout(function () {
        $(this).css("color", "#000")

    })

    // 加动画
    $(".dr").mouseover(function () {
        $(this).css({ "position": "relative", "background-color": "#DEE1E6", "color": "red" }).stop()
            .animate({ "bottom": "5px" }, 500)
    })
    $(".dr").mouseout(function () {
        $(this).css({ "position": "", "background-color": "", "color": "" }).stop()
            .animate({ "bottom": "" }, 500)
    });
    // 新品上架绿色边框
    $(".platelist li").hover(function () {
        $(this).css({ "background-position": " -237px -385px" })
    }, function () {
        $(this).css({ "background-position": " -237px -6px" })
    })
    // 移到活动中心改变背景图
    $(".hd").hover(function () {
        $(this).css({ "background-position": "-6px -388px" })
    }, function () {
        $(this).css({ "background-position": "" })
    })
    // 周边商城加边框
    $(".outline").hover(function () {
        $(this).css({ "border": "none" });
        // $(".hred").css({"color":"red"})

    }, function () {
        $(this).css({ "border": "30px solid #fff" })
    })


    // 购买时
    $(".dr").click(function () {
        if ($("#userSpan").html() == "") {
            $(".registerin,.over").css("display", "block")
        } else {
            $(".addgoodscar").css({ "display": "block" });
            // 获取id
            console.log($(this).siblings(".likedivid").text())
            $(".addgoodscar").find(".goodsbot>.goodsright>.goodsbotid").html($(this).siblings(".likedivid").text());
            // 获取图片
            let osrc = $(this).parent().find("img").prop("src");
            $(".addgoodscar").find(".goodsbot>.goodsleft>img").attr("src", osrc);
            // 价格
            $(".addgoodscar").find(".goodsbot>.goodsright>p>.goodsospan").html($(this).siblings(".orange").find("strong").text());
            // $(".btnsend").prev().prev().prev().find("span").html($(this).siblings(".orange").find("strong").text());
            // 名称
            $(".goodsleft").find("p").html($(this).siblings(".djname").find("a").text())
        }
    })
    // 点击加入购物车时
    $(".btnsend").click(function () {
        // console.log($(this).parent().siblings(".goodsleft").children("img").attr("src"));
        console.log($("#userSpan").html());
        console.log($(this).siblings(".goodsbotid").text())

        $.post("addShoppingCart.php",
            {
                "username": $("#userSpan").html(),
                "goodsId": $(this).siblings(".goodsbotid").text(),
                "goodsCount": 1
            }
            , fun2
        )
    })

    function fun2(obj) {
        if (obj == "1") {
            alert("添加成功");
            $(".addgoodscar").css({ "display": "none" })
        } else {
            alert("添加失败");
        }
    }
    // 关闭
    $(".btnclose").click(function () {
        $(".addgoodscar").css({ "display": "none" })

    })
}

//滚动条的事件
$(window).scroll(function () {
    // let top = document.documentElement.scrollTop || document.body.scrollTop;
    // console.log(top);

    if ($(document).scrollTop() > 674) {
        $(".fixednav").css({
            top: $(document).scrollTop() + 60
        });
        $(".fixednav>a").eq(0).css({
            color: "red"
        });

        // 动画渐入
        $(".jjj").slideDown();
    } else {
        $(".fixednav").eq(0).css({
            top: 674
        });
        $(".fixednav>a").eq(0).css({
            color: "#333"
        });
        $(".jjj").slideUp();
    };
    if ($(document).scrollTop() > 1638 && $(document).scrollTop() < 2520) {
        $(".fixednav>a").eq(1).css({ color: "red" })
        $(".fixednav>a").eq(0).css({ color: "#333" });
    } else {
        $(".fixednav>a").eq(1).css({ color: "#333" })
    }
    if ($(document).scrollTop() > 2520 && $(document).scrollTop() < 3564) {
        $(".fixednav>a").eq(2).css({ color: "red" })
        $(".fixednav>a").eq(0).css({ color: "#333" });

    } else {
        $(".fixednav>a").eq(2).css({ color: "#333" })
    }
    if ($(document).scrollTop() > 3564) {
        $(".fixednav>a").eq(3).css({ color: "red" })
        $(".fixednav>a").eq(0).css({ color: "#333" });

    } else {
        $(".fixednav>a").eq(3).css({ color: "#333" })
    }
});
// 返回顶部
$(".go-top").click(function () {
    // let top = document.documentElement.scrollTop || document.body.scrollTop;
    // console.log(top);
    // // document.body.scrollTop=document.documentElement.scrollTop=0;
    $('body,html').animate({ scrollTop: 0 }, 1500);
})

// 锚点连接
$(".fixednav>a").eq(0).click(function () {
    $('body,html').animate({ scrollTop: 674 }, 1500);
});
$(".fixednav>a").eq(1).click(function () {
    $('body,html').animate({ scrollTop: 1638 }, 1500);
});
$(".fixednav>a").eq(2).click(function () {
    $('body,html').animate({ scrollTop: 2520 }, 1500);
});
$(".fixednav>a").eq(3).click(function () {
    $('body,html').animate({ scrollTop: 3564 }, 1500);
});
// 分页效果
let flag = true; // 如果值为真  可以点击
// 左按钮
$(".btnleft").click(function () {
    if (flag) {
        flag = false;
        $(".pagebox>ul").animate({
            "marginLeft": -1190
        }, 500, function () {
            $(".pagebox>ul").css("margin-left", 0)
                .find($(".pagebox>ul>li").eq(4).prevAll())
                .appendTo($(".pagebox>ul"));
            flag = true;
        })
    }
})
// 右按钮
$(".btnright").click(function () {
    if (flag) {
        flag = false;
        //先将ul的最后一个li调整到最前面
        $($(".pagebox>ul>li").eq(3).nextAll()).prependTo($(".pagebox>ul"));
        //将ul的left值调整到-300
        $(".pagebox>ul").css("margin-left", "-800px");
        //以运动的方式  ul目标值调整到0
        $(".pagebox>ul").animate({
            "marginLeft": 0
        }, 500, function () {
            flag = true;
        });
    }
});
// 山寨版照片墙
setInterval(function () {
    $(".photobox>ul").animate({ "marginLeft": -1200 }, 20000, function () {
        $(".photobox>ul").css("margin-left", 0)
    })
}, 100)
