// This file is part of Pa11y Dashboard.
//
// Pa11y Dashboard is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Pa11y Dashboard is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Pa11y Dashboard.  If not, see <http://www.gnu.org/licenses/>.

import html2canvas from 'html2canvas';

$(document).ready(() => {

	const data = {};
	const standardsList = $('[data-role="standards-list"]');
	const standardSelect = $('[data-role="new-task-select"]');
	const taskListSelector = $('[data-role="task-list"] a');
	const detailsCollapse = $('[data-role="details-collapse"]');
	const contextPopover = $('[data-role="context-popover"]');
	const toTopLinks = $('[data-role="top"]');
	const zoomResetButton = $('[data-role="zoom-reset"]');
	const graphContainer = $('[data-role="graph"]');
	const dateSelectDropdownMenu = $('[data-role="date-select-dropdown-menu"]');
	const legend = graphContainer.parent('.graph__inner').find('.graph__legend');

	const graphOptions = {
		series: {
			dashes: {show: false,
				lineWidth: 3},
			lines: {show: true},
			points: {show: true},
			hoverable: true
		},
		xaxis: {
			mode: 'time',
			tickLength: 0,
			minTickSize: [1, 'day'],
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

	// Have we declared a custom legend
	if (legend.length === 1) {
		$('body').addClass('custom-legend');
	}

	// Update details button title by click
	detailsCollapse.click(function() {
		$(this).toggleClass('btn_state_collapsed');
	});


	// Back to top links
	toTopLinks.click(e => {
		e.preventDefault();
		$(animateSection($('#top'), -55));
	});

	// Switch standards list of rules
	switchStandardsList(standardSelect);
	$('.rules-list-title').addClass('hidden');
	$('.date-links').removeClass('list-group date-links').addClass('dropdown-menu');
	$('.dropdown-menu a').removeClass('list-group-item');
	dateSelectDropdownMenu.removeClass('hidden');

	standardSelect.change(function() {
		switchStandardsList($(this));
	});

	taskListSelector.click(function(e) {
		e.preventDefault();
		target = $(this).attr('href');
		animateSection($(target), -25);
		if (!$(target).hasClass('showing')) {
			$(target).click();
		}
	});

	zoomResetButton.click(() => {
		plotGraphData();
		toggleResetZoomButton();
	});

	$.each(graphContainer, () => {
		getGraphData();
		plotGraphData();
	});

	// Function to animate sections
	function animateSection(sectionName, offset) {
		$('html,body').animate({
			scrollTop: $(sectionName).offset().top + offset
		}, 750);
	}

	// Standards list switcher for new task form
	function switchStandardsList(el) {
		standardsList.hide();
		const chosenValue = el.val();
		$(`[data-attr="${chosenValue}"]`).show();
	}

	function getGraphData() {
		$($('[data-role="url-stats"]').get().reverse()).each(function() {
			const el = $(this);
			storeDatum(el, getXAxisLabel(el));
		});
	}

	function getXAxisLabel(el) {
		return el.find('[data-role="date"]').attr('data-value');
	}

	function storeDatum(el, label) {
		$.each(el.find('[data-label]'), function() {
			const type = $(this).attr('data-label');
			const value = $(this).html();
			if (typeof data[type] === 'undefined') {
				data[type] = [];
			}
			data[type].push([label, Number(value)]);
		});
	}

	function plotGraphData() {
		$.plot(graphContainer, getData(), graphOptions);
		exportGraph();
	}

	function getData() {
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
				lines: {show: false},
				dashes: {show: true,
					dashLength: [10, 5]}
			},
			{
				color: 'rgb(23, 123, 190)',
				label: 'Notices',
				data: data.notice,
				lines: {show: false},
				dashes: {show: true,
					dashLength: 5}
			}
		];
	}

	function toggleResetZoomButton() {
		zoomResetButton.toggleClass('hidden');
	}

	function exportGraph() {
		const exportBtn = $('[data-export-graph]');

		exportBtn.click(e => {
			e.preventDefault();

			let fileName = $('h1').text().toLowerCase().split(' ').join('_');
			const date = new Date();

			fileName += `_${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;

			html2canvas($('.graph__chart').get(0)).then(canvas => {
				downloadFile(canvas.toDataURL('image/png'), `${fileName}.png`);
			});
		});
	}

	function downloadFile(dataurl, filename) {
		const link = document.createElement('a');
		link.href = dataurl;
		link.setAttribute('download', filename);

		const clickEvent = document.createEvent('MouseEvents');
		clickEvent.initEvent('click', false, true);
		link.dispatchEvent(clickEvent);

		return false;
	}

	graphContainer.bind('plotselected', (event, ranges) => {
		// Clamp the zooming to prevent eternal zoom
		if (ranges.xaxis.to - ranges.xaxis.from < 0.00001) {
			ranges.xaxis.to = ranges.xaxis.from + 0.00001;
		}
		if (ranges.yaxis.to - ranges.yaxis.from < 0.00001) {
			ranges.yaxis.to = ranges.yaxis.from + 0.00001;
		}
		// Do the zooming
		plot = $.plot(graphContainer, getData(ranges.xaxis.from, ranges.xaxis.to),
			$.extend(true, {}, graphOptions, {
				xaxis: {min: ranges.xaxis.from,
					max: ranges.xaxis.to},
				yaxis: {min: ranges.yaxis.from,
					max: ranges.yaxis.to}
			})
		);
		if (!zoomResetButton.is(':visible')) {
			toggleResetZoomButton();
		}
	});

	const choiceContainer = $('[data-role="series-checkboxes"]');
	const datasets = getData();

	$.each(datasets, (key, val) => {
		const lowerCaseValue = val.label.substring(0, val.label.length - 1).toLowerCase();
		choiceContainer.append(
			`<li class="graph__stat graph__stat--${lowerCaseValue}">
        <input class="graph__stat-input" type="checkbox"
          name="${key}"
          id="id${key}"
          data-stat-type="${val.label.toLowerCase()}"
        />
        <label class="graph__stat-label" for="id${key}">
          <span class="graph__stat-check">
              <svg class="graph__stat-check-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9 16.172L19.594 5.578 21 6.984l-12 12-5.578-5.578L4.828 12z"/></svg>
          </span>
          <span class="graph__stat-body">${val.label}</span>
        </label>
      </li>`
		);

	});

	choiceContainer.find('input').click(plotAccordingToChoices);
	choiceContainer.find('[data-stat-type=errors]').click();

	function plotAccordingToChoices() {
		const data = [];
		const labels = [];
		choiceContainer.find('input:checked').each(function() {
			const key = $(this).attr('name');
			if (key && datasets[key]) {
				labels.push(datasets[key].label);
				data.push(datasets[key]);
			}
		});

		if (labels.length && legend.length === 1) {
			legend.find('tr').hide();
			$.each(labels, (index, value) => {
				$(`.graph__table-icon--${value.toLowerCase()}`).parents('tr').css('display', 'table-row');
			});
			legend.show();
		} else {
			legend.hide();
		}

		if (data.length > -1) {
			$.plot(graphContainer, data, graphOptions);
		}
	}

	function showTooltip(x, y, contents) {
		$(`<div data-role="tooltip" class="tooltip tooltip--visible">
        <div class="tooltip-inner">${
	contents
}</div>
      </div>`).css({
			top: y + 5,
			left: x + 5
		}).appendTo('body').fadeIn(200);
	}

	let previousPoint = null;

	graphContainer.bind('plothover', (event, pos, item) => {
		if (item) {
			if (previousPoint !== item.dataIndex) {
				previousPoint = item.dataIndex;
				$('[data-role="tooltip"]').remove();
				const count = item.datapoint[1].toFixed(0);
				const date = $.plot.formatDate(new Date(item.datapoint[0]), '%d %b' +
                '<small> (%H:%M)</small>');
				const contents = `<p class="crunch">${
					date}<br/>${
					count} ${item.series.label
				}</[h6]>`;
				showTooltip(item.pageX, item.pageY, contents);
			}
		} else {
			$('[data-role="tooltip"]').remove();
			previousPoint = null;
		}
	});


	// Task filter

	function initTaskFilter(container) {
		const tasks = initTaskFilterTasks(container);
		const input = initTaskFilterInput(container, tasks);
	}

	function initTaskFilterTasks(container) {
		const tasks = container.find('[data-role=task]');
		return tasks;
	}

	function initTaskFilterInput(container, tasks) {
		const input = container.find('[data-role=input]');
		input.on('keyup', () => {
			filterTasks(tasks, input.val());
		});
		return input;
	}

	function filterTasks(tasks, query) {
		query = $.trim(query.replace(/[^a-z0-9\s]+/gi, ''));
		tasks.removeClass('hidden');
		if (/^\s*$/.test(query)) {
			return;
		}
		const queryRegExp = new RegExp(`(${query.replace(/\s+/gi, '|')})`, 'i');
		tasks.filter(function() {
			return !queryRegExp.test($(this).data('keywords'));
		}).addClass('hidden');
	}

	const taskLists = $('[data-control=task-list]');
	if (taskLists.length > 0) {
		$('[data-control=task-list]').each(function() {
			initTaskFilter($(this));
		});
	}

});
