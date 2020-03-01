<template>
  <footer>
    <section class="left">
      <codear-logo />
    </section>
    <section class="social-media"></section>
    <section class="right">
      <afip-qr />
    </section>
  </footer>
</template>

<style lang="scss" scoped>
footer {
  background: linear-gradient(
    90deg,
    var(--color-primary),
    var(--color-secondary)
  );
  padding: $desktop-padding;
  color: var(--color-text);
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

.left {
  flex: 1;
}

@media screen and (max-width: 768px) {
  footer {
    padding: $mobile-padding;
  }
}
</style>

<script>
import AfipQr from "./AfipQr.vue";
import { CodearLogo } from "@/components/graphics";

export default {
  name: "PageFooter",
  components: { AfipQr, CodearLogo }
};
</script>
