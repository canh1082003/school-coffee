const setCharAt = (str: string, index: number, chr: string) => {
  if (index > str.length - 1) return str;
  return str.substring(0, index) + chr + str.substring(index + 1);
};
const handleLocalStorage = (newCart: string) => {
  window.localStorage.setItem('cart', newCart);
  window.dispatchEvent(new Event('cart'));
};
export const addToCart = (productId: string) => {
  let cartString = localStorage.getItem('cart');
  if (cartString == null) {
    handleLocalStorage(`${productId}:1`);
    return;
  } else {
    const cartArr = cartString.toString().split('-');
    let isFound = false;
    for (let i = 0; i < cartArr.length; i++) {
      const idInCart = cartArr[i].charAt(0);
      const quantityInCart = cartArr[i].charAt(2);
      if (productId == idInCart) {
        cartArr[i] = setCharAt(cartArr[i], 2, Number(quantityInCart) + 1 + '');
        isFound = true;
        break;
      }
    }
    console.log(cartArr);
    if (isFound) {
      let newCart = '';
      for (let j = 0; j < cartArr.length; j++) {
        if (j === 0) {
          newCart = newCart.concat(cartArr[j]); //3:2
          console.log(newCart);
        } else {
          newCart = newCart.concat('-' + cartArr[j]);
          console.log(newCart);
          console.log('here3');
        }
        localStorage.removeItem('cart');
        handleLocalStorage(newCart);
      }
    } else {
      if (cartString == '') {
        cartString = cartString.concat(`${productId}:1`);
        handleLocalStorage(cartString);

        return;
      }
      cartString = cartString.concat(`-${productId}:1`);
      handleLocalStorage(cartString);
    }
  }
};
// useAllProduct
// get cart -> local.getCart() => split(-),length => arr=  map item[0] sl = item[1]
// => products.find id == item[0] return
//arr.map
