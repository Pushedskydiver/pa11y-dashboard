module.exports = (function() {
	const taskLists = $('[data-control=task-list]');

	function filterTasks(tasks, query) {
		query = $.trim(query.replace(/[^a-z0-9\s]+/gi, ''));

		tasks.removeClass('tasks__item--hidden');

		if (/^\s*$/.test(query)) {
			return;
		}

		const queryRegExp = new RegExp(`(${query.replace(/\s+/gi, '|')})`, 'i');

		tasks.filter(function() {
			return !queryRegExp.test($(this).data('keywords'));
		}).addClass('tasks__item--hidden');
	}

	function initTaskFilterTasks(container) {
		const tasks = container.find('[data-role=task]');
		return tasks;
	}

	function initTaskFilterInput(container, tasks) {
		const input = container.find('[data-role=input]');

		input.on('keyup', () => filterTasks(tasks, input.val()));

		return input;
	}

	function initTaskFilter(container) {
		const tasks = initTaskFilterTasks(container);
		const input = initTaskFilterInput(container, tasks);
	}


	function init() {
		if (taskLists.length > 0) {
			$('[data-control=task-list]').each(function() {
				initTaskFilter($(this));
			});
		}
	}

	return {
		init: init
	};
}());
