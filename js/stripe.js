/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/stripe.js
class StripePayement {
  constructor(container_tags) {
    this.container_tags = container_tags;
    this.stripe_public_key;
    this.client_secret;
    this.order_id;
    this.uid;
    this.stripe;
    this.return_url;
    this.elements;
    this.clientLanguage = "en";
    this.paymentElementReady = false;
    this.submitPayment;
  }
  //
  init() {
    if (!this.container_tags) throw new Error("L'identifiant de la zone de selection n'existe pas.");
    const elementWrapper = this.container_tags.querySelector(".payment-element-wrapper");
    this.stripe_public_key = elementWrapper.dataset.stripe_public_key;
    this.client_secret = elementWrapper.dataset.client_secret;
    this.return_url = elementWrapper.dataset.return_url;
    this.order_id = elementWrapper.dataset.order_id;
    this.uid = elementWrapper.dataset.uid;
    this.submitPayment = this.container_tags.querySelector(".submit-payment");
    this.clientLanguage = window.drupalSettings?.path?.currentLanguage && window.drupalSettings?.path?.currentLanguage != "" ? window.drupalSettings.path.currentLanguage : "en";
    // Vérifier si Stripe est disponible globalement
    if (!window.Stripe || typeof window.Stripe === "undefined") {
      this.showMessage("Erreur: La bibliothèque Stripe n'est pas chargée.");
      this.paymentIsBussy(false);
      return;
    }
    try {
      this.stripe = window.Stripe(this.stripe_public_key);
      this.elements = this.stripe.elements({
        clientSecret: this.client_secret,
        locale: this.clientLanguage
      });
      this.paymentIsBussy(true);
      const paymentElementOptions = {
        layout: "accordion",
        wallets: {
          link: "never" //Désactiver Link |'always'|'auto'|'never'
          // applePay: "never",
          // googlePay: "never",
        }
      };
      const paymentElement = this.elements.create("payment", paymentElementOptions);
      // Écouter l'événement 'ready' qui est émis lorsque l'élément est chargé et affiché
      paymentElement.on("ready", () => {
        this.paymentElementReady = true;
        this.paymentIsBussy(false);
      });
      paymentElement.mount(this.container_tags.querySelector(".payment-element"));
      if (this.submitPayment) {
        this.submitPayment.addEventListener("click", event => {
          this.proccedPayment(event);
        });
      }
    } catch (error) {
      this.showMessage("Erreur lors de l'initialisation de Stripe: " + error.message);
      this.paymentIsBussy(false);
    }
  }
  //
  proccedPayment(e) {
    e.preventDefault();
    if (!this.paymentElementReady) {
      return;
    }
    if (!this.stripe) {
      this.showMessage("Erreur: Le système de paiement n'est pas initialisé correctement.");
      return;
    }
    if (!this.elements) {
      this.showMessage("Erreur: Les éléments de paiement ne sont pas configurés.");
      return;
    }
    const firstname = this.container_tags.querySelector(".form-item-name-firstname input");
    if (!firstname || firstname && firstname.value == "") {
      console.log("firstname.value : ", firstname);
      this.showMessage("Le nom est requis");
      return;
    }
    const email = this.container_tags.querySelector(".form-item-email input");
    if (!email || email && email.value == "") {
      this.showMessage("L'email est requis");
      return;
    }
    this.paymentIsBussy(true);
    this.stripe.confirmPayment({
      elements: this.elements,
      confirmParams: {
        return_url: this.return_url,
        payment_method_data: {
          billing_details: {
            name: firstname.value,
            email: email.value
          }
        }
      },
      metadata: {
        customer_id: this.uid,
        order_id: this.order_id
      }
    }).then(result => {
      console.log("result : ", result);
      console.log("result.error : ", result.error);
      this.showMessage(result.error.message);
      this.paymentIsBussy(false);
    }).catch(error => {
      console.log("error : ", error);
      this.showMessage("Erreur lors du paiement: " + error.message);
      this.paymentIsBussy(false);
    });
  }
  showMessage(messageText) {
    const messageContainer = this.container_tags.querySelector(".payment-message");
    messageContainer.classList.remove("hidden");
    messageContainer.textContent = messageText;
    setTimeout(function () {
      messageContainer.classList.add("hidden");
      messageContainer.textContent = "";
    }, 15000);
  }
  paymentIsBussy(status) {
    if (status) {
      this.submitPayment.classList.add("loading", "disabled");
    } else {
      this.submitPayment.classList.remove("loading", "disabled");
    }
  }
}
/* harmony default export */ const stripe = (StripePayement);
;// CONCATENATED MODULE: ./src/js/stripe-drupal.js


//
(function (Drupal) {
  Drupal.behaviors.myModuleBehavior = {
    attach: function (context, settings) {
      const payments = once("commerce_payment_simple-elements", ".payment-form-element", context);
      if (payments.length > 0) {
        payments.forEach(payment => {
          const HBK = new stripe(payment);
          HBK.init();
        });
      }
    }
  };
  //
})(Drupal);
/******/ })()
;