import { Container } from "react-bootstrap";
import TasksPageLoggedInView from "../components/TasksPageLoggedInView";
import TasksPageLoggedOutView from "../components/TasksPageLoggedOutView";
import { TasksPageProps } from '../models/task';
import styles from "../styles/TasksPage.module.css";

const TasksPage = ({ loggedInUser }: TasksPageProps) => {
    return (
        <Container className={styles.tasksPage}>
            <>
                {loggedInUser
                    ? <TasksPageLoggedInView />
                    : <TasksPageLoggedOutView />
                }
            </>
        </Container>
    );
}

export default TasksPage;