import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Task, TaskInput } from "../models/task";
import * as TasksApi from "../services/tasks.service";
import TextInputField from "./TextInputField";

interface AddEditTaskDialogProps {
    taskToEdit?: Task,
    onDismiss: () => void,
    onTaskSaved: (Task: Task) => void,
}

const AddEditTaskDialog = ({ taskToEdit, onDismiss, onTaskSaved }: AddEditTaskDialogProps) => {

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<TaskInput>({
        defaultValues: {
            title: taskToEdit?.title || "",
            content: taskToEdit?.content || "",
        }
    });

    async function onSubmit(input: TaskInput) {
        try {
            let taskResponse: Task;
            if (taskToEdit) {
                taskResponse = await TasksApi.updateTask(taskToEdit._id, input);
            } else {
                taskResponse = await TasksApi.createTask(input);
            }
            onTaskSaved(taskResponse);
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    return (
        <Modal show onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {taskToEdit ? "Edit Task" : "Add Task"}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form id="addEditTaskForm" onSubmit={handleSubmit(onSubmit)}>
                    <TextInputField
                        name="title"
                        label="Title"
                        type="text"
                        placeholder="Title"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.title}
                    />

                    <TextInputField
                        name="content"
                        label="Content"
                        as="textarea"
                        rows={5}
                        placeholder="Content"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.content}
                    />
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button
                    type="submit"
                    form="addEditTaskForm"
                    disabled={isSubmitting}
                >
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddEditTaskDialog;