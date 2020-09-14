var express = require('express');
var data = require('../db.json');
var router = express.Router();
var svgcaptcha = require('svg-captcha');

var reqData;
router.use((req,res,next)=>{
    reqData={
        code:0,
        message:''
    };
    next();
});
router.get('/position',(req,res)=>{
    console.log("进来了1");
    reqData.data = {name:"天通苑"};
    res.json(reqData);
});
router.get('/index_category',(req,res)=>{
    console.log("进来了2");
    reqData.data = [{
        title:"甜品饮品",
        image_urlL:"star.png"
    },{
        title:"商超便利",
        image_urlL:"star.png"
    },{
        title:"美食",
        image_urlL:"star.png"
    },{
        title:"简餐",
        image_urlL:"star.png"
    },{
        title:"新店特惠",
        image_urlL:"star.png"
    },{
        title:"准时达",
        image_urlL:"star.png"
    },{
        title:"预订早餐",
        image_urlL:"star.png"
    },{
        title:"土豪推荐",
        image_urlL:"star.png"
    },{
        title:"甜品饮品",
        image_urlL:"star.png"
    },{
        title:"商超便利",
        image_urlL:"star.png"
    },{
        title:"美食",
        image_urlL:"star.png"
    },{
        title:"简餐",
        image_urlL:"star.png"
    },{
        title:"新店特惠",
        image_urlL:"star.png"
    },{
        title:"准时达",
        image_urlL:"star.png"
    },{
        title:"预订早餐",
        image_urlL:"star.png"
    },{
        title:"土豪推荐",
        image_urlL:"star.png"
    }];
    res.json(reqData);
});
router.get('/shops',(req,res)=>{
    console.log("进来了3");
    const longitude = req.query.longitude;
    const latitude = req.query.latitude;
    if (longitude === "116.2431" && latitude === "40.0423"){
        reqData.data = [data.shops.满堂花醉,data.shops.三千客,data.shops.一剑霜寒,data.shops.十四州];
    }else{
        reqData.message = "地址有误"
    }
    res.json(reqData);
});
router.get('/info',(req,res)=>{
    console.log("进来了4");
    const shopNow = req.query.shopNow || '';
    console.log(shopNow);
    switch (shopNow) {
        case "_mantanghua" : reqData.data = data._mantanghua; break;
        case "_sanqianke" : reqData.data = data._sanqianke; break;
        case "_yijianshuang" : reqData.data = data._yijianshuang; break;
        case "_shisizhou" : reqData.data = data._shisizhou; break;
        default : reqData.message = "暂无该商铺信息";
    }
    res.json(reqData);
});
router.get('/search_shops',(req,res)=>{
    console.log("进来了5");
    const geohash = req.query.geohash || '';
    const keyword = req.query.keyword || '';
    if (geohash === '40.0423,116.2431'){
        switch (keyword) {
            case "满堂花醉" : reqData.data = [data.shops.满堂花醉]; break;
            case "三千客" : reqData.data = [data.shops.三千客]; break;
            case "一剑霜寒" : reqData.data = [data.shops.一剑霜寒]; break;
            case "十四州" : reqData.data = [data.shops.十四州]; break;
            default :   reqData.message = "暂无该商铺信息";
        }
    }
    res.json(reqData);
});
router.get('/captcha',(req,res)=>{
    console.log("进来了6");
    var code = svgcaptcha.create({
        size:5,                 // 验证码长度
        background:"#f4f3f2",   // 验证码图片背景颜色
        noise:2,                // 干扰线条的数量
        ignoreChars:'0o1i',     // 验证码字符中排除 0o1i
        color:true              // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
    });

    /*
    该函数返回的对象拥有以下属性
data: string // svg 路径
text: string // 验证码文字
svgCaptcha.createMathExpr(options)
和前面的 api 的参数和返回值都一样。
不同的是这个 api 生成的 svg 是一个算数式，
而 text 属性上是算数式的结果。不过用法和之前是完全一样的。
svgCaptcha.loadFont(url)

加载字体，覆盖内置的字体
     */

    reqData.message = code.text.toLowerCase();
    console.log(reqData.message);
    res.type('svg');
    res.send(code.data);
});
router.post('/login_pwd',(req,res)=>{
    console.log("进来了7");
    console.log(req.body);
    const name = req.body.name||'';
    const pwd = req.body.pwd||'';
    const captcha = req.body.captcha||'';
    reqData.data = {
        _id:true,
        phone:12345678909,
        name: 'L',
        // photo: 'http://localhost:4000/headPortrait',
        photo: 1,
        balance: 319,
        discount: 9,
        integral: 99,
        order:[]

    };
    res.json(reqData);
});
// router.get('/headPortrait',(req,res)=>{
//     console.log("进来了8");
//
//     res.send(image);
// });
router.get('/sendcode',(req,res)=>{
    console.log("进来了9");        //短信验证码
    const phone = req.query.phone||'';
    console.log(phone);
    reqData.message = 123456;
    res.json(reqData);
});
router.post('/login_sms',(req,res)=>{
    console.log("进来了10");
    console.log(req.body);
    const phone = req.body.phone||'';
    const code = req.body.code||'';
    reqData.data = {
        _id:true,
        phone:98765432101,
        name: 'S',
        // photo: 'http://localhost:4000/headPortrait',
        photo: 3,
        balance: 120,
        discount: 9,
        integral: 99,
        order:[]
    };
    res.json(reqData);
});

module.exports = router;