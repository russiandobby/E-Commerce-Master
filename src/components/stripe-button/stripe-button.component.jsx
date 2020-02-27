import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import logo from '../../assets/DeerLogoStripe.svg';
const StripeCheckoutButton = ({price}) =>{
    // stripe wants everthing in cents
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_nBMVcRSQ2K1ZtExCXkYZsGtt00AeuJsAv7';

    const onToken = token =>{
        console.log(token);
        alert('Paymen Successful');
    }

    return(
        <StripeCheckout 
            label ='Pay Now'
            name='E Store'
            billingAddress
            shippingAddress
            image={logo}
            description={`You total is ${price} $`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    );

};
export default StripeCheckoutButton;