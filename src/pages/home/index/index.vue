<template>
    <div>
        <!--首页<br/><span @click="$router.push('/login')">会员登录</span>-->
        <!--<br/><span @click="$router.push('/reg')">会员注册</span>-->
        <!--头部海报+搜索框-->
        <div class="index">
            <div class="header">
                <div :class="{top:true,topRed:isHeadRed}">
                    <!--<a href="http://localhost:8080/#/classify" class="top-menu"></a>-->
                    <div class="top-menu" @click="goPage('/goods/classify')"></div>
                    <div class="search-input" @click="isShow=true">
                        <div class="search-icon"></div>
                        <div class="search-text">请输入喜欢的宝贝名称</div>
                    </div>
                    <div class="top-login" @click="goPage('/login')" v-if="!isLogin">登录</div>
                    <div class="my" @click="goPage('/my')" v-else></div>
                </div>
                <div class="swiper-container" ref="swiper-container">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="(item,index) in slides" :key="index"><img :src="item.image" :alt="item.title"></div>
                    </div>
                    <div class="swiper-pagination" ref="swiper-pagination"></div>
                </div>
            </div>
            <!--主要菜单-->
            <div class="main-menu">
                <div class="list" v-for="(item,index) in navs" :key="index">
                    <div class="list-img"><img src="../../../assets/images/common/lazyImg.jpg" :data-echo="item.image" :alt="item.title" @click="goPage('/goods/classify/item?cid='+item.cid)"></div>
                    <div class="list-text text-color">{{item.title}}</div>
                </div>
            </div>
            <!--潮流女装/品牌男装/电脑办公-->
            <template v-for="(item,index) in goods">
                <div class="goods" :key="index" v-if="(index+1)%2==1">
                    <div :class="'goods-title goods-title-color'+(index+1)">—— {{item.title}} ——</div>
                    <div class="goods-row-1">
                        <div class="left">
                            <div class="goodslist-1" @click="goPage('/goods/details?gid='+(item.items&&item.items[0].gid))">
                                <div class="title goodslist1-title-color">{{item.items && item.items[0].title}}</div>
                                <div class="desc goodslist1-desc-color">精品打折</div>
                                <div :class="'price goodslist1-price-color'+(index+1)">{{item.items && item.items[0].price}}</div>
                                <div class="img"><img :src="item.items && item.items[0].image" alt=""></div>
                            </div>
                        </div>
                        <div class="right">
                            <div class="goodslist-2" v-for="(item2,index2) in item.items.slice(1,3)" @click="goPage('/goods/details?gid='+(item2.gid))">
                                <div class="title goodslist1-title-color">{{item2.title}}</div>
                                <div class="desc goodslist2-desc-color">品质精挑</div>
                                <div class="img"><img src="../../../assets/images/common/lazyImg.jpg" :data-echo="item2.image" alt=""></div>
                            </div>
                        </div>
                    </div>
                    <div class="goods-row-2">
                        <div class="goodslist" v-for="(item2,index2) in item.items.slice(3)" :key="index2" @click="goPage('/goods/details?gid='+(item2.gid))">
                            <div class="title goodslist1-title-color">{{item2.title}}</div>
                            <div class="img"><img src="../../../assets/images/common/lazyImg.jpg" :data-echo="item2.image" alt="item2.title"></div>
                            <div class="price goodslist-price-color">￥{{item2.price}}</div>
                            <div class="unprice goodslist-unprice-color">￥{{item2.price*2}}</div>
                        </div>
                    </div>
                </div>
                <div class="goods" :key="index" v-else>
                    <div class="goods-title goods-title-color2">—— {{item.title}} ——</div>
                    <div class="goods2-row-1">
                        <div class="goodslist-1" v-for="(item2,index2) in item.items.slice(0,2)" @click="goPage('/goods/details?gid='+(item2.gid))">
                            <div class="title2 goodslist1-title-color">{{item2.title}}</div>
                            <div class="desc2 goodslist2-desc-color">火爆开售</div>
                            <div class="img"><img src="../../../assets/images/common/lazyImg.jpg" :data-echo="item2.image" :alt="item2.title"></div>
                        </div>
                    </div>
                    <div class="goods2-row-2">
                        <div class="goodslist" v-for="(item2,index2) in item.items.slice(2)" @click="goPage('/goods/details?gid='+(item2.gid))">
                            <div class="title goodslist1-title-color">{{item2.title}}</div>
                            <div class="img"><img src="../../../assets/images/common/lazyImg.jpg" :data-echo="item2.image" :alt="item2.title"></div>
                            <div class="price goodslist-price-color">￥{{item2.price}}</div>
                            <div class="unprice goodslist-unprice-color">￥{{item2.price*2}}</div>
                        </div>
                    </div>
                </div>
            </template>
            <!--为您推荐标题-->
            <div class="recom-title">
                <div class="left-line"></div>
                <div class="text recom-title-color">为您推荐</div>
                <div class="left-line"></div>
            </div>
            <!--为您推荐商品-->
            <div class="recom-area">
                <div :class="(index)%2==0?'goods-list goodsL':'goods-list goodsR'" v-for="(item,index) in recoGoods" :key="index" @click="goPage('/goods/details?gid='+(item.gid))">
                    <div class="img"><img src="../../../assets/images/common/lazyImg.jpg" :data-echo="item.image" :alt="item.title"></div>
                    <div class="title recomgoods-title-color">{{item.title}}</div>
                    <div class="price goodslist-price-color">￥{{item.price}}</div>
                </div>
            </div>
            <SearchComponent :isShow="isShow" @onClose="isShow=false"></SearchComponent>
        </div>
    </div>
