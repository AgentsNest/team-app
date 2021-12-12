<template>
    <div>
        <v-img
            src="../../assets/img/login.jpg"
            gradient="to top right, rgba(40, 53, 147,.9), rgba(60, 171, 186,.9)"
            class="d-flex text-center align-center"
            height="100vh"
        >
            <v-icon color="#fff" size="60px">mdi-map-marker</v-icon>
            <div class="logo-text">agnt.</div>

            <v-row>
                <v-col md="4" offset-md="4">
                    <v-card class="rounded-xl pa-10 mt-n5">
                        <div class="text-h5 text-center">Realtor Login</div>
                        <v-card-subtitle class="">Please enter the details below to continue.</v-card-subtitle>

                        <v-card-text>
                            <v-alert
                                v-show="errors" color="red" dense  dismissible
                                border="left" elevation="1" colored-border
                                class="caption"
                            >
                                Something went wrong.!
                            </v-alert>

                            <v-text-field
                                label="Email"
                                placeholder="Enter your email"
                                v-model="form.email"
                            ></v-text-field>
                            <v-text-field
                                label="Password"
                                placeholder="Password"
                                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                :type="showPassword ? 'text' : 'password'"
                                @click:append="showPassword = !showPassword"
                                v-model="form.password"
                            ></v-text-field>
                        </v-card-text>

                        <v-card-actions>
                            <button class="gradient" @click="login">Login</button>
                        </v-card-actions>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <router-link to="/register">
                                <v-btn text class="text-capitalize text-center">Create New Account</v-btn>
                            </router-link>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-img>

    </div>
</template>

<script>
import User from "../../Apis/User";

export default {
    data () {
        return {
            showPassword: false,
            form:{
                email: "",
                password: "",
                device_name: 'mobile'
            },
            errors:''
        }
    },
    methods:{
        login(){
            User.login(this.form)
            .then((response) => {
                localStorage.setItem("token", response.data);
                this.$router.push('/dashboard');
            })
            .catch((error) => {
                this.errors = error.response.data.errors;
                console.log(error.response.data.errors);
            });
        }
    }
}
</script>

<style>
.logo-text{
  color: #fff;
  font-weight: bold;
  font-size: 3vw;
  margin-bottom: 1em;
}
.gradient{
    background-image: linear-gradient(to right, #283593, #3cabba);
    box-shadow: 0 4px 15px 0 rgba(23, 91, 168, 0.75);
    color: #fff;
    width: 100%;
    border-radius: 12px;
    padding: 14px;
}
</style>