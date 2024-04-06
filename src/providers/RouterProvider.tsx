import {
  createBrowserRouter,
  Navigate,
  RouterProvider as DomRouterProvider,
} from 'react-router-dom';

import ExerciseOne from '@/pages/ExerciseOne.tsx';
import ExerciseTwo from '@/pages/ExerciseTwo.tsx';
import Home from '@/pages/Home.tsx';
import { routes } from '@/routes';

const router = createBrowserRouter([
  { path: routes.home(), element: <Home /> },
  { path: routes.exerciseOne(), element: <ExerciseOne /> },
  { path: routes.exerciseTwo(), element: <ExerciseTwo /> },
  { path: '*', element: <Navigate to={routes.home()} /> },
]);

export default function RouterProvider() {
  return <DomRouterProvider router={router} />;
}
