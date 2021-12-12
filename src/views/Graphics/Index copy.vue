<template>
  <Layout>
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
          <v-card max-width="28vw" class="mx-auto overflow-hidden" height="80vh" ref="canvasCard" flat>
          <!-- <v-card class="d-flex align-center mx-auto" max-height="75vh" max-width="28vw" ref="canvasCard"> -->
            <!-- <v-img
              :src="graphic"
              :lazy-src="graphic"
              contain
              ref="container" 
              id="capture"
              class="mainCanvas"
            > -->
            <v-card ref="container" id="capture" class="mainCanvas" flat>
              <v-stage ref="stage" id="theCanvas" :config="stageSize"> 
                <v-layer ref="layer">
                  <v-image
                      :config="{
                          image: image,
                          width: bgWidth,
                          height: bgHeight
                      }"
                      @click="hideAllControls"
                  />
                  <v-image
                    @dragstart="handleDragStart"
                    @dragend="handleDragEnd"
                    :config="{
                        image: logo,
                        draggable: true,
                        width: logoWidth,
                        height: logoHeight
                    }"
                    v-if="enableLogo"
                  />
                  <v-text
                    @dragstart="handleDragStart"
                    @dragend="handleDragEnd"
                    ref="text"
                    :config="{
                        x: 120,
                        y: 20,
                        fontFamily: 'Calibri',
                        fontSize: brandFontSize,
                        text: brandText,
                        fill: brandTextColor,
                        draggable: true,
                        fill: isDragging ? 'black' : brandTextColor
                    }"
                    v-if="enableBrandText"
                  />
                  <v-text
                    @dragstart="handleDragStart"
                    @dragend="handleDragEnd"
                    ref="text"
                    :config="{
                        x: 300,
                        y: 10,
                        fontFamily: 'Calibri',
                        fontSize: reraFontSize,
                        text: reraText,
                        fill: reraTextColor,
                        draggable: true,
                        fill: isDragging ? 'black' : reraTextColor
                    }"
                    v-if="enableRera"
                  />
                </v-layer>
              </v-stage>

              <div class="details-box">
                <div class="flexbox">
                    <v-img src="../../assets/img/phone.png" width="15" class="mr-1"></v-img>
                    {{contact}} Vimal Bharti
                </div>
                <div class="flexbox">
                    <v-img src="../../assets/img/web.png" width="15" class="mr-1"></v-img>
                    {{website}}
                </div>
                <div class="flexbox">
                    <v-img src="../../assets/img/email.png" width="15" class="mr-1"></v-img>
                    {{email}}
                </div>
              </div>  

            </v-card>

            <!-- </v-img> -->
          </v-card>
        </v-col>
        <!-- Controls Right Sidebar Column 2 -->
        <v-col md="3">

          <v-btn block class="mb-4 gradient py-6 rounded-lg" dark @click="download">Download</v-btn>

          <!-- Logo -->
          <v-card class="mb-4 rounded-lg" outlined>
            <v-card-actions>
              <v-checkbox v-model="enableLogo" label="Logo" dense class="pt-3"></v-checkbox>
              <v-spacer></v-spacer>
              <div>
                <v-btn width="30" height="30" fab tile elevation="1" class="white rounded-lg mr-2" @click="logoWidth -= 20">
                  <v-icon>mdi-minus</v-icon>
                </v-btn>
                <span class="body-2 mr-2">Size</span>
                <v-btn width="30" height="30" fab tile elevation="1" class="white rounded-lg" @click="logoWidth += 20">
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
              </div>
            </v-card-actions>
          </v-card>
          <!-- Brand Text -->
          <v-card class="mb-4 rounded-lg" outlined>
            <v-card-actions>
              <v-checkbox v-model="enableBrandText" label="Brand" dense class="pt-3"></v-checkbox>
              <v-spacer></v-spacer>
              <div>
                <v-btn width="30" height="30" fab tile elevation="1" class="white rounded-lg mr-2" @click="brandFontSize -= 2">
                  <v-icon>mdi-minus</v-icon>
                </v-btn>
                <span class="body-2 mr-2">Size</span>
                <v-btn width="30" height="30" fab tile elevation="1" class="white rounded-lg" @click="brandFontSize += 2">
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
              </div>
            </v-card-actions>
            <v-color-picker
                dot-size="25"
                hide-canvas
                hide-inputs
                hide-mode-switch
                hide-sliders
                show-swatches
                mode="hexa"
                swatches-max-height="75"
                v-model="brandTextColor"
                class="pa-0 pb-2"
            ></v-color-picker>
          </v-card>
          <!-- RERA TExt -->
          <v-card class="mb-4 rounded-lg" outlined>
            <v-card-actions>
              <v-checkbox v-model="enableRera" label="RERA" dense class="pt-3"></v-checkbox>
              <v-spacer></v-spacer>
              <div>
                <v-btn width="30" height="30" fab tile elevation="1" class="white rounded-lg mr-2" @click="reraFontSize -= 2">
                  <v-icon>mdi-minus</v-icon>
                </v-btn>
                <span class="body-2 mr-2">Size</span>
                <v-btn width="30" height="30" fab tile elevation="1" class="white rounded-lg" @click="reraFontSize += 2">
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
              </div>
            </v-card-actions>
            <v-color-picker
                dot-size="25"
                hide-canvas
                hide-inputs
                hide-mode-switch
                hide-sliders
                show-swatches
                mode="hexa"
                swatches-max-height="75"
                v-model="reraTextColor"
                class="pa-0 pb-2"
            ></v-color-picker>
          </v-card>

        </v-col>
      </v-row>
      
    </v-card>

  </Layout>
