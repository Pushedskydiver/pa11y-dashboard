module.exports = (function() {
  const taskSelectors = $('[data-task-selector]');
  let toolTip = null;

  function createToolTip() {
    toolTip = `
      <div class="tabs__tooltip" data-tooltip>
        <span class="tabs__tooltip-arrow"></span>
        <span class="tabs__tooltip-heading">Context</span>
        <span class="tabs__tooltip-body" data-tooltip-content></span>
      </div>
    `;
  }

  function showToolTip(element) {
    const {currentTarget} = element;
    const elementWidth = $(currentTarget).width();
    const elementHeight = $(currentTarget).height();
    const elementParent = $(currentTarget).parent();
    const toolTipData = $(currentTarget).attr('data-content');

    createToolTip();

    $('[data-tooltip]').remove();

    elementParent.append(toolTip);

    $('[data-tooltip]').css({
      top: `${elementHeight / 2}px`,
      left: `${elementWidth / 2}px`
    });
    $('[data-tooltip-content]').text(toolTipData);
  }

  function init() {
    if (taskSelectors.length > 0) {
      taskSelectors.click(showToolTip);
    }
  }

  return {
    init
  };
}());
