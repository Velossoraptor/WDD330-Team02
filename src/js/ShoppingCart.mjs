export function cartItemTemplate(item) {
    if (item.FinalPrice < item.SuggestedRetailPrice) {
    const discount = item.FinalPrice / item.SuggestedRetailPrice;
    const discountPercent = Math.round((1 - discount) * 100);
    const itemString = `<li class="cart-card divider">
        <a href="#" class="cart-card__image">
            <img
            src="${item.Image}"
            alt="${item.Name}"
            />
        </a>
        <a href="#">
            <h2 class="card__name">${item.Name}</h2>
        </a>
        <p class="cart-card__color">${item.Colors[0].ColorName}</p>
        <p class="cart-card__quantity">qty: 1</p>
        <p class="cart-card__price">$${item.FinalPrice} -- <span class="discount">${discountPercent}% Off</span></p>
        </li>`;

    return itemString;
  }
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}