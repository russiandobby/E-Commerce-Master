// Overall reducer based on all of apps reducer
import {combineReducers} from 'redux';

import {persistReducer} from 'redux-persist';
// Tell redux persist we want to use local storage as our default or u can use session storage
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';
import directoryReducer from './directory/directory.reducer';
import shopReducer from './shop/shop.reducer';
// Persist Config as JSON object
const persistConfig = {
    // from where you wanna start storing inside our reducer
    key:'root',
    // where key goes
    storage,
    // string names of any reducer we want to store///which reducer we want to persist
    whitelist:['cart']

}

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    directory:directoryReducer,
    shop:shopReducer
});
export default persistReducer(persistConfig,rootReducer);

// export default combineReducers({
//     user: userReducer,
//     cart: cartReducer
// });