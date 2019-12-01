import UserLayout from '@/layouts/UserLayout';
import BasicLayout from '@/layouts/BasicLayout';

import UserLogin from '@/pages/UserLogin';
import UserRegister from '@/pages/UserRegister';
import Scores from '@/pages/Scores';
import Students from '@/pages/Students';
import AddStudents from '@/pages/AddStudents';
import ModifyScores from '@/pages/ModifyScores';
import AddScores from '@/pages/AddScores';
import Courses from '@/pages/Courses';
import NotFound from '@/pages/NotFound';
import ModifyStudents from '@/pages/ModifyStudents';
import ModifyCourses from '@/pages/ModifyCourses';
import AddCourses from '@/pages/AddCourses';



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
        path: '/add/courses',
        component: AddCourses,
      },
      {
        path: '/add/courses',
        component: AddCourses,
      },
      {
        path: '/add/scores',
        component: AddScores,
      },
      {
        path: '/',
        redirect: '/students',
      },
      {
        path: '/modify/students',
        component: ModifyStudents,
      },
      {
        path: '/modify/courses',
        component: ModifyCourses,
      },
      {
        path: '/modify/scores',
        component: ModifyScores,
      },
      {
        component: NotFound,
      },
    ],
  },
];

export default routerConfig;
