import React from 'react';
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import PaymentForm from './paymentForm';

const PUBLIC_KEY = "pk_test_51MGgUHDxwB8RshMR4cs4SWrNSL0G7mhROqzQHol8d4wGTYMsFyFFIITGlfHUvtexYFnT4kWdjkqAFAfiPMq0GhsL00JWXwLTog";

const stripePromise = loadStripe(PUBLIC_KEY);

const StripeContainer = (props) => {

    const price = props.price;
    return (
        <Elements stripe={stripePromise}>
            <PaymentForm price={price} book={props.book} switchCheckout={props.switchCheckout} />
        </Elements>
    );
};

export default StripeContainer;