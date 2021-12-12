<template>
  <div>
    <v-img
        src="../../assets/img/login.jpg"
        gradient="to top right, rgba(40, 53, 147,.9), rgba(60, 171, 186,.9)"
        height="120px"
    >
        <v-toolbar flat class="transparent py-3">
            <v-btn fab small rounded-lg depressed class="white" @click="$router.go(-1)">
                <v-icon>mdi-keyboard-backspace</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <div class="white--text title font-weight-bold">{{agent.name}}</div>
            <v-spacer></v-spacer>
        </v-toolbar>
    </v-img>

    <v-card class="rounded-xl pa-4 mt-n8" flat>
      <v-img
        :src="preview ? preview : agent.brand_logo"
        max-width="200px"
        class="mx-auto"
      ></v-img>
      <v-card class="text-center mt-4" flat>
        <label for="brandLogo" class="brandLogoLabel">
            Change Brand Logo
            <input type="file" id="brandLogo" hidden accept="image/*" @change="previewLogo"/>
        </label>
        <div class="grey--text text--darken-2 caption mt-2">(Recommend Size: 250 X 120)</div>
      </v-card>

      <v-card-text>
        <v-text-field
            label="Name"
            v-model="agent.name"
        ></v-text-field>
        <v-text-field
            label="Email"
            v-model="agent.email"
        ></v-text-field>
        <v-text-field
            label="Phone Number"
            v-model="agent.contact"
        ></v-text-field>
        <v-text-field
            label="Company Name"
            v-model="agent.brand_text"
        ></v-text-field>
        <v-text-field
            label="Website"
            v-model="agent.website"
        ></v-text-field>

        <v-btn 
          block 
          large
          class="white--text rounded-lg"
          @click="saveDetails()"
          :class="success == true ? 'gradient' : 'grey darken-4'"
        >{{submitBtn}}</v-btn>
      </v-card-text>
    </v-card>

</div>
</template>

<script>

import User from '../../Apis/User'

export default {
  components: {  },
  data(){
    return{
      agent:{
        email: '',
        contact: '',
        website: '',
        brand_logo: ''
      },
      preview: '',
      submitBtn: "Update",
      success: false,
    }
  },
  methods: {
    saveDetails() {
      User.update(this.agent.id, this.agent).then((response) => {
        this.success = true;
        this.submitBtn = "Profile Updated";
        console.log(response);
      });
    },
    previewLogo(e) {
      let file = e.target.files[0];

      let reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = (e) => {
        this.preview = e.target.result;
        this.agent.brand_logo = e.target.result;
      };
    },
  },
  beforeMount(){
    User.authForUpdate().then((response) => {
      this.agent = response.data.data;
      console.log(response)
    });
  }
}
</script>

<style scoped>
.brandLogoLabel{
  border: 1px solid #999999;
  border-radius: 4px;
  padding: 5px 12px;
  cursor: pointer;
  font-size: 14px
}
.gradient{
  background-image: linear-gradient(to right, #0ba360, #3cba92);
  box-shadow: 0 4px 15px 0 rgba(23, 168, 108, 0.75);
}
</style>