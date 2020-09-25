import {takeLatest,put,all,call} from 'redux-saga/effects';
import UserActionTypes from './user.types';
import {signInSuccess,signInFailure,signOutSuccess,signOutFailure,signUpSuccess,signUpFailure} from './user.actions';

import {auth,googleProvider,createUserProfileDocument,getCurrentUser} from '../../firebase/firebase.utils';


// reusable generator function
export function* getSnapshotFromUserAuth(userAuth,additionalData){
    try{
        const userRef = yield call(createUserProfileDocument,userAuth,additionalData);
        const userSnapshot = yield userRef.get();
       
        yield put(signInSuccess({id:userSnapshot.id, ...userSnapshot.data()}));

    }catch(error){
        yield put(signInFailure(error));
    }
}


export function* signInWithGoogle(){
    try{
        // destructure userRef and pull the user object out
        const {user} = yield auth.signInWithPopup(googleProvider);
        // get snapshot
        //same as if we were running const userRef = await createUserProfileDocument(userAuth);

        // const userRef = yield call(createUserProfileDocument,user);
        // const userSnapshot = yield userRef.get();
        // yield put(signInSuccess({id:userSnapshot.id, ...userSnapshot.data()}));
        yield getSnapshotFromUserAuth(user);

    }catch(error){
        yield put(signInFailure(error));
    }
}

export function* onGoogleSignInStart(){
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START,signInWithGoogle)
}


// emails
// grap payload from action
export function* signInWithEmail({payload:{email,password}}){
    try{
        // will get same user object as with googlesignin
        const {user} = yield auth.signInWithEmailAndPassword(email,password);
        // const userRef = yield call(createUserProfileDocument,user);
        // const userSnapshot = yield userRef.get();
        // yield put(signInSuccess({id:userSnapshot.id, ...userSnapshot.data()}));
        yield getSnapshotFromUserAuth(user);

    }catch(error){
        put(signInFailure(error))
    }
}


export function* onEmailSignInStart(){
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START,signInWithEmail)
}

// concurence, check user session

export function* isUserAuthenticated(){
    try{
        const userAuth = yield getCurrentUser();
        if(!userAuth)return;
        yield getSnapshotFromUserAuth(userAuth);
    }catch(error){
        yield put(signInFailure(error));
    }
}

export function* onCheckUserSession(){
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated)
}

// signing out

export function* signOut(){
    try{
        yield auth.signOut();
        yield (put(signOutSuccess()));
    }catch(error){
        yield (put(signOutFailure(error)));
    }
}
export function* onSignOutStart(){
    yield takeLatest(UserActionTypes.SIGN_OUT_START,signOut)
}

// SignUps

export function* signUp({payload:{email,password,displayName}}){
    try{
        const {user} = yield auth.createUserWithEmailAndPassword(email,password);
        // if we make it then we pass that object with extra data
        yield put(signUpSuccess({user,additionalData:{displayName}}))
    }catch(error){
        yield put(signUpFailure(error))
    }
}

export function* signInAfterSignUp({payload:{user,additionalData}}){
    yield getSnapshotFromUserAuth(user,additionalData);
}

export function* onSignUpSuccess(){
    yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS,signInAfterSignUp);
}

export function* onSignUpStart(){
    yield takeLatest(UserActionTypes.SIGN_UP_START,signUp);
}



export function* userSagas(){
    yield all([call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(isUserAuthenticated),
        call(onSignOutStart),
        call(onSignUpStart),
        call(onSignUpSuccess)
    ]);
}
