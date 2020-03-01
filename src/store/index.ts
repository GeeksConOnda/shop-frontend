import Vue from "vue";
import Vuex from "vuex";
import productStore from "./ProductStore";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { productStore }
});
