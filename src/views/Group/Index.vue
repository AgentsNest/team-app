<template>
    <Layout>
    <div>
        <v-snackbar v-model="snackbar" transition="scroll-y-transition" top timeout="3000">
            Group Created Successfully
            <template v-slot:action="{ attrs }">
                <v-btn small color="pink" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
            </template>
        </v-snackbar>

        <v-card class="rounded-xl mt-2 px-1 shadow content-card" elevation="0" height="88vh">
            <v-btn fab depressed @click="addGroupBox = !addGroupBox" class="dark addBtn" dark>
                <v-icon>mdi-plus</v-icon>
            </v-btn>
            
            <v-row>
                <v-col md="4" cols="12" v-if="addGroupBox">
                    <div class="font-weight-bold subtitle-1 mb-3">Create new Group</div>
                    <input type="text" placeholder="Add group name..." class="search-input" v-model="form.title">
                    <div class="mt-4 d-flex">
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
                <v-col md="8" cols="12">
                    <v-row>
                        <v-col md="3" cols="6" v-for="group in groups" :key="group.id">
                            <v-card class="folder" :color="group.color" @click="leadSidebar(group.id)">
                                <v-btn class="folder-handle" :color="group.color" depressed></v-btn>
                                <span class="white--text">{{group.title}}</span>
                                <span class="white--text"><strong>Leads:</strong> {{group.leads.length}}</span>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>

            <v-navigation-drawer v-model="drawer" tile absolute temporary right xs12 md3 v-if="group">
                <v-card flat tile>
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

                    </v-list>

                </v-card>
            </v-navigation-drawer>
        </v-card>

    </div>
    </Layout>

</template>

<script>
import Other from '../../Apis/Other'
import Team from '../../Apis/Team'
import Layout from "../../Layouts/Layout.vue"

export default {
    components: { Layout },
    data () {
      return {
        addGroupBox: false,
        loading: false,
        snackbar: false,
        groups:[],
        group: null,
        form:{
            title: '',
            team_id: null,
            color: '',
        },
        drawer: false,
        leads: [],
        selectedLeads: []
      }
    },
    methods: {
        fetchData(){
            Other.myGroup()
            .then(response => {
                this.groups = response.data;
            });
        },
        newGroup(){
            let data = new FormData();

            data.append('title', this.form.title)
            data.append('team_id', this.form.team_id)
            data.append('color', this.form.color)

            // for (var pair of data.entries()){
            //     console.log(pair[0]+ ', '+ pair[1]); 
            // }

            Other.addNewGroup(data)
            .then(() => {
                this.fetchData();
                this.snackbar = true
                this.form = ''
                this.addGroupBox = false
            })
            .catch(error => {
                console.log(error);
            });  
        },
        leadSidebar(group){
            this.drawer = true
            Other.leadsByGroup(group).then(response => {
                this.group = response.data;
            });
        },
    },
    mounted(){
        Team.auth().then(response => {
            this.form.team_id = response.data.data.id;
        });
        this.fetchData();
    }
}
</script>

<style scoped>
.content-card{
  overflow-y: scroll;
}
.addBtn{
    position: absolute;
    bottom: 2em;
    right: 2em;
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