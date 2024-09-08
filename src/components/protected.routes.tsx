import { Button } from "@mantine/core";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

export function ProtectedRoutes() {
    const navigate = useNavigate()
    // get user from local storage
    const localStorageToken = (localStorage.getItem("logged-in"));

    function logout() {
        localStorage.removeItem('logged-in')
        navigate('/login', { replace: true })
    }

    return localStorageToken ? <>
        <Button mt={4} ml={4} radius={50} onClick={logout} > Logout </Button>
        <Outlet />
    </>
        : <Navigate to="/login" replace />

}