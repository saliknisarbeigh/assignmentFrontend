import { createContext, useContext, useState, useEffect } from 'react';
import { taskService } from '../services/taskService';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await taskService.getAll();
      setTasks(data);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to fetch tasks');
      console.error('Fetch tasks error:', err);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (taskData) => {
    try {
      const newTask = await taskService.create(taskData);
      setTasks(prev => [...prev, newTask]);
      return newTask;
    } catch (err) {
      setError(err.message || 'Failed to create task');
      throw err;
    }
  };

  const toggleComplete = async (id, currentStatus) => {
    try {
      const updatedTask = await taskService.update(id, { completed: !currentStatus });
      setTasks(prev => 
        prev.map(task => task._id === id ? { ...task, ...updatedTask } : task)
      );
    } catch (err) {
      setError(err.message || 'Failed to update task');
      throw err;
    }
  };

  const updateTask = async (id, updates) => {
    try {
      const updatedTask = await taskService.update(id, updates);
      setTasks(prev => 
        prev.map(task => task._id === id ? { ...task, ...updatedTask } : task)
      );
      return updatedTask;
    } catch (err) {
      setError(err.message || 'Failed to update task');
      throw err;
    }
  };

  const removeTask = async (id) => {
    try {
      await taskService.delete(id);
      setTasks(prev => prev.filter(task => task._id !== id));
    } catch (err) {
      setError(err.message || 'Failed to delete task');
      throw err;
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        error,
        addTask,
        toggleComplete,
        updateTask,
        removeTask,
        refetch: fetchTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};
