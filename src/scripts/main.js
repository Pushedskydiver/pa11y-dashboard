(function() {
  'use strict';

  $(document).ready(() => {
    require('./common/graph.js').init();
    require('./common/graphPlot.js').init();
    require('./common/graphPlotInputs.js').init();
    require('./common/graphToolTip.js').init();
    require('./common/graphExport.js').init();
    require('./common/taskFilter.js').init();
  });

}());
