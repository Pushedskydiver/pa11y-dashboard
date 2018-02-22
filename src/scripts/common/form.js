module.exports = (function() {
  const inputs = $('[data-input]');

  function checkFilledInputs() {
    const filledInputs = inputs.filter((index, value) => $(value).val().length > 0);
    const filledInputsLabel = $(filledInputs).parent().parent().find('[data-label]');
    const emptyInputs = inputs.filter((index, value) => $(value).val().length === 0);
    const emptyInputsLabel = $(emptyInputs).parent().parent().find('[data-label]');

    filledInputs.addClass('form__input--filled');
    filledInputsLabel.addClass('form__label--hidden');
    emptyInputs.removeClass('form__input--filled');
    emptyInputsLabel.removeClass('form__label--hidden');
  }

  function init() {
    if (inputs.length > 0) {
      inputs.change(checkFilledInputs);
      inputs.keyup(checkFilledInputs);
      checkFilledInputs();
    }
  }

  return {
    init
  };
}());
