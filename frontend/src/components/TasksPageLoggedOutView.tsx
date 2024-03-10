import Image from 'react-bootstrap/Image';
import logo from '../assets/logo.png';

const TasksPageLoggedOutView = () => {
    return (
        <>
            <Image src={logo} roundedCircle />
            <h1>Please login to see your tasks</h1>
        </>
    );
}

export default TasksPageLoggedOutView;