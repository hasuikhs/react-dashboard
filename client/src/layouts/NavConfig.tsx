import Iconify from '../components/Iconify';

const getIcon = (name: string) => <Iconify icon={ name } width={ 22 } height={ 22 } />;

// ----------------------------------------------------------------------

const navConfig = [
  {
    title: 'home',
    path: '/home',
    icon: getIcon('eva:home-fill')
  },
  // {
  //   title: 'data',
  //   path: '/data',
  //   icon: getIcon('bi:clipboard-data-fill')
  // },
  {
    title: 'user',
    path: '/user',
    icon: getIcon('bxs:user')
  },
  {
    title: 'server',
    path: '/server',
    icon: getIcon('bxs:server')
  },
  {
    title: 'license',
    path: '/license',
    icon: getIcon('fa-solid:key')
  },
  {
    title: 'sheet',
    path: '/sheet',
    icon: getIcon('bxs:spreadsheet')
  },
  {
    title: 'group',
    path: '/group',
    icon: getIcon('bxs:group')
  }
];

// ----------------------------------------------------------------------

export default navConfig;