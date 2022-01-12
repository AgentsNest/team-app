<template>

    <div>
        <div class="d-flex">
            <v-spacer></v-spacer>
            <v-btn @click="download"><v-icon>mdi-tray-arrow-down</v-icon></v-btn>
        </div>
        <v-card class="d-flex align-center mx-auto transparent" height="75vh" width="100vw" ref="canvasCard" flat>
            <v-card ref="container" id="capture" class="mainCanvas">
                <v-stage ref="stage" :config="stageSize" id="theCanvas"> 
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
                            @click="showLogoControls"
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
                            @click="showBrandTextControls"
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
                            @click="showReraControls"
                        />
                    </v-layer>
                </v-stage>

                <div class="details-box">
                    <div class="flexbox">
                        <v-img src="../../assets/img/phone.png" width="15" class="mr-1"></v-img>
                        {{contact}}
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

            
            <!-- RERA Controls -->
            <v-expand-transition>
                <div class="rera-controls" v-if="reraControls">
                    <v-card class="d-flex align-center px-4 py-2">
                        <div>
                            <v-btn x-small fab tile elevation="1" class="white rounded-lg mr-2" @click="reraFontSize -= 2">
                                <v-icon>mdi-minus</v-icon>
                            </v-btn>
                            <span class="body-2 mr-2">Size</span>
                            <v-btn x-small fab tile elevation="1" class="white rounded-lg" @click="reraFontSize += 2">
                                <v-icon>mdi-plus</v-icon>
                            </v-btn>
                        </div>
                        <v-color-picker
                            dot-size="25"
                            hide-canvas
                            hide-inputs
                            hide-mode-switch
                            hide-sliders
                            show-swatches
                            mode="hexa"
                            swatches-max-height="80"
                            width="50%"
                            v-model="reraTextColor"
                            class="ml-auto"
                        ></v-color-picker>
                    </v-card>
                </div>
            </v-expand-transition>

            <!-- Logo Controls -->
            <v-expand-transition>
                <div class="logo-controls" v-if="logoControls">
                    <v-card class="pa-2 text-center">
                        <v-btn x-small fab tile elevation="1" class="white rounded-lg mr-4" @click="logoWidth -= 50">
                                <v-icon>mdi-minus</v-icon>
                        </v-btn>
                        <span class="body-2 mr-4">Logo Size</span>
                        <v-btn x-small fab tile elevation="1" class="white rounded-lg" @click="logoWidth += 50">
                            <v-icon>mdi-plus</v-icon>
                        </v-btn>
                    </v-card>
                </div>
            </v-expand-transition>

            <!-- BrandText Controls -->
            <v-expand-transition>
                <div class="brandText-controls" v-if="brandTextControls">
                    <v-card class="d-flex align-center px-4 py-2">
                        <v-btn x-small fab elevation="1" class="white mr-2 rounded-lg" @click="brandFontSize -= 2">
                            <v-icon>mdi-minus</v-icon>
                        </v-btn>
                        <span class="body-2 mr-2">Text</span>
                        <v-btn x-small fab elevation="1" class="white mr-4 rounded-lg" @click="brandFontSize += 2">
                            <v-icon>mdi-plus</v-icon>
                        </v-btn>
                        
                        <v-color-picker
                            dot-size="25"
                            hide-canvas
                            hide-inputs
                            hide-mode-switch
                            hide-sliders
                            show-swatches
                            mode="hexa"
                            swatches-max-height="75"
                            width="70%"
                            v-model="brandTextColor"
                            class="ml-auto"
                        ></v-color-picker>

                    </v-card>
                </div>
            </v-expand-transition>

            <!-- Main Bg Image controls -->
            <v-expand-transition>
                <div class="bgImage-controls" v-if="bgMainImageControl">
                    <v-card class="pa-4 grey lighten-2 text-center">
                        <label for="bgImage">
                            <v-icon>mdi-file-replace-outline</v-icon>
                            <span class="text-capitalize ml-2">Replace Image</span>
                            <input type="file" hidden id="bgImage" @change="onFileChange">
                        </label>
                    </v-card>
                </div>
            </v-expand-transition>

            <div v-if="downloadProgress" class="loaderScreen">
            <div class="relative h-full">
                <div class="logoText">Creating your design...</div>
                <div class="loader">
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
                </div>
            </div>
            </div>

            <!-- saved dailog -->
            <v-dialog v-model="savedDialog" persistent max-width="290">
                <v-card class="text-center pa-4">
                    <v-btn x-large icon outlined color="green"><v-icon size="42px">mdi-check</v-icon></v-btn>
                    <div class="title">Downloaded!</div>
                    <v-card-subtitle>Graphic saved in your phone</v-card-subtitle>
                    <v-btn color="green darken-1" depressed rounded-xl dark @click="savedDialog = false">OK</v-btn>
                </v-card>
            </v-dialog>

        </v-card>

    </div>

</template>

<script>
import Graphic from "../../Apis/Graphic";
import User from "../../Apis/User";
import html2canvas from "html2canvas";

// const width = window.innerWidth;
// const height = window.innerHeight;

// var canvas = document.getElementById("theCanvas");
// var parent = document.getElementById("parent");

const width = 400;
const height = 800;



