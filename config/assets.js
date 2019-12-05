export const assets = [
  {
    path: '/assets',
    name: 'assets',
    icon: 'crown',
    children: [
      {
        path: '/assets/cash',
        name: 'cash',
        icon: 'pay-circle',
        component: './cash/Cash'
      },
      {
        path: '/assets/deposit',
        name: 'deposit',
        icon: 'money-collect',
        component: './deposit/Deposit'
      },
      {
        path: '/assets/monetary-assets',
        name: 'monetary-assets',
        icon: 'line-chart',
        component: './monetaryAssets/MonetaryAssets'
      },
      {
        path: '/assets/fixed-assets',
        name: 'fixed-assets',
        icon: 'home',
        component: './fixedAssets/FixedAssets'
      }
    ]
  }
]