import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from './pages/home.page'
import { ProtectedRoutes } from './components/protected.routes';
import { Login } from './pages/login.page';
import { Company, loader as companyDetailsLoader } from './pages/company.page';

const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login />
    },
    {
        element: <ProtectedRoutes />,
        children: [
            {
                path: '/',
                element: <Home />,

            },
            {
                path: '/:id',
                element: <Company />,
                loader: companyDetailsLoader,
            }
        ]
    }
])

export function Router() {
    return <RouterProvider router={router} />;
}