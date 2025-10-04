<?php
declare(strict_types = 1);

namespace Drupal\commerce_payment_simple\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\commerce_product\Entity\Product;

/**
 * Returns responses for Commerce Payment Simple routes.
 */
final class CommercePaymentSimpleController extends ControllerBase {
  
  /**
   * Payement en un seule etape.
   */
  public function paymentOneStep(int $product_id): array {
    /**
     *
     * @var Product $product
     */
    $product = Product::load($product_id);
    $build['content'] = [
      '#type' => 'item',
      '#markup' => $this->t('It works!')
    ];
    
    return $build;
  }
  
}
