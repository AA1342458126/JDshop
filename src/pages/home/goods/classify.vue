<template>
    <div class="page">
        <div class='search-header'>
            <div class='back' @click="goBack()"></div>
            <div class='search'>请输入宝贝名称</div>
        </div>
        <div class='goods-main'>
            <div ref="scroll-classify" class='classify-wrap'>
                <div>
                    <div ref="items" :class="{'classify-item':true, active:item.active}" v-for="(item,index) in classifys" :key="index" @click="goPage('/goods/classify/item?cid='+item.cid,index)">{{item.title}}</div>
                </div>
            </div>
            <div class='goods-content'>
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    import IScroll from "../../../assets/js/libs/iscroll.js";
    import {mapState,mapActions} from 'vuex'
    export default {
        computed:{
            ...mapState({
                classifys:state=>state.goods.classifys
            })
        },
        methods:{
            ...mapActions({
                getClassify:"goods/getClassify",
                selectClassify:"goods/selectClassify"
            }),
            goBack(){
                this.$router.go(-1);
            },
            goPage(url,index){
                this.$router.replace(url);
                this.selectClassify({index:index});
                this.scrollPosition(index)
            },
            scrollPosition(index){
                let itemHeight=this.$refs['items'][0].offsetHeight*index;
                let halfHeight=this.$refs['scroll-classify'].offsetHeight/3;
                let bottomHeight=this.$refs['scroll-classify'].scrollHeight-itemHeight;
                if(itemHeight>halfHeight && bottomHeight>this.$refs['scroll-classify'].offsetHeight){
                    this.myScroll.scrollTo(0, -itemHeight, 1000, IScroll.utils.ease.elastic);
                }
            }
        },
        mounted(){
            document.title=this.$route.meta.title;
            this.$refs['scroll-classify'].addEventListener("touchmove",function (e) {
                e.preventDefault();
            },false);
            this.myScroll= new IScroll(this.$refs['scroll-classify'], {
                scrollX : false,
                scrollY : true,
                preventDefault : false
            });
        },
        created(){
            this.cid=this.$route.query.cid ? this.$route.query.cid : "";
            this.getClassify({success:()=>{
                this.$nextTick(()=>{
                    this.myScroll.refresh();     //重新刷新计算
                });
                if(this.classifys.length>0){
                    let index=0;
                    for(let i=0;i<this.classifys.length;i++){
                        if(this.classifys[i].cid==this.cid){
                            index=i;
                            break;
                        }
                    }
                    this.selectClassify({index:index});
                }
            }});
        }
    }
</script>

<style scoped>
    .page{width:100%;height:100vh;overflow:hidden;}
    .search-header{width:100%;height:1rem;background:#FFFFFF;display: flex;display: -webkit-flex;align-items: center;-webkit-align-items: center;border-bottom: 1px solid #EFEFEF;}
    .search-header .back{width:0.8rem;height:0.8rem;background-image: url("../../../assets/images/home/goods/back.png");background-size:100%;background-repeat: no-repeat;background-position: center;}
    .search-header .search{width:80%;height:0.69rem;border:solid 1px #B2B2B2;border-radius: 0.1rem;font-size:0.28rem;color:#626262;line-height:0.69rem;padding-left:0.2rem;}

    .goods-main{width:100%;height:92.5vh;display:flex;display:-webkit-flex;}
    .goods-main .classify-wrap{width:1.72rem;height:100%;overflow:hidden;margin-right:3%;position:relative;z-index:1;}
    .goods-main .classify-wrap .classify-item{width:100%;height:0.8rem;border-bottom: 1px solid #EFEFEF;background-color:#FFFFFF;font-size:0.28rem;text-align: center;line-height:0.8rem;overflow:hidden;}
    .goods-main .classify-wrap .classify-item.active{color:#ff0000}
    .goods-main .goods-content{width:71%;height:100%;}
</style>
