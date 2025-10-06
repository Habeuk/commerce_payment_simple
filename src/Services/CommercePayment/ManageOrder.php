<?php

namespace Drupal\commerce_payment_simple\Services\CommercePayment;

use Drupal\commerce_payment_simple\Services\Stripe\StripeService;
use Drupal\commerce_product\Entity\ProductVariation;
use Drupal\commerce_order\Entity\Order;
use Drupal\commerce_order\Entity\OrderItem;
use Drupal\Core\Datetime\DrupalDateTime;

class ManageOrder extends StripeService {
  
  /**
   * Creer l'intention de payer à partir d'un produit.
   */
  function CreatePaymentIntentFromProduct(ProductVariation $productVariation) {
    
    /**
     *
     * @var \Drupal\commerce_order\Entity\Order $Order
     */
    $Order = Order::load(3);
    if (!$Order) {
      $Order = Order::create([
        'type' => 'commerce_payment_simple'
      ]);
      // place time.
      $current_drupal_date_time = new DrupalDateTime('now', new \DateTimeZone('UTC'));
      $current_timestamp = $current_drupal_date_time->getTimestamp();
      $Order->setPlacedTime($current_timestamp);
      // add item
      $order_item = OrderItem::create([
        'type' => 'default',
        'purchased_entity' => $productVariation->id(),
        'quantity' => 1
      ]);
      $order_item->setTitle($productVariation->getTitle());
      $order_item->setUnitPrice($productVariation->getPrice());
      $order_item->save();
      $Order->addItem($order_item);
      // create payment intent.
      $paymentIntent = $this->CreatePaymentIntentFromOrder($Order);
      $Order->setData('payment_intent_id', $paymentIntent->id);
      // save order
      $Order->save();
    }
    if (!$Order->isNew()) {
      $paymentIntent = $this->getPaymentIntent($Order->getData('payment_intent_id'));
      if (!$paymentIntent) {
        $paymentIntent = $this->CreatePaymentIntentFromOrder($Order);
        $Order->setData('payment_intent_id', $paymentIntent->id);
        $Order->save();
      }
    }
    $data = $this->FormatPaymentIntent($paymentIntent);
    $data['order'] = $Order;
    return $data;
  }
  
  private function CreatePaymentIntentFromOrder(Order $Order) {
    $priceTotal = $Order->getTotalPrice();
    return $this->CreatePaymentIntent($priceTotal->getNumber(), $priceTotal->getCurrencyCode());
  }
  
}