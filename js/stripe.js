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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ042QjtBQUVDO0FBQzlCO0FBQ0EsQ0FBQyxVQUFVMkMsTUFBTSxFQUFFO0VBQ2pCQSxNQUFNLENBQUNDLFNBQVMsQ0FBQ0MsZ0JBQWdCLEdBQUc7SUFDbENDLE1BQU0sRUFBRSxTQUFBQSxDQUFVQyxPQUFPLEVBQUVDLFFBQVEsRUFBRTtNQUNuQyxNQUFNQyxRQUFRLEdBQUdDLElBQUksQ0FBQyxrQ0FBa0MsRUFBRSx1QkFBdUIsRUFBRUgsT0FBTyxDQUFDO01BQzNGLElBQUlFLFFBQVEsQ0FBQ0UsTUFBTSxHQUFHLENBQUMsRUFBRTtRQUN2QkYsUUFBUSxDQUFDRyxPQUFPLENBQUVDLE9BQU8sSUFBSztVQUM1QixNQUFNQyxHQUFHLEdBQUcsSUFBSWpELCtDQUFNLENBQUNnRCxPQUFPLENBQUM7VUFDL0JDLEdBQUcsQ0FBQzlDLElBQUksQ0FBQyxDQUFDO1FBQ1osQ0FBQyxDQUFDO01BQ0o7SUFDRjtFQUNGLENBQUM7RUFDRDtBQUNGLENBQUMsRUFBRW1DLE1BQU0sQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vQHN0ZXBoYW5lODg4L3didS1hdG9taXF1ZS10aGVtZS8uL3NyYy9qcy9zdHJpcGUuanMiLCJ3ZWJwYWNrOi8vQHN0ZXBoYW5lODg4L3didS1hdG9taXF1ZS10aGVtZS8uL3NyYy9zY3NzL3N0cmlwZS5zY3NzIiwid2VicGFjazovL0BzdGVwaGFuZTg4OC93YnUtYXRvbWlxdWUtdGhlbWUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vQHN0ZXBoYW5lODg4L3didS1hdG9taXF1ZS10aGVtZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vQHN0ZXBoYW5lODg4L3didS1hdG9taXF1ZS10aGVtZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL0BzdGVwaGFuZTg4OC93YnUtYXRvbWlxdWUtdGhlbWUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9Ac3RlcGhhbmU4ODgvd2J1LWF0b21pcXVlLXRoZW1lLy4vc3JjL2pzL3N0cmlwZS1kcnVwYWwuanMiXSwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgU3RyaXBlUGF5ZW1lbnQge1xuICBjb25zdHJ1Y3Rvcihjb250YWluZXJfdGFncykge1xuICAgIHRoaXMuY29udGFpbmVyX3RhZ3MgPSBjb250YWluZXJfdGFncztcbiAgICB0aGlzLnN0cmlwZV9wdWJsaWNfa2V5O1xuICAgIHRoaXMuY2xpZW50X3NlY3JldDtcbiAgICB0aGlzLnN0cmlwZTtcbiAgICB0aGlzLnJldHVybl91cmw7XG4gICAgdGhpcy5lbGVtZW50cztcbiAgfVxuICAvL1xuICBpbml0KCkge1xuICAgIGlmICghdGhpcy5jb250YWluZXJfdGFncykgdGhyb3cgbmV3IEVycm9yKFwiTCdpZGVudGlmaWFudCBkZSBsYSB6b25lIGRlIHNlbGVjdGlvbiBuJ2V4aXN0ZSBwYXMuXCIpO1xuICAgIHRoaXMuc3RyaXBlX3B1YmxpY19rZXkgPSB0aGlzLmNvbnRhaW5lcl90YWdzLmRhdGFzZXQuc3RyaXBlX3B1YmxpY19rZXk7XG4gICAgdGhpcy5jbGllbnRfc2VjcmV0ID0gdGhpcy5jb250YWluZXJfdGFncy5kYXRhc2V0LmNsaWVudF9zZWNyZXQ7XG4gICAgdGhpcy5yZXR1cm5fdXJsID0gdGhpcy5jb250YWluZXJfdGFncy5kYXRhc2V0LnJldHVybl91cmw7XG4gICAgLy8gVsOpcmlmaWVyIHNpIFN0cmlwZSBlc3QgZGlzcG9uaWJsZSBnbG9iYWxlbWVudFxuICAgIGlmICghd2luZG93LlN0cmlwZSB8fCB0eXBlb2Ygd2luZG93LlN0cmlwZSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgdGhpcy5zaG93TWVzc2FnZShcIkVycmV1cjogTGEgYmlibGlvdGjDqHF1ZSBTdHJpcGUgbidlc3QgcGFzIGNoYXJnw6llLlwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gdGhpcy5zdHJpcGUgPSB3aW5kb3cuU3RyaXBlKHRoaXMuc3RyaXBlX3B1YmxpY19rZXkpO1xuICAgIC8vIGVsZW1lbnRzID0gdGhpcy5zdHJpcGUuZWxlbWVudHMoeyBjbGllbnRTZWNyZXQ6IHRoaXMuY2xpZW50X3NlY3JldCB9KTtcbiAgICAvLyBjb25zdCBwYXltZW50RWxlbWVudE9wdGlvbnMgPSB7XG4gICAgLy8gICAgIGxheW91dDogXCJhY2NvcmRpb25cIixcbiAgICAvLyB9O1xuICAgIC8vIGNvbnN0IHBheW1lbnRFbGVtZW50ID0gZWxlbWVudHMuY3JlYXRlKFwicGF5bWVudFwiLCBwYXltZW50RWxlbWVudE9wdGlvbnMpO1xuICAgIC8vIHBheW1lbnRFbGVtZW50Lm1vdW50KHRoaXMuY29udGFpbmVyX3RhZ3MucXVlcnlTZWxlY3RvcihcIi5wYXltZW50LWVsZW1lbnRcIikpO1xuICAgIC8vIC8vXG4gICAgLy8gY29uc3Qgc3VibWl0UGF5bWVudCA9IHRoaXMuY29udGFpbmVyX3RhZ3MucXVlcnlTZWxlY3RvcihcIi5zdWJtaXQtcGF5bWVudFwiKTtcbiAgICAvLyBpZiAoc3VibWl0UGF5bWVudCkge1xuICAgIC8vICAgICBzdWJtaXRQYXltZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICAvLyAgICAgICAgIHRoaXMucHJvY2NlZFBheW1lbnQoZXZlbnQpO1xuICAgIC8vICAgICB9KTtcbiAgICAvLyB9XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuc3RyaXBlID0gd2luZG93LlN0cmlwZSh0aGlzLnN0cmlwZV9wdWJsaWNfa2V5KTtcbiAgICAgIHRoaXMuZWxlbWVudHMgPSB0aGlzLnN0cmlwZS5lbGVtZW50cyh7IGNsaWVudFNlY3JldDogdGhpcy5jbGllbnRfc2VjcmV0IH0pO1xuXG4gICAgICBjb25zdCBwYXltZW50RWxlbWVudE9wdGlvbnMgPSB7XG4gICAgICAgIGxheW91dDogXCJhY2NvcmRpb25cIixcbiAgICAgIH07XG4gICAgICBjb25zdCBwYXltZW50RWxlbWVudCA9IHRoaXMuZWxlbWVudHMuY3JlYXRlKFwicGF5bWVudFwiLCBwYXltZW50RWxlbWVudE9wdGlvbnMpO1xuICAgICAgcGF5bWVudEVsZW1lbnQubW91bnQodGhpcy5jb250YWluZXJfdGFncy5xdWVyeVNlbGVjdG9yKFwiLnBheW1lbnQtZWxlbWVudFwiKSk7XG5cbiAgICAgIGNvbnN0IHN1Ym1pdFBheW1lbnQgPSB0aGlzLmNvbnRhaW5lcl90YWdzLnF1ZXJ5U2VsZWN0b3IoXCIuc3VibWl0LXBheW1lbnRcIik7XG4gICAgICBpZiAoc3VibWl0UGF5bWVudCkge1xuICAgICAgICBzdWJtaXRQYXltZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICB0aGlzLnByb2NjZWRQYXltZW50KGV2ZW50KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHRoaXMuc2hvd01lc3NhZ2UoXCJFcnJldXIgbG9ycyBkZSBsJ2luaXRpYWxpc2F0aW9uIGRlIFN0cmlwZTogXCIgKyBlcnJvci5tZXNzYWdlKTtcbiAgICB9XG4gIH1cbiAgLy9cbiAgcHJvY2NlZFBheW1lbnQoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBpZiAoIXRoaXMuc3RyaXBlKSB7XG4gICAgICB0aGlzLnNob3dNZXNzYWdlKFwiRXJyZXVyOiBMZSBzeXN0w6htZSBkZSBwYWllbWVudCBuJ2VzdCBwYXMgaW5pdGlhbGlzw6kgY29ycmVjdGVtZW50LlwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCF0aGlzLmVsZW1lbnRzKSB7XG4gICAgICB0aGlzLnNob3dNZXNzYWdlKFwiRXJyZXVyOiBMZXMgw6lsw6ltZW50cyBkZSBwYWllbWVudCBuZSBzb250IHBhcyBjb25maWd1csOpcy5cIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuc3RyaXBlXG4gICAgICAuY29uZmlybVBheW1lbnQoe1xuICAgICAgICBlbGVtZW50czogdGhpcy5lbGVtZW50cyxcbiAgICAgICAgY29uZmlybVBhcmFtczoge1xuICAgICAgICAgIHJldHVybl91cmw6IHRoaXMucmV0dXJuX3VybCxcbiAgICAgICAgfSxcbiAgICAgIH0pXG4gICAgICAudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwicmVzdWx0IDogXCIsIHJlc3VsdCk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwicmVzdWx0LmVycm9yIDogXCIsIHJlc3VsdC5lcnJvcik7XG4gICAgICAgIHRoaXMuc2hvd01lc3NhZ2UocmVzdWx0LmVycm9yLm1lc3NhZ2UpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJlcnJvciA6IFwiLCBlcnJvcik7XG4gICAgICAgIHRoaXMuc2hvd01lc3NhZ2UoXCJFcnJldXIgbG9ycyBkdSBwYWllbWVudDogXCIgKyBlcnJvci5tZXNzYWdlKTtcbiAgICAgIH0pO1xuICB9XG4gIHNob3dNZXNzYWdlKG1lc3NhZ2VUZXh0KSB7XG4gICAgY29uc3QgbWVzc2FnZUNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyX3RhZ3MucXVlcnlTZWxlY3RvcihcIi5wYXltZW50LW1lc3NhZ2VcIik7XG4gICAgbWVzc2FnZUNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICAgIG1lc3NhZ2VDb250YWluZXIudGV4dENvbnRlbnQgPSBtZXNzYWdlVGV4dDtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIG1lc3NhZ2VDb250YWluZXIuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgIG1lc3NhZ2VDb250YWluZXIudGV4dENvbnRlbnQgPSBcIlwiO1xuICAgIH0sIDE1MDAwKTtcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgU3RyaXBlUGF5ZW1lbnQ7XG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBcIi4uL3Njc3Mvc3RyaXBlLnNjc3NcIjtcblxuaW1wb3J0IHN0cmlwZSBmcm9tIFwiLi9zdHJpcGVcIjtcbi8vXG4oZnVuY3Rpb24gKERydXBhbCkge1xuICBEcnVwYWwuYmVoYXZpb3JzLm15TW9kdWxlQmVoYXZpb3IgPSB7XG4gICAgYXR0YWNoOiBmdW5jdGlvbiAoY29udGV4dCwgc2V0dGluZ3MpIHtcbiAgICAgIGNvbnN0IHBheW1lbnRzID0gb25jZShcImNvbW1lcmNlX3BheW1lbnRfc2ltcGxlLWVsZW1lbnRzXCIsIFwiLnBheW1lbnQtZm9ybS1lbGVtZW50XCIsIGNvbnRleHQpO1xuICAgICAgaWYgKHBheW1lbnRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgcGF5bWVudHMuZm9yRWFjaCgocGF5bWVudCkgPT4ge1xuICAgICAgICAgIGNvbnN0IEhCSyA9IG5ldyBzdHJpcGUocGF5bWVudCk7XG4gICAgICAgICAgSEJLLmluaXQoKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSxcbiAgfTtcbiAgLy9cbn0pKERydXBhbCk7XG4iXSwibmFtZXMiOlsiU3RyaXBlUGF5ZW1lbnQiLCJjb25zdHJ1Y3RvciIsImNvbnRhaW5lcl90YWdzIiwic3RyaXBlX3B1YmxpY19rZXkiLCJjbGllbnRfc2VjcmV0Iiwic3RyaXBlIiwicmV0dXJuX3VybCIsImVsZW1lbnRzIiwiaW5pdCIsIkVycm9yIiwiZGF0YXNldCIsIndpbmRvdyIsIlN0cmlwZSIsInNob3dNZXNzYWdlIiwiY2xpZW50U2VjcmV0IiwicGF5bWVudEVsZW1lbnRPcHRpb25zIiwibGF5b3V0IiwicGF5bWVudEVsZW1lbnQiLCJjcmVhdGUiLCJtb3VudCIsInF1ZXJ5U2VsZWN0b3IiLCJzdWJtaXRQYXltZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50IiwicHJvY2NlZFBheW1lbnQiLCJlcnJvciIsIm1lc3NhZ2UiLCJlIiwicHJldmVudERlZmF1bHQiLCJjb25maXJtUGF5bWVudCIsImNvbmZpcm1QYXJhbXMiLCJ0aGVuIiwicmVzdWx0IiwiY29uc29sZSIsImxvZyIsImNhdGNoIiwibWVzc2FnZVRleHQiLCJtZXNzYWdlQ29udGFpbmVyIiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwidGV4dENvbnRlbnQiLCJzZXRUaW1lb3V0IiwiYWRkIiwiRHJ1cGFsIiwiYmVoYXZpb3JzIiwibXlNb2R1bGVCZWhhdmlvciIsImF0dGFjaCIsImNvbnRleHQiLCJzZXR0aW5ncyIsInBheW1lbnRzIiwib25jZSIsImxlbmd0aCIsImZvckVhY2giLCJwYXltZW50IiwiSEJLIl0sInNvdXJjZVJvb3QiOiIifQ==