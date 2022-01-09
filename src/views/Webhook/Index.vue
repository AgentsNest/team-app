<template>
  <div>
        {{payload}}
  </div>
</template>

<script>
import Other from '../../Apis/Other'
export default {
    data(){
        return{
            payload: ''
        }
    },
    mounted(){
        Other.getWebhook()
        .then((res) => {
            console.log(res)
        })
    }
}
</script>

<style>

</style>