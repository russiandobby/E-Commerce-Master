import React from "react";
import { Route } from "react-router-dom";
import {connect} from 'react-redux';
import {updateCollections} from '../../redux/shop/shop.actions';
import CollectionPage from '../collection/collection.component';
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import {firestore,convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils';

class ShopPage extends React.Component {
  unsubscribeFromSnapshot = null;
  
  componentDidMount(){
    const {updateCollections} = this.props;
    const collectionRef = firestore.collection('collections');
    // get this data now
    // when ever collection gets updated/changed we will get the snapshoot
    collectionRef.onSnapshot(async snapshot =>{
      // will need to transform data into right format and add missing pieces like route
     const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
     updateCollections(collectionsMap);
     
 
    });


  }



  render(){
    const {match} = this.props;
    return (
      // match.path will give us /path
      // need /shop/:category
    <div className="shop-page">
      <Route exact path={`${match.path}`} component={CollectionsOverview} />
      <Route path={`${match.path}/:collectionId`} component={CollectionPage}/>
    </div>
  )
  }
} 
const mapDispatchToProps = dispatch =>({
  updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
});

export default connect(null,mapDispatchToProps) (ShopPage);
