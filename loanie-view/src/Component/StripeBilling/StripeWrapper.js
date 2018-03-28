import React from "react";
import { StripeProvider } from "react-stripe-elements";
import MyStoreCheckout from "./MyStoreCheckout.js";
import "./Stripe.css";

export default function StripeWrapper() {
  return (
    <StripeProvider apiKey="pk_test_12345">
      <MyStoreCheckout />
    </StripeProvider>
  );
}
