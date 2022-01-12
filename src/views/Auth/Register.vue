<template>
    <div>
        <v-img
            src="../../assets/img/login.jpg"
            gradient="to top right, rgba(40, 53, 147,.8), rgba(60, 171, 186,.9)"
            class="d-flex text-center align-center"
            height="100vh"
        >
            <div class="logo-text">agnt.</div>
            <v-row>
                <v-col md="4" offset-md="4">

                    <v-card flat class="pa-10 rounded-xl">

                        <v-card-text>
                            <h2>Create New Account</h2>
                            <p class="body-2 grey--text text--darken-2">Please enter the details below to continue.</p>
                        </v-card-text>

                        <div>{{errors}}</div>

                        <v-text-field label="Name" placeholder="Your name" v-model="form.name"></v-text-field>
                        <v-text-field label="Email" placeholder="Enter your email" v-model="form.email"></v-text-field>
                        <v-text-field
                            label="Password"
                            placeholder="Password"
                            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="showPassword ? 'text' : 'password'"
                            @click:append="showPassword = !showPassword"
                            v-model="form.password"
                        ></v-text-field>
                        <v-text-field label="Confirm Password" placeholder="Confirm Password" v-model="form.confirm_password"></v-text-field>

                        <v-btn block large dark class="gradient mt-3" @click="register">Register</v-btn>

                        <v-card-actions class="px-0 mt-4">
                            <v-spacer></v-spacer>
                            <router-link :to="{name: 'Login'}" class="grey--text text--darken-2">
                                already have a account?
                                <v-btn text outlined class="text-capitalize">Login</v-btn>
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
                name: "",
                email: "",
                password: "",
                confirm_password: "",
                rera: ""
            },
            errors:''
        }
    },
    methods:{
        register() {
            User.register(this.form)
            .then((response) => {
                console.log('Click response: ', response)
                this.$router.push({ name: "Login" });
            })
            .catch((error) => {
                this.errors = error.response.data.errors;
            });
        },
    }
}
</script>

<style>
.logo-text{
  color: #fff;
  font-weight: bold;
  font-size: 6vh;
  margin-bottom: 0.6em;
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