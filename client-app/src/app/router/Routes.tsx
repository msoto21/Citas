import { createBrowserRouter, RouteObject } from "react-router-dom";
import CitaDashboard from "../../features/citas/dashboard/CitaDashboard";
import CitaDetails from "../../features/citas/details/CitaDetails";
import CitaForm from "../../features/citas/form/CitaForm";
import App from "../layout/App";

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {path: 'citas', element: <CitaDashboard />},
      {path: 'citas/:id', element: <CitaDetails />},
      {path: 'createCita', element: <CitaForm key='create' />},
      {path: 'manage/:id', element: <CitaForm key='manage' />},
    ]
  }
]

export const router = createBrowserRouter(routes);