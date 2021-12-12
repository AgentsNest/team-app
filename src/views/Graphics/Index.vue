<template>

    <v-card class="rounded-xl pa-5 shadow content-card" height="88vh" elevation="0">

      <v-row>
        <!-- Image gallery columns 4 -->
        <v-col md="3" class="all-images-card">
          <!-- <v-row>
            <v-col>
              <input type="text" placeholder="Search by category..." class="search-input" v-model="search">
            </v-col>
          </v-row> -->
          <v-row v-if="skelton">
            <v-col cols="6" v-for="n in 12" :key="n">
              <v-skeleton-loader
                class="mx-auto rounded-lg"
                height="140px"
                type="image"
              ></v-skeleton-loader>
            </v-col>
          </v-row>
          <v-row v-else>
            <v-col cols="6" v-for="(graphic, index) in filterGraphic" :key="index">
                <v-img
                  :src="graphic.thumb"
                  :lazy-src="graphic.thumb"
                  aspect-ratio="1.4"
                  height="140px"
                  class="grey lighten-2 rounded-lg pointer"
                  @click="detailsSidebar(graphic.id)"
                >
                  <template v-slot:placeholder>
                    <v-row class="fill-height ma-0" align="center" justify="center">
                      <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
            </v-col>
          </v-row>
          <infinite-loading @infinite="infiniteHandler" spinner="waveDots">
            <span slot="no-more"></span>
          </infinite-loading>
        </v-col>
        <!-- Canvas Column 6 -->
        <v-col md="6">
          <v-card max-width="28vw" class="mx-auto overflow-hidden d-flex align-center" height="80vh" ref="canvasCard" >
          <!-- <v-card class="d-flex align-center mx-auto" max-height="75vh" max-width="28vw" ref="canvasCard"> -->
            <v-img
              :src="graphic"
              :lazy-src="graphic"
              contain
              ref="container" 
              id="capture"
              class="mainCanvas"
            >
            <!-- <v-card ref="container" id="capture" class="mainCanvas" flat> -->

              <div class="layouts">
                <div class="layout-one" v-if="frameOne">
                  <div class="brand-contents">
                      <v-img :src="agent.brand_logo" height="20px" contain class="logo"></v-img>
                      <div class="brand-text">{{agent.brand_text}}</div>
                      <div class="rera-text">{{agent.rera}}</div>
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

                <!-- Frame Two -->
                <div class="layout-two" v-if="frameTwo">
                  <div class="brand-contents">
                      <v-img :src="agent.brand_logo" height="30px" contain class="logo"></v-img>
                      <div class="brand-text">{{agent.brand_text}}</div>
                      <div class="rera-text">{{agent.rera}}</div>
                  </div>

                  <div class="details-box">
                      <div class="flexbox">
                          <!-- <v-btn icon width="16px" height="16px" class="grey darken-4 mr-1" dark>
                            <v-icon size="10px">mdi-phone</v-icon>
                          </v-btn> -->
                          <v-icon color="grey darken-4" size="18px">mdi-phone-in-talk</v-icon>
                          <span class="ml-1">{{agent.contact}}</span>
                      </div>
                      <div class="flexbox">
                          <!-- <v-btn icon width="16px" height="16px" class="grey darken-4 mr-1" dark>
                            <v-icon size="10px">mdi-email-outline</v-icon>
                          </v-btn> -->
                          <v-icon color="grey darken-4" size="18px">mdi-email</v-icon>
                          <span class="ml-1">{{agent.website}}</span>
                      </div>
                      <div class="flexbox">
                          <!-- <v-btn icon width="16px" height="16px" class="grey darken-4 mr-1" dark>
                            <v-icon size="10px">mdi-web</v-icon>
                          </v-btn> -->
                          <v-icon color="grey darken-4" size="18px">mdi-web-box</v-icon>
                          <span class="ml-1">{{agent.email}}</span>
                      </div>
                  </div>  
                </div>
              </div>

            <!-- </v-card> -->

            </v-img>
          </v-card>
        </v-col>
        <!-- Controls Right Sidebar Column 2 -->
        <v-col md="3">

          <v-btn block class="mb-4 gradient py-6 rounded-lg" dark @click="download">Download</v-btn>

          <v-card flat>
            <v-alert text dense color="teal" border="left">Select Layout</v-alert>
            <v-row>
              <v-col md="6">
                <v-card><v-btn @click="selectFrameOne">Layout One</v-btn></v-card>
              </v-col>
              <v-col md="6">
                <v-card><v-btn @click="selectFrameTwo">Layout Two</v-btn></v-card>
              </v-col>
            </v-row>
          </v-card>
          

        </v-col>
      </v-row>
      
    </v-card>


