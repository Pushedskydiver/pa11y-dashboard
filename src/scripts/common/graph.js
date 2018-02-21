import graph from './graphConfig';
import graphExport from './graphExport';

module.exports = (function() {
  const exportBtn = $('[data-export-graph]');

  function storeDatum(element, label) {
    const test = $(element.find('[data-label]'));

    $.each(test, (index, property) => {
      const type = $(property).attr('data-label');
      const value = $(property).html();

      if (typeof graph.data[type] === 'undefined') {
        graph.data[type] = [];
      }

      graph.data[type].push([label, Number(value)]);
    });
  }

  function getXAxisLabel(element) {
    return element.find('[data-role="date"]').attr('data-value');
  }

  function getGraphData() {
    const urlStats = $('[data-role="url-stats"]');

    $($(urlStats).get().reverse()).each((index, value) => {
      const element = $(value);

      storeDatum(element, getXAxisLabel(element));
    });
  }

  function plotGraphData() {
    $.plot(graph.obj.graph, graph.obj.getData(), graph.obj.graphOptions);
    exportBtn.click(graphExport.obj.graphExport);
  }

  function resetGraph() {
    plotGraphData();
    graph.obj.toggleResetZoomButton();
  }

  function plotGraph() {
    getGraphData();
    plotGraphData();
  }

  function init() {
    if (graph.obj.graph !== null) {
      graph.obj.zoomResetButton.click(resetGraph);
      $.each(graph.obj.graph, plotGraph);
    }
  }

  return {
    init
  };
}());
