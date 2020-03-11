import {createSelector} from 'reselect';

// const COLLECTION_ID_MAP = {
//     hats:1,
//     sneakers:2,
//     jackets:3,
//     womens:4,
//     mens:5
// };

const selectShop = state => state.shop;

export const selectIsCollectionFetching = createSelector(
[selectShop],
shop=>shop.isFetching
);

export const selectIsCollectionLoaded = createSelector(
    [selectShop],
    shop => !!shop.collections
    // !! if its not empty will return true
);

export const selectCollections = createSelector(
    [selectShop],
    shop => shop.collections
);

export const selectCollectionsForPreview = createSelector(
    [selectCollections],
    // convert object into array so we can map over it/ object.keys gives us all the keys of object in array form
    collections =>collections ? Object.keys(collections).map(key => collections[key]) : []
);

export const selectCollection = collectionUrlParam => createSelector(
    [selectCollections],
    collections => 
    // collections.find(collection => collection.id === COLLECTION_ID_MAP[collectionUrlParam])
   (collections ? collections[collectionUrlParam] : null)
);