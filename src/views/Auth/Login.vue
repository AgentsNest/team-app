<template>
    <v-container>

        <v-snackbar v-model="snackbar" transition="scroll-y-transition" top timeout="3000"
        >
            {{snackbarText}}
            <template v-slot:action="{ attrs }">
                <v-btn small color="pink" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
            </template>
        </v-snackbar>

        <v-img 
            src="../../assets/img/clientlogin.png" 
            lazy-src="../../assets/img/clientlogin.png"
            width="80%" 
            class="mx-auto"
        ></v-img>

        <v-card flat class="text-center">
            <h2>Team Login</h2>
            <p class="body-2 grey--text text--darken-2">Please enter the details below to continue.</p>
        </v-card>

        <v-card flat class="pa-5">
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

            <v-btn block x-large dark class="gradient-bg" @click="login">Login</v-btn>
        </v-card>

    </v-container>
</template>

<script>
import Team from "../../Apis/Team";

export default {
    data () {
        return {
            showPassword: false,
            form:{
                email: "",
                password: "",
                device_name: 'mobile'
            },
            errors:'',
            snackbarText: 'Email Or Password Is Incorrect',
            snackbar : false
        }
    },
    methods:{
        login() {
            Team.login(this.form)
            .then((response) => {
                localStorage.setItem("token", response.data);
                this.$router.push({ name: "TeamDashboard" });
            })
            .catch((error) => {
                this.errors = error;
                this.snackbar = true
            });
        },
}
}
</script>

<style>

</style>