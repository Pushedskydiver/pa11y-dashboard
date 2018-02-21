import graph from './graphConfig';

module.exports = (function() {
  function getGraphOptions(xaxisFrom, xaxisTo, yaxisFrom, yaxisTo) {
    $.extend(true, {}, graph.obj.graphOptions, {
      xaxis: {
        min: xaxisFrom,
        max: xaxisTo
      },
      yaxis: {
        min: yaxisFrom,
        max: yaxisTo
      }
    });
  }

  function plotGraphData() {
    graph.obj.graph.bind('plotselected', (event, ranges) => {
      if (ranges.xaxis.to - ranges.xaxis.from < 0.00001) {
        ranges.xaxis.to = ranges.xaxis.from + 0.00001;
      }
      if (ranges.yaxis.to - ranges.yaxis.from < 0.00001) {
        ranges.yaxis.to = ranges.yaxis.from + 0.00001;
      }

      const xaxisFrom = ranges.xaxis.from;
      const xaxisTo = ranges.xaxis.to;
      const yaxisFrom = ranges.yaxis.from;
      const yaxisTo = ranges.yaxis.to;

      $.plot(graph.obj.graph, graph.obj.getData(xaxisFrom, xaxisTo), getGraphOptions(xaxisFrom, xaxisTo, yaxisFrom, yaxisTo));

      if (!graph.obj.zoomResetButton.is(':visible')) {
        graph.obj.toggleResetZoomButton();
      }
    });
  }

  function init() {
    if (graph.obj.graph !== null) {
      plotGraphData();
    }
  }

  return {
    init
  };
}());
