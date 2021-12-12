<template>
  <div>
      <v-row>
          <v-col md="4">
              <Sidebar />
          </v-col>
          <v-col md="8">
              <v-card height="88vh" class="rounded-xl pa-5 content-card" flat>
                    <v-card-title>Notification Settings</v-card-title>
                    <v-card-text>
                        <v-alert text dense color="grey darken-3" border="left" class="py-3">
                          <div class="font-weight-bold">New Lead Alert</div>
                          <div class="body-2">Send me an immediate alert when a new lead is received via integration (e.g. Facebook, Website)</div>
                        </v-alert>
                        <v-switch v-model="switch1" label="via Email"></v-switch>
                        <v-switch v-model="switch1" label="via Web app"></v-switch>
                    </v-card-text>
                    <v-card-text>
                        <v-alert text dense color="grey darken-3" border="left" class="py-3">
                          <div class="font-weight-bold">New Lead Reminder</div>
                          <div class="body-2">Send me an additional alert if i haven't followed up with a new lead.</div>
                        </v-alert>
                        <v-switch v-model="switch1" label="via Email"></v-switch>
                        <v-switch v-model="switch1" label="via Web app"></v-switch>
                    </v-card-text>
                    <v-card-text>
                        <v-alert text dense color="grey darken-3" border="left" class="py-3">
                          <div class="font-weight-bold">New Project added</div>
                          <div class="body-2">Send me alert when new project website added.</div>
                        </v-alert>
                        <v-switch v-model="switch1" label="via Email"></v-switch>
                    </v-card-text>
              </v-card>
          </v-col>
      </v-row>
  </div>
</template>

<script>
import Sidebar from '../../components/Account/Sidebar.vue'

export default {
    components:{ Sidebar },

}
</script>

<style>
.content-card{
    overflow-y: scroll;
}
</style>