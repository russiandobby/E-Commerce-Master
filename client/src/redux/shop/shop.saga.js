// holds saga code related to our shop
// takeevery listens for every action of specific type we pass to it
import {
    takeLatest,
    call,
    put,
    all
} from 'redux-saga/effects';
import ShopActionTypes from './shop.types';

import {
    firestore,
    convertCollectionsSnapshotToMap
} from '../../firebase/firebase.utils';
import {
    fetchCollectionsSuccess,
    fetchCollectionsFailure
} from './shop.actions';


// gen func that will do our async code
export function* fetchCollectionsAsync() {
    

    try {
        const collectionRef = firestore.collection('collections');
        const snapshot = yield collectionRef.get();
        //   call is a method that takes as first argument some function or method, 2nd are parameters that you would pass into that function call
        // since using yield allows us to defer control at this point of execution to the saga middleware
        // so in case we need to cancel it it can do it here
        const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);
        // sagas dont use dispatch keyword they use put
        // its a saga effect for creating actions
        yield put(fetchCollectionsSuccess(collectionsMap));
    } catch (error) {
        yield put(fetchCollectionsFailure(error));
    }
    //   collectionRef
    //   .get()
    //   .then(snapshot => {
    //       const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
    //       // updateCollections(collectionsMap);
    //       dispatch(fetchCollectionsSuccess(collectionsMap));

    //     }).catch(error => dispatch(fetchCollectionsFailure(error.message)));
};
// 1st base saga
// will pause
// so fetch-collection-start action comes in, our saga was listening for it
// once it heard it it fires off fetchcollectionasync
export function* fetchCollectionsStart() {
    // takeevry creates nonblocking code
    yield takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync);
};

export function* shopSagas(){
    yield (all([
        call(fetchCollectionsStart)
    ]))
};