import config from "../../assets/js/conf/config.js";
import {request} from "../../assets/js/libs/request.js";

//获取轮播图数据
export function getSwiperData() {
    return request(config.baseApi+"/home/index/slide?token="+config.token);
}
//获取导航菜单数据
export function getNavData() {
    return request(config.baseApi+"/home/index/nav?token="+config.token)
}
//商品列表
export function getGoodsData() {
    return request(config.baseApi+"/home/index/goodsLevel?token="+config.token)
}
//为你推荐
export function getRecoGoodsData() {
    return request(config.baseApi+"/home/index/recom?token="+config.token)
}