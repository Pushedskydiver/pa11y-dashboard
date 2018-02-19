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
			// Clamp the zooming to prevent eternal zoom
      if (ranges.xaxis.to - ranges.xaxis.from < 0.00001) {
  			ranges.xaxis.to = ranges.xaxis.from + 0.00001;
  		}
  		if (ranges.yaxis.to - ranges.yaxis.from < 0.00001) {
  			ranges.yaxis.to = ranges.yaxis.from + 0.00001;
  		}

      let xaxisFrom = ranges.xaxis.from;
      let xaxisTo = ranges.xaxis.to;
      let yaxisFrom = ranges.yaxis.from;
      let yaxisTo = ranges.yaxis.to;

			// Do the zooming
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
		init: init
	};
}());
