import $ from 'jquery';

let displayFlashMessage = function(message) {
  $('#flash').text(message);

  $('#flash').delay(500).fadeIn('normal', function() {
    $(this).delay(2500).fadeOut();
  });
};

export { displayFlashMessage };
