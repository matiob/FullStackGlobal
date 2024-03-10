import { useEffect, useState } from "react";
import { Form, Button, Col, Row, Spinner } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { Task as TaskModel } from "../models/task";
import * as taskService from "../services/tasks.service";
import styles from "../styles/TasksPage.module.css";
import styleUtils from "../styles/utils.module.css";
import AddEditTaskDialog from "./AddEditTaskDialog";
import Task from "./Task";

const TasksPageLoggedInView = () => {
  const [tasks, setTasks] = useState<TaskModel[]>([]);
  const [filterTasks, setFilterTasks] = useState<TaskModel[]>([]);
  const [tasksLoading, setTasksLoading] = useState(true);
  const [showTasksLoadingError, setShowTasksLoadingError] = useState(false);

  const [showAddTaskDialog, setShowAddTaskDialog] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<TaskModel | null>(null);

  
  // Filter -------------------------------------------------------------
  const [taskTitleSearch, setTaskTitleSearch] = useState("");
  const handleSearch = () => {
    filterByTitle().then(() => {});
  }
  async function filterByTitle() {
    try {
      setShowTasksLoadingError(false);
      setTasksLoading(true);
      const tasks = await taskService.fetchTasksByTitle(taskTitleSearch);
      setFilterTasks(tasks);
    } catch (error) {
      console.error(error);
      setShowTasksLoadingError(true);
    } finally {
      setTasksLoading(false);
    }
  }
  // --------------------------------------------------------------------

  useEffect(() => {
    async function loadTasks() {
      try {
        setShowTasksLoadingError(false);
        setTasksLoading(true);
        const tasks = await taskService.fetchTasks();
        setTasks(tasks);
      } catch (error) {
        console.error(error);
        setShowTasksLoadingError(true);
      } finally {
        setTasksLoading(false);
      }
    }
    loadTasks();
  }, []);

  async function deleteTask(Task: TaskModel) {
    try {
      await taskService.deleteTask(Task._id);
      setTasks(tasks.filter((existingTask) => existingTask._id !== Task._id));
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  const tasksGrid = (
    <Row xs={1} md={2} xl={3} className={`g-4 ${styles.tasksGrid}`}>
      {tasks.map((task) => (
        <Col key={task._id}>
          <Task
            task={task}
            className={styles.task}
            onTaskClicked={setTaskToEdit}
            onDeleteTaskClicked={deleteTask}
          />
        </Col>
      ))}
    </Row>
  );

  const filterTasksGrid = (
    <Row xs={1} md={2} xl={3} className={`g-4 ${styles.tasksGrid}`}>
      {filterTasks.map((task) => (
        <Col key={task._id}>
          <Task
            task={task}
            className={styles.task}
            onTaskClicked={setTaskToEdit}
            onDeleteTaskClicked={deleteTask}
          />
        </Col>
      ))}
    </Row>
  );

  return (
    <>
      <Button
        className={`mb-4 ${styleUtils.blockCenter} ${styleUtils.flexCenter}`}
        onClick={() => setShowAddTaskDialog(true)}
      >
        <FaPlus />
        Add new Task
      </Button>

      <div className="d-flex flex-row gap-3 mb-3">
           <Form.Control
                type="text"
                name="search-form"
                id="search-form"
                placeholder="Filter by title"
                value={taskTitleSearch}
                onChange={(e) => setTaskTitleSearch(e.target.value)}
            />
            <Button variant="outline-primary" size="sm" onClick={handleSearch}>
            Filter
          </Button>
      </div>

      {tasksLoading && <Spinner animation="border" variant="primary" />}
      {showTasksLoadingError && (
        <h3>Something went wrong. Please refresh the page.</h3>
      )}
      {!tasksLoading && !showTasksLoadingError && (
        <>
          {(tasks.length > 0)
            ? (taskTitleSearch === '') 
                ? tasksGrid
                : filterTasksGrid
            : <h3>You don't have any tasks yet</h3>}
        </>
      )}
      {showAddTaskDialog && (
        <AddEditTaskDialog
          onDismiss={() => setShowAddTaskDialog(false)}
          onTaskSaved={(newTask) => {
            setTasks([...tasks, newTask]);
            setShowAddTaskDialog(false);
          }}
        />
      )}
      {taskToEdit && (
        <AddEditTaskDialog
          taskToEdit={taskToEdit}
          onDismiss={() => setTaskToEdit(null)}
          onTaskSaved={(updatedTask) => {
            setTasks(
              tasks.map((existingTask) =>
                existingTask._id === updatedTask._id
                  ? updatedTask
                  : existingTask
              )
            );
            setTaskToEdit(null);
          }}
        />
      )}
    </>
  );
};

export default TasksPageLoggedInView;
