<template>
  <header>
    <gco-logo class="gco-logo" />
    <nav>
      <ul>
        <!-- insert categories -->
      </ul>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
header {
  margin-top: 1rem;
}

@media screen and (max-width: 768px) {
  .gco-logo {
    margin: 0 auto;
    display: block;
  }
}
</style>

<script lang="ts">
import { GcoLogo } from "@/components/graphics";

export default {
  name: "NavBar",
  components: {
    GcoLogo
  }
};
</script>
