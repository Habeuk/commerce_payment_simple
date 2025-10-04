<?php
declare(strict_types = 1);

namespace Drupal\commerce_payment_simple\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Provides a Commerce Payment Simple form.
 */
final class PaymentStripeForm extends FormBase {
  
  /**
   *
   * {@inheritdoc}
   */
  public function getFormId(): string {
    return 'commerce_payment_simple_payment_stripe';
  }
  
  /**
   *
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state): array {
    $form['message'] = [
      '#type' => 'textarea',
      '#title' => $this->t('Message'),
      '#required' => TRUE
    ];
    $form['payment_form'] = [
      '#type' => 'textarea'
    ];
    
    $form['actions'] = [
      '#type' => 'actions',
      'submit' => [
        '#type' => 'submit',
        '#value' => $this->t('Send')
      ]
    ];
    
    return $form;
  }
  
  /**
   *
   * {@inheritdoc}
   */
  public function validateForm(array &$form, FormStateInterface $form_state): void {
    // @todo Validate the form here.
    // Example:
    // @code
    // if (mb_strlen($form_state->getValue('message')) < 10) {
    // $form_state->setErrorByName(
    // 'message',
    // $this->t('Message should be at least 10 characters.'),
    // );
    // }
    // @endcode
  }
  
  /**
   *
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state): void {
    $this->messenger()->addStatus($this->t('The message has been sent.'));
    $form_state->setRedirect('<front>');
  }
  
}
