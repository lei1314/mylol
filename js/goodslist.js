// 头部引入
$(".topnav").load("head&foot/head.html")
$.getScript("js/head.js");
// 底部引入
$(".foot").load("head&foot/foot.html")
$.getScript("js/foot.js");


// 获取商品
$.get("getGoodsList.php", getgoods);
// 加载商品列表
// 限时抢购
// $.get("getGoodsList.php",getgoods);
function getgoods(p) {
    let data = JSON.parse(p);
    console.log(data);
    let obj = "";
    console.log(data[10].goodsName)
    for (let i = 0; i < data.length; i++) {
        if (data[i].goodsDesc == "商品列表") {
            obj += `
            <li>
                <a class="imgtop" href="details.html?goodsId=${data[i].goodsId}"><img src="${data[i].goodsImg}" alt=""></a>
                <div class="imgbot">
                    <a href="" class="djname"><strong>${data[i].goodsName}</strong></a>
                    <p class="orange">Q币价：<span>${data[i].beiyong2}</span> Q币</p>
                    <p>微信价：<span> ¥&nbsp;${data[i].goodsPrice}</span></p>
                    <span class="imgbotid" style="display:none;">${data[i].goodsId}</span>
                    <p class="pt dr"><a href="javascript:">立即购买</a></p>
                </div>
            </li>
            `
        }
    }
    // 列表
    $(".listgoods>ul").append(obj);
    // 购买时
    $(".dr").click(function () {
        if ($("#userSpan").html() == "") {
            $(".registerin,.over").css("display", "block")
        } else {
            $(".addgoodscar").css({ "display": "block" });
            // 获取id
            $(".btnsend").siblings(".goodsbotid").html($(this).siblings(".imgbotid").html());
            // 获取图片
            let osrc = $(this).parent().parent().find(".imgtop>img").prop("src");
            $(".addgoodscar").find("img").attr("src", osrc);
            // 价格
            $(".btnsend").prev().prev().find("span").html($(this).siblings(".orange").find("span").text());
            // 名称
            $(".goodsleft").find("p").html($(this).siblings(".djname").find("strong").text())
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

    // 加动画
    $(".dr").mouseover(function () {
        $(this).css({ "position": "relative", "background-color": "#DEE1E6", "color": "red" }).stop()
            .animate({ "bottom": "5px" }, 500)
    })
    $(".dr").mouseout(function () {
        $(this).css({ "position": "", "background-color": "", "color": "" }).stop()
            .animate({ "bottom": "" }, 500)
    });

    // ---改变限时购买下面的字体颜色
    $(".hred").mouseover(function () {
        $(this).css("color", "red")
    }).mouseout(function () {
        $(this).css("color", "#000")

    })

    // 滑过变绿
    $(".green1").hover(function () {
        $(this).css({ "color": "#36ab87" })
    }, function () {
        $(this).css({ "color": "#000" })
    })
    // 新品上架绿色边框
    $(".platelist li").hover(function () {
        $(this).css({ "background-position": " -237px -385px" })
    }, function () {
        $(this).css({ "background-position": " -237px -6px" })
    })

    // 周边商城加边框
    $(".link img").hover(function () {
        $(this).css({ "border": "none" });
        // $(".hred").css({"color":"red"})

    }, function () {
        $(this).css({ "border": "30px solid #fff" })
    })





    // 主导航栏变橙色
    $(".orange1").hover(function () {
        $(this).css({ "color": "#ff5900" })
    }, function () {
        $(this).css({ "color": "#9f9f9f" })
    })
    // 输入框的内容定时切换
    let str1 = ["儿童劫皮肤", "小学生诺手", "无敌托儿索"];
    let i = 0;
    setInterval(function () {
        i++;
        if (i == str1.length) {
            i = 0;
        };
        $(".qiehuan").attr("placeholder", str1[i])
    }, 1000)
    // 返回顶部
    $(".go-top").click(function () {
        let top = document.documentElement.scrollTop || document.body.scrollTop;
        console.log(top);
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    })
}
