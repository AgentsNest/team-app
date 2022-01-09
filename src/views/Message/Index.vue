<template>
    <div>
        <v-snackbar v-model="snackbar" transition="scroll-y-transition" top timeout="3000">
            Message Added Successfully
            <template v-slot:action="{ attrs }">
                <v-btn small color="pink" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
            </template>
        </v-snackbar>

        <v-card class="rounded-xl shadow content-card" elevation="0" height="88vh">

            <!-- <v-toolbar flat>
                <div class="font-weight-bold text-h6">Messages</div>
                <v-spacer></v-spacer>
                <v-btn fab small depressed @click="addMsgBox = !addMsgBox"><v-icon>mdi-plus</v-icon></v-btn>
            </v-toolbar> -->

            <v-tabs color="basil" grow>
                <v-tab class="text-capitalize">My Msg</v-tab>
                <v-tab class="text-capitalize">Sample Msg</v-tab>

                <!-- Content -->
                <v-tab-item>
                    <v-card height="80vh" class="overflow-y-auto">
                        <v-btn class="addNewMsg white" fab @click="addMsgBox = !addMsgBox"><v-icon>mdi-plus</v-icon></v-btn>
                        <div v-if="addMsgBox">
                            <textarea rows="3" placeholder="Add message..." class="search-input" v-model="form.text"></textarea>
                            <v-btn block class="mt-2" large dark @click="newMessage">Create Message</v-btn>
                        </div>
                        <v-card v-for="text in myMsg" :key="text.id" class="rounded-lg mb-3" elevation="1">
                            <v-card-text><strong>Hi, @clientName -</strong> <br> {{text.text}} <strong><br> Regards: <br> @yourName</strong></v-card-text>
                        </v-card>
                    </v-card>
                </v-tab-item>
                <v-tab-item>
                    <v-card class="rounded-lg mb-3" elevation="1" v-for="message in messages" :key="message.id">
                        <v-card-text><strong>Hi, @clientName -</strong> <br> {{message.text}} <strong><br> Regards: <br> @yourName</strong></v-card-text>
                    </v-card>
                </v-tab-item>
            </v-tabs>
            
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
        myMsg:[],
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
            Other.allMessage().then(response => {
                this.messages = response.data.data;
            });
            Other.myMessage().then(response => {
                this.myMsg = response.data.data;
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
                this.addMsgBox = false
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
.addNewMsg{
    position: absolute;
    bottom: 5vh;
    right: 15px;
}
</style>