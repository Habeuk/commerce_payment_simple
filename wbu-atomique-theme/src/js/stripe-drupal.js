import "../scss/stripe.scss";

import stripe from "./stripe";
//
(function (Drupal) {
  Drupal.behaviors.myModuleBehavior = {
    attach: function (context, settings) {
      const payments = once("commerce_payment_simple-elements", ".payment-form-element", context);
      if (payments.length > 0) {
        payments.forEach((payment) => {
          const HBK = new stripe(payment);
          HBK.init();
        });
      }
    },
  };
  //
})(Drupal);
