<template>
    <div>
        <v-row>
            <v-col md="4">
                <Sidebar />
            </v-col>
            <v-col md="8">
                <v-card height="88vh" class="rounded-xl content-card pa-4" flat>
                    <v-container>
                        <v-row>
                            <v-col class="d-flex flex-column justify-center pl-6" md="7">   
                                <div class="text-h5">OWN THE CARD NOW</div>
                                <div class="">Go contactless in three simple steps!</div>
                                <v-card flat class="mt-4 d-flex">
                                    <div class="single-box">
                                        <v-icon color="grey darken-3">mdi-cart-arrow-down</v-icon>
                                        <div class="text">Purchase Your Card</div>
                                    </div>
                                    <div class="single-box mx-6">
                                        <v-icon color="grey darken-3">mdi-account-circle-outline</v-icon>
                                        <div class="text">Create Your Profile</div>
                                    </div>
                                    <div class="single-box">
                                        <v-icon color="grey darken-3">mdi-credit-card-wireless-outline</v-icon>
                                        <div class="text">Tap, Share & Go</div>
                                    </div>
                                </v-card>
                            </v-col>
                            <v-col md="5">
                                <v-img
                                    src="../../assets/img/v-card.png"
                                    max-width="400px"
                                ></v-img>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import Sidebar from '../../components/Account/Sidebar.vue'

export default {
    components:{ Sidebar },

}
</script>

<style>
.single-box{
    box-shadow: 0 2px 6px 0 rgba(136,148,171,.2),0 24px 20px -24px rgba(71,82,107,.1);
    padding: 10px;
    margin-bottom: 1em;
    border-radius: 12px;
    display: flex;
    flex-direction: column;

}
.single-box .text{
    text-align: center;
    margin-top: 6px;
    color: #666;
    font-size: 13px;
}
.text-span{
    font-size: 10px;
}
</style>