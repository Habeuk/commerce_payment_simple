<?php

namespace Drupal\commerce_payment_simple\Services\Stripe;

use Stripe\StripeClient;
use Stripe\Exception\ApiErrorException;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Stripe\PaymentIntent;

class StripeService extends StripeInit {
  
  /**
   * Initie le paiment et retouner les informations importante tels que
   * 'clientSecret'.
   *
   * @param float $amount
   * @param string $currency
   * @return PaymentIntent
   */
  public function CreatePaymentIntent(float $amount, $currency = 'eur') {
    $payment = [
      'amount' => $amount,
      'currency' => $currency,
      ...$this->getPaymentMethods()
    ];
    return $this->getStripeInstance()->paymentIntents->create($payment);
  }
  
  /**
   *
   * @param string $paymentIntentId
   * @param float $amount
   * @param string $currency
   * @return PaymentIntent
   */
  public function getPaymentIntent(string $paymentIntentId, float $amount, $currency = 'eur') {
    $paymentIntent = $this->getStripeInstance()->paymentIntents->retrieve($paymentIntentId);
    // On regenere une PaymentIntent si celui encours à ehouer.
    if ($this->isFail($paymentIntent)) {
      return $this->CreatePaymentIntent($amount, $currency);
    }
    return $paymentIntent;
  }
  
}