module.exports = (function() {
  const tabsWrapper = $('[data-tabs-content]');
  const tabsDetails = $('[data-details-collapse]');

  function toggleDetails(element) {
    const {currentTarget} = element;

    element.preventDefault();

    $(currentTarget).toggleClass('tabs__panel-link--collapsed');

    $(currentTarget).hasClass('tabs__panel-link--collapsed') ?
      $(currentTarget).text('Hide details') :
      $(currentTarget).text('Show details');
  }

  function init() {
    if (tabsDetails.length > 0) {
      tabsWrapper.addClass('tabs__content--active');
      tabsDetails.click(toggleDetails);
    }
  }

  return {
    init
  };
}());
