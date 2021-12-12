<template>
    <div class="layout-one">
        <div class="brand-contents">
            <v-img :src="agent.logo" height="20px" contain class="logo"></v-img>
            <div class="brand-text">{{agent.brand_text}}</div>
            <div class="rera-text">{{agent.reraText}}</div>
        </div>

        <div class="details-box">
            <div class="flexbox">
                <v-img src="../../assets/img/phone.png" width="15" class="mr-1"></v-img>
                {{agent.contact}} Vimal Bharti
            </div>
            <div class="flexbox">
                <v-img src="../../assets/img/web.png" width="15" class="mr-1"></v-img>
                {{agent.website}}
            </div>
            <div class="flexbox">
                <v-img src="../../assets/img/email.png" width="15" class="mr-1"></v-img>
                {{agent.email}}
            </div>
        </div>  
    </div>
</template>

<script>
export default {
    props: ['agent'],
}
</script>

<style lang="scss" scoped>
.layout-one{

    .brand-text{
        position: absolute;
        top: 10px;
        left: 10px;
    }
    .logo{
        position: absolute;
        left: 0;
        top: 10px;
    }
    .rera-text{
        position: absolute;
        right: 10px;
        top: 10px;
        font-size: 0.8rem;
    }
}
</style>