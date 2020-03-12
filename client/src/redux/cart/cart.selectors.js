import {createSelector} from 'reselect';
// save on rerenders so that we dont constntly need to rerender cart items and dropdown


// imput selector
// returns slice of state
const  selectCart = state => state.cart;

export const selectCartItems = createSelector(
    [selectCart],
    (cart) => cart.cartItems
);

export const selectCartHidden = createSelector(
    [selectCart],
    cart => cart.hidden
);

export const selectCartItemsCount = createSelector(
    [selectCartItems],
    cartItems =>
    cartItems.reduce(
        (accumalatedQuantity,cartItem) =>
        accumalatedQuantity + cartItem.quantity, 0
    )
);

export const selectCartTotal = createSelector(
    [selectCartItems],
    cartItems =>
    cartItems.reduce(
        (accumalatedQuantity,cartItem) =>
        accumalatedQuantity + cartItem.quantity * cartItem.price, 0
    )
);