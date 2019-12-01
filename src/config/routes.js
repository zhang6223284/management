import UserLayout from '@/layouts/UserLayout';
import BasicLayout from '@/layouts/BasicLayout';

import Dashboard from '@/pages/Dashboard';
import UserLogin from '@/pages/UserLogin';
import UserRegister from '@/pages/UserRegister';
import Holidays from '@/pages/Holidays';
import Events from '@/pages/Events';
import Activites from '@/pages/Activites';
import Scores from '@/pages/Scores';
import Students from '@/pages/Students';
import AddStudents from '@/pages/AddStudents';
import Analysis from '@/pages/Analysis';
import Setting from '@/pages/Setting';
import Courses from '@/pages/Courses';
import NotFound from '@/pages/NotFound';

const routerConfig = [
  {
    path: '/user',
    component: UserLayout,
    children: [
      {
        path: '/login',
        component: UserLogin,
      },
      {
        path: '/register',
        component: UserRegister,
      },
      {
        path: '/',
        redirect: '/user/login',
      },
    ],
  },
  {
    path: '/',
    component: BasicLayout,
    children: [
      {
        path: '/dashboard',
        component: Dashboard,
      },
      {
        path: '/holidays',
        component: Holidays,
      },
      {
        path: '/events',
        component: Events,
      },
      {
        path: '/activites',
        component: Activites,
      },
      {
        path: '/score',
        component: Scores,
      },
      {
        path: '/students',
        component: Students,
      },
      {
        path: '/courses',
        component: Courses,
      },
      {
        path: '/add/students',
        component: AddStudents,
      },
      {
        path: '/analysis',
        component: Analysis,
      },
      {
        path: '/setting',
        component: Setting,
      },
      {
        path: '/',
        redirect: '/dashboard',
      },
      {
        component: NotFound,
      },
    ],
  },
];

export default routerConfig;
