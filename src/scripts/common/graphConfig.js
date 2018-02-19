module.exports = (function() {
  const obj = {};
  const data = {};

	obj.graph = $('[data-role="graph"]');
  obj.legend = obj.graph.parent('.graph__inner').find('.graph__legend');
	obj.urlSats = $('[data-role="url-stats"]');
	obj.zoomResetButton = $('[data-role="zoom-reset"]');

	obj.graphOptions = {
		series: {
			dashes: {
				show: false,
				lineWidth: 3
			},
			lines: {
				show: true
			},
			points: {
				show: true
			},
			hoverable: true
		},
		xaxis: {
			mode: 'time',
			tickLength: 0,
			minTickSize: [
				1,
				'day'
			],
			timeformat: '%d %b'
		},
		yaxis: {
			tickDecimals: 0
		},
		lines: {
			lineWidth: 3
		},
		points: {
			fill: true,
			radius: 4,
			lineWidth: 3
		},
		shadowSize: 0,
		grid: {
			backgroundColor: '#fff',
			borderColor: '#808080',
			hoverable: true,
			clickable: true,
			borderWidth: {
				top: 1,
				right: 1,
				bottom: 1,
				left: 1
			}
		},
		selection: {
			mode: 'x'
		}
	};

  obj.getData = () => {
		return [
			{
				color: 'rgb(216, 61, 45)',
				label: 'Errors',
				data: data.error
			},
			{
				color: 'rgb(168, 103, 0)',
				label: 'Warnings',
				data: data.warning,
				lines: {
					show: false
				},
				dashes: {
					show: true,
					dashLength: [10, 5]
				}
			},
			{
				color: 'rgb(23, 123, 190)',
				label: 'Notices',
				data: data.notice,
				lines: {
					show: false
				},
				dashes: {
					show: true,
					dashLength: 5
				}
			}
		];
	};

  obj.toggleResetZoomButton = () => {
		obj.zoomResetButton.toggleClass('hidden');
	};

  return {
    obj,
    data
  };
}());