</template>
<script>
    // import Swiper from 'swiper';
    // import 'swiper/dist/css/swiper.min.css';
    import {mapState,mapActions} from 'vuex';
    import SearchComponent from '../../../components/search';
    import Swiper from '../../../components/swiper/swiper.js';
    import {lazyImg} from "../../../assets/js/utils";

    export default {
        name: "index",
        components:{
            SearchComponent
        },
        data(){
          return{
              isHeadRed:false,
              isShow:false
          }
        },
        computed:{
            ...mapState({
                slides:state=>state.index.slides,
                navs:state=>state.index.navs,
                goods:state=>state.index.goods,
                recoGoods:state=>state.index.recoGoods,
                isLogin:state=>state.user.isLogin
            })
        },
        methods:{
            ...mapActions({
                getSwiper:"index/getSwiper",
                getNav:"index/getNav",
                getGoods:"index/getGoods",
                getRecoGoods:"index/getRecoGoods"
            }),
            goPage(url){
                this.$router.push(url);
            },
            handleScroll(e){
                let scrollTop=document.body.scrollTop || document.documentElement.scrollTop;
                if(scrollTop>100){
                     this.isHeadRed=true;
                }else{
                    this.isHeadRed=false;
                }
            }
        },
        created(){
            this.getSwiper({success:()=>{
                    this.$nextTick(()=>{
                        new Swiper(this.$refs['swiper-container'], {
                            autoplay: 3000,//可选选项，自动滑动
                            autoplayDisableOnInteraction : false,
                            pagination : this.$refs['swiper-pagination'],
                            paginationClickable :true,
                        });
                    })
                }});
            this.getNav({success:()=>{
                    this.$nextTick(()=>{
                        lazyImg();
                    })
                }});
            this.getGoods({success:()=>{
                    this.$nextTick(()=>{
                        lazyImg();
                    })
                }});
            this.getRecoGoods({success:()=>{
                    this.$nextTick(()=>{
                        lazyImg();
                    })
                }});
        },
        mounted(){
            document.title=this.$route.meta.title;
            window.addEventListener("scroll",this.handleScroll)
        },
        destroyed(){

        },
        // keepAlive为true时，离开页面需在函数deactivated钩子中执行
        deactivated(){
            window.removeEventListener("scroll",this.handleScroll)
        },
        //清除keep-live缓存
        activated(){
            window.addEventListener("scroll",this.handleScroll);
            this.getSwiper({success:()=>{
                    this.$nextTick(()=>{
                        new Swiper(this.$refs['swiper-container'], {
                            autoplay: 3000,//可选选项，自动滑动
                            autoplayDisableOnInteraction : false,
                            pagination : this.$refs['swiper-pagination'],
                            paginationClickable :true,
                        });
                    })
                }});
            this.getNav({success:()=>{
                    this.$nextTick(()=>{
                        lazyImg();
                    })
                }});
            this.getGoods({success:()=>{
                    this.$nextTick(()=>{
                        lazyImg();
                    })
                }});
            this.getRecoGoods({success:()=>{
                    this.$nextTick(()=>{
                        lazyImg();
                    })
                }});
        }
    }
