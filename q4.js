let productCart = [
  { productname: 'iphone-x', qty: 10, price: 1000 },
  { productname: 'macbook pro', qty: 200, price: 2000},
  { productname: 'iwatch', qty: 100, price: 550 },
  { productname: 'macbook air', qty: 100, price: 1000},
  { productname: 'iphone 8', qty: 300, price: 700 },
  { productname: 'iphone 7', qty: 100, price: 550 },
  { productname: 'ipad Retina', qty: 20, price: 1000 },
  { productname: 'ipad', qty: 10, price: 700 },
  { productname: 'Magic Mouse', qty: 50, price: 300 },
  { productname: 'Magic Trackpad', qty: 75, price: 200 }
]

function CostOfProductForQtyGreaterThan(minimumQuantity) {
  if (!minimumQuantity || !Number.isInteger(minimumQuantity)) {
    return [];
  }

  return (productCart.filter((product) => product.qty > minimumQuantity));
}

function isString (value) {
  return typeof value === 'string' || value instanceof String;
}

function CostOfProduct(name) {
  if (!name || !(isString(name)) || (isString(name) && name.length == 0)) {
    return undefined;
  }

  let product = (productCart.find((product) => product.productname.toLowerCase() === name.toLowerCase()));

  if (product) {
    return product.price * product.qty;
  } else {
    return undefined;
  }
}
