<?php
declare(strict_types = 1);

namespace Drupal\commerce_payment_simple\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\commerce_product\Entity\Product;
use Drupal\commerce_product\Entity\ProductVariation;
use Stephane888\Debug\debugLog;

/**
 * Returns responses for Commerce Payment Simple routes.
 */
final class CommercePaymentSimpleController extends ControllerBase {
  
  /**
   * Payement en un seule etape.
   */
  public function paymentOneStep(int $product_variation_id): array {
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
