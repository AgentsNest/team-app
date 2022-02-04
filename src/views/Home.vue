<template>
  <v-card tile height="100vh" width="100vw" style="background: #111827;" class="d-flex justify-center align-center">
      <div class="logo-text">agnt</div>
      <div class="dot-anime">
        <div class="sonar-wrapper py-2">
          <div class="sonar-emitter"><div class="sonar-wave"></div></div>
        </div>
      </div>
  </v-card>
</template>

<script>

  export default {
    name: 'Home',
    data() {
      return {
        isLoggedIn: false,
      };
    },
    methods: {
      redirect() {
        if ((this.isLoggedIn = !!localStorage.getItem("token"))) {
          this.$router.push({ name: "ClientDashboard" });
        } else {
          this.$router.push({ name: "Login" });
        }
      },
    },
    mounted() {
      setTimeout(
        function () {
          this.redirect();
        }.bind(this),
        2000
      );
    },
  }
</script>

<style scoped>
.startedBtn{
  position: absolute;
  bottom: 10px;
  width: 80%;
}
.logo-text{
  color: #fff;
  font-weight: bold;
  font-size: 14vw;
}
.dot-anime{
  width: 2em;
  margin-top: 1.6em;
}
.sonar-wrapper {
  position: relative;
  z-index: 0;
  overflow: hidden;
  /* padding: 8rem 0; */
}

.sonar-emitter {
  position: relative;
  margin: 0 auto;
  width: 10px;
  height: 10px;
  border-radius: 9999px;
  background-image: linear-gradient(-20deg, #b721ff 0%, #21d4fd 100%);
}

.sonar-wave {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 9999px;
  background-image: linear-gradient(-20deg, #b721ff 0%, #21d4fd 100%);
  opacity: 0;
  z-index: -1;
  pointer-events: none;
}
.sonar-wave {
  animation: sonarWave 2s linear infinite;
}

@keyframes sonarWave {
  from {
    opacity: 0.4;
  }
  to {
    transform: scale(3);
    opacity: 0;
  }
}
</style>