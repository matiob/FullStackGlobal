import { User } from './user';

export interface Task {
    _id: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
}

export interface TaskInput {
    title: string,
    content: string,
}

export interface TaskProps {
    task: Task,
    onTaskClicked: (task: Task) => void,
    onDeleteTaskClicked: (task: Task) => void,
    className?: string,
}

export interface TasksPageProps {
    loggedInUser: User | null,
}