</script>
<style scoped>
    @import "../../../components/swiper/swiper.css";

    .index{-webkit-overflow-scrolling: touch;overflow-scrolling: touch;overflow-y: auto;box-sizing: border-box;padding-bottom: 0.2rem}
    .header .top{width: 100%;height: 1rem;position: fixed;left: 0px;top: 0px;z-index: 10;display: flex;
    background: linear-gradient(rgba(1,1,1,0.2)0%,rgba(255,255,255,0)100%)}
    .header .topRed{background: linear-gradient(rgb(235, 22, 37) 0%, rgba(255, 255, 255, 0) 100%)}
    .top .top-menu{display: block;width: 0.5rem;height: 0.5rem;background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAB00lEQVR4Xu1bwVHDQAzc7YAS6IB0AFQAVAAdABWQVABUAHQAFUAqIHSQEkIFYpZxMuZ8ZvR0dNLHM44e3tVKd7d2iMaDjeNHEpAKaJyBbIHGBZBDMFtgrAXM7ADAEcll5DapKsDM7gHc9IDPSS4iEjEgwMwEXASUcUHytX/TzM4BXO8RMV8k+4UdDkEz+wBwXAH1QvKqIGAO4G6PCFiSPOk/b00BzROgKj85W0Bs/mF04mpYk3z+VwH60cweit6+Jal74WJ0H9AtgzMAK5KbcMg7QLkRilpZL65UgJepqHmpgKiV9eJKBXiZipqXCohaWS+uVICXqah5Y5aY/MBLALrqICQzJOSBqGaIHAJ4B6DrNlYATiOSUCNAhoGqX8bAEzCzpiyxgZ8WlQA5v2cVBSxIquK7iEqAXKDPgoBvADOS64IAzYn+rJj6YrEhqXm2i7FVQCSo2r+WmF6SlOCnjtT7fLkR8jIVNS8VELWyXlypAC9TUfNSAVEr68WVCvAyFTUvFVCrbPdqfOcIkXxsRgFmptOdToOyw7aRjhCA5h2hN5L6LC68IZKOUDpCZltHSANRNlg6Qs0sg1GBjuHKnWBrFS/xpgJSAY0zkC3QuADyf4M/MC2wQcKnVDYAAAAASUVORK5CYII=") no-repeat center top;
    background-size: 100%; margin: 0.1rem 3% 0}
    .top .search-input{width: 65%;height: 0.52rem;background-color: rgba(255,255,255,0.6);margin-top: 0.1rem;border-radius: 0.14rem;display: flex}
    .top .search-icon{width: 0.68rem;height: 0.52rem;background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKTWlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVN3WJP3Fj7f92UPVkLY8LGXbIEAIiOsCMgQWaIQkgBhhBASQMWFiApWFBURnEhVxILVCkidiOKgKLhnQYqIWotVXDjuH9yntX167+3t+9f7vOec5/zOec8PgBESJpHmomoAOVKFPDrYH49PSMTJvYACFUjgBCAQ5svCZwXFAADwA3l4fnSwP/wBr28AAgBw1S4kEsfh/4O6UCZXACCRAOAiEucLAZBSAMguVMgUAMgYALBTs2QKAJQAAGx5fEIiAKoNAOz0ST4FANipk9wXANiiHKkIAI0BAJkoRyQCQLsAYFWBUiwCwMIAoKxAIi4EwK4BgFm2MkcCgL0FAHaOWJAPQGAAgJlCLMwAIDgCAEMeE80DIEwDoDDSv+CpX3CFuEgBAMDLlc2XS9IzFLiV0Bp38vDg4iHiwmyxQmEXKRBmCeQinJebIxNI5wNMzgwAABr50cH+OD+Q5+bk4eZm52zv9MWi/mvwbyI+IfHf/ryMAgQAEE7P79pf5eXWA3DHAbB1v2upWwDaVgBo3/ldM9sJoFoK0Hr5i3k4/EAenqFQyDwdHAoLC+0lYqG9MOOLPv8z4W/gi372/EAe/tt68ABxmkCZrcCjg/1xYW52rlKO58sEQjFu9+cj/seFf/2OKdHiNLFcLBWK8ViJuFAiTcd5uVKRRCHJleIS6X8y8R+W/QmTdw0ArIZPwE62B7XLbMB+7gECiw5Y0nYAQH7zLYwaC5EAEGc0Mnn3AACTv/mPQCsBAM2XpOMAALzoGFyolBdMxggAAESggSqwQQcMwRSswA6cwR28wBcCYQZEQAwkwDwQQgbkgBwKoRiWQRlUwDrYBLWwAxqgEZrhELTBMTgN5+ASXIHrcBcGYBiewhi8hgkEQcgIE2EhOogRYo7YIs4IF5mOBCJhSDSSgKQg6YgUUSLFyHKkAqlCapFdSCPyLXIUOY1cQPqQ28ggMor8irxHMZSBslED1AJ1QLmoHxqKxqBz0XQ0D12AlqJr0Rq0Hj2AtqKn0UvodXQAfYqOY4DRMQ5mjNlhXIyHRWCJWBomxxZj5Vg1Vo81Yx1YN3YVG8CeYe8IJAKLgBPsCF6EEMJsgpCQR1hMWEOoJewjtBK6CFcJg4Qxwicik6hPtCV6EvnEeGI6sZBYRqwm7iEeIZ4lXicOE1+TSCQOyZLkTgohJZAySQtJa0jbSC2kU6Q+0hBpnEwm65Btyd7kCLKArCCXkbeQD5BPkvvJw+S3FDrFiOJMCaIkUqSUEko1ZT/lBKWfMkKZoKpRzame1AiqiDqfWkltoHZQL1OHqRM0dZolzZsWQ8ukLaPV0JppZ2n3aC/pdLoJ3YMeRZfQl9Jr6Afp5+mD9HcMDYYNg8dIYigZaxl7GacYtxkvmUymBdOXmchUMNcyG5lnmA+Yb1VYKvYqfBWRyhKVOpVWlX6V56pUVXNVP9V5qgtUq1UPq15WfaZGVbNQ46kJ1Bar1akdVbupNq7OUndSj1DPUV+jvl/9gvpjDbKGhUaghkijVGO3xhmNIRbGMmXxWELWclYD6yxrmE1iW7L57Ex2Bfsbdi97TFNDc6pmrGaRZp3mcc0BDsax4PA52ZxKziHODc57LQMtPy2x1mqtZq1+rTfaetq+2mLtcu0W7eva73VwnUCdLJ31Om0693UJuja6UbqFutt1z+o+02PreekJ9cr1Dund0Uf1bfSj9Rfq79bv0R83MDQINpAZbDE4Y/DMkGPoa5hpuNHwhOGoEctoupHEaKPRSaMnuCbuh2fjNXgXPmasbxxirDTeZdxrPGFiaTLbpMSkxeS+Kc2Ua5pmutG003TMzMgs3KzYrMnsjjnVnGueYb7ZvNv8jYWlRZzFSos2i8eW2pZ8ywWWTZb3rJhWPlZ5VvVW16xJ1lzrLOtt1ldsUBtXmwybOpvLtqitm63Edptt3xTiFI8p0in1U27aMez87ArsmuwG7Tn2YfYl9m32zx3MHBId1jt0O3xydHXMdmxwvOuk4TTDqcSpw+lXZxtnoXOd8zUXpkuQyxKXdpcXU22niqdun3rLleUa7rrStdP1o5u7m9yt2W3U3cw9xX2r+00umxvJXcM970H08PdY4nHM452nm6fC85DnL152Xlle+70eT7OcJp7WMG3I28Rb4L3Le2A6Pj1l+s7pAz7GPgKfep+Hvqa+It89viN+1n6Zfgf8nvs7+sv9j/i/4XnyFvFOBWABwQHlAb2BGoGzA2sDHwSZBKUHNQWNBbsGLww+FUIMCQ1ZH3KTb8AX8hv5YzPcZyya0RXKCJ0VWhv6MMwmTB7WEY6GzwjfEH5vpvlM6cy2CIjgR2yIuB9pGZkX+X0UKSoyqi7qUbRTdHF09yzWrORZ+2e9jvGPqYy5O9tqtnJ2Z6xqbFJsY+ybuIC4qriBeIf4RfGXEnQTJAntieTE2MQ9ieNzAudsmjOc5JpUlnRjruXcorkX5unOy553PFk1WZB8OIWYEpeyP+WDIEJQLxhP5aduTR0T8oSbhU9FvqKNolGxt7hKPJLmnVaV9jjdO31D+miGT0Z1xjMJT1IreZEZkrkj801WRNberM/ZcdktOZSclJyjUg1plrQr1zC3KLdPZisrkw3keeZtyhuTh8r35CP5c/PbFWyFTNGjtFKuUA4WTC+oK3hbGFt4uEi9SFrUM99m/ur5IwuCFny9kLBQuLCz2Lh4WfHgIr9FuxYji1MXdy4xXVK6ZHhp8NJ9y2jLspb9UOJYUlXyannc8o5Sg9KlpUMrglc0lamUycturvRauWMVYZVkVe9ql9VbVn8qF5VfrHCsqK74sEa45uJXTl/VfPV5bdra3kq3yu3rSOuk626s91m/r0q9akHV0IbwDa0b8Y3lG19tSt50oXpq9Y7NtM3KzQM1YTXtW8y2rNvyoTaj9nqdf13LVv2tq7e+2Sba1r/dd3vzDoMdFTve75TsvLUreFdrvUV99W7S7oLdjxpiG7q/5n7duEd3T8Wej3ulewf2Re/ranRvbNyvv7+yCW1SNo0eSDpw5ZuAb9qb7Zp3tXBaKg7CQeXBJ9+mfHvjUOihzsPcw83fmX+39QjrSHkr0jq/dawto22gPaG97+iMo50dXh1Hvrf/fu8x42N1xzWPV56gnSg98fnkgpPjp2Snnp1OPz3Umdx590z8mWtdUV29Z0PPnj8XdO5Mt1/3yfPe549d8Lxw9CL3Ytslt0utPa49R35w/eFIr1tv62X3y+1XPK509E3rO9Hv03/6asDVc9f41y5dn3m978bsG7duJt0cuCW69fh29u0XdwruTNxdeo94r/y+2v3qB/oP6n+0/rFlwG3g+GDAYM/DWQ/vDgmHnv6U/9OH4dJHzEfVI0YjjY+dHx8bDRq98mTOk+GnsqcTz8p+Vv9563Or59/94vtLz1j82PAL+YvPv655qfNy76uprzrHI8cfvM55PfGm/K3O233vuO+638e9H5ko/ED+UPPR+mPHp9BP9z7nfP78L/eE8/sl0p8zAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAKhSURBVHjaxNdriI5pGAfw35td7DqEVXY2xTgljIzsNCiK2miVUznUFj5MidJGYx1Civ2AtjSNET4obYvWoRSJrQ3ZHNa2y2THKUvZktLu1DYGzX653nqa3nfmed+Z4f/puf730/O/n/s63pmWlhbvA5kChEtQjtHojX9wB7fxvCuE+2IOZmEiBqE7mvA3ruEczqK5s4SXYytKU3zrV3yLkx0RHogDmF+E+2qwFm8KFe6D85jcir+GE7iORnyCqViAslbvngq+IOEfsTBh/4lvwo+vc3yjB5bGMZck+L34Oq3wMhxO2FfwJf5NccSlOIOxCW46LrUn3A/1+Czsu5E+rwrw72DcwKdh/4bP8bYt4a9wJLE2K3xdKKoiMLOojPjIKVyC77Ak+Jux06KKEu5hRNj7sDqf8DzswfDg10RaFIsd2BzPN1CRT3gjqtE/+Cn4pQPCK1EXz3cwHi25hHdG6H8c/PiowcUi6ed6TGhdULLC6yNXBwQ/DZc7ILwKtWn+eHYE1+jg12N3B4T3YF2i4lXm8/HAEFqe2GVZkaI9cT9yOruJ6rbyeGGUyywW43gRwtXYlbDHhZ/zCvfE7xgV9pMIipcFiJbj5+jhcDTqeLu1ei5OJ+zbcRL3U4hW4BiGJrgReJi2O9VFHmbxHJvwA/7L8Y0BWIHt6NVq7Q8sQkPaQeBUVLMkGoJ/Go3jIwyLYWFoGyfRgBl4lka4W6TXmk4aKh9hJh6nnblmYxsmxWbyoTlOoxb7MSbHO3/hi2ggqabMD6N2L4qo7YUPYhppxNUIqluJ9Dmf6OtJ3MQG/JQpcqDv3s4oOxIXMCTH2iFUZbrwJlGKixGAWTRGu6zJdPEVpgwH4yLwAlvwPZoy7+DuNDNuIg+iVb4u9O7Uqfh/AIhn3cWll45XAAAAAElFTkSuQmCC") no-repeat center;
    background-size: 70%}
    .top .search-text{width: 80%;height: 0.52rem;line-height: 0.52rem;color: #ffffff;font-size: 0.28rem}
    .top .top-login{width: 18%;height: 0.8rem;color: #ffffff;margin-top: 0.18rem;text-align: center}
    .top .my{width:0.6rem;height:0.6rem;background-image:url("../../../assets/images/home/index/my.png");
        background-position: center;background-size:100%;margin-left: 0.5rem}
    .swiper-container{width: 100%;height: auto}
    .header img{width:100%;}
    /*主要菜单*/
    .text-color{color: #7b7f82;font-size: 0.28rem}
    .main-menu{width: 100%;height: 1.6rem;background-color: #ffffff;overflow: hidden;display: flex;justify-content: space-between}
    .main-menu .list{width: 1.4rem;height: 1.3rem;margin-top: 0.2rem}
    .main-menu .list .list-img{width: 100%;text-align: center;}
    .main-menu .list .list-img img{width: 0.8rem;height: 0.8rem}
    .main-menu .list .list-text{width: 100%;text-align: center;margin-top: 0.04rem}
    /*潮流女装商品展示*/
    .goods{width: 100%;height:auto; margin-top: 0.2rem;overflow: hidden}
    .goods .goods-title{width: 100%;height: 0.6rem;line-height: 0.6rem;
        background-color: #fff;border-bottom: 1px solid #efefef;
        text-align: center}
    .goods-title-color1{font-size: 0.28rem;color: #f73b61}
    .goods .goods-row-1{width: 100%;height: 2.4rem;border-bottom: 1px solid #efefef;
    background-color: #ffffff;overflow: hidden;display: flex}
    .goods .goods-row-1 .left{width: 50%;}
    .goods .goods-row-1 .left .goodslist-1{height: 2.4rem;border-right: 1px solid #efefef;
    position: relative}
    .goods .goods-row-1 .left .goodslist-1 .title{width: 95%;height: 0.32rem;
    position: absolute;z-index: 1;left: 4%;top: 8%;overflow: hidden;white-space: nowrap;
        text-overflow: ellipsis}
    .goodslist1-title-color{font-size: 0.28rem;font-weight: 700}
    .goods .goods-row-1 .left .goodslist-1 .desc{width: 43%;height: 0.4rem;
        position:absolute;z-index: 1;left: 4%;top: 25%}
    .goodslist1-desc-color{font-size: 0.24rem;color: #cb385d}
    .goods .goods-row-1 .left .goodslist-1 .price{width: 0.8rem;height: 0.4rem;
    line-height: 0.4rem;position: absolute;z-index: 1;left: 45%;top: 23%;
    border-radius: 0.4rem;text-align: center}
    .goodslist1-price-color1{font-size: 0.28rem;color: #ffffff;background-color: #f21d4f;}
    .goods .goods-row-1 .left .goodslist-1 .img{width: 100%;height: auto;
    overflow: hidden;text-align: center;position: absolute;z-index: 1;left: 0;top: 38%}
    .goods .goods-row-1 .left .goodslist-1 .img img{width: 3rem;height: 1.46rem}
    .goods .goods-row-1 .right{width: 50%;}
    .goods .goods-row-1 .right .goodslist-2{height: 1.2rem;border-bottom: 1px solid #efefef;
    position:relative}
    .goods .goods-row-1 .right .goodslist-2 .title{width: 50%;height: 0.32rem;
    position: absolute;z-index: 1;left: 4%;top: 8%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis}
    .goods .goods-row-1 .right .goodslist-2 .desc{width: 50%;height: 0.4rem;
    position: absolute;z-index: 1;left: 4%;top: 36%}
    .goodslist2-desc-color{font-size: 0.24rem;color: #7b7f82}
    .goods .goods-row-1 .right .goodslist-2 .img{width: 32%;height: auto;
    text-align: center;position: absolute;z-index: 1;left: 55%;top: 0%}
    .goods .goods-row-1 .right .goodslist-2 .img img{width: 100%;height: 1.16rem}
    .goods .goods-row-2{width: 100%;background-color: #ffffff;display: flex;
    align-items: center}
    .goods .goods-row-2 .goodslist{width: 24.7%;height: 3rem;
        border-right: 1px solid #efefef;border-bottom: 1px solid #efefef}
    .goods .goods-row-2 .endgoodslist{width: 25%;height: 3rem;border-bottom: 1px solid #efefef}
    .goods .goods-row-2 .title{width: 100%;height: 0.6rem;line-height: 0.8rem;
        text-align: center;overflow: hidden; white-space: nowrap;text-overflow: ellipsis}
    .goods .goods-row-2 .img{width: 100%;text-align: center}
    .goods .goods-row-2 .img img{width: 1.52rem;height: 1.48rem}
    .goods .goods-row-2 .price{width: 100%;height: 0.4rem;text-align: center}
    .goodslist-price-color{font-size: 0.28rem;color: #d32a4e}
    .goods .goods-row-2 .unprice{width: 100%;height: 0.4rem;text-align: center}
    .goodslist-unprice-color{font-size: 0.24rem;color: #7b7f82;text-decoration: line-through}
    /*品牌男装展示*/
    .goods-title-color2{font-size: 0.28rem;color: #fe6719}
    .goods .goods2-row-1{width: 100%;height: auto;border-bottom: 1px solid #efefef;overflow: hidden;
        background-color: #ffffff;display: flex}
    .goods .goods2-row-1 .goodslist-1{width: 49.7%;border-right: 1px solid #efefef}
    .goods .goods2-row-1 .goodslist-1 .title2{width: 100%;height: 0.56rem;
        line-height: 0.8rem;overflow: hidden;text-align: center}
    .goods .goods2-row-1 .goodslist-1 .desc2{width: 100%;height: 0.28rem;
        text-align: center}
    .goods .goods2-row-1 .img{width: 100%;text-align: center;}
    .goods .goods2-row-1 .img img{width: 1.2rem;height: 1.4rem}
    .goods .goods2-row-1 .goodslist-2{width: 49%;}
    .goods .goods2-row-1 .goodslist-2 .title2{width: 100%;height: 0.6rem;
    text-align: center;line-height: 0.8rem;overflow: hidden}
    .goods .goods2-row-1 .goodslist-2 .desc2{width: 100%;height: 0.25rem;
    line-height: 0.2rem; text-align: center}
    .goods .goods2-row-2{width: 100%;background-color: #ffffff;display: flex;align-items: center}
    .goods .goods2-row-2 .goodslist{width: 24.7%;height: 3rem;border-right: 1px solid #efefef;
    border-bottom: 1px solid #efefef}
    .goods .goods2-row-2 .title{width: 100%;height: 0.7rem;text-align: center;
    line-height: 0.8rem;overflow: hidden}
    .goods .goods2-row-2 .img{width: 100%;text-align: center}
    .goods .goods2-row-2 .img img{width: 1.52rem;height: 1.48rem}
    .goods .goods2-row-2 .price{width: 100%;height: 0.4rem;text-align: center}
    .goods .goods2-row-2 .unprice{width: 100%;text-align: center}
    /*电脑办公*/
    .goods-title-color3{font-size: 0.28rem;color: #5fc600}
    .goods .goods-row-1 .left .goodslist-1 .goodslist1-price-color3{
        background-color: #5fc600;color: #ffffff;font-size: 0.28rem;
    }
    /*为您推荐*/
    .recom-title{width: 100%;height: 1rem;display: flex;-webkit-box-flex: 1;
        -webkit-box-align: center}
    .recom-title .left-line{width: 35%;height: 1px;background-color: #d4d4d4;
    margin-top: 6%}
    .recom-title .text{width: 28%;height: 0.44rem;margin-top: 3.5%;
    background: url("data:image/png;base64,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") no-repeat 0.28rem top;
    background-size: 0.36rem;line-height: 0.32rem;padding-left: 0.8rem;
    overflow: hidden}
    .recom-title-color{font-size: 0.32rem;color: #000000}
    /*为您推荐商品展示*/
    .recom-area{width: 100%;overflow: hidden;margin-bottom: 1rem;display: flex;flex-wrap: wrap}
    .recom-area .goods-list{width: 48%;height: 4.4rem;background-color: #ffffff;
    margin-bottom: 0.24rem;margin-left: 0.04rem}
    .recom-area .goodsL{margin-right: 0.16rem}
    .recom-area .goodsR{margin-right: 0rem}
    .recom-area .goods-list .img{width: 100%;text-align: center;}
    .recom-area .goods-list .img img{width: 2.8rem;height: 2.8rem}
    .recom-area .goods-list .title{width: 97%;height: 0.8rem;
    text-overflow: ellipsis;overflow: hidden;}
    .recomgoods-title-color{font-size: 0.28rem;color: #000000}

</style>
