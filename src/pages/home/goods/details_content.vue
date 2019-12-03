<template>
    <div class="page">
        <div class='content' v-html="detailsGoods.bodys"></div>
    </div>
</template>

<script>
    import {mapState,mapActions} from 'vuex'
    export default {
        computed:{
            ...mapState({
                detailsGoods:state=>state.goods.detailsGoods
            })
        },
        methods:{
            ...mapActions({
                getDetails:"goods/getDetails"
            })
        },
        created(){
            this.getDetails({gid:this.$route.query.gid});
        }
    }
</script>

<style scoped>
    .page{margin-top:1.2rem;}
    .content{width:90%;margin:0 auto;font-size:0.32rem;line-height:0.5rem;}
</style>
