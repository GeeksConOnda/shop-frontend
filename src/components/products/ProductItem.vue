<template>
  <fragment>
    <li v-for="designSrc in designImageSrc" :key="designSrc">
      <img v-bind:src="designSrc" />
    </li>
  </fragment>
</template>

<style lang="scss" scoped>
img {
  width: 125px;
}
</style>

<script>
import { Fragment } from "vue-fragment";

const variationsMap = {
  base: "",
  flat: "F",
  black: "B",
  "black-single": "BS",
  "black-dual": "BD",
  "yellow-single": "YS",
  "yellow-dual": "YD"
};

export default {
  name: "DesignImages",
  props: ["design"],
  components: { Fragment },
  computed: {
    designImageSrc() {
      return this.design.variations.map(
        variation =>
          `/${this.design.type}/${this.design.id}${variationsMap[variation]}.jpg`
      );
    }
  }
};
</script>
