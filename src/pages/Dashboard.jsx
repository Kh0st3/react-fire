import { logout } from "../config/firebase";
import { Button } from "@mui/material";

const Dashboard = () => {
    
    const handleLogout = async() => {
        try {
            await logout();
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <>
            <h1>Dashboard (ruta protegida)</h1>
            <Button 
            variant="contained" 
            onClick={handleLogout}
            >
                Logout
            </Button>
        </>
    );
};

export default Dashboard;
