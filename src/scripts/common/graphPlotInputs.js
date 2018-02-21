import graph from './graphConfig';

module.exports = (function() {
  const choiceContainer = $('[data-role="series-checkboxes"]');
  const datasets = graph.obj.getData();

  function createGraphStatCheckboxes(key, val) {
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
  }

  function plotAccordingToChoices() {
    const data = [];
    const labels = [];

    choiceContainer.find('input:checked').each((index, value) => {
      const key = $(value).attr('name');

      if (key && datasets[key]) {
        labels.push(datasets[key].label);
        data.push(datasets[key]);
      }
    });

    if (labels.length && graph.obj.legend.length === 1) {
      graph.obj.legend.find('tr').hide();

      $.each(labels, (index, value) => {
        $(`.graph__table-icon--${value.toLowerCase()}`).parents('tr').css('display', 'table-row');
      });

      graph.obj.legend.show();
    } else {
      graph.obj.legend.hide();
    }

    if (data.length > -1) {
      $.plot(graph.obj.graph, data, graph.obj.graphOptions);
    }
  }

  function init() {
    if (choiceContainer !== null) {
      $.each(datasets, createGraphStatCheckboxes);
      choiceContainer.find('input').click(plotAccordingToChoices);
      choiceContainer.find('[data-stat-type=errors]').click();
    }
  }

  return {
    init
  };
}());
