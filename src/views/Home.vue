<template>
  <div>
    <v-row no-gutters>
      <v-img 
        src="../assets/img/hero-bg.svg"
        lazy-src="../assets/img/hero-bg.svg"
        width="100vw"
        height="100vh"
      >
        <v-col md="8" offset-md="2">
          <Navbar />
          <!-- <v-card max-width="40vw" flat height="80vh" class="transparent d-flex align-center">
            <v-card-text>
              <div class="text-h3">A one-stop Marketing Solution.</div>
              <p class="title my-6">One app that just puts an end to the hassles of your everyday life.</p>
              <v-btn class="gradient px-8 py-6">Get Demo Now</v-btn>
            </v-card-text>
          </v-card> -->

          <v-row class="d-flex align-center mt-12">
            <v-col cols="6">
              <v-card flat class="transparent">
                <v-card-text>
                  <div class="text-h3">A one-stop Marketing Solution.</div>
                  <p class="title my-6">One app that just puts an end to the hassles of your everyday life.</p>
                  <v-btn class="gradient px-8 py-6">Get Demo Now</v-btn>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="6">
              <v-img
                src="../assets/img/mobile.png"
                lazy-src="../assets/img/mobile.png"
              ></v-img>
            </v-col>
          </v-row>

        </v-col>
      </v-img>
    </v-row>

    <v-row>
      <v-col md="8" offset-md="2">
          <div class="text-center">
            <v-btn large fab class="gradient"><v-icon color="white">mdi-layers-triple-outline</v-icon></v-btn>
            <div class="my-6 text-h4">Making your work easier</div>
            <div class="mt-3">Lorem ipsum is common placeholder text used to demonstrate the graphic elements <br> of a document or visual presentation.</div>
          </div>

          <v-row class="mt-12">
            <v-col cols="5" class="d-flex justify-center flex-column ">
              <div class="text-h5 font-weight-bold">Seamless collaboration</div>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua — Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </v-col>
            <v-col cols="7">
              <v-img 
                src="../assets/img/feat.png"
                lazy-src="../assets/img/feat.png"
              ></v-img>
            </v-col>
          </v-row>

          <v-row class="">
             <v-col cols="7">
              <v-img 
                src="../assets/img/feat2.png"
                lazy-src="../assets/img/feat2.png"
              ></v-img>
            </v-col>
            <v-col cols="5" class="d-flex justify-center flex-column ">
              <div class="text-h5 font-weight-bold">Seamless collaboration</div>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua — Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </v-col>
          </v-row>

          <v-row class="">
            <v-col cols="5" class="d-flex justify-center flex-column ">
              <div class="text-h5 font-weight-bold">Seamless collaboration</div>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua — Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </v-col>
            <v-col cols="7">
              <v-img 
                src="../assets/img/feat3.png"
                lazy-src="../assets/img/feat3.png"
              ></v-img>
            </v-col>
          </v-row>
      </v-col>
    </v-row>

    <!-- Pricing plans -->
    <v-row class="gradient py-12">
      <v-col md="8" offset-md="2">
        <v-card class="text-center py-10 transparent" flat dark>
          <div class="text-h3 mb-4 text-center">A plan for every price</div>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus impedit error labore doloremque fugit.</p>
        </v-card>
        <v-row class="mb-12 px-12">
          <v-col cols="6">
            <v-card class="pa-4 d-flex flex-column align-center rounded-t-lg" tile>
              <v-btn outlined class="mb-8 mt-6 px-6 py-5">Monthly</v-btn>
              <div class="d-flex mb-6">
                <div class="text-h5">₹</div>
                <div class="d-flex flex-column align-left">
                  <div class="text-h2 font-weight-bold">1499</div> 
                  <div class="caption pl-3">/MONTH</div>
                </div>
              </div>
            </v-card>
            <v-card class="grey lighten-4 pa-6 rounded-b-lg" tile>
              <v-list class="transparent">
                <v-list-item>
                  <v-list-item-icon><v-icon>mdi-check</v-icon></v-list-item-icon>
                  <v-list-item-content><v-list-item-title>Free Graphics</v-list-item-title></v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-icon><v-icon>mdi-check</v-icon></v-list-item-icon>
                  <v-list-item-content><v-list-item-title>Manage Existing Client</v-list-item-title></v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-icon><v-icon>mdi-check</v-icon></v-list-item-icon>
                  <v-list-item-content><v-list-item-title>Social Ads</v-list-item-title></v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-icon><v-icon>mdi-check</v-icon></v-list-item-icon>
                  <v-list-item-content><v-list-item-title>Free Websites</v-list-item-title></v-list-item-content>
                </v-list-item>
              
                <v-list-item>
                  <v-list-item-icon><v-icon>mdi-check</v-icon></v-list-item-icon>
                  <v-list-item-content><v-list-item-title>Track Client Activities</v-list-item-title></v-list-item-content>
                </v-list-item>
            
                <v-list-item>
                  <v-list-item-icon><v-icon>mdi-check</v-icon></v-list-item-icon>
                  <v-list-item-content><v-list-item-title>Facebook & Google Integration</v-list-item-title></v-list-item-content>
                </v-list-item>

              </v-list>
              <v-btn block x-large outlined class="rounded-lg" color="grey darken-3">Subscribe</v-btn>
            </v-card>
          </v-col>
          <v-col cols="6">
            <v-card class="pa-4 d-flex flex-column align-center rounded-t-lg" tile>
              <v-btn outlined class="mb-8 mt-6 px-6 py-5">Annually</v-btn>
              <div class="d-flex mb-6">
                <div class="text-h5">₹</div>
                <div class="d-flex flex-column align-left">
                  <div class="text-h2 font-weight-bold">999</div> 
                  <div class="caption pl-3">/MONTH</div>
                </div>
              </div>
            </v-card>
            <v-card class="grey lighten-4 pa-6 rounded-b-lg" tile>
              <v-list class="transparent">
                <v-list-item>
                  <v-list-item-icon><v-icon>mdi-check</v-icon></v-list-item-icon>
                  <v-list-item-content><v-list-item-title>Free Graphics</v-list-item-title></v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-icon><v-icon>mdi-check</v-icon></v-list-item-icon>
                  <v-list-item-content><v-list-item-title>Manage Existing Client</v-list-item-title></v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-icon><v-icon>mdi-check</v-icon></v-list-item-icon>
                  <v-list-item-content><v-list-item-title>Social Ads</v-list-item-title></v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-icon><v-icon>mdi-check</v-icon></v-list-item-icon>
                  <v-list-item-content><v-list-item-title>Free Websites</v-list-item-title></v-list-item-content>
                </v-list-item>
              
                <v-list-item>
                  <v-list-item-icon><v-icon>mdi-check</v-icon></v-list-item-icon>
                  <v-list-item-content><v-list-item-title>Track Client Activities</v-list-item-title></v-list-item-content>
                </v-list-item>
            
                <v-list-item>
                  <v-list-item-icon><v-icon>mdi-check</v-icon></v-list-item-icon>
                  <v-list-item-content><v-list-item-title>Facebook & Google Integration</v-list-item-title></v-list-item-content>
                </v-list-item>

              </v-list>
              <v-btn block x-large class="gradient rounded-lg">Subscribe</v-btn>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <!-- Footer -->
    <v-footer class="white py-10">
      <v-row>
        <v-col md="8" offset-md="2">
          <v-card class="flex" flat tile>
            <v-card-title class="">
              <strong class="subheading">agnt.</strong>

              <v-spacer></v-spacer>

              <v-btn class="mx-2" icon><v-icon size="24px">mdi-facebook</v-icon></v-btn>
              <v-btn class="mx-2" icon><v-icon size="24px">mdi-twitter</v-icon></v-btn>
              <v-btn class="mx-2" icon><v-icon size="24px">mdi-linkedin</v-icon></v-btn>
              <v-btn class="mx-2" icon><v-icon size="24px">mdi-linkedin</v-icon></v-btn>
            </v-card-title>

            <v-card-actions class="py-2">
              <div>© {{ new Date().getFullYear() }} — <strong>agnt,</strong> all rights reserved</div>

              <v-spacer></v-spacer>
              <v-btn text class="text-capitalize" >Contact</v-btn>
              <v-btn text class="text-capitalize">About Us</v-btn>
              <v-btn text class="text-capitalize">FAQ's</v-btn>
              <v-btn text class="text-capitalize">Support</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

    </v-footer>

  </div>
</template>

<script>
  import Navbar from '../components/Navbar.vue'
  export default {
    components:{ Navbar },
    name: 'Home',
    data() {
      return {
        isLoggedIn: false,
      };
    },
    methods: {},
    mounted() {},
  }
</script>

<style>
.gradient{
  background-image: linear-gradient(to right, #283593, #3cabba);
  box-shadow: 0 4px 15px 0 rgba(23, 91, 168, 0.75);
  color: #fff;
}
</style>