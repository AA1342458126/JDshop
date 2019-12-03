import {getHotKwordsData,getSearchGoodsData,getAttrsData} from "../../../api/home/search";
import Vue from 'vue';
let modules={
    namespaced:true,
    state:{
        historyKwords:localStorage['historyKwords']?JSON.parse(localStorage['historyKwords']):[],
        hotKwords:[],
        goods:[],
        cid:"",
        goodsTotal:0,
        priceList:{
            isShow:true,
            data:[
                {price1:1,price2:50,checked:false},
                {price1:51,price2:99,checked:false},
                {price1:100,price2:300,checked:false},
                {price1:301,price2:1000,checked:false},
                {price1:1001,price2:4000,checked:false},
                {price1:4001,price2:9999,checked:false}
            ]
        },
        minPrice:"",
        maxPrice:"",
        attrs:[],
        params:[]
    },
    mutations:{
        //添加历史记录
        addKwords(state,payload){
            state.historyKwords=payload.historyKwords;
            localStorage['historyKwords']=JSON.stringify(payload.historyKwords);
        },
        //删除历史记录
        clearHistoryKwords(state){
            state.historyKwords="";
            localStorage.removeItem("historyKwords");
        },
        //获取热门关键词
        getHotKwords(state){
            getHotKwordsData().then(res=>{
                if(res.code==200){
                    state.hotKwords=res.data
                }
            })
        },
        //产品搜索结果
        getSearchGoods(state,payload){
            getSearchGoodsData(payload).then(res=>{
                if(res.code==200){
                    state.goods=res.data;
                    state.goodsTotal=res.pageinfo.total;
                    if(payload && payload.success){
                        payload.success(res.pageinfo)
                    }
                }else{
                    state.goods=[];
                    state.goodsTotal=0
                }
            })
        },
        //获取搜索分页效果
        getSearchGoodsPage(state,payload){
            getSearchGoodsData(payload).then(res=>{
                if(res.code==200){
                    state.goods.push(...res.data);
                }
            })
        },
        // 选择分类价格
        selectPrice(state,payload){
            if(state.priceList.data.length>0){
                for (let i=0;i<state.priceList.data.length;i++){
                    if(state.priceList.data[i].checked){
                        state.priceList.data[i].checked=state.priceList.data[payload.index].checked;
                        break;
                    }
                }
                state.priceList.data[payload.index].checked=!state.priceList.data[payload.index].checked;
                Vue.set(state.priceList.data,payload.index,state.priceList.data[payload.index]);
                state.minPrice=state.priceList.data[payload.index].checked?state.priceList.data[payload.index].price1:"";
                state.maxPrice=state.priceList.data[payload.index].checked?state.priceList.data[payload.index].price2:"";
            }
        },
        //设置最小价格
        setMinPrice(state,payload){
            state.minPrice=payload.minPrice;
            state.minPrice=state.minPrice.replace(/[^\d|^\.]*$/g,"");
        },
        //设置最大价格
        setMaxPrice(state,payload){
            state.maxPrice=payload.maxPrice;
            state.maxPrice=state.maxPrice.replace(/[^\d|^\.]*$/g,"");
        },
        // 产品搜索页面属性参数
        getAttrs(state,payload){
            getAttrsData(payload.kwords).then(res=>{
                if(res.code==200){
                    for(let i=0;i<res.data.length;i++){
                        res.data[i].isShow=true;
                        for(let j=0;j<res.data[i].param.length;j++){
                            res.data[i].param[j].checked=false
                        }
                    }
                    state.attrs=res.data;
                    if(payload && payload.success){
                        payload.success()
                    }
                }
            })
        },
        //产品属性切换
        showAttr(state,payload){
            state.attrs[payload.index].isShow=!state.attrs[payload.index].isShow;
            Vue.set(state.attrs,payload.index,state.attrs[payload.index]);
        },
        //选择商品颜色尺寸
        selectParam(state,payload){
            state.attrs[payload.index].param[payload.index2].checked=!state.attrs[payload.index].param[payload.index2].checked;
            Vue.set(state.attrs[payload.index].param[payload.index2],payload.index2,state.attrs[payload.index].param[payload.index2])
        },
        //添加属性值到数组搜索
        pushParams(state,payload){
            state.params=[];
            if(state.attrs.length>0){
                for(let i=0;i<state.attrs.length;i++){
                    for(let j=0;j<state.attrs[i].param.length;j++){
                        if(state.attrs[i].param[j].checked){
                            state.params.push(state.attrs[i].param[j].pid);
                        }
                    }
                }
            }else{
                state.params=[];
            }
        },
        //全部重置
        resetAttrs(state){
            //重置价格
            if(state.priceList.data.length>0){
                for(let i=0;i<state.priceList.data.length;i++){
                    if(state.priceList.data[i].checked){
                        state.priceList.data[i].checked=false;
                        break;
                    }
                }
                state.minPrice="";
                state.maxPrice=""
            }
            //重置商品属性值
            if(state.attrs.length>0){
                for(let i=0;i<state.attrs.length;i++){
                    for(let j=0;j<state.attrs[i].param.length;j++){
                        if(state.attrs[i].param[j].checked){
                            state.attrs[i].param[j].checked=false;
                            break;
                        }
                    }
                }
                state.params=[];
            }
        }
    },
    actions:{
        getHotKwords(conText){
            conText.commit("getHotKwords");
        },
        getSearchGoods(conText,payload){
            conText.commit("getSearchGoods",payload)
        },
        getSearchGoodsPage(conText,payload){
            conText.commit("getSearchGoodsPage",payload)
        },
        //跨模块使用vuex
        selectClassify(conText,payload){
            if(conText.rootState.goods.classifys.length>0){
                for(let i=0;i<conText.rootState.goods.classifys.length;i++){
                    if(conText.rootState.goods.classifys[i].checked){
                        conText.rootState.goods.classifys[i].checked=conText.rootState.goods.classifys[payload.index].checked;
                        break;
                    }
                }
            }
            conText.rootState.goods.classifys[payload.index].checked=!conText.rootState.goods.classifys[payload.index].checked;
            // 解决操作某一个索引点击时值改变但页面视图不更新
            Vue.set(conText.rootState.goods.classifys,payload.index,conText.rootState.goods.classifys[payload.index]);
            conText.state.cid=conText.rootState.goods.classifys[payload.index].checked?conText.rootState.goods.classifys[payload.index].cid:""
        },
        getAttrs(conText,payload){
            conText.commit("getAttrs",payload);
        },
        // 全部重置
        resetAttrs(conText,payload){
            //重置分类
            if(conText.rootState.goods.classifys.length>0){
                for(let i=0;i<conText.rootState.goods.classifys.length;i++){
                    if(conText.rootState.goods.classifys[i].checked){
                        conText.rootState.goods.classifys[i].checked=false;
                        break;
                    }
                }
                conText.state.cid=""
            }
            conText.commit("resetAttrs");
        }
    }
}
export default modules;