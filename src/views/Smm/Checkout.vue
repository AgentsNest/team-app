<template>
    <div>
        <v-card class="rounded-lg" flat>
            <v-card-text>
                Select Package Payment
            </v-card-text>
        </v-card>

        <v-container>
            <v-row>
                <v-col md="4">
                    <v-card class="checkout" flat>
                        <stripe-checkout
                            ref="checkoutRef"
                            mode="payment"
                            :pk="publishableKey"
                            :line-items="lineItems"
                            :success-url="successURL"
                            :cancel-url="cancelURL"
                            @loading="v => loading = v"
                        />
                        <v-icon size="80px" color="#fff">mdi-credit-card-settings-outline</v-icon>
                        <h1 class="white--text mt-6">₹ 15,000</h1>
                        <div class="subtitle white--text">Your Ads Placed Successfully.</div>
                        <div class="subtitle white--text mb-12">Pay now to procced</div>
                        <v-btn @click="submit" depressed>Pay Now!</v-btn>
                    </v-card>
                </v-col>
                <v-col md="4">
                    <v-card class="checkout" flat>
                        <stripe-checkout
                            ref="checkoutRef"
                            mode="payment"
                            :pk="publishableKey"
                            :line-items="lineItems"
                            :success-url="successURL"
                            :cancel-url="cancelURL"
                            @loading="v => loading = v"
                        />
                        <v-icon size="80px" color="#fff">mdi-credit-card-settings-outline</v-icon>
                        <h1 class="white--text mt-6">₹ 25,000</h1>
                        <div class="subtitle white--text">Your Ads Placed Successfully.</div>
                        <div class="subtitle white--text mb-12">Pay now to procced</div>
                        <v-btn @click="submit" depressed>Pay Now!</v-btn>
                    </v-card>
                </v-col>
                <v-col md="4">
                    <v-card class="checkout" flat>
                        <stripe-checkout
                            ref="checkoutRef"
                            mode="payment"
                            :pk="publishableKey"
                            :line-items="lineItems"
                            :success-url="successURL"
                            :cancel-url="cancelURL"
                            @loading="v => loading = v"
                        />
                        <v-icon size="80px" color="#fff">mdi-credit-card-settings-outline</v-icon>
                        <h1 class="white--text mt-6">₹ 50,000</h1>
                        <div class="subtitle white--text">Your Ads Placed Successfully.</div>
                        <div class="subtitle white--text mb-12">Pay now to procced</div>
                        <v-btn @click="submit" depressed>Pay Now!</v-btn>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>

    </div>
</template>

<script>
import { StripeCheckout } from '@vue-stripe/vue-stripe';

export default {
    components: {
        StripeCheckout,
    },
    data () {
        this.publishableKey = 'pk_test_51JliZ4SHLn14bCLXnQ9gAKtthnEgaPdgJc1fjnRhG3Nih5h0rzGkNlzmLZFy2W9DsLMwMMDn06PaK0mDrWmoOOTj008QCo6LFa';
        return {
            loading: false,
            lineItems: [
                {
                    price: 'price_1JrKVqSHLn14bCLXhEhYcUoa', // The id of the one-time price you created in your Stripe dashboard
                    quantity: 1,
                },
            ],
            successURL: 'http://localhost:8080/social-ads/success',
            cancelURL: 'http://localhost:8080/social-ads/failed',
        };
    },
    methods: {
        submit () {
            // You will be redirected to Stripe's secure checkout page
            this.$refs.checkoutRef.redirectToCheckout();
        },
    },
}
</script>

<style scoped>
.checkout{
    /* background-image: linear-gradient(to right, #0ba360, #3cba92);
    box-shadow: 0 4px 15px 0 rgba(23, 168, 108, 0.75); */
    background-image: linear-gradient(to right, #4e5dc9, #3cabba);
    height: 60vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
}
.submitBtn{
    background: #fff;
    padding: 0.8em 2.5em;
    border-radius: 12px;
    margin-top: 2em;
    box-shadow: 0px 0px 4px #efefef;
}
.backBtn{
    position: fixed;
    top: 20px;
    left: 20px;
}
</style>