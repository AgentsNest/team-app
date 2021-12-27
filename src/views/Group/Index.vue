<template>
    <div>
        <v-snackbar v-model="snackbar" transition="scroll-y-transition" top timeout="3000">
            Group Created Successfully
            <template v-slot:action="{ attrs }">
                <v-btn small color="pink" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
            </template>
        </v-snackbar>

        <v-card class="rounded-xl pa-2 shadow content-card" elevation="0" height="88vh">
            <v-toolbar flat>
                <div class="font-weight-bold text-h6">Groups</div>
                <v-spacer></v-spacer>
            </v-toolbar>
            
            <v-card-text>
                <v-row>
                    <v-col md="8">
                        <v-row>
                            <v-col md="3" v-for="group in groups" :key="group">
                                <!-- <v-card class="rounded-lg" height="100" :color="group.color" dark>
                                    <v-card-title>{{group.title}}</v-card-title>
                                    <v-card-subtitle>Leads:</v-card-subtitle>
                                </v-card> -->
                                <!-- <div class="folder">
                                    <div>{{group.title}}</div>
                                    <div>Leads:</div>
                                </div> -->

                                <v-card class="folder" :color="group.color" @click="leadSidebar(group.id)">
                                    <v-btn class="folder-handle" :color="group.color" depressed></v-btn>
                                    <span class="white--text">{{group.title}}</span>
                                    <span class="white--text"><strong>Leads:</strong> {{group.leads.length}}</span>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col md="4">
                        <div class="font-weight-bold subtitle-1 mb-3">Create new Group</div>
                        <input type="text" placeholder="Add group name..." class="search-input" v-model="form.title">
                        <div class="mt-6 d-flex">
                            <v-color-picker
                                dot-size="25"
                                hide-canvas
                                hide-inputs
                                hide-mode-switch
                                hide-sliders
                                show-swatches
                                mode="hexa"
                                swatches-max-height="120"
                                v-model="form.color"
                                width="100%"
                            ></v-color-picker>
                        </div>
                        <v-btn block class="mt-6" :color="form.color" large dark @click="newGroup">Create Group</v-btn>
                    </v-col>
                </v-row>
            </v-card-text>

            <v-navigation-drawer v-model="drawer" tile absolute temporary right width="30vw" v-if="group">
                <v-card flat tile>
                    <!-- {{group.leads}} -->
                    <v-list two-line>
                        <v-list-item v-for="lead in group.leads" :key="lead.id">
                            <v-list-item-avatar>
                                <v-btn fab>{{lead.name[0]}}</v-btn>
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-list-item-title v-text="lead.name"></v-list-item-title>
                                <v-list-item-subtitle v-text="lead.email"></v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>

                        <!-- <template v-for="lead in group.leads">
                            {{lead.name}}
                            <v-list-item v-for="lead in groups" :key="lead.id">
                                <v-list-item-action>
                                    <v-checkbox refs="checkItem" :value="lead.id" v-model="selectedLeads"></v-checkbox>
                                </v-list-item-action>
                                <v-list-item-content>
                                    <v-list-item-title v-text="lead.name"></v-list-item-title>
                                </v-list-item-content>

                                <v-list-item-action>
                                    <v-btn block class="text-capitalize blue darken-2" dark 
                                        @click="shareNow(lead)"
                                        :href="`https://wa.me/${lead.contact}?text=Hi ${lead.name} %0a Here is the details for ${website.title} %0a http://localhost:3000/w/${tracker_id}/${website.id}`"
                                        target="_blank"
                                    >
                                    Share
                                    </v-btn>
                                </v-list-item-action>
                            </v-list-item>
                        </template> -->
                    </v-list>

                    <!-- <v-simple-table fixed-header height="88vh" dense>
                    <template v-slot:default>
                        <thead>
                            <tr>
                                <th class="text-left"><v-checkbox v-model="selectAll"></v-checkbox></th>
                                <th class="text-left">Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr 
                                v-for="lead in leads" :key="lead.id" 
                                class="blue-grey--text text--darken-2 cursor-pointer"
                            >
                                <td><v-checkbox refs="checkItem" :value="lead.id" v-model="selectedLeads"></v-checkbox></td>
                                <td @click="detailsSidebar(lead.id)">{{ lead.name }}</td>
                            </tr>

                            <v-btn block class="text-capitalize blue darken-2" dark @click="shareNow(lead, website)">
                            Share with {{selectedLeads.length}} clients
                            </v-btn>
                        </tbody>
                    </template>
                    </v-simple-table> -->

                </v-card>
                </v-navigation-drawer>
        </v-card>

    </div>
</template>

<script>
import Group from '../../Apis/Other'
import User from '../../Apis/User'

export default {
    data () {
      return {
        loading: false,
        snackbar: false,
        groups:[],
        group: null,
        form:{
            title: '',
            agent_id: null,
            color: '',
        },
        drawer: false,
        leads: [],
        selectedLeads: []
      }
    },
    methods: {
        authUser(){
            User.auth().then(response => {
                this.form.agent_id = response.data.id;
            });
        },
        fetchData(){
            Group.userGroup().then(response => {
                this.groups = response.data;
            });
        },
        newGroup(){
            let data = new FormData();

            data.append('title', this.form.title)
            data.append('agent_id', this.form.agent_id)
            data.append('color', this.form.color)

            Group.newGroup(data)
            .then((response) => {
                this.fetchData();
                this.snackbar = true
                this.form = ''
                console.log(response)
            })
            .catch(error => {
                console.log(error);
            });  
        },
        leadSidebar(group){
            this.drawer = true
            Group.leadsByGroup(group).then(response => {
                this.group = response.data;
            });
        },
    },
    mounted(){
      this.fetchData();
      this.authUser();
    }
}
</script>

<style scoped>
.content-card{
  overflow-y: scroll;
}
.search-input{
  background-color: #fff;
  border-radius: 12px;
  padding: 0.8em;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 2px 6px 0 rgba(136,148,171,.2),0 24px 20px -24px rgba(71,82,107,.1);
}
.folder{
    border-radius: 3px;
    height: 100px;
    position: relative;
    border-radius: 0 0 10px 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.folder-handle{
    position: absolute;
    top: -12px;
    left: 0;
    height: 12px;
    width:75px;
    border-radius: 10px 10px 0px 0px;
}
</style>