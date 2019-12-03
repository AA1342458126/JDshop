import Vue from 'vue';

let modules={
    namespaced:true,
    state:{
        cartData:localStorage['cartData'] ? JSON.parse(localStorage['cartData']) : []
    },
    mutations:{
        //添加商品
        addCart(state,payload){
            let isSame=false;
            if(state.cartData.length>0){
                for(let key in state.cartData){
                    //判断商品数据gid和vuex里的商品gid是否一致，并且判断商品的属性数组，通过转换json字符串进行判断是否一致
                    if(state.cartData[key].gid==payload.cartData.gid && JSON.stringify(state.cartData[key].attrs)==JSON.stringify(payload.cartData.attrs)){
                        isSame=true;
                        state.cartData[key].amount=parseInt(state.cartData[key].amount)+parseInt(payload.cartData.amount);
                        break;
                    }
                }
            }
            if(!isSame){
                state.cartData.push(payload.cartData);
            }
            localStorage['cartData']=JSON.stringify(state.cartData);
        },
        //选择商品
        checkItem(state,payload){
            state.cartData[payload.index].checked=!state.cartData[payload.index].checked;
            Vue.set(state.cartData,payload.index,state.cartData[payload.index]);
            localStorage['cartData']=JSON.stringify(state.cartData);
        },
        //全选/反选
        storeSetAllItem(state,payload){
            if(state.cartData.length>0){
                for(let key in state.cartData){
                    state.cartData[key].checked=payload.isAllItem;
                }
            }
        },
        //删除商品
        delGoods(state,payload){
            state.cartData.splice(payload.index,1);
            localStorage['cartData']=JSON.stringify(state.cartData);
        },
        //更改数量
        changeAmount(state,payload){
            state.cartData[payload.index].amount=payload.amount.replace(/[^\d]/g,'');
            Vue.set(state.cartData,payload.index,state.cartData[payload.index]);
            // state.cartData[payload.index].amount=state.cartData[payload.index].amount.replace(/[^\d]/g,'');
            state.cartData[payload.index].amount=state.cartData[payload.index].amount=='' || state.cartData[payload.index].amount==0?1:state.cartData[payload.index].amount
            localStorage['cartData']=JSON.stringify(state.cartData);
        },
        //增加数量
        incAmount(state,payload){
            state.cartData[payload.index].amount=parseInt(state.cartData[payload.index].amount)+1;
            Vue.set(state.cartData,payload.index,state.cartData[payload.index]);
            localStorage['cartData']=JSON.stringify(state.cartData);
        },
        //减少数量
        decAmount(state,payload){
            state.cartData[payload.index].amount=parseInt(state.cartData[payload.index].amount)>1?parseInt(state.cartData[payload.index].amount)-1:1;
            Vue.set(state.cartData,payload.index,state.cartData[payload.index]);
            localStorage['cartData']=JSON.stringify(state.cartData);
        }
    },
    getters:{
        //计算总价
        total(state){
            let total=0;
            if(state.cartData.length>0){
                for(let key in state.cartData){
                    if(state.cartData[key].checked){
                        total+=parseFloat(state.cartData[key].price)*parseInt(state.cartData[key].amount)
                    }
                }
            }
            return parseFloat(total.toFixed(2));
        },
        //运费
        freight(state){
            let freights=[],freight=0;
            if(state.cartData.length>0){
                for(let key in state.cartData){
                    if(state.cartData[key].checked){
                        freights.push(state.cartData[key].freight)
                    }
                }
                if(freights.length>0){
                    freight=Math.max.apply(null,freights)
                }
            }
            return freight;
        },
        //购物车里是否有商品或者选中的商品
        existCartGoods(state){
            let isItem=true;
            if(state.cartData.length>0){
                for(let key in state.cartData){
                    if(state.cartData[key].checked){
                        isItem=false;
                        break;
                    }
                }
            }
            return isItem;
        }
    }
}
export default modules;