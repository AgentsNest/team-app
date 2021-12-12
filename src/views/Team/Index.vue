<template>
    <div>
        <v-snackbar v-model="snackbar" transition="scroll-y-transition" top timeout="3000"
        >
            Team Member Added Successfully
            <template v-slot:action="{ attrs }">
                <v-btn small color="pink" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
            </template>
        </v-snackbar>

        <v-card class="rounded-xl pa-5 shadow content-card" height="88vh" elevation="0">

            <v-toolbar flat>
                <!-- <v-btn icon class="mr-4" @click="$router.go(-1)">
                    <v-icon size="28" color="grey darken-3">mdi-arrow-left</v-icon>
                </v-btn>
                <v-spacer></v-spacer> -->
                <div class="text-uppercase font-weight-bold">My Team</div>
                <input type="text" placeholder="Search by Name..." class="search-input ml-6">
            </v-toolbar>

            <v-card-text>
              <v-row>
                <v-col md="8">
                    <v-row>
                        <v-col md="6" v-for="(team, index) in teams" :key="index">
                            <v-list-item class="shadow rounded-lg" height="100%">
                                <v-list-item-avatar tile :color="randomColor(team.id)" 
                                  class="white--text rounded-lg title" size="48"
                                >
                                  {{team.name[0]}}
                                </v-list-item-avatar>

                                <v-list-item-content>
                                    <v-list-item-title v-html="team.name" class="font-weight-bold"></v-list-item-title>
                                    <v-list-item-subtitle>{{team.email}}</v-list-item-subtitle>
                                    <v-list-item-subtitle>
                                        <span class="text--primary mr-2">Property:</span> 
                                        <span v-if="team.leads">{{team.leads.length}}</span>
                                    </v-list-item-subtitle>
                                    <v-list-item-subtitle><span class="text--primary">Added:</span> {{team.created_at | formatDate}}</v-list-item-subtitle>
                                </v-list-item-content>

                                <v-list-item-action>
                                  <v-btn icon><v-icon>mdi-chevron-right</v-icon></v-btn>
                                </v-list-item-action>

                              
                            </v-list-item>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col md="4">
                    <v-card class="pa-5 rounded-lg">
                        <v-img
                            max-width="300"
                            class="mx-auto"
                            src="../../assets/img/client.svg"
                            lazy-src="../../assets/img/client.svg"
                        >
                            <template v-slot:placeholder>
                            <v-row class="fill-height ma-0" align="center" justify="center">
                                <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                            </v-row>
                            </template>
                        </v-img>

                        <v-card class="pa-4" flat>
                            <input type="text" class="input-field" placeholder="Name" v-model="team.name">
                            <input type="text" class="input-field" placeholder="Email" v-model="team.email">
                            <input type="text" class="input-field" placeholder="Password" v-model="team.password">
                            <v-btn rounded-md large block dark class="grey darken-4" @click="SaveTeam">Create account</v-btn>
                        </v-card>
                    </v-card>
                </v-col>
            </v-row>
          </v-card-text>

        </v-card>
    </div>
</template>

<script>
import User from '../../Apis/User';

export default {
    data: () => ({
        team:{
          name: '',
          email: '',
          password: '',
          agent_id: null,
        },
        snackbar : false,
        teams: [],
        colorCache: {},
    }),
    methods:{
      async fetchTeam(){
        User.agentTeam()
        .then(response => {
          this.teams = response.data;
          console.log(response)
        })
      },
      SaveTeam(){
        let data = new FormData();

        data.append('name', this.team.name)
        data.append('email', this.team.email)
        data.append('contact', this.team.contact)
        data.append('agent_id', this.team.agent_id)

        User.newTeamAdd(data)
        .then(() => {
          this.fetchTeam();
          this.snackbar = true;
          this.team = ''
        })
      },
      randomColor(id) {
        const r = () => Math.floor(256 * Math.random());
        return this.colorCache[id] || (this.colorCache[id] = `rgb(${r()}, ${r()}, ${r()})`);
      }
    },
    mounted(){
      this.fetchTeam();
    }
}
</script>

<style scoped>
.content-card{
    overflow-y: scroll;
}
.input-field{
  border-radius: 6px;
  padding: 0.7em 1em;
  font-size: 15px;
  width: 100%;
  /* box-shadow: 0 2px 6px 0 rgba(136,148,171,.2),0 24px 20px -24px rgba(71,82,107,.1); */
  box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
  background: #f5f5f5;
  outline: none;
  margin-bottom: 1.5em;
}
.search-input{
  background-color: #fff;
  border-radius: 12px;
  padding: 0.8em;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 2px 6px 0 rgba(136,148,171,.2),0 24px 20px -24px rgba(71,82,107,.1);
}

</style>