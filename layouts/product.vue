<template>
  <v-app light>
    <v-app-bar fixed>
      <v-row class="justify-space-around">
        <v-col cols="6" sm="8" md="6" class="d-flex align-center">
          <img class="logo" :src="logo" />
          <h3>
            Providr
          </h3>
        </v-col>
        <v-col cols="6" sm="4" md="6" class="d-flex justify-end align-center">
          <v-btn class="ma-2" outlined color="indigo">
            Login
          </v-btn>
          <v-btn
            class="ma-2"
            outlined
            fab
            color="teal"
            @click.stop="drawer = !drawer"
          >
            <v-icon>mdi-format-list-bulleted-square</v-icon>
          </v-btn>
          <!-- navigation bar -->
        </v-col>
      </v-row>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer v-model="drawer" fixed temporary success>
      <v-list nav>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Demos</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Login</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Register</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Account</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>About</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title>Contact Us</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </v-app>
</template>

<script>
import logo from "../assets/image/logo_a.png";
export default {
  data() {
    return {
      logo: logo,
      drawer: false,
      group: null
    };
  },
  watch: {
    group() {
      this.drawer = false;
    }
  }
};
</script>

<style scoped>
.logo {
  width: 40px;
  height: 50px;
}
</style>
