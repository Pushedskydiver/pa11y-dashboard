(function() {
  'use strict';

  $(document).ready(() => {
    require('./common/backToTop.js').init();
    require('./common/detailsCollapse.js').init();
    require('./common/form.js').init();
    require('./common/graph.js').init();
    require('./common/graphPlot.js').init();
    require('./common/graphPlotInputs.js').init();
    require('./common/graphToolTip.js').init();
    require('./common/graphExport.js').init();
    require('./common/options.js').init();
    require('./common/tabs.js').init();
    require('./common/taskFilter.js').init();
    require('./common/taskToolTip.js').init();
  });

}());
