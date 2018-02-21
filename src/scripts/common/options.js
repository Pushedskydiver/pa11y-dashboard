module.exports = (function() {
  const taskOptions = $('[data-task-options]');

  function toggleOptions(element) {
    const {currentTarget} = element;

    $(currentTarget).toggleClass('options__button--active');
  }

  function init() {
    if (taskOptions.length > 0) {
      taskOptions.click(toggleOptions);
    }
  }

  return {
    init
  };
}());
