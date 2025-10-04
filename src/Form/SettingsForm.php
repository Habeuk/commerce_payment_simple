<?php
declare(strict_types = 1);

namespace Drupal\commerce_payment_simple\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Configure Commerce Payment Simple settings for this site.
 */
final class SettingsForm extends ConfigFormBase {
  
  /**
   *
   * {@inheritdoc}
   */
  public function getFormId(): string {
    return 'commerce_payment_simple_settings';
  }
  
  /**
   *
   * {@inheritdoc}
   */
  protected function getEditableConfigNames(): array {
    return [
      'commerce_payment_simple.settings'
    ];
  }
  
  /**
   *
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $config = $this->config('commerce_payment_simple.settings');
    //
    $form['mode'] = [
      '#type' => 'radios',
      '#title' => $this->t(' Selectionner le mode '),
      '#default_value' => $config->get('mode'),
      '#options' => [
        'prod' => 'Prod',
        'dev' => 'Dev'
      ],
      '#required' => TRUE
    ];
    
    //
    $form['api_key_test'] = [
      '#type' => 'textfield',
      '#title' => $this->t(' Clé publique test '),
      '#default_value' => $config->get('api_key_test'),
      '#description' => 'pk_test_***'
    ];
    //
    $form['secret_key_test'] = [
      '#type' => 'textfield',
      '#title' => $this->t(' Clé secrète test '),
      '#default_value' => $config->get('secret_key_test'),
      '#description' => 'sk_test_***'
    ];
    //
    $form['api_key_live'] = [
      '#type' => 'textfield',
      '#title' => $this->t(' Api key live '),
      '#default_value' => $config->get('api_key_live'),
      '#description' => 'pk_live_***'
    ];
    $form['secret_key_live'] = [
      '#type' => 'textfield',
      '#title' => $this->t(' Clé secrète live '),
      '#default_value' => $config->get('secret_key_live'),
      '#description' => 'sk_live_***'
    ];
    // webform keys
    $form['api_key_webform'] = [
      '#type' => 'textfield',
      '#title' => $this->t(' Api key Webform '),
      '#default_value' => $config->get('api_key_webform'),
      '#description' => 'whsec_...'
    ];
    
    //
    return parent::buildForm($form, $form_state);
  }
  
  /**
   *
   * {@inheritdoc}
   */
  public function validateForm(array &$form, FormStateInterface $form_state) {
    $mode = $form_state->getValue('mode');
    $api_key_test = $form_state->getValue('api_key_test');
    $secret_key_test = $form_state->getValue('secret_key_test');
    $api_key_live = $form_state->getValue('api_key_live');
    $secret_key_live = $form_state->getValue('secret_key_live');
    $api_key_webform = $form_state->getValue('api_key_webform');
    
    // Validation du mode développement
    if ($mode === 'dev') {
      if (empty($api_key_test)) {
        $form_state->setErrorByName('api_key_test', $this->t('La clé publique test est requise en mode développement.'));
      }
      elseif (!$this->isValidStripeTestKey($api_key_test)) {
        $form_state->setErrorByName('api_key_test', $this->t('La clé publique test n\'est pas valide. Elle doit commencer par "pk_test_".'));
      }
      
      if (empty($secret_key_test)) {
        $form_state->setErrorByName('secret_key_test', $this->t('La clé secrète test est requise en mode développement.'));
      }
      elseif (!$this->isValidStripeTestKey($secret_key_test, 'sk')) {
        $form_state->setErrorByName('secret_key_test', $this->t('La clé secrète test n\'est pas valide. Elle doit commencer par "sk_test_".'));
      }
    }
    
    // Validation du mode production
    if ($mode === 'prod') {
      if (empty($api_key_live)) {
        $form_state->setErrorByName('api_key_live', $this->t('La clé publique live est requise en mode production.'));
      }
      elseif (!$this->isValidStripeLiveKey($api_key_live)) {
        $form_state->setErrorByName('api_key_live', $this->t('La clé publique live n\'est pas valide. Elle doit commencer par "pk_live_".'));
      }
      
      if (empty($secret_key_live)) {
        $form_state->setErrorByName('secret_key_live', $this->t('La clé secrète live est requise en mode production.'));
      }
      elseif (!$this->isValidStripeLiveKey($secret_key_live, 'sk')) {
        $form_state->setErrorByName('secret_key_live', $this->t('La clé secrète live n\'est pas valide. Elle doit commencer par "sk_live_".'));
      }
    }
    
    // Validation optionnelle de la clé webhook
    if (!empty($api_key_webform) && !$this->isValidStripeWebhookKey($api_key_webform)) {
      $form_state->setErrorByName('api_key_webform', $this->t('La clé webhook n\'est pas valide. Elle doit commencer par "whsec_".'));
    }
    
    // Validation de la longueur des clés (validation basique)
    $this->validateKeyLength($form_state, 'api_key_test', $api_key_test, 'Clé publique test');
    $this->validateKeyLength($form_state, 'secret_key_test', $secret_key_test, 'Clé secrète test');
    $this->validateKeyLength($form_state, 'api_key_live', $api_key_live, 'Clé publique live');
    $this->validateKeyLength($form_state, 'secret_key_live', $secret_key_live, 'Clé secrète live');
    $this->validateKeyLength($form_state, 'api_key_webform', $api_key_webform, 'Clé webhook');
    
    parent::validateForm($form, $form_state);
  }
  
  /**
   * Valide une clé de test Stripe.
   */
  private function isValidStripeTestKey(string $key, string $type = 'pk'): bool {
    if (empty($key)) {
      return false;
    }
    return str_starts_with($key, $type . '_test_');
  }
  
  /**
   * Valide une clé de production Stripe.
   */
  private function isValidStripeLiveKey(string $key, string $type = 'pk'): bool {
    if (empty($key)) {
      return false;
    }
    return str_starts_with($key, $type . '_live_');
  }
  
  /**
   * Valide une clé webhook Stripe.
   */
  private function isValidStripeWebhookKey(string $key): bool {
    if (empty($key)) {
      return false;
    }
    return str_starts_with($key, 'whsec_');
  }
  
  /**
   * Valide la longueur minimale d'une clé.
   */
  private function validateKeyLength(FormStateInterface $form_state, string $field_name, ?string $key, string $field_label): void {
    if (!empty($key) && strlen($key) < 20) {
      $form_state->setErrorByName($field_name, $this->t('La %field semble trop courte. Vérifiez que c\'est une clé Stripe valide.', [
        '%field' => $field_label
      ]));
    }
  }
  
  /**
   *
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    $config = $this->config('commerce_payment_simple.settings');
    $config->set('mode', $form_state->getValue('mode'));
    $config->set('api_key_test', $form_state->getValue('api_key_test'));
    $config->set('secret_key_test', $form_state->getValue('secret_key_test'));
    $config->set('api_key_live', $form_state->getValue('api_key_live'));
    $config->set('secret_key_live', $form_state->getValue('secret_key_live'));
    $config->set('api_key_webform', $form_state->getValue('api_key_webform'));
    $config->save();
    
    // Message de confirmation
    $this->messenger()->addStatus($this->t('La configuration a été sauvegardée avec succès.'));
    
    parent::submitForm($form, $form_state);
  }
  
}