</template>

<script>
import Graphic from '../../Apis/Graphic'
import InfiniteLoading from 'vue-infinite-loading';
import User from '../../Apis/User'
import html2canvas from "html2canvas";

export default {
  components: { InfiniteLoading },
  data() {
    return {
      graphics: [],
      graphic: '',
      loadMoreBtn: true,
      page: 1,
      last_page : null,
      skelton: false,
      search: '',
      image: null,
      agent:'',
      frameOne: false,
      frameTwo: false
    };
  },
  methods: {
    fetchData() {
      this.skelton = true
      Graphic.all(this.page).then((response) => {
        this.skelton = false
        this.graphics = response.data.data;
        this.last_page = response.data.last_page;
        // console.log(response.data.data)
      });
    },
    async fetchUser() {
        await User.auth().then((response) => {
            this.agent = response.data.data
            console.log(response.data.data)
        });
    },
    download(){
        html2canvas(document.getElementById("capture"),{
            dpi: 300,
            scale: 2
        })
        .then(function (canvas) {
            let a = document.createElement("a");
            a.href = canvas.toDataURL("image/jpeg");
            a.download = "graphic.jpg";
            a.click();
            a.remove();
        });

    },
    infiniteHandler($state){
      if (this.page === this.last_page) {
        $state.complete();
      } else {
        this.page = this.page + 1;
        Graphic.all(this.page).then((response) => {
          // console.log(response.data.data)
          response.data.data.forEach(data => {
            this.graphics.push(data);
          });
          $state.loaded();
        });
      }
    },
    detailsSidebar(id){
      Graphic.details(id).then(response => {
          this.graphic = response.data.image;
          // console.log(response.data);
      });
    },
    selectFrameOne(){
      this.frameOne = true
      this.frameTwo = false
    },
    selectFrameTwo(){
      this.frameOne = false
      this.frameTwo = true
    },
  },
  mounted(){
    this.fetchData();
    this.fetchUser();
  },
  computed:{
    filterGraphic: function(){
        return this.graphics.filter((graphic) => {
            return graphic.title.toLowerCase().match(this.search.toLowerCase());
        })
    },
  },
}
</script>

<style scoped lang="scss">
.all-images-card{
  height: 82vh;
  overflow-y: scroll;
}
.pointer{
  cursor: pointer;
}
.search-input{
  background-color: #fff;
  border-radius: 8px;
  padding: 8px 1em;
  width: 100%;
  box-shadow: 0 2px 6px 0 rgba(136,148,171,.2),0 24px 20px -24px rgba(71,82,107,.1);
}
.mainCanvas{
    position: relative;
}
.details-box{
    position: absolute;
    bottom: 10px;
    width: 90%;
    left: 5%;
    border-radius: 5px;
    display: flex;
    font-size: 0.5rem;
    justify-content: space-between;
    padding: 5px 8px;
    background: #ffffff;
}
.icon-bg{
    background: #343434;
    padding: 2px 4px;
    border-radius: 50%;
    margin-right: 3px;
}
.flexbox{
    display: flex;
    justify-content: center;
    align-items: center;
}
.layout-one{
    .brand-text{
        position: absolute;
        top: 10px;
        left: 10px;
    }
    .logo{
        position: absolute;
        left: 8vw;
        bottom: 9vh;
    }
    .rera-text{
        position: absolute;
        right: 10px;
        top: 10px;
        font-size: 0.8rem;
    }
}
.layout-two{
    .brand-text{
        position: absolute;
        top: 10px;
        left: 10px;
        font-weight: bold;
        font-size: 1.2em;
        color: red;
    }
    .logo{
        position: absolute;
        right: 0;
        top: 2em;
    }
    .rera-text{
        position: absolute;
        right: 0;
        top: 0;
        font-size: 0.7rem;
        color: white;
        background: #333;
        padding: 3px 8px;
        font-weight: bold;
    }
}

</style>