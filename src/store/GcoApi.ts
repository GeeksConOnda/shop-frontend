import { GcoDatabase, GcoDesigns, GcoProductType } from "./types";

class GcoApi {
  private data: GcoDatabase = {
    loaded: false,
    products: [],
    designs: {} as GcoDesigns
  };

  async load() {
    const response = await fetch("/data.json");
    const json = (await response.json()) as GcoDatabase;
    this.data = json;
    this.data.loaded = true;
  }

  async getProducts() {
    if (!this.data.loaded) {
      await this.load();
    }

    return this.data.products;
  }

  async getDesigns(productType: GcoProductType) {
    if (!this.data.loaded) {
      await this.load();
    }

    return this.data.designs[productType];
  }
}

const api = new GcoApi();

export default api;
