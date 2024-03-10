import { Button } from "react-bootstrap";
import styles from '../styles/Button.module.css';

interface NavBarLoggedOutViewProps {
    onSignUpClicked: () => void,
    onLoginClicked: () => void,
}

const NavBarLoggedOutView = ({ onSignUpClicked, onLoginClicked }: NavBarLoggedOutViewProps) => {
    return (
        <>
            <Button className={styles.buttonBackground} onClick={onSignUpClicked}>Sign Up</Button>
            <Button className={styles.buttonBackground} onClick={onLoginClicked}>Log In</Button>
        </>
    );
}

export default NavBarLoggedOutView;