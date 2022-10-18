import App from './components/App';
import { HomePage, PlanningPage } from './pages';
import ErrorPage from './pages/Error';
import { WelcomePage } from './pages/Welcome';
import { WizardPage } from './pages/Wizard';

export const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <WelcomePage />,
      },
      {
        path: "/wizard",
        element: <WizardPage />,
        children: [
          {
            path: "/planning",
            element: <PlanningPage />,
          },
          {
            path: "/nomenclature",
            element: <HomePage />,
          }
        ]
      },
    ]
  },
]