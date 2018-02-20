import graph from './graphConfig';

module.exports = (function() {
	let previousPoint = null;

	function showTooltip(x, y, contents) {
		$(`<div data-role="tooltip" class="tooltip tooltip--visible">
        <div class="tooltip-inner">${contents}</div>
      </div>`).css({top: y + 5,
			left: x + 5}).appendTo('body').fadeIn(200);
	}

	function plotOnHover() {
		graph.obj.graph.bind('plothover', (event, pos, item) => {
			if (item) {
				if (previousPoint !== item.dataIndex) {
					previousPoint = item.dataIndex;

					$('[data-role="tooltip"]').remove();

					const count = item.datapoint[1].toFixed(0);
					const date = $.plot.formatDate(new Date(item.datapoint[0]), '%d %b' + '<small> (%H:%M)</small>');
					const contents = `<p class="crunch">${date} <br/> ${count} ${item.series.label}</[h6]>`;

					showTooltip(item.pageX, item.pageY, contents);
				}
			} else {
				$('[data-role="tooltip"]').remove();
				previousPoint = null;
			}
		});
	}

	function init() {
		if (graph.obj.graph !== null) {
			plotOnHover();
		}
	}

	return {
		init: init
	};
}());
