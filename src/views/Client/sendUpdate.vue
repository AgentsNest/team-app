<template>
    <div class="send-update">
        <v-card class="rounded-xl pa-md-5 shadow content-card" height="88vh" elevation="0">

            <v-toolbar flat>
                <div class="font-weight-bold text-md-h6">Add Update</div>
            </v-toolbar>

            <v-card-text>
                <input type="text" class="input-field" placeholder="Title" v-model="title">
                <input type="text" class="input-field" placeholder="Body    " v-model="body">
                <input type="file" class="input-field" @change="onImageChange">
                <select class="input-field" v-model="client_id">
                    <option selected disabled>Select Client</option>
                    <option v-for="client in clients" :key="client.id" :value="client.id">{{client.name}}</option>
                </select>
                <v-btn block large dark @click="postUpdate">Send Update</v-btn>
            </v-card-text>
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
            clients: []
        }
    },
    mounted(){
        this.fetchClient();
    },
    methods:{
        fetchClient(){
            Client.myClient(this.page)
            .then((response) => {
                this.clients = response.data.data;
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
                console.log(res)
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
</style>