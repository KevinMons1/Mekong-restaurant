import React from 'react'
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import Payment from "./Payment"
import { Helmet } from "react-helmet"

const stripePromise = loadStripe("pk_test_51JFYiCF3UauaeAE1sYvrvpg1lomcpWCCEw6S3WhTK1VmfDoKtMj4aJLHfPmaWfnyo1jzBoMYyYUEAzOj5COHCtDx008jYEXvOQ")

export default function PaymentIndex() {
    return (
        <Elements stripe={stripePromise}>
            <Helmet>
                <meta name="robots" content="noindex" />
            </Helmet>
            <Payment />
        </Elements>
    )
}
