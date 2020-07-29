import React, { useState, useEffect } from 'react';
import ReactStripeCheckout from "react-stripe-checkout";

const StripePayments = () => {
    // const [stateVariable, setStateVariable] = useState([]);

    // useEffect(() => {

    //     return () => {};
    // }, []);

    return (
        <ReactStripeCheckout
            amount={500}//us dolars cens
            token={token=>console.log(token)}
            stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
        />
    );
}

export default StripePayments;