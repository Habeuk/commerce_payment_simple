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
   * @return PaymentIntent|false
   */
  public function getPaymentIntent(string $paymentIntentId): PaymentIntent|false {
    $paymentIntent = $this->getStripeInstance()->paymentIntents->retrieve($paymentIntentId);
    // On renvoit false si le paiement n'est plus valide.
    if ($this->isFail($paymentIntent)) {
      return false;
    }
    // Le paiement doit etre dans un status en attente ...
    if ($this->isPaymentIntentReusable($paymentIntent))
      return $paymentIntent;
    return false;
  }
  
}