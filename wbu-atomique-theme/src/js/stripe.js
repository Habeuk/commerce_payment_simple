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
    // Vérifier si Stripe est disponible globalement
    if (!window.Stripe || typeof window.Stripe === "undefined") {
      this.showMessage("Erreur: La bibliothèque Stripe n'est pas chargée.");
      return;
    }

    try {
      this.stripe = window.Stripe(this.stripe_public_key);
      this.elements = this.stripe.elements({ clientSecret: this.client_secret });

      const paymentElementOptions = {
        layout: "accordion",
      };
      const paymentElement = this.elements.create("payment", paymentElementOptions);
      paymentElement.mount(this.container_tags.querySelector(".payment-element"));

      const submitPayment = this.container_tags.querySelector(".submit-payment");
      if (submitPayment) {
        submitPayment.addEventListener("click", (event) => {
          this.proccedPayment(event);
        });
      }
    } catch (error) {
      this.showMessage("Erreur lors de l'initialisation de Stripe: " + error.message);
    }
  }
  //
  proccedPayment(e) {
    e.preventDefault();
    if (!this.stripe) {
      this.showMessage("Erreur: Le système de paiement n'est pas initialisé correctement.");
      return;
    }
    if (!this.elements) {
      this.showMessage("Erreur: Les éléments de paiement ne sont pas configurés.");
      return;
    }
    const firstname = this.container_tags.querySelector(".form-item-name-firstname input");
    if (!firstname || (firstname && firstname.value == "")) {
      console.log("firstname.value : ", firstname);
      this.showMessage("Le nom est requis");
      return;
    }
    const email = this.container_tags.querySelector(".form-item-email input");
    if (!email || (email && email.value == "")) {
      this.showMessage("L'email est requis");
      return;
    }

    this.stripe
      .confirmPayment({
        elements: this.elements,
        confirmParams: {
          return_url: this.return_url,
          payment_method_data: {
            billing_details: {
              name: firstname.value,
              email: email.value,
            },
          },
        },
        metadata: {
          customer_id: this.uid,
          order_id: this.order_id,
        },
      })
      .then((result) => {
        console.log("result : ", result);
        console.log("result.error : ", result.error);
        this.showMessage(result.error.message);
      })
      .catch((error) => {
        console.log("error : ", error);
        this.showMessage("Erreur lors du paiement: " + error.message);
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
}
export default StripePayement;
