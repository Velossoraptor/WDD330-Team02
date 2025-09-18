import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  const hasDiscount = product.FinalPrice < product.SuggestedRetailPrice;
  const discountPercent = hasDiscount
    ? Math.round((1 - product.FinalPrice / product.SuggestedRetailPrice) * 100)
    : null;

  return `<li class="product-card">
            <a href="product_pages/?product=${product.Id}">
                <img src="${product.Image}" alt="Image of ${product.Name}">
                <h3 class="card__brand">${product.Brand.Name}</h3>
                <h2 class="card__name">${product.NameWithoutBrand}</h2>
                <p class="product-card_price">
                  $${product.FinalPrice}
                  ${hasDiscount ? ` -- <span class="discount">${discountPercent}% Off</span>` : ""}
                </p>
            </a>
        </li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const list = await this.dataSource.getData();
    this.renderList(list);
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}
