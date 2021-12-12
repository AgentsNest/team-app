<template>
    <v-card
      class="white rounded-xl shadow"
      permanent
      flat
      height="88vh"
    >

      <!-- <v-list class="px-3">
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to="{name: item.link}"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list> -->

    <ul class="nav-links">
      <router-link :to="{name: item.link}" v-for="item in items" :key="item.title">
        <li>
          <v-icon>{{item.icon}}</v-icon>
          <span class="ml-2">{{item.title}}</span>
        </li>
      </router-link>
    </ul>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn block>
            Logout
          </v-btn>
        </div>
      </template>
  </v-card>
</template>


<script>
  export default {
    data () {
      return {
        items: [
          { title: 'Dashboard', icon: 'mdi-apps-box', link: 'Dashboard' },
          { title: 'Leads', icon: 'mdi-format-list-bulleted-square', link: 'Leads' },
          { title: 'Graphics', icon: 'mdi-image-size-select-large', link: 'Graphic' },
          { title: 'Existing Clients', icon: 'mdi-account-multiple-outline', link: 'Client' },
          { title: 'Social Ads', icon: 'mdi-advertisements', link: 'Smm' },
          { title: 'Websites', icon: 'mdi-web', link: 'MyWebsite' },
          { title: 'Groups', icon: 'mdi-group', link: 'Groups' },
          { title: 'Messages', icon: 'mdi-message-outline', link: 'Message' },
        ],
      }
    },
  }
</script>

<style scoped>
ul {
  padding: 1em;
  margin: 0;
  list-style-type: none;
}

ul li {
  margin: 1.2rem 0;
  padding: 0.8em;
  width: 100%;
  text-align: left;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
}

ul li {
  text-decoration: none;
  color: #898c90;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
}
a i{
  color: #898c90;
}

ul li:hover {
  background-color: #f5f9ff;
}

.active li,
.exact-active li{
   background-image: linear-gradient(to right, #283593, #3cabba);
   color: #fff;
}
.active i{
  color: #fff;
}
</style>