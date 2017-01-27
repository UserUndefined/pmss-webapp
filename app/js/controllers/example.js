function ExampleCtrl() {
  'ngInject';

  // ViewModel
  const vm = this;

  function initialise(){
    console.log('Dashboard initialising');
  }

  vm.number = 1234;
  vm.visitorsChartData = [ {key: 'Complete', y: 5264}, { key: 'Incomplete', y: 3872} ];

  vm.visitorsChartOptions = {
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
      title: '61% Complete',
      margin: { top: -10 }
    }
  };

  vm.warningsChartData = function() {
    var sin = [];
    for (var i = 0; i < 100; i++) {
      sin.push({x: i, y: Math.abs(Math.cos(i/10) *0.25*i + 0.9 - 0.4*i)});
    }
    return [ { values: sin, color: 'rgb(0, 150, 136)', area: true } ];
  };

  vm.warningsChartOptions = {
    chart: {
      type: 'lineChart',
      height: 210,
      margin: { top: -10, left: -20, right: -20 },
      x: function (d) { return d.x },
      y: function (d) { return d.y },
      showLabels: false,
      showLegend: false,
      title: 'Over 9K',
      showYAxis: false,
      showXAxis: false,
      tooltip: { contentGenerator: function (d) { return '<span class="custom-tooltip">' + Math.round(d.point.y) + '</span>' } }
    }
  };

  vm.memoryChartData = [ {key: 'memory', y: 42}, { key: 'free', y: 58} ];

  vm.memoryChartOptions = {
    chart: {
      type: 'pieChart',
      height: 210,
      donut: true,
      pie: {
        startAngle: function (d) { return d.startAngle/2 -Math.PI/2 },
        endAngle: function (d) { return d.endAngle/2 -Math.PI/2 }
      },
      x: function (d) { return d.key; },
      y: function (d) { return d.y; },
      valueFormat: (d3.format('.0f')),
      color: ['rgb(0, 150, 136)', 'rgb(191, 191, 191)'],
      showLabels: false,
      showLegend: false,
      tooltips: false,
      title: '42%',
      titleOffset: -10,
      margin: { bottom: -80, left: -20, right: -20 }
    }
  };

  initialise();

}

export default {
  name: 'ExampleCtrl',
  fn: ExampleCtrl
};
