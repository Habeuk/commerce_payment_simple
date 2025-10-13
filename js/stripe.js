/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/stripe.js":
/*!**************************!*\
  !*** ./src/js/stripe.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (StripePayement);

/***/ }),

/***/ "./src/scss/stripe.scss":
/*!******************************!*\
  !*** ./src/scss/stripe.scss ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************************!*\
  !*** ./src/js/stripe-drupal.js ***!
  \*********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_stripe_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scss/stripe.scss */ "./src/scss/stripe.scss");
/* harmony import */ var _stripe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stripe */ "./src/js/stripe.js");


//
(function (Drupal) {
  Drupal.behaviors.myModuleBehavior = {
    attach: function (context, settings) {
      const payments = once("commerce_payment_simple-elements", ".payment-form-element", context);
      if (payments.length > 0) {
        payments.forEach(payment => {
          const HBK = new _stripe__WEBPACK_IMPORTED_MODULE_1__["default"](payment);
          HBK.init();
        });
      }
    }
  };
  //
})(Drupal);
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTjZCO0FBRUM7QUFDOUI7QUFDQSxDQUFDLFVBQVVpRSxNQUFNLEVBQUU7RUFDakJBLE1BQU0sQ0FBQ0MsU0FBUyxDQUFDQyxnQkFBZ0IsR0FBRztJQUNsQ0MsTUFBTSxFQUFFLFNBQUFBLENBQVVDLE9BQU8sRUFBRUMsUUFBUSxFQUFFO01BQ25DLE1BQU1DLFFBQVEsR0FBR0MsSUFBSSxDQUFDLGtDQUFrQyxFQUFFLHVCQUF1QixFQUFFSCxPQUFPLENBQUM7TUFDM0YsSUFBSUUsUUFBUSxDQUFDRSxNQUFNLEdBQUcsQ0FBQyxFQUFFO1FBQ3ZCRixRQUFRLENBQUNHLE9BQU8sQ0FBRUMsT0FBTyxJQUFLO1VBQzVCLE1BQU1DLEdBQUcsR0FBRyxJQUFJckUsK0NBQU0sQ0FBQ29FLE9BQU8sQ0FBQztVQUMvQkMsR0FBRyxDQUFDL0QsSUFBSSxDQUFDLENBQUM7UUFDWixDQUFDLENBQUM7TUFDSjtJQUNGO0VBQ0YsQ0FBQztFQUNEO0FBQ0YsQ0FBQyxFQUFFb0QsTUFBTSxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9Ac3RlcGhhbmU4ODgvd2J1LWF0b21pcXVlLXRoZW1lLy4vc3JjL2pzL3N0cmlwZS5qcyIsIndlYnBhY2s6Ly9Ac3RlcGhhbmU4ODgvd2J1LWF0b21pcXVlLXRoZW1lLy4vc3JjL3Njc3Mvc3RyaXBlLnNjc3MiLCJ3ZWJwYWNrOi8vQHN0ZXBoYW5lODg4L3didS1hdG9taXF1ZS10aGVtZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9Ac3RlcGhhbmU4ODgvd2J1LWF0b21pcXVlLXRoZW1lL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9Ac3RlcGhhbmU4ODgvd2J1LWF0b21pcXVlLXRoZW1lL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vQHN0ZXBoYW5lODg4L3didS1hdG9taXF1ZS10aGVtZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL0BzdGVwaGFuZTg4OC93YnUtYXRvbWlxdWUtdGhlbWUvLi9zcmMvanMvc3RyaXBlLWRydXBhbC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBTdHJpcGVQYXllbWVudCB7XG4gIGNvbnN0cnVjdG9yKGNvbnRhaW5lcl90YWdzKSB7XG4gICAgdGhpcy5jb250YWluZXJfdGFncyA9IGNvbnRhaW5lcl90YWdzO1xuICAgIHRoaXMuc3RyaXBlX3B1YmxpY19rZXk7XG4gICAgdGhpcy5jbGllbnRfc2VjcmV0O1xuICAgIHRoaXMub3JkZXJfaWQ7XG4gICAgdGhpcy51aWQ7XG4gICAgdGhpcy5zdHJpcGU7XG4gICAgdGhpcy5yZXR1cm5fdXJsO1xuICAgIHRoaXMuZWxlbWVudHM7XG4gICAgdGhpcy5jbGllbnRMYW5ndWFnZSA9IFwiZW5cIjtcbiAgICB0aGlzLnBheW1lbnRFbGVtZW50UmVhZHkgPSBmYWxzZTtcbiAgICB0aGlzLnN1Ym1pdFBheW1lbnQ7XG4gIH1cbiAgLy9cbiAgaW5pdCgpIHtcbiAgICBpZiAoIXRoaXMuY29udGFpbmVyX3RhZ3MpIHRocm93IG5ldyBFcnJvcihcIkwnaWRlbnRpZmlhbnQgZGUgbGEgem9uZSBkZSBzZWxlY3Rpb24gbidleGlzdGUgcGFzLlwiKTtcbiAgICBjb25zdCBlbGVtZW50V3JhcHBlciA9IHRoaXMuY29udGFpbmVyX3RhZ3MucXVlcnlTZWxlY3RvcihcIi5wYXltZW50LWVsZW1lbnQtd3JhcHBlclwiKTtcbiAgICB0aGlzLnN0cmlwZV9wdWJsaWNfa2V5ID0gZWxlbWVudFdyYXBwZXIuZGF0YXNldC5zdHJpcGVfcHVibGljX2tleTtcbiAgICB0aGlzLmNsaWVudF9zZWNyZXQgPSBlbGVtZW50V3JhcHBlci5kYXRhc2V0LmNsaWVudF9zZWNyZXQ7XG4gICAgdGhpcy5yZXR1cm5fdXJsID0gZWxlbWVudFdyYXBwZXIuZGF0YXNldC5yZXR1cm5fdXJsO1xuICAgIHRoaXMub3JkZXJfaWQgPSBlbGVtZW50V3JhcHBlci5kYXRhc2V0Lm9yZGVyX2lkO1xuICAgIHRoaXMudWlkID0gZWxlbWVudFdyYXBwZXIuZGF0YXNldC51aWQ7XG4gICAgdGhpcy5zdWJtaXRQYXltZW50ID0gdGhpcy5jb250YWluZXJfdGFncy5xdWVyeVNlbGVjdG9yKFwiLnN1Ym1pdC1wYXltZW50XCIpO1xuICAgIHRoaXMuY2xpZW50TGFuZ3VhZ2UgPSB3aW5kb3cuZHJ1cGFsU2V0dGluZ3M/LnBhdGg/LmN1cnJlbnRMYW5ndWFnZSAmJiB3aW5kb3cuZHJ1cGFsU2V0dGluZ3M/LnBhdGg/LmN1cnJlbnRMYW5ndWFnZSAhPSBcIlwiID8gd2luZG93LmRydXBhbFNldHRpbmdzLnBhdGguY3VycmVudExhbmd1YWdlIDogXCJlblwiO1xuICAgIC8vIFbDqXJpZmllciBzaSBTdHJpcGUgZXN0IGRpc3BvbmlibGUgZ2xvYmFsZW1lbnRcbiAgICBpZiAoIXdpbmRvdy5TdHJpcGUgfHwgdHlwZW9mIHdpbmRvdy5TdHJpcGUgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgIHRoaXMuc2hvd01lc3NhZ2UoXCJFcnJldXI6IExhIGJpYmxpb3Row6hxdWUgU3RyaXBlIG4nZXN0IHBhcyBjaGFyZ8OpZS5cIik7XG4gICAgICB0aGlzLnBheW1lbnRJc0J1c3N5KGZhbHNlKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuc3RyaXBlID0gd2luZG93LlN0cmlwZSh0aGlzLnN0cmlwZV9wdWJsaWNfa2V5KTtcbiAgICAgIHRoaXMuZWxlbWVudHMgPSB0aGlzLnN0cmlwZS5lbGVtZW50cyh7IGNsaWVudFNlY3JldDogdGhpcy5jbGllbnRfc2VjcmV0LCBsb2NhbGU6IHRoaXMuY2xpZW50TGFuZ3VhZ2UgfSk7XG4gICAgICB0aGlzLnBheW1lbnRJc0J1c3N5KHRydWUpO1xuICAgICAgY29uc3QgcGF5bWVudEVsZW1lbnRPcHRpb25zID0ge1xuICAgICAgICBsYXlvdXQ6IFwiYWNjb3JkaW9uXCIsXG4gICAgICAgIHdhbGxldHM6IHtcbiAgICAgICAgICBsaW5rOiBcIm5ldmVyXCIsIC8vRMOpc2FjdGl2ZXIgTGluayB8J2Fsd2F5cyd8J2F1dG8nfCduZXZlcidcbiAgICAgICAgICAvLyBhcHBsZVBheTogXCJuZXZlclwiLFxuICAgICAgICAgIC8vIGdvb2dsZVBheTogXCJuZXZlclwiLFxuICAgICAgICB9LFxuICAgICAgfTtcbiAgICAgIGNvbnN0IHBheW1lbnRFbGVtZW50ID0gdGhpcy5lbGVtZW50cy5jcmVhdGUoXCJwYXltZW50XCIsIHBheW1lbnRFbGVtZW50T3B0aW9ucyk7XG4gICAgICAvLyDDiWNvdXRlciBsJ8OpdsOpbmVtZW50ICdyZWFkeScgcXVpIGVzdCDDqW1pcyBsb3JzcXVlIGwnw6lsw6ltZW50IGVzdCBjaGFyZ8OpIGV0IGFmZmljaMOpXG4gICAgICBwYXltZW50RWxlbWVudC5vbihcInJlYWR5XCIsICgpID0+IHtcbiAgICAgICAgdGhpcy5wYXltZW50RWxlbWVudFJlYWR5ID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5wYXltZW50SXNCdXNzeShmYWxzZSk7XG4gICAgICB9KTtcbiAgICAgIHBheW1lbnRFbGVtZW50Lm1vdW50KHRoaXMuY29udGFpbmVyX3RhZ3MucXVlcnlTZWxlY3RvcihcIi5wYXltZW50LWVsZW1lbnRcIikpO1xuICAgICAgaWYgKHRoaXMuc3VibWl0UGF5bWVudCkge1xuICAgICAgICB0aGlzLnN1Ym1pdFBheW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICAgICAgICAgIHRoaXMucHJvY2NlZFBheW1lbnQoZXZlbnQpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgdGhpcy5zaG93TWVzc2FnZShcIkVycmV1ciBsb3JzIGRlIGwnaW5pdGlhbGlzYXRpb24gZGUgU3RyaXBlOiBcIiArIGVycm9yLm1lc3NhZ2UpO1xuICAgICAgdGhpcy5wYXltZW50SXNCdXNzeShmYWxzZSk7XG4gICAgfVxuICB9XG4gIC8vXG4gIHByb2NjZWRQYXltZW50KGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgaWYgKCF0aGlzLnBheW1lbnRFbGVtZW50UmVhZHkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCF0aGlzLnN0cmlwZSkge1xuICAgICAgdGhpcy5zaG93TWVzc2FnZShcIkVycmV1cjogTGUgc3lzdMOobWUgZGUgcGFpZW1lbnQgbidlc3QgcGFzIGluaXRpYWxpc8OpIGNvcnJlY3RlbWVudC5cIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghdGhpcy5lbGVtZW50cykge1xuICAgICAgdGhpcy5zaG93TWVzc2FnZShcIkVycmV1cjogTGVzIMOpbMOpbWVudHMgZGUgcGFpZW1lbnQgbmUgc29udCBwYXMgY29uZmlndXLDqXMuXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBmaXJzdG5hbWUgPSB0aGlzLmNvbnRhaW5lcl90YWdzLnF1ZXJ5U2VsZWN0b3IoXCIuZm9ybS1pdGVtLW5hbWUtZmlyc3RuYW1lIGlucHV0XCIpO1xuICAgIGlmICghZmlyc3RuYW1lIHx8IChmaXJzdG5hbWUgJiYgZmlyc3RuYW1lLnZhbHVlID09IFwiXCIpKSB7XG4gICAgICBjb25zb2xlLmxvZyhcImZpcnN0bmFtZS52YWx1ZSA6IFwiLCBmaXJzdG5hbWUpO1xuICAgICAgdGhpcy5zaG93TWVzc2FnZShcIkxlIG5vbSBlc3QgcmVxdWlzXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBlbWFpbCA9IHRoaXMuY29udGFpbmVyX3RhZ3MucXVlcnlTZWxlY3RvcihcIi5mb3JtLWl0ZW0tZW1haWwgaW5wdXRcIik7XG4gICAgaWYgKCFlbWFpbCB8fCAoZW1haWwgJiYgZW1haWwudmFsdWUgPT0gXCJcIikpIHtcbiAgICAgIHRoaXMuc2hvd01lc3NhZ2UoXCJMJ2VtYWlsIGVzdCByZXF1aXNcIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMucGF5bWVudElzQnVzc3kodHJ1ZSk7XG4gICAgdGhpcy5zdHJpcGVcbiAgICAgIC5jb25maXJtUGF5bWVudCh7XG4gICAgICAgIGVsZW1lbnRzOiB0aGlzLmVsZW1lbnRzLFxuICAgICAgICBjb25maXJtUGFyYW1zOiB7XG4gICAgICAgICAgcmV0dXJuX3VybDogdGhpcy5yZXR1cm5fdXJsLFxuICAgICAgICAgIHBheW1lbnRfbWV0aG9kX2RhdGE6IHtcbiAgICAgICAgICAgIGJpbGxpbmdfZGV0YWlsczoge1xuICAgICAgICAgICAgICBuYW1lOiBmaXJzdG5hbWUudmFsdWUsXG4gICAgICAgICAgICAgIGVtYWlsOiBlbWFpbC52YWx1ZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgbWV0YWRhdGE6IHtcbiAgICAgICAgICBjdXN0b21lcl9pZDogdGhpcy51aWQsXG4gICAgICAgICAgb3JkZXJfaWQ6IHRoaXMub3JkZXJfaWQsXG4gICAgICAgIH0sXG4gICAgICB9KVxuICAgICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcInJlc3VsdCA6IFwiLCByZXN1bHQpO1xuICAgICAgICBjb25zb2xlLmxvZyhcInJlc3VsdC5lcnJvciA6IFwiLCByZXN1bHQuZXJyb3IpO1xuICAgICAgICB0aGlzLnNob3dNZXNzYWdlKHJlc3VsdC5lcnJvci5tZXNzYWdlKTtcbiAgICAgICAgdGhpcy5wYXltZW50SXNCdXNzeShmYWxzZSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcImVycm9yIDogXCIsIGVycm9yKTtcbiAgICAgICAgdGhpcy5zaG93TWVzc2FnZShcIkVycmV1ciBsb3JzIGR1IHBhaWVtZW50OiBcIiArIGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICB0aGlzLnBheW1lbnRJc0J1c3N5KGZhbHNlKTtcbiAgICAgIH0pO1xuICB9XG4gIHNob3dNZXNzYWdlKG1lc3NhZ2VUZXh0KSB7XG4gICAgY29uc3QgbWVzc2FnZUNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyX3RhZ3MucXVlcnlTZWxlY3RvcihcIi5wYXltZW50LW1lc3NhZ2VcIik7XG4gICAgbWVzc2FnZUNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICAgIG1lc3NhZ2VDb250YWluZXIudGV4dENvbnRlbnQgPSBtZXNzYWdlVGV4dDtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIG1lc3NhZ2VDb250YWluZXIuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgIG1lc3NhZ2VDb250YWluZXIudGV4dENvbnRlbnQgPSBcIlwiO1xuICAgIH0sIDE1MDAwKTtcbiAgfVxuICBwYXltZW50SXNCdXNzeShzdGF0dXMpIHtcbiAgICBpZiAoc3RhdHVzKSB7XG4gICAgICB0aGlzLnN1Ym1pdFBheW1lbnQuY2xhc3NMaXN0LmFkZChcImxvYWRpbmdcIiwgXCJkaXNhYmxlZFwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zdWJtaXRQYXltZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJsb2FkaW5nXCIsIFwiZGlzYWJsZWRcIik7XG4gICAgfVxuICB9XG59XG5leHBvcnQgZGVmYXVsdCBTdHJpcGVQYXllbWVudDtcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFwiLi4vc2Nzcy9zdHJpcGUuc2Nzc1wiO1xuXG5pbXBvcnQgc3RyaXBlIGZyb20gXCIuL3N0cmlwZVwiO1xuLy9cbihmdW5jdGlvbiAoRHJ1cGFsKSB7XG4gIERydXBhbC5iZWhhdmlvcnMubXlNb2R1bGVCZWhhdmlvciA9IHtcbiAgICBhdHRhY2g6IGZ1bmN0aW9uIChjb250ZXh0LCBzZXR0aW5ncykge1xuICAgICAgY29uc3QgcGF5bWVudHMgPSBvbmNlKFwiY29tbWVyY2VfcGF5bWVudF9zaW1wbGUtZWxlbWVudHNcIiwgXCIucGF5bWVudC1mb3JtLWVsZW1lbnRcIiwgY29udGV4dCk7XG4gICAgICBpZiAocGF5bWVudHMubGVuZ3RoID4gMCkge1xuICAgICAgICBwYXltZW50cy5mb3JFYWNoKChwYXltZW50KSA9PiB7XG4gICAgICAgICAgY29uc3QgSEJLID0gbmV3IHN0cmlwZShwYXltZW50KTtcbiAgICAgICAgICBIQksuaW5pdCgpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9LFxuICB9O1xuICAvL1xufSkoRHJ1cGFsKTtcbiJdLCJuYW1lcyI6WyJTdHJpcGVQYXllbWVudCIsImNvbnN0cnVjdG9yIiwiY29udGFpbmVyX3RhZ3MiLCJzdHJpcGVfcHVibGljX2tleSIsImNsaWVudF9zZWNyZXQiLCJvcmRlcl9pZCIsInVpZCIsInN0cmlwZSIsInJldHVybl91cmwiLCJlbGVtZW50cyIsImNsaWVudExhbmd1YWdlIiwicGF5bWVudEVsZW1lbnRSZWFkeSIsInN1Ym1pdFBheW1lbnQiLCJpbml0IiwiRXJyb3IiLCJlbGVtZW50V3JhcHBlciIsInF1ZXJ5U2VsZWN0b3IiLCJkYXRhc2V0Iiwid2luZG93IiwiZHJ1cGFsU2V0dGluZ3MiLCJwYXRoIiwiY3VycmVudExhbmd1YWdlIiwiU3RyaXBlIiwic2hvd01lc3NhZ2UiLCJwYXltZW50SXNCdXNzeSIsImNsaWVudFNlY3JldCIsImxvY2FsZSIsInBheW1lbnRFbGVtZW50T3B0aW9ucyIsImxheW91dCIsIndhbGxldHMiLCJsaW5rIiwicGF5bWVudEVsZW1lbnQiLCJjcmVhdGUiLCJvbiIsIm1vdW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50IiwicHJvY2NlZFBheW1lbnQiLCJlcnJvciIsIm1lc3NhZ2UiLCJlIiwicHJldmVudERlZmF1bHQiLCJmaXJzdG5hbWUiLCJ2YWx1ZSIsImNvbnNvbGUiLCJsb2ciLCJlbWFpbCIsImNvbmZpcm1QYXltZW50IiwiY29uZmlybVBhcmFtcyIsInBheW1lbnRfbWV0aG9kX2RhdGEiLCJiaWxsaW5nX2RldGFpbHMiLCJuYW1lIiwibWV0YWRhdGEiLCJjdXN0b21lcl9pZCIsInRoZW4iLCJyZXN1bHQiLCJjYXRjaCIsIm1lc3NhZ2VUZXh0IiwibWVzc2FnZUNvbnRhaW5lciIsImNsYXNzTGlzdCIsInJlbW92ZSIsInRleHRDb250ZW50Iiwic2V0VGltZW91dCIsImFkZCIsInN0YXR1cyIsIkRydXBhbCIsImJlaGF2aW9ycyIsIm15TW9kdWxlQmVoYXZpb3IiLCJhdHRhY2giLCJjb250ZXh0Iiwic2V0dGluZ3MiLCJwYXltZW50cyIsIm9uY2UiLCJsZW5ndGgiLCJmb3JFYWNoIiwicGF5bWVudCIsIkhCSyJdLCJzb3VyY2VSb290IjoiIn0=