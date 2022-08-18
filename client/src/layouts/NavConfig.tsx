import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck, faDatabase, faServer, faChartPie, faUser, faKey, faTableList, faUserGroup } from '@fortawesome/free-solid-svg-icons';

// ----------------------------------------------------------------------

const navConfig = [
  {
    title: 'dash',
    path: '/dash',
    icon: <FontAwesomeIcon icon={ faChartPie } size="lg" />,
  },
  {
    title: 'data',
    path: '/data',
    icon: <FontAwesomeIcon icon={ faCalendarCheck } size="lg" />,
  },
  {
    title: 'info',
    icon: <FontAwesomeIcon icon={ faDatabase } size="lg" />,
    children: [
      {
        title: 'user',
        path: '/user',
        icon: <FontAwesomeIcon icon={ faUser } size="lg" />
      },
      {
        title: 'server',
        path: '/server',
        icon: <FontAwesomeIcon icon={ faServer } size="lg" />
      },
      {
        title: 'license',
        path: '/license',
        icon: <FontAwesomeIcon icon={ faKey } size="lg" />
      },
      {
        title: 'sheet',
        path: '/sheet',
        icon: <FontAwesomeIcon icon={ faTableList } size="lg" />
      },
      {
        title: 'group',
        path: '/group',
        icon: <FontAwesomeIcon icon={ faUserGroup } size="lg" />
      }
    ]
  },
  {
    title: 'user',
    path: '/user',
    icon: <FontAwesomeIcon icon={ faUser } size="lg" />
  },
  {
    title: 'server',
    path: '/server',
    icon: <FontAwesomeIcon icon={ faServer } size="lg" />
  },
  {
    title: 'license',
    path: '/license',
    icon: <FontAwesomeIcon icon={ faKey } size="lg" />
  },
  {
    title: 'sheet',
    path: '/sheet',
    icon: <FontAwesomeIcon icon={ faTableList } size="lg" />
  },
  {
    title: 'group',
    path: '/group',
    icon: <FontAwesomeIcon icon={ faUserGroup } size="lg" />
  }
  
];

// ----------------------------------------------------------------------

export default navConfig;