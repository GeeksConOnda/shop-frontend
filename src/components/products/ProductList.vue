<template>
  <ul>
    <product-item
      v-for="design in filteredDesigns"
      :key="design.id"
      v-bind:design="design"
    />
  </ul>
</template>

<style lang="scss" scoped>
ul {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}
</style>

<script lang="ts">
import ProductItem from "./ProductItem.vue";
import { mapState } from "vuex";

export default {
  name: "ProductList",
  props: ["search"],
  components: {
    ProductItem
  },
  mounted() {
    this.$store.dispatch("productStore/getProducts");
  },
  computed: {
    ...mapState("productStore", {
      products: state => state.products,
      filteredDesigns: state => state.filteredDesigns
    })
  }
};
</script>
