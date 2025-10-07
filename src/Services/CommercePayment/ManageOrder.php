<?php

namespace Drupal\commerce_payment_simple\Services\CommercePayment;

use Drupal\commerce_payment_simple\Services\Stripe\StripeService;
use Drupal\commerce_product\Entity\ProductVariation;
use Drupal\commerce_order\Entity\Order;
use Drupal\commerce_order\Entity\OrderItem;
use Drupal\Core\Datetime\DrupalDateTime;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\HttpFoundation\Request;

class ManageOrder extends StripeService {
  private Request $request;
  
  function __construct(RequestStack $requestStack) {
    $this->request = $requestStack->getCurrentRequest();
  }
  
  /**
   * Creer l'intention de payer à partir d'un produit.
   */
  function CreatePaymentIntentFromProduct(ProductVariation $productVariation, $order_id = null) {
    if (!$order_id) {
      $order_id = $this->getOrderIdFromSession();
    }
    
    /**
     *
     * @var \Drupal\commerce_order\Entity\Order $Order
     */
    if ($order_id)
      $Order = Order::load($order_id);
    if (empty($Order)) {
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
      //
      $this->setOrderIdInSession($Order->id());
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
  
  private function setOrderIdInSession(int $order_id) {
    if ($this->request->hasSession()) {
      /**
       *
       * @var \Symfony\Component\HttpFoundation\Session\SessionInterface $session
       */
      $session = $this->request->getSession();
      $session->set('commerce_payment_simple.order_id', $order_id);
    }
  }
  
  private function getOrderIdFromSession($order_id = null) {
    if ($this->request->hasSession()) {
      /**
       *
       * @var \Symfony\Component\HttpFoundation\Session\SessionInterface $session
       */
      $session = $this->request->getSession();
      $order_id = $session->get('commerce_payment_simple.order_id');
    }
    return $order_id;
  }
  
  private function CreatePaymentIntentFromOrder(Order $Order) {
    $priceTotal = $Order->getTotalPrice();
    return $this->CreatePaymentIntent($priceTotal->getNumber(), $priceTotal->getCurrencyCode());
  }
  
}