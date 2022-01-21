<template>
    <div class="send-update">
        <v-snackbar v-model="snackbar" transition="scroll-y-transition" top timeout="3000"
        >
            {{snackbarText}}
            <template v-slot:action="{ attrs }">
                <v-btn small color="pink" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
            </template>
        </v-snackbar>

        <v-card class="rounded-xl pa-md-5 shadow content-card" height="88vh" elevation="0">

            <v-toolbar flat>
                <div class="font-weight-bold text-md-h6">Add Update</div>
                <v-spacer></v-spacer>
                <v-btn fab depressed small @click="addNew = !addNew">
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
            </v-toolbar>

            <v-card-text v-if="addNew">
                <input type="text" class="input-field" placeholder="Title/Project Name" v-model="title">
                <input type="text" class="input-field" placeholder="Details / Due-Date" v-model="body">
                <input type="file" class="input-field" @change="onImageChange">
                <label>Select Client</label>
                <select class="input-select" v-model="client_id">
                    <option v-for="client in clients" :key="client.id" :value="client.id">{{client.name}}</option>
                </select>
                <v-btn block large dark @click="postUpdate">Send Update</v-btn>
            </v-card-text>

            <v-card v-for="item in allUpdates" :key="item.id" outlined class="rounded-lg mb-2 pa-3">
                <div class="d-flex">
                    <v-img :src="`https://d1o3gwiog9g3w3.cloudfront.net/Updates/${item.image}`" max-width="30vw"></v-img>
                    <div class="px-3">
                        <div>{{item.title}}</div>
                        <div>{{item.body}}</div>
                        <div>{{item.created_at | formatDate}}</div>
                    </div>
                </div>
            </v-card>

        </v-card>
    </div>
</template>

<script>
import Client from '../../Apis/Client'
export default {
    data(){
        return {
            title: '',
            body: '',
            image: '',
            client_id: '',
            clients: [],
            snackbarText: '',
            snackbar : false,
            addNew : false,
            allUpdates: []
        }
    },
    mounted(){
        this.fetchClient();
        this.fetchUpdates();
    },
    methods:{
        fetchClient(){
            Client.myClient(this.page)
            .then((response) => {
                this.clients = response.data.data;
            })
        },
        fetchUpdates(){
            Client.getUpdate()
            .then((res) => {
                this.allUpdates = res.data
            })
        },
        onImageChange(e){
            this.image = e.target.files[0];
        },
        postUpdate(){
            let data = new FormData();
            data.append('title', this.title)
            data.append('body', this.body)
            data.append('client_id', this.client_id)
            data.append('image', this.image)

            // for (var pair of data.entries()){
            //     console.log(pair[0]+ ', '+ pair[1]); 
            // }

            Client.postUpdate(data)
            .then((res) => {
                this.snackbar = true;
                this.snackbarText = 'Update Added',
                this.addNew = false
            })
        }
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
.input-select{
    width: 100%;
    border: 1px solid #555;
    -webkit-appearance: menulist-button;
    color: black;
    padding: 10px;
    border-radius: 8px;
    /* background: #f5f5f5; */
    margin-bottom: 3em;
}

</style>