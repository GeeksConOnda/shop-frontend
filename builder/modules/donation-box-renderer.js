const DONATIONS = require("../configuration/donations.json");

const Renderer = require("./renderer");

class DonationBoxRenderer extends Renderer {
  applyBenefactorURL(template) {
    const { href } = this.options.donation.benefactor;
    return template.replace(/<%BENEFACTOR_HREF%>/g, href)
  }

  applyBenefactorName(template) {
    const { name } = this.options.donation.benefactor;
    return template.replace(/<%BENEFACTOR_NAME%>/g, name)
  }

  applyGCODistribution(template) {
    const { gco } = this.options.donation.distributions;
    return template.replace(/<%GCO_DISTRIBUTION%>/g, gco)
  }

  applyBenefactorDistribution(template) {
    const { benefactor } = this.options.donation.distributions;
    return template.replace(/<%BENEFACTOR_DISTRIBUTION%>/g, benefactor)
  }

  applyTaxesDistribution(template) {
    const { taxes } = this.options.donation.distributions;
    return template.replace(/<%TAXES_DISTRIBUTION%>/g, taxes)
  }

  execute() {
    const { id } = this.options.design;

    if (!DONATIONS[id]) {
      return "";
    }

    this.options.donation = DONATIONS[id];
    this.log("working on donation box for %s products", id);

    return super.execute();
  }
}

module.exports = DonationBoxRenderer;
