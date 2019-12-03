<template>
    <div>
        <router-view></router-view>
        <div class="bottom-nav">
            <ul :class="{nav:true, home:true, active:homeActive}" @click="goPage('/index')">
                <li></li>
                <li>首页</li>
            </ul>
            <ul :class="{nav:true, cart:true, active:cartActive}" @click="goPage('/cart')">
                <li></li>
                <li>购物车</li>
                <li class="spot" v-if="$store.state.cart.cartData.length>0"></li>
            </ul>
            <ul :class="{nav:true, my:true, active:myActive}" @click="goPage('/my')">
                <li></li>
                <li>我的</li>
            </ul>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    // import {} from 'vuex'
    export default {
        name: "home",
        data(){
            return{
                homeActive:true,
                cartActive:false,
                myActive:false
            }
        },
        created(){
          // 解决不刷新页面切换样式
          this.changeStyle(this.$route.path)
        },
        methods:{
            goPage(url){
                this.$router.replace(url);
                this.changeStyle(url)
            },
            changeStyle(url){
                switch (url){
                    case '/index':
                        this.homeActive=true;
                        this.cartActive=false;
                        this.myActive=false;
                        break;
                    case '/cart':
                        this.homeActive=false;
                        this.cartActive=true;
                        this.myActive=false;
                        break;
                    case '/my':
                        this.homeActive=false;
                        this.cartActive=false;
                        this.myActive=true;
                        break;
                    default:
                        this.homeActive=true;
                        this.cartActive=false;
                        this.myActive=false;
                }
            }
        },
        //清除keep-alive缓存
        activated(){
            document.title=this.$route.meta.title
            this.changeStyle(this.$route.path)
        }
    }
</script>

<style scoped>
    .bottom-nav{width: 100%;height: 1.2rem;background-color: #fff;border-top: 1px solid #ccc;
        position: fixed;z-index: 99;left: 0px;bottom: 0px;display: flex;justify-content: space-between;align-items: center;
        padding: 0 0.7rem;box-sizing: border-box}
    .bottom-nav .nav{width: 0.9rem;position: relative}
    .bottom-nav .nav li:nth-child(1){width: 0.6rem;height: 0.6rem;margin: 0 auto}
    .bottom-nav .nav li:nth-child(2){width: 100%;text-align: center;font-size: 0.28rem}
    .bottom-nav .nav.active li:nth-child(2){color: #ff0000}
    .bottom-nav .nav.home li:nth-child(1){background: url("../../../assets/images/common/home1.png")
    no-repeat center;background-size: 100%}
    .bottom-nav .nav.home.active li:nth-child(1){background-image: url("../../../assets/images/common/home2.png")}
    .bottom-nav .nav.cart li:nth-child(1){background: url("../../../assets/images/common/cart1.png")
    no-repeat center;background-size: 100%}
    .bottom-nav .nav.cart.active li:nth-child(1){background-image: url("../../../assets/images/common/cart2.png")}
    .bottom-nav .nav.my li:nth-child(1){background: url("../../../assets/images/common/my1.png")
    no-repeat center;background-size: 100%}
    .bottom-nav .nav.my.active li:nth-child(1){background-image: url("../../../assets/images/common/my2.png")}
    .bottom-nav .nav .spot{width: 0.2rem;height: 0.2rem;background-color: #ff0000;border-radius: 100%;position: absolute;right: 0px;top: 0px;}
</style>