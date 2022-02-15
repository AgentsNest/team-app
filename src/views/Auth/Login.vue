<template>
<v-container>
    <v-row>

        <v-snackbar 
            v-model="snackbar" 
            transition="scroll-y-transition" 
            top timeout="3000" 
            rounded="pill"
            elevation="0"
        >
            {{snackbarText}}
            <template v-slot:action="{ attrs }">
                <v-btn small color="pink" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
            </template>
        </v-snackbar>

        <div class="circle-one"></div>
        <div class="circle-two"></div>


        <v-col class="d-flex flex-column justify-center">
            <v-img 
                src="../../assets/img/clientlogin.svg" 
                lazy-src="../../assets/img/clientlogin.svg"
                width="65%" 
                class="mx-auto mb-8 mt-2"
            ></v-img>
        </v-col>

        <v-col class="d-flex flex-column justify-center">
            <v-card flat class="text-center">
                <h2>Team Login</h2>
                <p class="body-2 grey--text text--darken-2">Please enter the details below to continue.</p>
            </v-card>

            <v-card flat class="pa-5">
                <v-text-field
                    label="Email"
                    placeholder="Enter your email"
                    v-model="form.email"
                    color="purple darken-2"
                    prepend-icon="mdi-email"
                ></v-text-field>
                <v-text-field
                    label="Password"
                    placeholder="Password"
                    prepend-icon="mdi-key"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showPassword ? 'text' : 'password'"
                    @click:append="showPassword = !showPassword"
                    v-model="form.password"
                    color="purple darken-2"
                ></v-text-field>

                <v-btn block x-large class="btn-grad white--text" @click="login">Login</v-btn>
            </v-card>
        </v-col>

    </v-row>
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
            snackbar : false,
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

<style scoped>
.circle-one{
    background-image: linear-gradient(to right, #6441A5 0%, #2a0845  51%, #6441A5  100%);
    width: 120px;
    height: 120px;
    border-radius: 100%;
    position: fixed;
    top:-2em;
    left: -1em;
    opacity: 0.1;
}
.circle-two{
    background-image: linear-gradient(to right, #6441A5 0%, #2a0845  51%, #6441A5  100%);
    width: 280px;
    height: 280px;
    border-radius: 100%;
    position: absolute;
    top:0;
    left: -10em;
    opacity: 0.1;
}
.btn-grad {
    background-image: linear-gradient(to right, #6441A5 0%, #2a0845  51%, #6441A5  100%)
}
.btn-grad {
    margin-top: 20px;
    padding: 15px 45px;
    text-align: center;
    text-transform: uppercase;
    transition: 0.5s;
    background-size: 200% auto;
    color: white;            
    box-shadow: 0 0 20px #eee;
    border-radius: 10px;
    display: block;
}

.btn-grad:hover {
    background-position: right center; /* change the direction of the change here */
    color: #fff;
    text-decoration: none;
}
    
</style>