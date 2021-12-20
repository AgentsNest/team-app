<template>
  <Layout>

          <v-row class="d-none d-md-block">
            <v-col md="4" v-for="n in 6" :key="n">
              <v-card>
                <v-card-text class="pt-0 d-none d-md-block">
                  <div class="text-h6 font-weight-light mb-2">
                    User Registrations
                  </div>
                  <div class="subheading font-weight-light grey--text">
                    Last Campaign Performance
                  </div>
                  <v-divider class="my-2"></v-divider>
                  <v-icon
                    class="mr-2"
                    small
                  >
                    mdi-clock
                  </v-icon>
                  <span class="text-caption grey--text font-weight-light">Leads</span>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>


  </Layout>
</template>

<script>
import Layout from '../Layouts/Dashboard.vue'
export default {
  components:{ Layout },
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