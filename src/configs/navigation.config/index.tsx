import type { NavigationTree } from '@/@types/navigation';
import {
  IconDashboard,
  IconGenderAgender,
  IconHighlight,
  IconHome,
  IconPower,
  IconUser,
} from '@tabler/icons-react';

const navigationConfig: NavigationTree[] = [
  {
    key: 'dashboard',
    path: '/dashboard',
    title: 'Dashboard',
    translateKey: '',
    icon: IconDashboard,
    authority: [],
    subMenu: [],
  },
  {
    key: 'home',
    path: '/home',
    title: 'Home',
    translateKey: '',
    icon: IconHome,
    authority: [],
    subMenu: [],
  },
  {
    key: 'speaker',
    path: '/speaker',
    title: 'Speaker',
    translateKey: '',
    icon: IconUser,
    authority: [],
    subMenu: [],
  },
  {
    key: 'agenda',
    path: '/agenda',
    title: 'Agenda',
    translateKey: '',
    icon: IconGenderAgender,
    authority: [],
    subMenu: [],
  },
  {
    key: 'users',
    path: '/users',
    title: 'Users',
    translateKey: '',
    icon: IconUser,
    authority: [],
    subMenu: [],
  },
  {
    key: 'power_by',
    path: '/power_by',
    title: 'PowerBy',
    translateKey: '',
    icon: IconPower,
    authority: [],
    subMenu: [],
  },
  {
    key: 'highlight',
    path: '/highlight',
    title: 'Highlight',
    translateKey: '',
    icon: IconHighlight,
    authority: [],
    subMenu: [],
  },
];

export default navigationConfig;
