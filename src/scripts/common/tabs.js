module.exports = (function() {
  const tabs = $('[data-tab]');

  function showTabPanel(element) {
    const currentTab = element;
    const currentTabTarget = currentTab.target;
    const currentTabParent = $(currentTabTarget).parent();
    const tabPanels = $('[data-tab-panel]');
    const activePanelId = $(currentTabTarget).attr('href');
    const activePanel = $(activePanelId);

    currentTab.preventDefault();

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
