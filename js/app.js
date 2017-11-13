/*global app, $on */
(function () {
	'use strict';

	/**
	 * Sets up a brand new Todo list.
	 *
	 * @param {string} name The name of your new to do list.
	 */
	function FlightSearch() {
		this.controller = new app.Controller();
	}

	var todo = new FlightSearch();

	function setView() {
		todo.controller.setView('myApp');
	}
	$on(window, 'load', setView);
	$on(window, 'hashchange', setView);
})();
