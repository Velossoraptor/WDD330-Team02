import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  if (product.FinalPrice < product.SuggestedRetailPrice) {
    const discount = product.FinalPrice / product.SuggestedRetailPrice;
    const discountPercent = Math.round((1 - discount) * 100);
    return `<li class="product-card">
            <a href="product_pages/?product=${product.Id}">
                <img src="${product.Image}" alt="Image of ${product.Name}">
                <h3 class="card__brand">${product.Brand.Name}</h2>
                <h2 class="card__name">${product.NameWithoutBrand}</h3>
                <p class="product-card_price">$${product.FinalPrice}    --    <span class="discount">${discountPercent}% Off</span></p>
            </a>
        </li>`;
  }
  return `<li class="product-card">
            <a href="product_pages/?product=${product.Id}">
                <img src="${product.Image}" alt="Image of ${product.Name}">
                <h3 class="card__brand">${product.Brand.Name}</h2>
                <h2 class="card__name">${product.NameWithoutBrand}</h3>
                <p class="product-card_price">$${product.FinalPrice}</p>
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
    // initializes the product list by fetching data and rendering it
    const list = await this.dataSource.getData();
    this.renderList(list);
  }
  renderList(list) {
    // renders the list of products to the page
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}
