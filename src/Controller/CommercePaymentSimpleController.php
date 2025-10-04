<?php
declare(strict_types = 1);

namespace Drupal\commerce_payment_simple\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\commerce_product\Entity\Product;
use Drupal\commerce_product\Entity\ProductVariation;
use Stephane888\Debug\debugLog;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\commerce_payment_simple\Services\Stripe\StripeService;
use Drupal\commerce_order\Entity\Order;

/**
 * Returns responses for Commerce Payment Simple routes.
 */
final class CommercePaymentSimpleController extends ControllerBase {
  
  function __construct(private readonly StripeService $stripeService) {
  }
  
  public static function create(ContainerInterface $container) {
    return new static($container->get('commerce_payment_simple.stripe'));
  }
  
  /**
   * Payement en un seule etape.
   */
  public function paymentOneStep(int $product_variation_id, Request $request): array {
    /**
     *
     * @var ProductVariation $productVariation
     */
    $productVariation = ProductVariation::load($product_variation_id);
    if (!$productVariation) {
      $this->messenger()->addWarning("Le produit n'est plus disponible à la vente");
      $this->getLogger('commerce_payment_simple')->warning("Tentative d'achat d'un produit inexsistant");
      debugLog::symfonyDebug($_SERVER, 'commerce_payment_simple', true);
      return $this->redirect('<front>');
    }
    $product = $productVariation->getProduct();
    $form = $this->formBuilder()->getForm("Drupal\commerce_payment_simple\Form\PaymentStripeForm");
    $payment_intent_id = null;
    // On recupere la session.
    if ($request->hasSession()) {
      /**
       *
       * @var \Symfony\Component\HttpFoundation\Session\SessionInterface $session
       */
      $session = $request->getSession();
      $payment_intent_id = $session->get('commerce_payment_simple.payment_intent_id');
    }
    
    if ($payment_intent_id) {
      //
    }
    else {
      
      $this->stripeService->CreatePaymentIntent($amount);
    }
    
    $build['content'] = [
      '#theme' => 'commerce_payment_simple_payment_one_step',
      '#form' => $form,
      '#product' => $product,
      '#product_variation' => $productVariation,
      '#attached' => [
        'library' => [
          'commerce_payment_simple/stripe'
        ]
      ]
    ];
    return $build;
  }
  
}
