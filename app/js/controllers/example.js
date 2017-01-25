function ExampleCtrl() {
  'ngInject';

  // ViewModel
  const vm = this;

  vm.number = 1234;
  vm.visitorsChartData = [ {key: 'Mobile', y: 5264}, { key: 'Desktop', y: 3872} ];

  vm.chartOptions = {
    chart: {
      type: 'pieChart',
      height: 210,
      donut: true,
      x: function (d) { return d.key; },
      y: function (d) { return d.y; },
      valueFormat: (d3.format('.0f')),
      color: ['rgb(0, 150, 136)', '#E75753'],
      showLabels: false,
      showLegend: false,
      title: 'Over 9K',
      margin: { top: -10 }
    }
  };

}

export default {
  name: 'ExampleCtrl',
  fn: ExampleCtrl
};
