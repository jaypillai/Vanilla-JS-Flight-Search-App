/*global NodeList */
(function (window) {
	'use strict';

	// Get element(s) by CSS selector:
	window.qs = function (selector, scope) {
		return (scope || document).querySelector(selector);
	};
	window.qsa = function (selector, scope) {
		return (scope || document).querySelectorAll(selector);
	};

	// addEventListener wrapper:
	window.$on = function (target, type, callback, useCapture) {
		target.addEventListener(type, callback, !!useCapture);
	};

	//Utility for Ajax call
	window.makeAjaxCall = function (method, url) {
	  return new Promise(function (resolve, reject) {
	    var xhr = new XMLHttpRequest();
	    xhr.open(method, url);
	    xhr.onload = function () {
	      if (this.status >= 200 && this.status < 300) {
	        resolve(xhr.response);
	      } else {
	        reject({
	          status: this.status,
	          statusText: xhr.statusText
	        });
	      }
	    };
	    xhr.onerror = function () {
	      reject({
	        status: this.status,
	        statusText: xhr.statusText
	      });
	    };
	    xhr.send();
	  });
	}

	// Allow for looping on nodes by chaining:
	NodeList.prototype.forEach = Array.prototype.forEach;
})(window);