export default {
    data() {
        return {
            stageSize: {
                width,
                height,
            },
            isDragging: false,
            bgWidth: '',
            bgHeight: '',
            image: null,
            logo: null,
            logoWidth: 80,
            logoHeight: 40,
            brandText: "",
            brandTextColor: "#ffffff",
            brandFontSize: 20,
            reraControls: false,
            reraText: 'PBRERA-PTK60-REA0514',
            reraTextColor: "#ffffff",
            reraFontSize: 9,
            brandTextControls: false,
            logoControls: false,
            email: "",
            website: "",
            contact: "",
            loading: false,
            bgMainImageControl: false,
            downloadProgress: false,
            showControls: false,
            savedDialog: false
        };
    },
    created() {},
    methods:{
        async fetchData() {
            var design = this.$route.params.id;
            await Graphic.details(design).then((response) => {
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
                // console.log(this.stageSize.height)
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
        writeMessage(message) {
            this.text = message;
        },
        handleDragStart() {
            this.isDragging = true;
        },
        handleDragEnd() {
            this.isDragging = false;
        },
        download(){
            html2canvas(document.getElementById("capture"))
            .then(function (canvas) {
                var image = canvas.toDataURL("image/jpeg");

                let a = document.createElement("a");
                a.href = canvas.toDataURL("image/png", 1.0);
                a.download = "graphic.png";
                a.click();
                a.remove();
            });
        },
        multiple(){
            this.downloadProgress = true;
            setTimeout(this.saveCanvas, 1800);
        },
        saveCanvas() {
            console.log('downloading started...')
            html2canvas(document.getElementById("capture"), {
                scale: 2,
            }).then(function (canvas) {
                var image = canvas.toDataURL("image/jpeg");
                let date = new Date(),
                time = date.getTime(),
                fileName = time + ".jpeg";
                console.log(image, fileName)

            });
            this.downloadProgress = false;
            this.savedDialog = true
        },
        loadingScreen () {
            this.loading = true
            setTimeout(() => (this.loading = false), 2000)
        },
        onFileChange(){
            // var vm = this;
            // const file = e.target.files[0];
            // var reader = new FileReader();
            // reader.onload = function(e) {
            //     vm.image = e.target.result
            // };
            // reader.readAsDataURL(file);   

        },
        showReraControls(){
            this.reraControls = true
            this.brandTextControls = false
            this.logoControls = false
        },
        showBrandTextControls(){
            this.brandTextControls = true
            this.reraControls = false
            this.logoControls = false
        },
        showLogoControls(){
            this.logoControls = true
            this.brandTextControls = false
            this.reraControls = false
        },
        hideAllControls(){
            this.logoControls = false
            this.brandTextControls = false
            this.reraControls = false
        }
    },
    mounted() {
        this.fetchData();
        this.fetchUser();
    },
    watch:{
        logoWidth:function(val){
            // console.log(val * (40 / 80) );
            this.logoHeight = val * (40 / 80);
            // this.logoHeight = val * ratio
        }
    }
}
</script>

<style scoped>
.mainCanvas{
    position: relative;
}
.saveBtn{
    position: fixed;
    bottom: 0;
    width: 60%;
    margin: 0 auto;
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
.color-pallete{
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
}
.rera-controls{
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
}
.logo-controls{
    position: fixed;
    bottom: 0;
    right: 0; 
    left: 0;
}
.brandText-controls{
    position: fixed;
    bottom: 0;
    right: 0; 
    left: 0;
}
.bgImage-controls{
    position: fixed;
    bottom: 0;
    right: 0; 
    left: 0;
}
.border-frame{
    border: 2px solid #ffffff;
    position: absolute;
    top: 3%;
    left: 3%;
    width: 94%;
    height: 94%;
}
/*Loader*/
.loaderScreen{
    background: #111827;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}
.logoText{
    font-size: 1.5em;
    margin-top: 5em;
    color: #fff;
}
.loader {
  position: absolute;
  top: 50%;
  left: 40%;
  margin-left: 10%;
  transform: translate3d(-50%, -50%, 0);
}
.dot {
  width: 24px;
  height: 24px;
  background: #3ac;
  border-radius: 100%;
  display: inline-block;
  animation: slide 1s infinite;
}
.dot:nth-child(1) {
  animation-delay: 0.1s;
  background: #32aacc;
}
.dot:nth-child(2) {
  animation-delay: 0.2s;
  background: #64aacc;
}
.dot:nth-child(3) {
  animation-delay: 0.3s;
  background: #96aacc;
}
.dot:nth-child(4) {
  animation-delay: 0.4s;
  background: #c8aacc;
}
.dot:nth-child(5) {
  animation-delay: 0.5s;
  background: #faaacc;
}
@-moz-keyframes slide {
  0% {
    transform: scale(1);
  }
  50% {
    opacity: 0.3;
    transform: scale(2);
  }
  100% {
    transform: scale(1);
  }
}
@-webkit-keyframes slide {
  0% {
    transform: scale(1);
  }
  50% {
    opacity: 0.3;
    transform: scale(2);
  }
  100% {
    transform: scale(1);
  }
}
@-o-keyframes slide {
  0% {
    transform: scale(1);
  }
  50% {
    opacity: 0.3;
    transform: scale(2);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes slide {
  0% {
    transform: scale(1);
  }
  50% {
    opacity: 0.3;
    transform: scale(2);
  }
  100% {
    transform: scale(1);
  }
}
</style>