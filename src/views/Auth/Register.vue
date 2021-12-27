<template>
    <v-container>

        <v-card flat class="text-center mt-12">
            <h2>Create New Account</h2>
            <p class="body-2 grey--text text--darken-2">Please enter the details below to continue.</p>
        </v-card>

        <v-card flat class="pa-5">
            <div>{{errors}}</div>
            <v-text-field
                label="Name"
                placeholder="your name"
                outlined
                v-model="form.name"
            ></v-text-field>
            <v-text-field
                label="Email"
                placeholder="Enter your email"
                outlined
                v-model="form.email"
            ></v-text-field>
            <v-text-field
                label="Password"
                placeholder="Password"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                @click:append="showPassword = !showPassword"
                outlined
                v-model="form.password"
            ></v-text-field>
            <v-text-field
                label="Confirm Password"
                placeholder="Confirm Password"
                outlined
                v-model="form.confirm_password"
            ></v-text-field>

            <v-btn block x-large dark class="gradient-bg" @click="register">Register</v-btn>

            <v-card-actions class="px-0 mt-4">
                <v-spacer></v-spacer>
                <router-link to="/login" class="grey--text text--darken-2">
                    already have a account?
                    <v-btn text outlined class="text-capitalize">Login</v-btn>
                </router-link>
            </v-card-actions>
        </v-card>

    </v-container>
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
            .then(() => {
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

</style>