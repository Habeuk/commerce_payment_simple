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
  private const KEY_ORDER_IN_SESSION = 'commerce_payment_simple.order_id';
  
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
      $paymentIntent = $this->getPaymentIntentReusable($Order->getData('payment_intent_id'));
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
  
  /**
   *
   * @param int $order_id
   * @throws \Exception
   */
  public function validatePayment(int $order_id) {
    $Order = Order::load($order_id);
    if (!$Order) {
      throw new \Exception("La commande n'existe plus ");
    }
    if ($Order->getState()->value != 'completed') {
      $paymentIntent = $this->getPaymentIntent($Order->getData('payment_intent_id'));
      if (!$paymentIntent) {
        throw new \Exception("Erreur lors de l'optention de l'intention de payment");
      }
      if ($this->isPaid($paymentIntent)) {
        $Order->set('state', 'completed');
        $Order->set('order_number', $Order->id());
        $Order->setData('paid_event_dispatched', true);
        $current_drupal_date_time = new DrupalDateTime('now', new \DateTimeZone('UTC'));
        $current_timestamp = $current_drupal_date_time->getTimestamp();
        $Order->setCompletedTime($current_timestamp);
        //
        \drupal::messenger()->addStatus(t('
  <div>
  <h3>🎉 Paiement Confirmé !</h3>
    <p> Votre paiement a bien été reçu et nous sommes ravis de vous compter parmi nos clients.<br>
    Votre site est désormais en cours de création 🚀.</p>
    <p> Notre équipe vous contactera dans les 24 heures pour finaliser les détails de votre projet.</p>
</div>
', [], [
          'context' => 'html'
        ]), TRUE);
      }
      else {
        $Order->set('state', 'validation');
      }
      $Order->save();
    }
    // $paymentIntent =
    // $this->getPaymentIntent($Order->getData('payment_intent_id'));
    // dd($paymentIntent);
    // // $Order->save();
    $this->deleteOrderIdInSession();
  }
  
  private function deleteOrderIdInSession() {
    if ($this->request->hasSession()) {
      /**
       *
       * @var \Symfony\Component\HttpFoundation\Session\SessionInterface $session
       */
      $session = $this->request->getSession();
      $session->remove(self::KEY_ORDER_IN_SESSION);
    }
  }
  
  private function setOrderIdInSession(int $order_id) {
    if ($this->request->hasSession()) {
      /**
       *
       * @var \Symfony\Component\HttpFoundation\Session\SessionInterface $session
       */
      $session = $this->request->getSession();
      $session->set(self::KEY_ORDER_IN_SESSION, $order_id);
    }
  }
  
  private function getOrderIdFromSession($order_id = null) {
    if ($this->request->hasSession()) {
      /**
       *
       * @var \Symfony\Component\HttpFoundation\Session\SessionInterface $session
       */
      $session = $this->request->getSession();
      $order_id = $session->get(self::KEY_ORDER_IN_SESSION);
    }
    return $order_id;
  }
  
  private function CreatePaymentIntentFromOrder(Order $Order) {
    $priceTotal = $Order->getTotalPrice();
    return $this->CreatePaymentIntent($priceTotal->getNumber() * 100, $priceTotal->getCurrencyCode());
  }
  
}