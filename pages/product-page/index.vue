<template>
  <v-row align="center" class="mt-15">
    <v-col v-for="(item, i) in tbl_data" :key="i" class="d-flex child-flex" cols="12" sm="6" md="4" lg="3">
      <v-hover v-slot="{ hover }">
        <v-card class="mx-auto" color="grey lighten-4" max-width="600">
          <v-img
            :aspect-ratio="16 / 9"
            :src="'https://providr.uk' + item.image"
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="grey lighten-5"
                ></v-progress-circular>
              </v-row>
            </template>
            <v-expand-transition>
              <div v-if="hover" class="d-flex transition-fast-in-fast-out orange darken-2 v-card--reveal text-h2 white--text" style="height: 100%;">
                £{{ item.price }}
              </div>
            </v-expand-transition>
          </v-img>
          <v-card-text class="pt-6" style="position: relative;">
            <v-btn absolute color="orange" class="white--text" fab large right top @click="snackbar = true">
              <v-icon>mdi-cart</v-icon>
            </v-btn>
            <div class="font-weight-light grey--text text-h6 mb-2">
              For the perfect meal
            </div>
            <h3 class="text-h4 font-weight-light orange--text mb-2">
              {{ item.name }}
            </h3>
          </v-card-text>
        </v-card>
      </v-hover>
    </v-col>
    <v-snackbar v-model="snackbar" timeout= "-1" bottom right>
    {{ text }}
    <template v-slot:action="{ attrs }">
      <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>
  </v-row>
</template>


<script>
import Logo from "~/components/Logo.vue";
import VuetifyLogo from "~/components/VuetifyLogo.vue";
import { getProductList } from "../../utils/API";

export default {
  layout: "product",
  components: {
    Logo,
    VuetifyLogo
  },

  data() {
    return {
      tbl_data: [],
      snackbar: false,
      text: `Hello, I'm a snackbar`,
    };
  },
  methods: {},
  async mounted() {
    console.log("this is before all");
    this.tbl_data = await getProductList(null);
  }
};
</script>
<style scoped>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.9;
  position: absolute;
  width: 100%;
}
</style>
