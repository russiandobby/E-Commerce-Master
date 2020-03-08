import {all,call} from 'redux-saga/effects';
import {shopSagas} from './shop/shop.saga';
import {userSagas} from './user/user.saga';
import {cartSagas} from './cart/cart.sagas';

export default function* rootSaga(){
    // all allows us to call any number of sagas and initialize all on separate task streams
    yield all(
        [
            call(shopSagas),
            call(userSagas),
            call(cartSagas)
        ]
    )
}
