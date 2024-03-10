import { Button, Navbar } from "react-bootstrap";
import { User } from "../models/user";
import { logout } from '../services/user.service';
import styles from '../styles/Button.module.css';

interface NavBarLoggedInViewProps {
    user: User,
    onLogoutSuccessful: () => void,
}

const NavBarLoggedInView = ({ user, onLogoutSuccessful }: NavBarLoggedInViewProps) => {

    async function logOut() {
        try {
            await logout();
            onLogoutSuccessful();
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    return (
        <>
            <Navbar.Text className="me-2">
                Signed in as: {user.username}
            </Navbar.Text>
            <Button className={styles.buttonBackground} onClick={logOut}>Log out</Button>
        </>
    );
}

export default NavBarLoggedInView;