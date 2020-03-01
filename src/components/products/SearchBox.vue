<template>
  <input
    type="text"
    v-bind:value="value"
    v-on:input="$emit('input', $event.target.value)"
  />
</template>

<script lang="ts">
export default {
  name: "SearchBox",
  props: ["value"],
  watch: {
    value() {
      this.$store.commit("productStore/setQuery", this.value);
      this.$store.dispatch("productStore/filterDesigns");
    }
  }
};
</script>
