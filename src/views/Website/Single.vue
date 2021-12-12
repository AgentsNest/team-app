<template>
    <div>
        <v-img
            src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
            lazy-src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
            height="140"
        ></v-img>
        

        <v-row class="mt-n16">
            <v-col md="6" offset-md="3">
                <v-card class="rounded mx-auto pa-3">
                    <v-img
                        src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
                        lazy-src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
                    >
                        <v-toolbar flat class="transparent pa-2">
                            <v-spacer></v-spacer>
                            <v-speed-dial v-model="fab" direction="bottom" :open-on-hover="hover" :transition="transition">
                                <template v-slot:activator>
                                    <v-btn v-model="fab" class="grey darken-3 rounded-lg" depressed icon dark>
                                    <v-icon v-if="fab">mdi-close</v-icon>
                                    <v-icon v-else>mdi-share-variant-outline</v-icon></v-btn>
                                </template>
                                <v-btn fab dark color="green"><v-icon>mdi-whatsapp</v-icon></v-btn>
                                <v-btn fab dark color="light-blue darken-2"><v-icon>mdi-message-text-outline</v-icon></v-btn>
                                <v-btn fab dark color="red lighten-1"><v-icon>mdi-email-outline</v-icon></v-btn>
                            </v-speed-dial>
                        </v-toolbar>
                    </v-img>
                    <v-card-title>{{website.title}}</v-card-title>
                    <v-card-subtitle>{{website.about}}</v-card-subtitle>

                    <v-row>
                        <v-col v-for="n in 9" :key="n" class="d-flex child-flex" cols="4">
                            <v-img
                                :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
                                :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
                                aspect-ratio="1"
                                class="grey lighten-2"
                            >
                                <template v-slot:placeholder>
                                    <v-row class="fill-height ma-0" align="center" justify="center">
                                        <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                                    </v-row>
                                </template>
                            </v-img>
                        </v-col>
                    </v-row>

                    <v-card-text>
                        <div class="text-h6">Map</div>
                        <div><iframe :src="website.map" width="100%" height="400" frameborder="0"></iframe></div>
                    </v-card-text>
                    <v-card-text>
                        <div class="text-h6">Walkthrough</div>
                        <iframe id="ytplayer" type="text/html" :src="website.walkthrough" width="100%" height="400" frameborder="0"></iframe>
                    </v-card-text>
                    
                </v-card>
            </v-col>
        </v-row>

    </div>

</template>

<script>
import Website from '../../Apis/Website'

export default {
    data () {
      return {
        fab: false,
        hover: false,
        transition: 'slide-y-reverse-transition',
        website: '',
        images: []
      }
    },
    methods: {
        async fetchData() {
            var website = this.$route.params.id;
            await Website.SlugDetails(website).then((response) => {
                this.website = response.data.website
                console.log(response.data.website)
            });
        },
    },
    mounted() {
        this.fetchData();
    },
}
</script>

<style scoped>
.search-input{
  background-color: #fff;
  border-radius: 12px;
  padding: 0.8em;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 2px 6px 0 rgba(136,148,171,.2),0 24px 20px -24px rgba(71,82,107,.1);
}
</style>