module.exports = (function() {
  const tabsWrapper = $('[data-tabs-content]');
  const tabsDetails = $('[data-details-collapse]');

  function toggleDetails(element) {
    const collapseLink = element.currentTarget;

    element.preventDefault();

    $(collapseLink).toggleClass('tabs__panel-link--collapsed');

    $(collapseLink).hasClass('tabs__panel-link--collapsed') ?
      $(collapseLink).text('Hide details') :
      $(collapseLink).text('Show details');
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
