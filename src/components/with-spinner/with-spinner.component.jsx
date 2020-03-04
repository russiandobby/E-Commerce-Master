import React from 'react';
import {SpinnerContainer,SpinnerOverlay} from './with-spinner.styles';


// withspinner takes in a component we will wrap, it has a spinner componnet inside that will return a spinner if 
// loading is true or the wrapped component we passed if its false

const WithSpinner = WrappedComponent =>{
const Spinner =({isLoading,...otherProps}) => {
    return isLoading ? (
        <SpinnerOverlay>
            <SpinnerContainer/>
        </SpinnerOverlay>
    ) : (
        <WrappedComponent {...otherProps} />
    );
};
return Spinner;
};
export default WithSpinner;