</template>

<script>
import Graphic from '../../Apis/Graphic'
import Layout from '../../Layouts/Dashboard.vue'
import InfiniteLoading from 'vue-infinite-loading';
import User from '../../Apis/User'
import html2canvas from "html2canvas";

const width = 400;
const height = 800;

export default {
  components: { Layout, InfiniteLoading },
  data() {
    return {
      stageSize: {
          width,
          height
      },
      graphics: [],
      graphic: '',
      loadMoreBtn: true,
      page: 1,
      last_page : null,
      skelton: false,
      isDragging: false,
      enableLogo: false,
      logoControls: false,
      logo: null,
      logoWidth: 80,
      logoHeight: 40,
      enableBrandText: false,
      brandText: "",
      brandTextColor: "#222222",
      brandFontSize: 20,
      enableRera: false,
      reraControls: false,
      reraText: 'PBRERA-PTK60-REA0514',
      reraTextColor: "#222222",
      reraFontSize: 9,
      brandTextControls: false,
      email: "",
      website: "",
      contact: "",
      loading: false,
      bgMainImageControl: false,
      downloadProgress: false,
      showControls: false,
      savedDialog: false,
      search: '',
      bgWidth: '',
      bgHeight: '',
      image: null,
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
            this.brandText = response.data.data.brand_text;
            this.email = response.data.data.email;
            this.website = response.data.data.website;
            this.contact = response.data.data.contact;

            const image = new window.Image();
            image.src = response.data.data.brand_logo;
            image.onload = () => {
                this.logo = image;
            };
            // console.log(response.data.data)
        });
    },
    handleDragStart() {
        this.isDragging = true;
    },
    handleDragEnd() {
        this.isDragging = false;
    },
    download(){
        html2canvas(document.getElementById("capture"),{
            dpi: 300,
            scale: 5
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
          const image = new window.Image();
          image.src = response.data.image;
          image.onload = () => {
              this.image = image;
              // calculation
              var ratio = image.height / image.width;
              this.stageSize.height = this.stageSize.width * ratio;

              this.bgWidth = this.stageSize.width;
              this.bgHeight = this.stageSize.height;
          };
          // console.log(response.data);
      });
    }
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
  watch:{
    logoWidth:function(val){
      this.logoHeight = val * (40 / 80);
    }
  }
}
</script>

<style scoped>
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
</style>