import React from "react";
import CollectionItem from '../../components/collection-item/collection-item.component';

import {connect} from 'react-redux';
import {selectCollection} from '../../redux/shop/shop.selectors';

import './collection.styles.scss';

const CollectionPage = ({collection}) =>
{
    // useEffect(()=>{
    //     console.log('I am subscribing!');
    //     const unsubscribeFromCollections = firestore.collection('collections').onSnapshot(async snapshot => console.log(snapshot));

    //     // cleacnup functon mimics componentwillunmount
    //     return ()=>{
    //         console.log('I am unsubscribing!');
    //         unsubscribeFromCollections();
    //     }
    // },[]);
    const {title,items} = collection;
    // console.log(collection);
    return(
    // will return an object with categoryId field = to wha route we want like /hats or /jackets
    //match.params.collectionId
    
    <div className='collection-page'>
        <h2 className='title'>{title}</h2>
        <div className='items'>
            {
                items.map(item => (
                    <CollectionItem key={item.id} item={item} />
                ))
            }
        </div>
    </div>
);
}

// ownProps props of the component we wrapping in our connect
// Need to pass state cause unline other selectors this one
// needs a part of the state depneding on url param
// selectCollection returns a function so we pass is state
const mapStateToProps = (state, ownProps)=>({
    collection:selectCollection(ownProps.match.params.collectionId)(state)
})

export default connect(mapStateToProps) (CollectionPage);