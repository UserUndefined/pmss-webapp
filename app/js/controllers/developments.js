function DevelopmentsController() {

  // ViewModel
  var vm = this;

  vm.test = 'test';

  vm.developments = [
    {
      name: 'Example House',
      location: 'Leeds',
      vendor: 'Midas',
      agent: 'BPS',
      approved: 'Y',
      launchDate: '17 Jan 2017',
      plotNumber: '20',
      legalCompletion: 'Y'
    },
    {
      name: 'Little House',
      location: 'Manchester',
      vendor: 'Trent',
      agent: 'BPS',
      approved: 'Y',
      launchDate: '01 Feb 2017',
      plotNumber: '5',
      legalCompletion: 'Y'
    },
    {
      name: 'Mighty House',
      location: 'Sheffield',
      vendor: 'Trent',
      agent: 'PLL',
      approved: 'Y',
      launchDate: '18 Feb 2017',
      plotNumber: '9',
      legalCompletion: 'N'
    },
    {
      name: 'Farm House',
      location: 'Manchester',
      vendor: 'Midas',
      agent: 'PLL',
      approved: 'Y',
      launchDate: '29 Mar 2017',
      plotNumber: '25',
      legalCompletion: 'Y'
    },
    {
      name: 'White House',
      location: 'Sheffield',
      vendor: 'Trent',
      agent: 'BPS',
      approved: 'Y',
      launchDate: '30 Mar 2017',
      plotNumber: '10',
      legalCompletion: 'N'
    }
  ];

}

export default {
  name: 'DevelopmentsController',
  fn: DevelopmentsController
};
