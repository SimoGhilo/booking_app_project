import React, { useEffect, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './paymentForm.css';
import { Link, useNavigate } from 'react-router-dom';


let linkStyle = { textDecoration: "none", color: "black" };

const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
        base: {
            iconColor: "#c4f0ff",
            color: "#fff",
            fontWeight: 500,
            fontSize: "1rem",
            fontSmoothing: "antialiased",
            ":-webkit-autofill": { color: "ffffff" },
            "::placeholder": { color: "ffffff" },

        },
        invalid: {
            iconColor: "ffffff",
            color: "ffffff"
        }
    }
}

const PaymentForm = (props) => {

    // Fetching redux status 

    let user = useSelector(state => state.loginStatus.user)


    const navigate = useNavigate();

    const [success, setSuccess] = useState(false)

    const switchCheckout = props.switchCheckout;
    const book = props.book;

    console.log('success', success)

    useEffect(() => {

    }, [success, setSuccess])

    const stripe = useStripe()
    const elements = useElements()

    const amount = props.price;

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),
        })
        if (!error) {
            try {
                const { id } = paymentMethod

                const response = axios.post(`http://localhost:5000/payment`, {
                    amount: amount * 100,
                    customer: user.email,
                    id: id,

                })

                if ((await response).data.success) {
                    setSuccess(true)
                    book()
                    switchCheckout()
                    console.log(`Successful payment`)

                }
            } catch (error) {
                console.log(`error`, error)
                alert(error)
            }
        } else {
            console.log(error.message)
        }

    }







    return (
        <>
            {!success ?
                (<form onSubmit={handleSubmit}>
                    <fieldset className='formGroup'>
                        <div className='FormRow'>
                            <CardElement options={CARD_OPTIONS} />
                        </div>
                    </fieldset>
                    <button className='bookNow'>Complete booking</button>
                </form>) :
                (<div>
                    <h2>Payment Successful!</h2>
                </div>)}

        </>
    );
};

export default PaymentForm;