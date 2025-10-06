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
    this.stripe;
    this.return_url;
    this.elements;
  }
  //
  init() {
    if (!this.container_tags) throw new Error("L'identifiant de la zone de selection n'existe pas.");
    this.stripe_public_key = this.container_tags.dataset.stripe_public_key;
    this.client_secret = this.container_tags.dataset.client_secret;
    this.return_url = this.container_tags.dataset.return_url;
    // Vérifier si Stripe est disponible globalement
    if (!window.Stripe || typeof window.Stripe === "undefined") {
      this.showMessage("Erreur: La bibliothèque Stripe n'est pas chargée.");
      return;
    }
    // this.stripe = window.Stripe(this.stripe_public_key);
    // elements = this.stripe.elements({ clientSecret: this.client_secret });
    // const paymentElementOptions = {
    //     layout: "accordion",
    // };
    // const paymentElement = elements.create("payment", paymentElementOptions);
    // paymentElement.mount(this.container_tags.querySelector(".payment-element"));
    // //
    // const submitPayment = this.container_tags.querySelector(".submit-payment");
    // if (submitPayment) {
    //     submitPayment.addEventListener("click", (event) => {
    //         this.proccedPayment(event);
    //     });
    // }
    try {
      this.stripe = window.Stripe(this.stripe_public_key);
      this.elements = this.stripe.elements({
        clientSecret: this.client_secret
      });
      const paymentElementOptions = {
        layout: "accordion"
      };
      const paymentElement = this.elements.create("payment", paymentElementOptions);
      paymentElement.mount(this.container_tags.querySelector(".payment-element"));
      const submitPayment = this.container_tags.querySelector(".submit-payment");
      if (submitPayment) {
        submitPayment.addEventListener("click", event => {
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
    this.stripe.confirmPayment({
      elements: this.elements,
      confirmParams: {
        return_url: this.return_url
      }
    }).then(result => {
      console.log("result : ", result);
      console.log("result.error : ", result.error);
      this.showMessage(result.error.message);
    }).catch(error => {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ042QjtBQUVDO0FBQzlCO0FBQ0EsQ0FBQyxVQUFVMkMsTUFBTSxFQUFFO0VBQ2pCQSxNQUFNLENBQUNDLFNBQVMsQ0FBQ0MsZ0JBQWdCLEdBQUc7SUFDbENDLE1BQU0sRUFBRSxTQUFBQSxDQUFVQyxPQUFPLEVBQUVDLFFBQVEsRUFBRTtNQUNuQyxNQUFNQyxRQUFRLEdBQUdDLElBQUksQ0FBQyxrQ0FBa0MsRUFBRSx1QkFBdUIsRUFBRUgsT0FBTyxDQUFDO01BQzNGLElBQUlFLFFBQVEsQ0FBQ0UsTUFBTSxHQUFHLENBQUMsRUFBRTtRQUN2QkYsUUFBUSxDQUFDRyxPQUFPLENBQUVDLE9BQU8sSUFBSztVQUM1QixNQUFNQyxHQUFHLEdBQUcsSUFBSWpELCtDQUFNLENBQUNnRCxPQUFPLENBQUM7VUFDL0JDLEdBQUcsQ0FBQzlDLElBQUksQ0FBQyxDQUFDO1FBQ1osQ0FBQyxDQUFDO01BQ0o7SUFDRjtFQUNGLENBQUM7RUFDRDtBQUNGLENBQUMsRUFBRW1DLE1BQU0sQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vQHN0ZXBoYW5lODg4L3didS1hdG9taXF1ZS10aGVtZS8uL3NyYy9qcy9zdHJpcGUuanMiLCJ3ZWJwYWNrOi8vQHN0ZXBoYW5lODg4L3didS1hdG9taXF1ZS10aGVtZS8uL3NyYy9zY3NzL3N0cmlwZS5zY3NzPzZmNWQiLCJ3ZWJwYWNrOi8vQHN0ZXBoYW5lODg4L3didS1hdG9taXF1ZS10aGVtZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9Ac3RlcGhhbmU4ODgvd2J1LWF0b21pcXVlLXRoZW1lL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9Ac3RlcGhhbmU4ODgvd2J1LWF0b21pcXVlLXRoZW1lL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vQHN0ZXBoYW5lODg4L3didS1hdG9taXF1ZS10aGVtZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL0BzdGVwaGFuZTg4OC93YnUtYXRvbWlxdWUtdGhlbWUvLi9zcmMvanMvc3RyaXBlLWRydXBhbC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBTdHJpcGVQYXllbWVudCB7XG4gIGNvbnN0cnVjdG9yKGNvbnRhaW5lcl90YWdzKSB7XG4gICAgdGhpcy5jb250YWluZXJfdGFncyA9IGNvbnRhaW5lcl90YWdzO1xuICAgIHRoaXMuc3RyaXBlX3B1YmxpY19rZXk7XG4gICAgdGhpcy5jbGllbnRfc2VjcmV0O1xuICAgIHRoaXMuc3RyaXBlO1xuICAgIHRoaXMucmV0dXJuX3VybDtcbiAgICB0aGlzLmVsZW1lbnRzO1xuICB9XG4gIC8vXG4gIGluaXQoKSB7XG4gICAgaWYgKCF0aGlzLmNvbnRhaW5lcl90YWdzKSB0aHJvdyBuZXcgRXJyb3IoXCJMJ2lkZW50aWZpYW50IGRlIGxhIHpvbmUgZGUgc2VsZWN0aW9uIG4nZXhpc3RlIHBhcy5cIik7XG4gICAgdGhpcy5zdHJpcGVfcHVibGljX2tleSA9IHRoaXMuY29udGFpbmVyX3RhZ3MuZGF0YXNldC5zdHJpcGVfcHVibGljX2tleTtcbiAgICB0aGlzLmNsaWVudF9zZWNyZXQgPSB0aGlzLmNvbnRhaW5lcl90YWdzLmRhdGFzZXQuY2xpZW50X3NlY3JldDtcbiAgICB0aGlzLnJldHVybl91cmwgPSB0aGlzLmNvbnRhaW5lcl90YWdzLmRhdGFzZXQucmV0dXJuX3VybDtcbiAgICAvLyBWw6lyaWZpZXIgc2kgU3RyaXBlIGVzdCBkaXNwb25pYmxlIGdsb2JhbGVtZW50XG4gICAgaWYgKCF3aW5kb3cuU3RyaXBlIHx8IHR5cGVvZiB3aW5kb3cuU3RyaXBlID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICB0aGlzLnNob3dNZXNzYWdlKFwiRXJyZXVyOiBMYSBiaWJsaW90aMOocXVlIFN0cmlwZSBuJ2VzdCBwYXMgY2hhcmfDqWUuXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyB0aGlzLnN0cmlwZSA9IHdpbmRvdy5TdHJpcGUodGhpcy5zdHJpcGVfcHVibGljX2tleSk7XG4gICAgLy8gZWxlbWVudHMgPSB0aGlzLnN0cmlwZS5lbGVtZW50cyh7IGNsaWVudFNlY3JldDogdGhpcy5jbGllbnRfc2VjcmV0IH0pO1xuICAgIC8vIGNvbnN0IHBheW1lbnRFbGVtZW50T3B0aW9ucyA9IHtcbiAgICAvLyAgICAgbGF5b3V0OiBcImFjY29yZGlvblwiLFxuICAgIC8vIH07XG4gICAgLy8gY29uc3QgcGF5bWVudEVsZW1lbnQgPSBlbGVtZW50cy5jcmVhdGUoXCJwYXltZW50XCIsIHBheW1lbnRFbGVtZW50T3B0aW9ucyk7XG4gICAgLy8gcGF5bWVudEVsZW1lbnQubW91bnQodGhpcy5jb250YWluZXJfdGFncy5xdWVyeVNlbGVjdG9yKFwiLnBheW1lbnQtZWxlbWVudFwiKSk7XG4gICAgLy8gLy9cbiAgICAvLyBjb25zdCBzdWJtaXRQYXltZW50ID0gdGhpcy5jb250YWluZXJfdGFncy5xdWVyeVNlbGVjdG9yKFwiLnN1Ym1pdC1wYXltZW50XCIpO1xuICAgIC8vIGlmIChzdWJtaXRQYXltZW50KSB7XG4gICAgLy8gICAgIHN1Ym1pdFBheW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICAgIC8vICAgICAgICAgdGhpcy5wcm9jY2VkUGF5bWVudChldmVudCk7XG4gICAgLy8gICAgIH0pO1xuICAgIC8vIH1cbiAgICB0cnkge1xuICAgICAgdGhpcy5zdHJpcGUgPSB3aW5kb3cuU3RyaXBlKHRoaXMuc3RyaXBlX3B1YmxpY19rZXkpO1xuICAgICAgdGhpcy5lbGVtZW50cyA9IHRoaXMuc3RyaXBlLmVsZW1lbnRzKHsgY2xpZW50U2VjcmV0OiB0aGlzLmNsaWVudF9zZWNyZXQgfSk7XG5cbiAgICAgIGNvbnN0IHBheW1lbnRFbGVtZW50T3B0aW9ucyA9IHtcbiAgICAgICAgbGF5b3V0OiBcImFjY29yZGlvblwiLFxuICAgICAgfTtcbiAgICAgIGNvbnN0IHBheW1lbnRFbGVtZW50ID0gdGhpcy5lbGVtZW50cy5jcmVhdGUoXCJwYXltZW50XCIsIHBheW1lbnRFbGVtZW50T3B0aW9ucyk7XG4gICAgICBwYXltZW50RWxlbWVudC5tb3VudCh0aGlzLmNvbnRhaW5lcl90YWdzLnF1ZXJ5U2VsZWN0b3IoXCIucGF5bWVudC1lbGVtZW50XCIpKTtcblxuICAgICAgY29uc3Qgc3VibWl0UGF5bWVudCA9IHRoaXMuY29udGFpbmVyX3RhZ3MucXVlcnlTZWxlY3RvcihcIi5zdWJtaXQtcGF5bWVudFwiKTtcbiAgICAgIGlmIChzdWJtaXRQYXltZW50KSB7XG4gICAgICAgIHN1Ym1pdFBheW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4ge1xuICAgICAgICAgIHRoaXMucHJvY2NlZFBheW1lbnQoZXZlbnQpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgdGhpcy5zaG93TWVzc2FnZShcIkVycmV1ciBsb3JzIGRlIGwnaW5pdGlhbGlzYXRpb24gZGUgU3RyaXBlOiBcIiArIGVycm9yLm1lc3NhZ2UpO1xuICAgIH1cbiAgfVxuICAvL1xuICBwcm9jY2VkUGF5bWVudChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGlmICghdGhpcy5zdHJpcGUpIHtcbiAgICAgIHRoaXMuc2hvd01lc3NhZ2UoXCJFcnJldXI6IExlIHN5c3TDqG1lIGRlIHBhaWVtZW50IG4nZXN0IHBhcyBpbml0aWFsaXPDqSBjb3JyZWN0ZW1lbnQuXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIXRoaXMuZWxlbWVudHMpIHtcbiAgICAgIHRoaXMuc2hvd01lc3NhZ2UoXCJFcnJldXI6IExlcyDDqWzDqW1lbnRzIGRlIHBhaWVtZW50IG5lIHNvbnQgcGFzIGNvbmZpZ3Vyw6lzLlwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5zdHJpcGVcbiAgICAgIC5jb25maXJtUGF5bWVudCh7XG4gICAgICAgIGVsZW1lbnRzOiB0aGlzLmVsZW1lbnRzLFxuICAgICAgICBjb25maXJtUGFyYW1zOiB7XG4gICAgICAgICAgcmV0dXJuX3VybDogdGhpcy5yZXR1cm5fdXJsLFxuICAgICAgICB9LFxuICAgICAgfSlcbiAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJyZXN1bHQgOiBcIiwgcmVzdWx0KTtcbiAgICAgICAgY29uc29sZS5sb2coXCJyZXN1bHQuZXJyb3IgOiBcIiwgcmVzdWx0LmVycm9yKTtcbiAgICAgICAgdGhpcy5zaG93TWVzc2FnZShyZXN1bHQuZXJyb3IubWVzc2FnZSk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcImVycm9yIDogXCIsIGVycm9yKTtcbiAgICAgICAgdGhpcy5zaG93TWVzc2FnZShcIkVycmV1ciBsb3JzIGR1IHBhaWVtZW50OiBcIiArIGVycm9yLm1lc3NhZ2UpO1xuICAgICAgfSk7XG4gIH1cbiAgc2hvd01lc3NhZ2UobWVzc2FnZVRleHQpIHtcbiAgICBjb25zdCBtZXNzYWdlQ29udGFpbmVyID0gdGhpcy5jb250YWluZXJfdGFncy5xdWVyeVNlbGVjdG9yKFwiLnBheW1lbnQtbWVzc2FnZVwiKTtcbiAgICBtZXNzYWdlQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gICAgbWVzc2FnZUNvbnRhaW5lci50ZXh0Q29udGVudCA9IG1lc3NhZ2VUZXh0O1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgbWVzc2FnZUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgICAgbWVzc2FnZUNvbnRhaW5lci50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgfSwgMTUwMDApO1xuICB9XG59XG5leHBvcnQgZGVmYXVsdCBTdHJpcGVQYXllbWVudDtcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFwiLi4vc2Nzcy9zdHJpcGUuc2Nzc1wiO1xuXG5pbXBvcnQgc3RyaXBlIGZyb20gXCIuL3N0cmlwZVwiO1xuLy9cbihmdW5jdGlvbiAoRHJ1cGFsKSB7XG4gIERydXBhbC5iZWhhdmlvcnMubXlNb2R1bGVCZWhhdmlvciA9IHtcbiAgICBhdHRhY2g6IGZ1bmN0aW9uIChjb250ZXh0LCBzZXR0aW5ncykge1xuICAgICAgY29uc3QgcGF5bWVudHMgPSBvbmNlKFwiY29tbWVyY2VfcGF5bWVudF9zaW1wbGUtZWxlbWVudHNcIiwgXCIucGF5bWVudC1mb3JtLWVsZW1lbnRcIiwgY29udGV4dCk7XG4gICAgICBpZiAocGF5bWVudHMubGVuZ3RoID4gMCkge1xuICAgICAgICBwYXltZW50cy5mb3JFYWNoKChwYXltZW50KSA9PiB7XG4gICAgICAgICAgY29uc3QgSEJLID0gbmV3IHN0cmlwZShwYXltZW50KTtcbiAgICAgICAgICBIQksuaW5pdCgpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9LFxuICB9O1xuICAvL1xufSkoRHJ1cGFsKTtcbiJdLCJuYW1lcyI6WyJTdHJpcGVQYXllbWVudCIsImNvbnN0cnVjdG9yIiwiY29udGFpbmVyX3RhZ3MiLCJzdHJpcGVfcHVibGljX2tleSIsImNsaWVudF9zZWNyZXQiLCJzdHJpcGUiLCJyZXR1cm5fdXJsIiwiZWxlbWVudHMiLCJpbml0IiwiRXJyb3IiLCJkYXRhc2V0Iiwid2luZG93IiwiU3RyaXBlIiwic2hvd01lc3NhZ2UiLCJjbGllbnRTZWNyZXQiLCJwYXltZW50RWxlbWVudE9wdGlvbnMiLCJsYXlvdXQiLCJwYXltZW50RWxlbWVudCIsImNyZWF0ZSIsIm1vdW50IiwicXVlcnlTZWxlY3RvciIsInN1Ym1pdFBheW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJwcm9jY2VkUGF5bWVudCIsImVycm9yIiwibWVzc2FnZSIsImUiLCJwcmV2ZW50RGVmYXVsdCIsImNvbmZpcm1QYXltZW50IiwiY29uZmlybVBhcmFtcyIsInRoZW4iLCJyZXN1bHQiLCJjb25zb2xlIiwibG9nIiwiY2F0Y2giLCJtZXNzYWdlVGV4dCIsIm1lc3NhZ2VDb250YWluZXIiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJ0ZXh0Q29udGVudCIsInNldFRpbWVvdXQiLCJhZGQiLCJEcnVwYWwiLCJiZWhhdmlvcnMiLCJteU1vZHVsZUJlaGF2aW9yIiwiYXR0YWNoIiwiY29udGV4dCIsInNldHRpbmdzIiwicGF5bWVudHMiLCJvbmNlIiwibGVuZ3RoIiwiZm9yRWFjaCIsInBheW1lbnQiLCJIQksiXSwic291cmNlUm9vdCI6IiJ9