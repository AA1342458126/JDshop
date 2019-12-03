import echo from "../libs/echo.js"

//路由懒加载
export function lazyImg() {
    echo.init({
        offset:0,    //可视区域多少像素可以被加载
        throttle:0   //设置图片延迟加载的时间
    })
}

//单点登录认证
export function safeUser(_this) {
    _this.$store.dispatch("user/safeUser",{uid:_this.$store.state.user.uid,authToken:_this.$store.state.user.authToken,success:(res)=>{
        if(res.code!==200){
            _this.$router.replace('/login');
            _this.$store.dispatch("user/storeOutLogin");
        }
    }})
}
