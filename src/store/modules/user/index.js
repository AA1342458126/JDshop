import {getLoginData,getUserInfoData,safeOutLogin,checkedCodeData,existCellphoneData,regUserData,safeUserData,uploadHeadData,updateUserData} from "../../../api/user";

let modules={
    namespaced:true,
    state:{
        uid:localStorage['uid']?localStorage['uid']:"",
        nickname:localStorage['nickname']?localStorage['nickname']:"",
        authToken:localStorage['authToken']?localStorage['authToken']:"",
        isLogin:localStorage['isLogin']?Boolean(localStorage['isLogin']):false,
        userInfo:{}
    },
    mutations:{
        //会员登录
        login(state,payload){
            getLoginData(payload.cellphone,payload.password).then(res=>{
                if(res.code==200){
                    state.uid=res.data.uid;
                    state.nickname=res.data.nickname;
                    state.authToken=res.data.auth_token;
                    state.isLogin=true;
                    localStorage['uid']=res.data.uid;
                    localStorage['nickname']=res.data.nickname;
                    localStorage['authToken']=res.data.auth_token;
                    localStorage['isLogin']=true;
                }
                if(payload && payload.success){
                    payload.success(res);
                }
            })
        },
        //获取会员信息
        getUserInfo(state,payload){
            getUserInfoData(payload.uid).then(res=>{
                if(res.code==200){
                    state.userInfo=res.data;
                    if(payload && payload.success){
                        payload.success(res.data);
                    }
                }
            })
        },
        //安全退出
        storeOutLogin(state){
            safeOutLogin(state.uid).then(res=>{
                if (res.code==200){
                    state.uid="";
                    state.nickname="";
                    state.authToken="";
                    state.isLogin=false;
                    state.userInfo={}
                    localStorage.removeItem("uid");
                    localStorage.removeItem("nickname");
                    localStorage.removeItem("authToken");
                    localStorage.removeItem("isLogin");
                }
            })
        },
        //会员注册
        regUser(state,payload){
            regUserData(payload).then(res=>{
                if(payload && payload.success){
                    payload.success(res);
                }
            })
        },
        //单点登录
        safeUser(state,payload){
            safeUserData(payload.uid,payload.authToken).then(res=>{
                if(payload && payload.success){
                    payload.success(res);
                }
            })
        },
        //头像上传
        uploadHead(state,payload){
            uploadHeadData(payload.headfile).then(res=>{
                if(payload && payload.success){
                    payload.success(res);
                }
            })
        },
        //修改会员信息
        updateUser(state,payload){
            updateUserData(payload).then(res=>{
                if(res.code==200){
                    if(payload && payload.success){
                        payload.success();
                    }
                }
            })
        }
    },
    actions:{
        login(conText,payload){
            conText.commit("login",payload)
        },
        getUserInfo(conText,payload){
            conText.commit("getUserInfo",payload)
        },
        storeOutLogin(conText){
            conText.commit("storeOutLogin")
        },
        //检测图文验证码
        checkedCode(conText,payload){
            return checkedCodeData(payload.vcode);
        },
        //是否注册过会员
        existCellphone(conText,payload){
            return existCellphoneData(payload.cellphone)
        },
        //会员注册
        regUser(conText,payload){
            conText.commit("regUser",payload)
        },
        //单点登录
        safeUser(conText,payload){
            conText.commit("safeUser",payload);
        },
        //头像上传
        uploadHead(conText,payload){
            conText.commit("uploadHead",payload);
        },
        //修改会员
        updateUser(conText,payload){
            conText.commit("updateUser",payload);
        }
    }
}
export default modules