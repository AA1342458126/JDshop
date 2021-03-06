import {getReviewsData} from "../../../api/home/reviews.js";

let modules={
    namespaced:true,
    state:{
        reviews:[],
        pageInfo:{}
    },
    mutations:{
        //获取评价信息
        getReviews(state,payload){
            getReviewsData(payload.gid).then(res=>{
                if(res.code==200){
                    state.reviews=res.data;
                    state.pageInfo=res.pageinfo;
                }else{
                    state.reviews=[];
                    state.pageInfo={pagesize:0,pagenum:1,page:1,total:0}
                }
                if(payload && payload.success){
                    payload.success();
                }
            })
        },
        getReviewsPage(state,payload){
            getReviewsData(payload.gid,payload.page).then(res=>{
                if(res.code==200){
                    state.reviews.push(...res.data);
                }
            })
        },
    },
    actions:{
        getReviews(conText,payload){
            conText.commit("getReviews",payload)
        },
        getReviewsPage(conText,payload){
            conText.commit("getReviewsPage",payload)
        }
    }
}
export default modules;