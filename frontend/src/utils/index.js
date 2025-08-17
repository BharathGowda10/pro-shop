export const addDecimal = (num) => {
  return Number((Math.round(num * 100) / 100).toFixed(2));
};

export const updateCart = (state) => {
  state.itemsPrice = addDecimal(
    state.cartItems.reduce(
      (acc, item) => (acc + item.price * 100 * item.qty) / 100,
      0
    )
  );
  const shippingPrice = state.totalPrice > 1000 ? 0 : 30;
  state.shippingPrice = addDecimal(shippingPrice);
  const taxPrice = state.totalPrice * 0.15;
  state.taxPrice = addDecimal(taxPrice);
  const totalPrice = state.itemsPrice + state.shippingPrice + state.taxPrice;
  state.totalPrice = addDecimal(totalPrice);
  localStorage.setItem("cart", JSON.stringify(state));
  return state;
};

export const getAddress = (address) => {
  return (
    <p>
      {address.address}, {address.city} <strong>{address.postalCode}</strong>{" "}
      {address.country}.
    </p>
  );
};
export const formatDateTime = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};
