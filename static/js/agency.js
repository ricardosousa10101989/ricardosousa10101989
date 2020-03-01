/*!
 * Start Bootstrap - Agnecy Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */


$('div.modal').on('show.bs.modal', function () {
  const modal = this;
  const hash = modal.id;
  window.location.hash = hash;
  window.onhashchange = function () {
    if (!location.hash) {
      $(modal).modal('hide');
    }
  };
});
