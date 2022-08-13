import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt, faServer, faHouse, faUser, faKey, faTableList, faUserGroup } from '@fortawesome/free-solid-svg-icons';

// ----------------------------------------------------------------------

const navConfig = [
  {
    title: 'home',
    path: '/home',
    icon: <FontAwesomeIcon icon={ faHouse } size="lg" />,
  },
  {
    title: 'data',
    path: '/data',
    icon: <FontAwesomeIcon icon={ faBolt } size="lg" />,
  },
  // {
  //   title: 'info',
  //   children: [
  //     {
  //       title: 'user',
  //       path: '/user',
  //       icon: <FontAwesomeIcon icon={ faUser } size="lg" />
  //     },
  //     {
  //       title: 'server',
  //       path: '/server',
  //       icon: <FontAwesomeIcon icon={ faServer } size="lg" />
  //     },
  //   ]
  // },
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