import html2canvas from 'html2canvas';

module.exports = (function() {
  const obj = {};
	const graph = $('[data-role="graph"]');
	const exportBtn = $('[data-export-graph]');

	function downloadFile(dataurl, filename) {
		const link = document.createElement('a');
		const clickEvent = document.createEvent('MouseEvents');

		link.href = dataurl;
		link.setAttribute('download', filename);
		clickEvent.initEvent('click', false, true);
		link.dispatchEvent(clickEvent);

		return false;
	}

  obj.exportGraph = element => {
    console.log(element, 'element');

		element.preventDefault();

		let fileName = $('h1').text().toLowerCase().split(' ').join('_');
		const date = new Date();

		fileName += `_${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;

		html2canvas($(graph).get(0)).then(canvas => {
			downloadFile(canvas.toDataURL('image/png'), `${fileName}.png`);
		});
	}

	function init() {
		if (graph !== null) {
			exportBtn.click(obj.exportGraph);
		}
	}

	return {
    obj,
		init: init
	};
}());
