import {addAddressData,getAddressListData,getAddressInfoData,modAddressData,delAddressData} from "../../../api/user/address";

let modules={
    namespaced:true,
    state:{
        addressList:[]
    },
    mutations:{
        //添加收货地址
        addAddress(state,payload){
            addAddressData(payload).then(res=>{
                if(payload && payload.success){
                    payload.success(res);
                }
            })
        },
        //获取地址列表
        getAddressList(state,payload){
            getAddressListData(payload.uid).then(res=>{
                if(res.code==200){
                    state.addressList=res.data;
                }
            })
        },
        //获取收货详情
        getAddressInfo(state,payload){
            getAddressInfoData(payload.uid,payload.aid).then(res=>{
                if(res.code==200){
                    if(payload && payload.success){
                        payload.success(res.data);
                    }
                }
            })
        },
        //修改收货地址
        modAddress(state,payload){
            modAddressData(payload).then(res=>{
                if(res.code==200){
                    if(payload && payload.success){
                        payload.success(res);
                    }
                }
            })
        },
        //删除收货地址
        delAddress(state,payload){
            delAddressData(payload.uid,payload.aid).then(res=>{
                if(payload && payload.success){
                    payload.success(res)
                }
            })
        }
    },
    created(){

    },
    actions:{
        addAddress(conText,payload){
            conText.commit("addAddress",payload);
        },
        getAddressList(conText,payload){
            conText.commit("getAddressList",payload)
        },
        getAddressInfo(conText,payload){
            conText.commit("getAddressInfo",payload);
        },
        modAddress(conText,payload){
            conText.commit("modAddress",payload);
        },
        delAddress(conText,payload){
            conText.commit("delAddress",payload)
        }
    },
    computed:{
        uid:state=>state.user.uid
    }
}
export default modules;