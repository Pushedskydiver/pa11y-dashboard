module.exports = (function() {
  const tabs = $('[data-tab]');

  function showTabPanel(element) {
    const {target} = element;
    const currentTabParent = $(target).parent();
    const tabPanels = $('[data-tab-panel]');
    const activePanelId = $(target).attr('href');
    const activePanel = $(activePanelId);

    element.preventDefault();

    tabs.parent().removeClass('tabs__item--active');
    tabPanels.removeClass('tabs__pane--active');
    currentTabParent.addClass('tabs__item--active');
    activePanel.addClass('tabs__pane--active');
  }

  function init() {
    if (tabs.length > 0) {
      tabs.click(showTabPanel);
    }
  }

  return {
    init
  };
}());
