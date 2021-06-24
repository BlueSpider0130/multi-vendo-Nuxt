<template>
  <v-row align="center" class="mt-15">
    <v-col v-for="(item, i) in tbl_data" :key="i" class="d-flex child-flex" cols="12" sm="6" md="4" lg="3">
      <v-hover v-slot="{ hover }">
        <v-card class="mx-auto" color="grey lighten-4" max-width="600" height="100%">
          <v-img
            :aspect-ratio="16 / 9"
            :src="item.image"
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="grey lighten-5"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>
          <v-card-text class="pt-6" style="position: relative;">
            <v-checkbox :label="item.price+'£'" color="orange" hide-details @click="item_click(i)" v-model="item.sel"></v-checkbox>
            <div class="font-weight-light grey--text text-h6 mb-2">
            </div>
            <h3 class="text-h6 font-weight-light orange--text mb-2">
              {{ item.name }}
            </h3>
            <div v-if='item.sel' class="d-flex justify-center align-center">
              <v-btn class="mx-2" fab dark small color="primary" @click="calc(i, item.order==1?item.order:item.order--)">
                <v-icon dark>
                  mdi-minus
                </v-icon>
              </v-btn>
              <input v-model="item.order" onKeyDown="return false" style="width:30px" type="number" min="1" max="10" />
              <v-btn class="mx-2" fab dark small color="primary" @click="calc(i, item.order++)">
                <v-icon dark>
                  mdi-plus
                </v-icon>
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-hover>
    </v-col>
    <v-snackbar v-model="snackbar" timeout="-1" bottom right multi-line shaped>
      This is total cost:
      £{{ total_cost.toFixed(2) }}
      <template v-slot:action="{ attrs }">
        <v-btn color="orange" text v-bind="attrs" @click="order()">
          Order Now
        </v-btn>
      </template>
    </v-snackbar>
  </v-row>
</template>

<script>
import { getProductList } from "../../utils/API";

export default {
  layout: "product",
  components: {
  },

  data() {
    return {
      tbl_data: [],
      snackbar: false,
      text: "This is total cost",
      check_model: [],
      order_number: [],
      total_cost:0,
      own_cost: []
    };
  },
  methods: {
    item_click(index) {   //click the checkbox button
      let selected = this.tbl_data[index].sel
      console.log(selected)
      if (selected == true) {
        this.snackbar = true
      }

      if(!selected){
        this.tbl_data[index].order = 0
      }else if (selected) {
        this.tbl_data[index].order = 1
      }
      const cost = this.tbl_data[index].price * this.tbl_data[index].order
      this.own_cost[index] = selected ? cost : 0;
      this.own_cost[index] = cost
      const res = this.totalCost(this.own_cost)
      this.total_cost = res
      console.log("this is total cost:", res)
    },
    calc(index, order_count) {    //click the plus or minus button
      const cost = this.tbl_data[index].price * this.tbl_data[index].order
      this.own_cost[index] = cost
      
      const res = this.totalCost(this.own_cost)
      this.total_cost = res
      console.log("this is total cost:", res)
    },
    totalCost(prices){
      let res = 0
      for(let cost of prices) res += cost
      return res;
    },
    order(){
      this.snackbar = false
      console.log(this.tbl_data)
    }
  },
  async mounted() {
    console.log("this is before all");
    var temp = await getProductList(null);
    temp.map((t, index)=>{
      // t['order'] = 0;
      // t['sel'] = false;
    })
    this.tbl_data = temp;
    for(let i =  0; i < this.tbl_data.length; i++) this.own_cost[i] = 0

  },
};
</script>
<style scoped>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>
