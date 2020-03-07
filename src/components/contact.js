import $ from 'jquery';

(() => {
  const $form = $('#contactForm');
  $form.submit(e => {
    e.preventDefault();

    $.post($form.attr('action'), $form.serialize())
      .done(() => {
        $form.addClass('contact--success');
      })
      .fail(() => {
        $form.addClass('contact--error');
      });
  });
})();
