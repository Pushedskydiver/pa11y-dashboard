import graph from './graphConfig';
import exportGraph from './graphExport';

module.exports = (function() {
  const exportBtn = $('[data-export-graph]');

	function storeDatum(element, label) {
		$.each(element.find('[data-label]'), function() {
			const type = $(this).attr('data-label');
			const value = $(this).html();

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
    $($('[data-role="url-stats"]').get().reverse()).each(function() {
      const el = $(this);

      storeDatum(el, getXAxisLabel(el));
    });
	}

  function plotGraphData() {
		$.plot(graph.obj.graph, graph.obj.getData(), graph.obj.graphOptions);
		exportBtn.click(exportGraph.obj.exportGraph);
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
		init: init
	};
}());
