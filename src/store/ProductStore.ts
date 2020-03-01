import api from "./GcoApi";

const state = {
  products: [],
  designs: [],
  filteredDesigns: [],
  query: ""
};

const getters = {};

const actions = {
  async getProducts({ commit }) {
    const products = await api.getProducts();
    commit("setProducts", products);

    const processedTypes: string[] = [];

    await Promise.all(
      products.map(async product => {
        if (processedTypes.includes(product.type)) {
          return;
        }

        const designs = await api.getDesigns(product.type);
        commit(
          "setDesigns",
          designs.map(design => ({ ...design, type: product.type }))
        );
        processedTypes.push(product.type);
      })
    );
  },

  async filterDesigns({ commit }) {
    if (!state.query) {
      await actions.getProducts({ commit });
      return;
    }

    const query = new RegExp(state.query, "i");
    commit(
      "setFilteredDesigns",
      state.designs.filter(design => query.test(design.name))
    );
  }
};

const mutations = {
  setProducts(state, products) {
    state.products = products;
  },

  setDesigns(state, designs) {
    state.designs = designs;
  },

  setFilteredDesigns(state, filteredDesigns) {
    state.filteredDesigns = filteredDesigns;
  },

  setQuery(state, query) {
    state.query = query;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
