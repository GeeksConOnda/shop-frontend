<template>
  <section>
    <p>
      <strong>Geeks con Onda</strong> es una iniciativa de la
      <strong>Comunidad de Desarrolladores de Argentina</strong> (CoDeAr), una
      asociación civil constituida con personería jurídica autorizada por la
      Dirección General de Inspección de Personas Jurídicas de la Provincia de
      Córdoba, bajo resolución Nro. 191 C/19, con fecha 11/10/2019, e inscrita
      en AFIP bajo el CUIT 30-71664952-7.
    </p>

    <p>
      <strong>
        Todos los fondos recaudados a través de este proyecto son destinados a
        la promoción y ejecución de actividades por parte de la Comunidad de
        Desarrolladores de Argentina.
      </strong>
    </p>
  </section>
</template>

<style lang="scss" scoped>
section {
  font-size: 0.75rem;
  text-transform: uppercase;
  padding: $desktop-padding;
  text-align: justify;
  color: var(--color-gray-light);
  width: 50%;
  margin: 0 auto;
}

@media screen and (max-width: 768px) {
  section {
    padding: $mobile-padding;
    width: 100%;
  }
}
</style>

<script lang="ts">
export default {
  name: "LegalNotice"
};
</script>
