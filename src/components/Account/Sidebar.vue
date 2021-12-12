<template>
    <v-card height="88vh" class="rounded-xl content-card" flat>
        <v-card-text class="pa-8"> 
            <ul>
                <li>
                    <router-link :to="{name: 'AgentAccount'}" class="d-flex list-item-class">
                        <v-icon>mdi-cog</v-icon>
                        <div class="ml-6">
                            <div class="font-weight-bold">Account Setting</div>
                            <div>Details about your personal information</div>
                        </div>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{name: 'NotificationSetting'}" class="d-flex list-item-class">
                        <v-icon>mdi-bell-badge-outline</v-icon>
                        <div class="ml-6">
                            <div class="font-weight-bold">Notification</div>
                            <div>Details about your personal information</div>
                        </div>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{name: 'Integration'}" class="d-flex list-item-class">
                        <v-icon>mdi-vector-link</v-icon>
                        <div class="ml-6">
                            <div class="font-weight-bold">Integrations</div>
                            <div>Details about your personal information</div>
                        </div>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{name: 'Membership'}" class="d-flex list-item-class">
                        <v-icon>mdi-wallet-membership</v-icon>
                        <div class="ml-6">
                            <div class="font-weight-bold">Membership Plans</div>
                            <div>Details about your personal information</div>
                        </div>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{name: 'digitalCard'}" class="d-flex list-item-class">
                        <v-icon>mdi-cards-outline</v-icon>
                        <div class="ml-6">
                            <div class="font-weight-bold">Digital card</div>
                            <div>Details about your personal information</div>
                        </div>
                    </router-link>
                </li>
            </ul>
        </v-card-text>
    </v-card>
</template>

<script>
export default {

}
</script>

<style scoped>
.content-card{
  overflow-y: scroll;
}
.list-item-class{
    margin-bottom: 2em;
    /* background-color: #fff; */
    /* border-radius: 12px; */
    /* padding: 0.8em; */
    box-shadow: 0 2px 6px 0 rgba(136,148,171,.2),0 24px 20px -24px rgba(71,82,107,.1);
}

.active,
.exact-active{
   background-image: linear-gradient(to right, #283593, #3cabba);
   color: #fff;
   padding: 0.9em;
   border-radius: 12px;
}
.active i{
  color: #fff;
}
ul{padding: 0;}
ul li{
    list-style: none;
}
ul li a{
    padding: 0.9em;
    border-radius: 12px;
    color: #555555;
}
</style>