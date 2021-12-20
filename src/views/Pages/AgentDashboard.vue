<template>
    <div>
        <v-row>
            <v-col md="4" cols="6">
                <v-card class="rounded-xl">
                  <router-link :to="{name: 'Leads'}">
                    <v-card-text>
                        <div class="text-h6 mb-2 text-center">Leads</div>
                        <div class="subheading font-weight-light grey--text">all lead genrated through various mediums</div>
                        <v-divider class="my-2"></v-divider>
                        <span class="text-caption grey--text font-weight-light">You have: 302 leads</span>
                    </v-card-text>
                  </router-link>
                </v-card>
            </v-col>
            <v-col md="4" cols="6">
                <v-card class="rounded-xl">
                  <router-link :to="{name: 'Graphic'}">
                    <v-card-text>
                        <div class="text-h6 text-center mb-2">Graphics</div>
                        <div class="subheading font-weight-light grey--text">all lead genrated through various mediums</div>
                        <v-divider class="my-2"></v-divider>
                        <span class="text-caption grey--text font-weight-light">You have: 302 leads</span>
                    </v-card-text>
                  </router-link>
                </v-card>
            </v-col>
            <v-col md="4" cols="6">
                <v-card class="rounded-xl">
                  <router-link :to="{name: 'Client'}">
                    <v-card-text>
                        <div class="text-h6 text-center mb-2">Existing Clients</div>
                        <div class="subheading font-weight-light grey--text">all lead genrated through various mediums</div>
                        <v-divider class="my-2"></v-divider>
                        <span class="text-caption grey--text font-weight-light">You have: 302 leads</span>
                    </v-card-text>
                  </router-link>
                </v-card>
            </v-col>
            <v-col md="4" cols="6">
                <v-card class="rounded-xl">
                  <router-link :to="{name: 'MyWebsite'}">
                    <v-card-text>
                        <div class="text-h6 text-center mb-2">Website</div>
                        <div class="subheading font-weight-light grey--text">all lead genrated through various mediums</div>
                        <v-divider class="my-2"></v-divider>
                        <span class="text-caption grey--text font-weight-light">You have: 302 leads</span>
                    </v-card-text>
                  </router-link>
                </v-card>
            </v-col>
        </v-row>

    </div>
</template>

<script>
export default {
  data: () => ({
    labels: [
      '12am',
      '3am',
      '6am',
      '9am',
      '12pm',
      '3pm',
      '6pm',
      '9pm',
    ],
    value: [
      200,
      675,
      410,
      390,
      310,
      460,
      250,
      240,
    ],
  }),
}
</script>

<style>

</style>