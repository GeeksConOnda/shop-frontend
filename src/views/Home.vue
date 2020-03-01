<template>
  <div class="home">
    <search-box v-model="search" />
    <product-list v-bind:search="search" />
  </div>
</template>

<script>
import { ProductList, SearchBox } from "@/components/products";

export default {
  name: "Home",
  data() {
    return {
      search: ""
    };
  },
  mounted() {
    this.$store.dispatch("productStore/filterDesigns");
  },
  components: {
    ProductList,
    SearchBox
  }
};
</script>
