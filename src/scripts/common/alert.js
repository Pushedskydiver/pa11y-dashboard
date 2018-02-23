module.exports = (function() {
  const close = $('[data-dismiss]');

  function dismissAlert(element) {
    const {currentTarget} = element;

    $(currentTarget).parent().hide();
  }

  function init() {
    if (close.length > 0) {
      close.click(dismissAlert);
    }
  }

  return {
    init
  };
}());
