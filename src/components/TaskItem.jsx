import { motion } from 'framer-motion';
import { Check, Trash2, Edit } from 'lucide-react';
import { useTasks } from '../contexts/TaskContext.jsx';
import { useState } from 'react';
import EditTaskForm from './EditTaskForm';

const TaskItem = ({ task }) => {
  const { toggleComplete, removeTask, updateTask } = useTasks();
  const [isHovered, setIsHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async (id, updates) => {
    try {
      await updateTask(id, updates);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const priorityColors = {
    high: 'bg-red-500/10 text-red-400',
    medium: 'bg-yellow-500/10 text-yellow-400',
    low: 'bg-green-500/10 text-green-400',
  };

  if (isEditing) {
    return (
      <EditTaskForm 
        task={task} 
        onSave={handleSave} 
        onCancel={handleCancel} 
      />
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className={`relative overflow-hidden rounded-xl backdrop-blur-sm bg-white/5 border border-white/10 p-4 transition-all ${
        task.completed ? 'opacity-60' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <button
            onClick={() => toggleComplete(task._id, task.completed)}
            className={`flex-shrink-0 w-5 h-5 rounded-full border-2 mt-1 flex items-center justify-center transition-colors ${
              task.completed
                ? 'bg-purple-500 border-purple-500'
                : 'border-gray-500 hover:border-purple-400'
            }`}
          >
            {task.completed && <Check className="w-3 h-3 text-white" />}
          </button>

          <div className="flex-1">
            <h3
              className={`font-medium ${
                task.completed ? 'line-through text-gray-400' : 'text-white'
              }`}
            >
              {task.title}
            </h3>
            {task.description && (
              <p className="text-sm text-gray-400 mt-1">{task.description}</p>
            )}
            <div className="flex items-center mt-2 space-x-2">
              {task.dueDate && (
                <span className="text-xs px-2 py-1 bg-white/5 rounded-full">
                  📅 {new Date(task.dueDate).toLocaleDateString()}
                </span>
              )}
              {task.priority && (
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    priorityColors[task.priority] || 'bg-gray-500/10'
                  }`}
                >
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                </span>
              )}
            </div>
          </div>
        </div>

        <motion.div
          className="flex space-x-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
        >
          <button
            onClick={handleEdit}
            className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
          >
            <Edit className="w-4 h-4 text-gray-400" />
          </button>
          <button
            onClick={() => removeTask(task._id)}
            className="p-1.5 hover:bg-red-500/10 text-red-400 rounded-full transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TaskItem;
