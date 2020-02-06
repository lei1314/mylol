// 头部引入
$(".topnav").load("head&foot/head.html")
$.getScript("js/head.js",function(){
    $.get(
        "getShoppingCart.php",
        {
            // 购物车的数量
            username: $("#userSpan").html()
        },
        fun,
        "json"
    ).then(function () {
        // 购物车显示件数
        $(".goods-upnum").html("(" + ($(".subtotal").length) + ")");
        // 计算
        totalMoney()
        // 减
        $(".prevbtn").click(function () {
            reduce($(this));
        })
        // 加
        $(".nextbtn").click(function () {
            add($(this));
        })
        // 获取删除按钮
        $(".delbtn").click(function () {
            deleteGoods($(this));
        })
    })
});
// 底部引入
$(".foot").load("head&foot/foot.html")
$.getScript("js/foot.js");

function fun(objs) {
    console.log(objs)

    // let objs = JSON.parse(str);
    // console.log(objs)
    let htmlstr = "";
    for (let i in objs) {
        // console.log(objs[i])
        htmlstr += `
                    <tr>
                        
                        <td><input type="checkbox"></td>
                        <td><a href=""><img src="${objs[i].goodsImg}" alt="">${objs[i].goodsName}</a></td>
                        <td>${objs[i].goodsType}</td>
                        <td><span>${objs[i].goodsPrice}</span>&nbsp;Q币</td>
                        <td>永久</td>
                        <td>
                        <span style="display:none;">${objs[i].goodsId}</span>
                        <button class="prevbtn">-</button>
                        <input class="goods-num" type="text" value="${objs[i].goodsCount}">
                        <button class="nextbtn">+</button>
                        </td>
                        <td>限时折扣</td>
                        <td><span class="subtotal">${objs[i].goodsPrice * objs[i].goodsCount}</span>&nbsp;Q币</td>
                        <td>
                            <button>关注</button><button class="delbtn">删除</button><span style="display:none;">${objs[i].goodsId}</span>
                        </td>
                    </tr>
                 `;
    }
    $(".firsttr").after(htmlstr);
}
// 添加按钮
function add(btn) {
    // 数量
    let goodsnum = 0;
    $(".goods-num").each(function () {
        goodsnum += +$(this).val();
    })
    if (goodsnum > 9) {
        alert("不能超过十个")
        return;
    }
    btn.prev().val(+btn.prev().val() + 1);
    btn.parent().next().next().find("span").html((btn.parent().prev().prev().find("span").html() * btn.prev().val()).toFixed(2));
    totalMoney();
    $.get(
        "updateGoodsCount.php",
        {
            username: $("#userSpan").html(),
            goodsId: btn.siblings("span").html(),
            goodsCount: btn.siblings("input").val()
        },
        function (data) {
            if (data == "1") {
                console.log("修改成功");
            } else {
                console.log("修改失败")
            }
        }
    )

}
// 减少按钮
function reduce(btn) {
    if (btn.next().val() == 1) {
        alert("不能再减了");
        return;
    }
    btn.next().val(btn.next().val() - 1);
    btn.parent().next().next().find("span").html((btn.parent().prev().prev().find("span").html() * btn.next().val()).toFixed(2));
    totalMoney();
    $.get(
        "updateGoodsCount.php",
        {
            username: $("#userSpan").html(),
            goodsId: btn.siblings("span").html(),
            goodsCount: btn.siblings("input").val()
        },
        function (data) {
            if (data == "1") {
                console.log("修改成功");
            } else {
                console.log("修改失败")
            }
        }
    )
}
// 删除
function deleteGoods(btn) {
    console.log($("#userSpan").html())
    console.log(btn.siblings("span").html())
    $.get(
        "deleteGoods.php",
        {
            username: $("#userSpan").html(),
            goodsId: btn.siblings("span").html()
        },
        function (data) {
            if (data == "1") {
                alert("删除成功");
            } else {
                alert("删除失败")
            }
        }
    )
    btn.parent().parent().remove();
    totalMoney();
    // 购物车的数量
    $(".goods-upnum").html("(" + ($(".subtotal").length) + ")");
}
// 计算
function totalMoney() {
    // 数量
    let goodsnum = 0;
    $(".goods-num").each(function () {
        goodsnum += +$(this).val();
    })
    if (goodsnum > 10) {
        alert("不能超过十个")
        return;
    }
    // 获取当前共计
    let sum = 0;
    $(".subtotal").each(function () {
        sum += +$(this).html();
    })
    $(".actual-price").html(sum.toFixed(2))
    $(".totalMoney").html(sum.toFixed(2));
    $(".totalnum").html(goodsnum);
}





// 点击单选全选按钮时
$(".checkallid").click(function () {
    $(".checkallid").checkAll($(".tablebox  :checkbox"));
});
$(".tablebox :checkbox").not(".checkallid").click(function () {
    $(".tablebox :checkbox").not(".checkallid").bindLeaderCHK($(".checkallid"));
});
//全选插件：
jQuery.fn.extend({
    checkAll: function ($sonCheckbox) {
        // this:是checkAll函数的所属对象
        $sonCheckbox.prop("checked", this.prop("checked"));
        // $sonCheckbox.prop("checked","cheched");

    },
    bindLeaderCHK: function ($leaderCHK) {
        //this:是bindLeaderCHK函数所属的对象
        let isAll = true;//假定全部选中
        this.each(function () {
            //this:是循环过程中的当前元素（dom元素）
            if (!$(this).prop("checked")) {
                isAll = false;
            }
        });
        $leaderCHK.prop("checked", isAll);
    }
});









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
