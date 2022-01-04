<template>
    <div>
        <v-snackbar v-model="snackbar" transition="scroll-y-transition" top timeout="3000">
            Message Added Successfully
            <template v-slot:action="{ attrs }">
                <v-btn small color="pink" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
            </template>
        </v-snackbar>

        <v-card class="rounded-xl pa-2 shadow content-card" elevation="0" height="88vh">
            <!-- <v-toolbar flat>
                <div class="font-weight-bold text-h6">Messages</div>
                <v-spacer></v-spacer>
                <input type="text" placeholder="Search message..." class="search-input">
            </v-toolbar> -->

            <v-toolbar flat>
                <div class="font-weight-bold text-h6">Messages</div>
                <v-spacer></v-spacer>
                <v-btn fab small depressed @click="addMsgBox = !addMsgBox"><v-icon>mdi-plus</v-icon></v-btn>
            </v-toolbar>
            
            <v-card-text>
                <v-row>
                    <v-col md="4" cols="12" v-if="addMsgBox">
                        <textarea rows="3" placeholder="Add message..." class="search-input" v-model="form.text"></textarea>
                        <v-btn block class="mt-2" large dark @click="newMessage">Create Message</v-btn>
                    </v-col>
                    <v-col md="8" cols="12">
                        <v-row>
                            <v-col md="6" cols="12" v-for="message in messages" :key="message.id">
                                <v-card class="align-stretch" height="100%">
                                    <v-card-text><strong>Hi, @clientName -</strong> <br> {{message.text}} <strong><br> Regards: <br> @yourName</strong></v-card-text>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>

        

    </div>
</template>

<script>
import Other from '../../Apis/Other'
import User from '../../Apis/User'

export default {
    data () {
      return {
        loading: false,
        snackbar: false,
        messages:[],
        form:{
            text: '',
            type: 'agent',
            agent_id: null,
        },
        addMsgBox: false
      }
    },
    methods: {
        authUser(){
            User.auth().then(response => {
                this.form.agent_id = response.data.id;
            });
        },
        fetchData(){
            Other.messageSample().then(response => {
                this.messages = response.data.data;
                // console.log(response.data)
            });
        },
        newMessage(){
            let data = new FormData();

            data.append('text', this.form.text)
            data.append('agent_id', this.form.agent_id)
            data.append('type', this.form.type)

            Other.new(data)
            .then((response) => {
                this.fetchData();
                this.snackbar = true
            })
            .catch(error => {
                console.log(error);
            });  
        }
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