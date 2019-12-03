import config from "../../assets/js/conf/config.js";
import {request} from "../../assets/js/libs/request.js";

export function getClassifyData() {
    return request(config.baseApi+"/home/category/menu?token="+config.token);
}

//获取分类右侧商品
export function getClassifyGoodsData(cid) {
    return request(config.baseApi+"/home/category/show?cid="+cid+"&token="+config.token);
}
//商品详情数据
export function getDetailsData(gid) {
    return request(config.baseApi+"/home/goods/info?gid="+gid+"&type=details&token="+config.token)
}
//商品规格
export function getGoodsAttrData(gid) {
    return request(config.baseApi+"/home/goods/info?gid="+gid+"&type=spec&token="+config.token)
}