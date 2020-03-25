import React from 'react';

import {ErrorImageOverlay,ErrorImageText,ErrorImageContainer} from './error-boundary.styles';

class ErrorBoundary extends React.Component{
    constructor(){
        super();

        this.state={
            hasErrored:false
        }
    }

    static getDerivedStateFromError(error){
    
        // proces the error
        return{
            hasErrored:true
        }
    }

    componentDidCatch(error,info){
        console.log(error);
    }

    render(){
        if(this.state.hasErrored){
            return (
                <ErrorImageOverlay>
                    <ErrorImageContainer imageUrl='https://i.imgur.com/lKJiT77.png' />
                    <ErrorImageText>Looks Like the Dog Ate Your Page</ErrorImageText>
                </ErrorImageOverlay>
            )
        }
        return this.props.children;
    }
}
export default ErrorBoundary;