import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Loader2 } from 'lucide-react';
import { useTasks } from '../contexts/TaskContext.jsx';
import TaskItem from './TaskItem.jsx';
import TaskForm from './TaskForm.jsx';
import TaskFilters from './TaskFilters.jsx';
import { useState, useMemo } from 'react';
import { Card, CardHeader, CardBody } from './ui/Card';
import Button from './ui/Button';
import Container from './layout/Container';

const Tasks = () => {
  const { tasks, loading, error } = useTasks();
  const [showForm, setShowForm] = useState(false);
  const [filters, setFilters] = useState({
    priority: '',
    status: '',
    dueDate: ''
  });
  const [searchQuery, setSearchQuery] = useState('');

  // Filter and search tasks
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      // Search filter
      const matchesSearch = searchQuery === '' || 
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase()));
      
      // Priority filter
      const matchesPriority = !filters.priority || task.priority === filters.priority;
      
      // Status filter
      let matchesStatus = true;
      if (filters.status === 'completed') {
        matchesStatus = task.completed;
      } else if (filters.status === 'pending') {
        matchesStatus = !task.completed;
      }
      
      // Due date filter
      let matchesDueDate = true;
      if (filters.dueDate && task.dueDate) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const taskDate = new Date(task.dueDate);
        taskDate.setHours(0, 0, 0, 0);
        
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        const endOfWeek = new Date(today);
        endOfWeek.setDate(endOfWeek.getDate() + (7 - endOfWeek.getDay()));
        
        switch (filters.dueDate) {
          case 'today':
            matchesDueDate = taskDate.getTime() === today.getTime();
            break;
          case 'tomorrow':
            matchesDueDate = taskDate.getTime() === tomorrow.getTime();
            break;
          case 'week':
            matchesDueDate = taskDate >= today && taskDate <= endOfWeek;
            break;
          case 'overdue':
            matchesDueDate = taskDate < today && !task.completed;
            break;
          default:
            matchesDueDate = true;
        }
      }
      
      return matchesSearch && matchesPriority && matchesStatus && matchesDueDate;
    });
  }, [tasks, filters, searchQuery]);
  
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };
  
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  if (loading && filteredTasks.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-400 bg-red-900/20 rounded-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-64px)]">
      <Container className="pt-6 pb-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold text-white truncate">
              My Tasks
              {(searchQuery || Object.values(filters).some(Boolean)) && (
                <span className="text-sm sm:text-base font-normal text-gray-400 ml-2">
                  ({filteredTasks.length} tasks)
                </span>
              )}
            </h1>
            <p className="text-gray-400 text-sm sm:text-base">Manage your tasks efficiently</p>
          </div>
          <Button 
            onClick={() => setShowForm(true)}
            leftIcon={Plus}
            variant="primary"
            size="md"
            className="w-full sm:w-auto justify-center mt-2 sm:mt-0"
          >
            Add New Task
          </Button>
        </div>
        
        <Card className="mb-4">
          <CardBody className="p-3 sm:p-4">
            <TaskFilters 
              onFilterChange={handleFilterChange}
              onSearch={handleSearch}
              activeFilters={filters}
            />
          </CardBody>
        </Card>

        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-4"
          >
            <TaskForm onClose={() => setShowForm(false)} />
          </motion.div>
        )}
      </Container>

      <div className="flex-1 overflow-y-auto pb-24">
        <Container className="py-2">
          {filteredTasks.length === 0 && !loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8 sm:py-12 px-4"
            >
              <div className="mx-auto w-14 h-14 sm:w-16 sm:h-16 bg-gray-800 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                <svg className="w-7 h-7 sm:w-8 sm:h-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg font-medium text-white mb-1">
                {tasks.length > 0 ? 'No tasks found' : 'No tasks yet'}
              </h3>
              <p className="text-sm sm:text-base text-gray-400">
                {tasks.length > 0 ? 'Try adjusting your filters or search query.' : 'Get started by creating your first task.'}
              </p>
              {tasks.length === 0 && (
                <div className="mt-4 sm:mt-6">
                  <Button
                    onClick={() => setShowForm(true)}
                    variant="primary"
                    leftIcon={Plus}
                    size="sm"
                    className="text-sm"
                  >
                    Create Task
                  </Button>
                </div>
              )}
            </motion.div>
          ) : (
            <AnimatePresence>
              <div className="space-y-3 sm:space-y-4 px-1">
                {filteredTasks.map((task) => (
                  <motion.div
                    key={task._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    layout
                    className="bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700/30"
                  >
                    <TaskItem task={task} />
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
          )}
        </Container>
      </div>
    </div>
  );
};

export default Tasks;
