<?php

namespace Drupal\commerce_payment_simple\Services\Stripe;

use Stripe\StripeClient;
use Stripe\PaymentIntent;
use Stephane888\Debug\Repositories\ConfigDrupal;

class StripeInit {
  private StripeClient $stripe;
  /**
   * Permet à Stripe de selectionner le type de payment disponible dans le pays
   * de l'utilisateur.
   *
   * @var boolean
   */
  private bool $paymentAutomatique = true;
  private string $stripe_public_key;
  
  /**
   * Vérifie si un PaymentIntent est encore valide et réutilisable
   *
   * @param string $paymentIntentId
   * @return bool
   */
  public function isPaymentIntentReusable(PaymentIntent $paymentIntent) {
    try {
      $statuses = [
        'requires_payment_method',
        'requires_confirmation',
        'requires_action'
      ];
      return in_array($paymentIntent->status, $statuses);
    }
    catch (\Exception $e) {
      return false;
    }
  }
  
  public function isProcessing(PaymentIntent $paymentIntent) {
    try {
      $statuses = [
        'processing',
        'amount_capturable_updated'
      ];
      return in_array($paymentIntent->status, $statuses);
    }
    catch (\Exception $e) {
      return false;
    }
  }
  
  public function isPaid(PaymentIntent $paymentIntent) {
    return $paymentIntent->status == "succeeded";
  }
  
  public function isFail(PaymentIntent $paymentIntent) {
    try {
      $statuses = [
        'canceled',
        'payment_failed'
      ];
      return in_array($paymentIntent->status, $statuses);
    }
    catch (\Exception $e) {
      return false;
    }
  }
  
  public function FormatPaymentIntent(PaymentIntent $paymentIntent) {
    return [
      'id' => $paymentIntent->id,
      'client_secret' => $paymentIntent->client_secret,
      'status' => $paymentIntent->status,
      'en_attente_payment' => $this->isPaymentIntentReusable($paymentIntent)
    ];
  }
  
  protected function getPaymentMethods() {
    if ($this->paymentAutomatique) {
      return [
        'automatic_payment_methods' => [
          'enabled' => true
        ]
      ];
    }
    else {
      // @todo il faudra peut etre definir les methodes souhaiter.
      return [
        'payment_method_types' => [
          'card',
          'sepa_debit',
          'giropay',
          'ideal',
          'bancontact'
        ]
      ];
    }
  }
  
  /**
   *
   * @return \Stripe\StripeClient
   */
  protected function getStripeInstance() {
    if (empty($this->stripe)) {
      $config = ConfigDrupal::config('commerce_payment_simple.settings');
      if (empty($config['mode']))
        throw new \Exception("La configuration n'est pas definie");
      if ($config['mode'] == 'prod') {
        if (empty($config['secret_key_live']))
          throw new \Exception("La clée publique de production n'est pas definie");
        $this->stripe = new StripeClient($config['secret_key_live']);
        $this->stripe_public_key = $config['api_key_live'];
      }
      elseif ($config['mode'] == 'dev') {
        if (empty($config['secret_key_test']))
          throw new \Exception("La clée publique de developpement n'est pas definie");
        $this->stripe = new StripeClient($config['secret_key_test']);
        $this->stripe_public_key = $config['api_key_test'];
      }
    }
    return $this->stripe;
  }
  
  /**
   *
   * @return string
   */
  public function getStripePublicKey() {
    return $this->stripe_public_key;
  }
  
}