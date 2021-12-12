<template>
  <div class="px-5 "> 
    <v-snackbar 
      v-model="snackbar" 
      transition="scroll-y-transition" 
      top
      timeout="3000"
    >
      {{ toastMessage }}
      <template v-slot:action="{ attrs }">
        <v-btn small color="pink" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
      </template>
    </v-snackbar>

    <v-toolbar class="gradient-bg" flat>
        <v-btn class="white" depressed icon @click="$router.go(-1)"><v-icon color="black">mdi-keyboard-backspace</v-icon></v-btn>
        <v-spacer></v-spacer>
    </v-toolbar>

    <v-img 
      src="../../assets/img/feedback.svg" 
      lazy-src="../../assets/img/feedback.svg"
      width="350"
      class="mx-auto"
    ></v-img>

    <v-card flat class="mt-3">
      <v-card-text>
        <v-textarea outlined label="Your feedback" v-model="message"></v-textarea>
      </v-card-text>
      <v-card-actions class="text-center">
        <v-btn block class="grey darken-4" dark @click="SendFeedback">Send</v-btn>
      </v-card-actions>
    </v-card>

  </div>
</template>

<script>
import Pages from '../../Apis/Pages'

export default {
  data(){
    return{
      message: '',
      snackbar: false,
      toastMessage: 'Sent Successfully!'
    }
  },
  methods:{
    SendFeedback(){
      let data = new FormData();
      data.append('message', this.message)

      Pages.new(data).then((response) => {
        console.log(response);
        this.message = ""
        this.snackbar = true
      })
    }
  }
}
</script>

<style scoped>
.copy-text{
  width: 60%;
  margin: 0 auto;
  box-shadow: 0px 0px 6px #cdcdcd;
  padding: 2px;
  border-radius: 4px;
}
</style>