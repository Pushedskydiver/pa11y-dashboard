module.exports = (function() {
  const inputs = $('[data-input]');

  function checkIfInputEmpty() {
    const test = inputs.filter(input => input.value === '');

    console.log(test, 'test');
  }

  function init() {
    if (inputs.length > 0) {
      checkIfInputEmpty();
    }
  }

  return {
    init
  };
}());
