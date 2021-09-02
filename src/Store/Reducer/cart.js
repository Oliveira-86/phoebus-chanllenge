import CartItem from '../../Models/cart-item';
import { ADD_TO_CART, REMOVE_FROM_CART, INCREASE_QUANTITY } from '../actions/cart';

const initialState = {
    items: {},
    totalAmount: 0,
    totalQuantity: 0
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const addedProduct = action.product;
            const productPrice = addedProduct.price;
            const productTitle = addedProduct.title;
            const productImageUrl = addedProduct.image
            const productQuantity = addedProduct.totalQty;

            let updateOrNewCart;

            if (state.items[addedProduct.id]) {
                // already have the item in the cart
                updateOrNewCart = new CartItem(
                    state.items[addedProduct.id].quantity + 1,
                    productImageUrl,
                    productPrice,
                    productTitle,
                    state.items[addedProduct.id].sum + productPrice,
                    state.items[addedProduct.id].totalQty + 1
                );
            } else {
                updateOrNewCart = new CartItem(
                    1,
                    productImageUrl,
                    productPrice,
                    productTitle,
                    productPrice,
                    productQuantity
                );
            }
            return {
                ...state,
                items: { ...state.items, [addedProduct.id]: updateOrNewCart },
                totalAmount: state.totalAmount + productPrice,
                totalQuantity: state.totalQuantity + 1
            };
        case REMOVE_FROM_CART:
            const selectedCartItem = state.items[action.prodId];
            const currentQty = selectedCartItem.quantity;
            let updateCartItems;
            if (currentQty > 1) {
                const updateCartItem = new CartItem(
                    selectedCartItem.quantity - 1,
                    selectedCartItem.image,
                    selectedCartItem.price,
                    selectedCartItem.title,
                    selectedCartItem.sum - selectedCartItem.price,
                    selectedCartItem.totalQty - 1
                );
                updateCartItems = { ...state.items, [action.prodId]: updateCartItem }

            } else {
                updateCartItems = { ...state.items };
                delete updateCartItems[action.prodId];
            }
            return {
                ...state,
                items: updateCartItems,
                totalAmount: state.totalAmount - selectedCartItem.price,
                totalQuantity: state.totalQuantity - 1
            }
        case INCREASE_QUANTITY:
            const selectedQtyItem = state.items[action.pid];
            const currentItemQty = selectedQtyItem.quantity;
            let updateQtytItems;
            if (currentItemQty >= 1) {
                const updateQtytItem = new CartItem(
                    selectedQtyItem.quantity + 1,
                    selectedQtyItem.image,
                    selectedQtyItem.price,
                    selectedQtyItem.title,
                    selectedQtyItem.sum + selectedQtyItem.price,
                    selectedQtyItem.totalQty + 1
                );
                updateQtytItems = { ...state.items, [action.pid]: updateQtytItem }
            }
            return {
                ...state,
                items: updateQtytItems,
                totalAmount: state.totalAmount + selectedQtyItem.price,
                totalQuantity: state.totalQuantity + 1
            }
    }
    return state;
}