import safe from '../utils/safe';

safe(() => {
  const $form = jQuery('#contactForm');
  $form.submit(e => {
    e.preventDefault();

    jQuery.post($form.attr('action'), $form.serialize())
      .done(() => {
        $form.addClass('contact--success');
      })
      .fail(() => {
        $form.addClass('contact--error');
      });
  });
});
