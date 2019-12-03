import Vue from 'vue';
import {getClassifyData,getClassifyGoodsData,getDetailsData,getGoodsAttrData} from "../../../api/home/goods.js";

let modules={
    namespaced:true,
    state:{
        classifys:[],
        goods:[],
        detailsGoods:{},
        attrs:[]
    },
    mutations:{
        //获取分类
        getClassify(state,payload){
            getClassifyData().then(res=>{
                if(res.code==200){
                    for (let key in res.data){
                        res.data[key].active=false;
                        res.data[key].checked=false;//操作搜索筛选分类的样式
                    }
                    state.classifys=res.data;
                    if(payload && payload.success){
                        payload.success();
                    }
                }
            })
        },
        //选择分类
        selectClassify(state,payload){
            if(state.classifys.length>0){
                for(let key in state.classifys){
                    if(state.classifys[key].active){
                        state.classifys[key].active=false;
                        break;
                    }
                }
                state.classifys[payload.index].active=true;
            }
        },
        //获取分类商品里的内容
        getClassifyGoods(state,payload){
            getClassifyGoodsData(payload.cid).then(res=>{
                if(res.code==200){
                    state.goods=res.data;
                    if(payload && payload.success){
                        payload.success();
                    }
                }else{
                    state.goods=[];
                }
            })
        },
        //获得商品数据
        getDetails(state,payload){
            getDetailsData(payload.gid).then(res=>{
                if(res.code==200){
                    state.detailsGoods=res.data;
                    if(payload && payload.success){
                        payload.success();
                    }
                }
            })
        },
        //获得商品规格
        getGoodsAttr(state,payload){
            getGoodsAttrData(payload.gid).then(res=>{
                if(res.code==200){
                    for (let key in res.data){
                        for(let key2 in res.data[key].values){
                            res.data[key].values[key2].active=false
                        }
                    }
                    state.attrs=res.data;
                }
            })
        },
        //选择商品属性
        selectAttrs(state,payload){
            if(state.attrs.length>0){
                for(var i=0;i<state.attrs[payload.index].values.length;i++){
                    if(state.attrs[payload.index].values[i].active){
                        state.attrs[payload.index].values[i].active=false;
                        break;
                    }
                }
                state.attrs[payload.index].values[payload.index2].active=true;
                Vue.set(state.attrs[payload.index].values,payload.index2,state.attrs[payload.index].values[payload.index2]);
            }
        }
    },
    actions:{
        getClassify(conText,payload){
            conText.commit("getClassify",payload)
        },
        selectClassify(conText,payload){
            conText.commit("selectClassify",payload)
        },
        getClassifyGoods(conText,payload){
            conText.commit("getClassifyGoods",payload)
        },
        getDetails(conText,payload){
            conText.commit("getDetails",payload)
        },
        getGoodsAttr(conText,payload){
            conText.commit("getGoodsAttr",payload)
        },
        selectAttrs(conText,payload){
            conText.commit("selectAttrs",payload)
        }
    }
};
export default modules;