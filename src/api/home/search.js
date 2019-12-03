import config from "../../assets/js/conf/config.js";
import {request} from "../../assets/js/libs/request.js";

//获取热门搜索关键词
export function getHotKwordsData() {
    return request(config.baseApi+"/home/public/hotwords?token="+config.token)
}

//搜索商品
let kwords="",page=1,price1="",price2="",cid="",param="",otype="";
export function getSearchGoodsData(data) {
    if(data instanceof Object){
        //当输入新的关键词时，一直获取上一个搜索的关键字，并且最终合并为一个
        // getSearchGoodsData({cid:衣服})
        // getSearchGoodsData({price:99})
        // {cid:衣服,price:99}
        kwords=data.kwords!=undefined?data.kwords:kwords;
        page=data.page!=undefined?data.page:page;
        price1=data.price1!=undefined?data.price1:price1;
        price2=data.price2!=undefined?data.price2:price2;
        cid=data.cid!=undefined?data.cid:cid;
        param=data.param!=undefined?JSON.stringify(data.param):param;
        otype=data.otype!=undefined?data.otype:otype
        let url=config.baseApi+"/home/goods/search?kwords="+kwords+"&param="+param+"&page="+page+"&price1="+price1+"&price2="+price2+"&otype="+otype+"&cid="+cid+"&token="+config.token;
        // console.log(url);
        return request(url)
    }
}

//产品搜索页面属性参数
export function getAttrsData(kwords){
    return request(config.baseApi+"/home/goods/param?kwords="+kwords+"&token="+config.token);
}