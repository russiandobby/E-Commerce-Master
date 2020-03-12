import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectIsCollectionFetching} from '../../redux/shop/shop.selectors';
import WithSpinner from '../with-spinner/with-spinner.component';
import CollectionsOverview from './collections-overview.component';
import {compose} from 'redux';

const mapStateToProps = createStructuredSelector({
    isLoading:selectIsCollectionFetching
  });
// With spinner will evaluate first then get past to connect
//   export const CollectionsOverviewContainer = connect(mapStateToProps)(WithSpinner(CollectionsOverview))
// with compose alt / evaluates from right to left
// withspinner 1st with passing collectionoverview to it then passing it to connect
const CollectionsOverviewContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(CollectionsOverview);
export default CollectionsOverviewContainer;
