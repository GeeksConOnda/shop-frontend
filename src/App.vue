<template>
  <main id="app">
    <section id="view">
      <nav-bar />
      <router-view />
    </section>
    <legal-notice />
    <page-footer />
  </main>
</template>

<style lang="css" src="../node_modules/@codear/lilac/dist/lilac.css"></style>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Roboto:100,400,700&display=swap");

* {
  box-sizing: border-box;
  font-family: "Roboto", sans-serif;
}

html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

body:before {
  content: " ";
  width: 100%;
  height: 7px;
  display: block;
  background: linear-gradient(90deg, var(--color-accent), var(--color-primary));
  position: absolute;
}

#app {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

#view {
  padding: $desktop-padding;
  flex: 1;
}

@media screen and (max-width: 768px) {
  #view {
    padding: (2 * $mobile-padding) $mobile-padding;
  }
}
</style>

<script>
import { NavBar, PageFooter, LegalNotice } from "@/components/layout";
import store from "@/store";

export default {
  name: "App",
  components: {
    NavBar,
    PageFooter,
    LegalNotice
  },
  store
};
</script>
