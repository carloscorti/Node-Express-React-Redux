import React, { useState, useEffect } from 'react';
import ReactStripeCheckout from "react-stripe-checkout";

import { connect } from 'react-redux';
import * as actions from '../actions';

const StripePayments = (props) => {
    // const [stateVariable, setStateVariable] = useState([]);

    // useEffect(() => {

    //     return () => {};
    // }, []);

    return (
        <ReactStripeCheckout
            name="Emaly"
            description="$5 for 5 emails credits"
            amount={500}//us dolars cens
            token={token=>props.hanldeStripeToken(token)}
            stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
        >
            <button className='btn'>
                Add Credits
            </button>
        </ReactStripeCheckout>
    );
}

export default connect(null, actions)(StripePayments);

// export default StripePayments;