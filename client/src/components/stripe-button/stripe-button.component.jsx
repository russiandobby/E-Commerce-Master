import React from 'react';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';
import logo from '../../assets/DeerLogoStripe.svg';
const StripeCheckoutButton = ({price}) =>{
    // stripe wants everthing in cents
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_nBMVcRSQ2K1ZtExCXkYZsGtt00AeuJsAv7';

    const onToken = token =>{
        console.log(token);
        // alert('Paymen Successful');
        // axios will give us back a promise
        axios({
            url:'payment',
            method:'post',
            data:{
                amount:priceForStripe,
                token
            }
        }).then(response =>{
            alert('Payment Successful!');
        }).catch(error =>{
            console.log('Problem with your payment! ', JSON.parse(error));
            alert('There was an issue with your payment, make sure all your information is correct');
        })
    };

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