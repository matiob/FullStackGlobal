import styles from "../styles/Task.module.css";
import styleUtils from "../styles/utils.module.css";
import { Card } from "react-bootstrap";
import { TaskProps } from "../models/task";
import { formatDate } from "../utils/formatDate";
import { MdDelete } from "react-icons/md";

const Task = ({ task, onTaskClicked, onDeleteTaskClicked, className }: TaskProps) => {
    const {
        title,
        content,
        createdAt,
        updatedAt
    } = task;

    let createdUpdatedContent: string;
    if (updatedAt > createdAt) {
        createdUpdatedContent = "Updated: " + formatDate(updatedAt);
    } else {
        createdUpdatedContent = "Created: " + formatDate(createdAt);
    }

    return (
        <Card
            className={`${styles.taskCard} ${className}`}
            onClick={() => onTaskClicked(task)}>
            <Card.Body className={styles.cardBody}>
                <Card.Title className={styleUtils.flexCenter}>
                    {title}
                    <MdDelete
                        className="content-muted ms-auto"
                        onClick={(e) => {
                            onDeleteTaskClicked(task);
                            e.stopPropagation();
                        }}
                    />
                </Card.Title>
                <Card.Text className={styles.cardContent}>
                    {content}
                </Card.Text>
            </Card.Body>
            <Card.Footer className="content-muted">
                {createdUpdatedContent}
            </Card.Footer>
        </Card>
    )
}

export default Task;