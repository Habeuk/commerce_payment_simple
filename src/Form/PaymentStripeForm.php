<?php
declare(strict_types = 1);

namespace Drupal\commerce_payment_simple\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Ajax\AjaxResponse;
use Drupal\Core\Ajax\ReplaceCommand;
use Drupal\Core\Ajax\RedirectCommand;

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
    $form['information'] = [
      '#type' => 'html_tag',
      '#tag' => 'div',
      '#attributes' => [
        'class' => [
          'my-5'
        ]
      ]
    ];
    $form['information']['name_firstname'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Nom et Prénom'),
      '#required' => TRUE,
      '#attributes' => [
        'placeholder' => $this->t('Entrez votre nom complet'),
        'class' => [
          'form-control',
          'mb-3'
        ]
      ]
    ];
    $form['information']['email'] = [
      '#type' => 'email',
      '#title' => $this->t('Adresse e-mail'),
      '#required' => TRUE,
      '#attributes' => [
        'placeholder' => '',
        'class' => [
          'form-control',
          'mb-3'
        ]
      ]
    ];
    // Élément Stripe
    $form['payment_method_title'] = [
      '#markup' => $this->t('<label class="form-label">Méthode de paiement</label>')
    ];
    $form['payment_element_wrapper'] = [
      '#type' => 'container',
      '#attributes' => [
        'class' => [
          'payment-form-element',
          'width-phone'
        ],
        'data-return_url' => '',
        'data-stripe_public_key' => '',
        'data-client_secret' => ''
      ],
      
      // Conteneur où Stripe.js va injecter le Payment Element
      'payment_element_placeholder' => [
        '#markup' => '<div class="payment-element">Chargement encours ...</div>'
      ],
      // Affichage des messages d'erreur/succès de Stripe
      'payment_message' => [
        '#markup' => '<div class="hidden payment-message alert alert-danger border-radius-5 my-3"></div>'
      ],
      
      // Bouton de soumission masqué et stylisé pour Stripe (car la soumission
      // est gérée par JS avant l'envoi réel du formulaire Drupal)
      'submit_payment_button' => [
        '#type' => 'html_tag',
        '#tag' => 'span',
        '#attributes' => [
          'class' => [
            'submit-payment',
            'btn',
            'mt-5',
            'btn-wbu-secondary',
            'w-100',
            'border-radius-10',
            'fw-light',
            'btn-lg'
          ]
        ],
        [
          '#type' => 'html_tag',
          '#tag' => 'span',
          '#attributes' => [
            'class' => [
              'submit-payment'
            ]
          ],
          '#value' => 'kkkkkkkkkkkkkkk'
        ]
      ]
    ];
    
    $form['actions'] = [
      '#type' => 'actions',
      'submit' => [
        '#type' => 'submit',
        '#attributes' => [
          'class' => [
            'submit-payment',
            'btn',
            'mt-5',
            'btn-wbu-secondary',
            'w-100',
            'border-radius-10',
            'fw-light',
            'btn-lg',
            'd-none'
          ]
        ],
        '#value' => $this->t('Pay now : '),
        // C'est ici que l'AJAX est activé !
        '#ajax' => [
          // 'callback' est la méthode qui traitera la requête AJAX.
          'callback' => '::ajaxSubmitCallback',
          // 'wrapper' est l'ID de l'élément qui sera remplacé par le retour de
          // la callback.
          // C'est essentiel pour que Drupal sache quelle partie de la page
          // rafraîchir.
          'wrapper' => 'commerce_payment_simple_form-wrapper-id',
          'event' => 'click', // L'événement qui déclenche (par défaut: click)
          'progress' => [
            'type' => 'throbber', // Affiche un throbber/spinner pendant le
                                   // traitement
            'message' => $this->t('Traitement du paiement...')
          ]
        ]
      ]
    ];
    $form['#prefix'] = '<div id="commerce_payment_simple_form-wrapper-id">';
    $form['#suffix'] = '</div>';
    return $form;
  }
  
  /**
   * Gère la soumission du formulaire via AJAX.
   *
   * @param array $form
   *        Le tableau de formulaire.
   * @param \Drupal\Core\Form\FormStateInterface $form_state
   *        L'état du formulaire.
   *        
   * @return \Drupal\Core\Ajax\AjaxResponse Une réponse AJAX.
   */
  public function ajaxSubmitCallback(array &$form, FormStateInterface $form_state): AjaxResponse {
    $response = new AjaxResponse();
    
    // 1. GESTION DES MESSAGES (ERREURS/STATUS)
    // Le code suivant s'assure que les messages (s'ils existent) sont affichés.
    // Cette étape est cruciale pour le débogage et l'UX.
    $status_messages = [
      '#type' => 'status_messages'
    ];
    $response->addCommand(new ReplaceCommand('.form-item--messages', $status_messages));
    
    // 2. LOGIQUE DE REDIRECTION/MISE À JOUR
    if ($form_state->isSubmitted() && !$form_state->hasAnyErrors()) {
      // Le formulaire est valide, nous pouvons maintenant rediriger
      // l'utilisateur.
      
      // A. Méthode pour un formulaire non-Stripe (simple redirection) :
      // $url =
      // Url::fromRoute('commerce_payment_simple.payment_success')->toString();
      // $response->addCommand(new RedirectCommand($url));
      
      // B. Pour votre cas Stripe, le JS de Stripe va gérer la redirection
      // via l'URL de retour après la confirmation côté client.
      // La soumission AJAX ici signifie que la validation a réussi.
      // Vous pouvez renvoyer le formulaire mis à jour ou une confirmation.
      
      // Exemple : Afficher un message de succès et désactiver le formulaire.
      $success_markup = [
        '#markup' => $this->t('<div class="alert alert-success">Paiement initialisé avec succès. Veuillez suivre les instructions de votre banque.</div>')
      ];
      $response->addCommand(new ReplaceCommand('#commerce_payment_simple_form-wrapper-id', $success_markup));
    }
    else {
      // La validation a échoué.
      // On rafraîchit le formulaire pour afficher les messages d'erreur.
      // Le wrapper contient l'ID spécifié dans le #ajax['wrapper'].
      $response->addCommand(new ReplaceCommand('#commerce_payment_simple_form-wrapper-id', $form));
    }
    
    return $response;
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
