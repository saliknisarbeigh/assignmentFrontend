import { useState, useEffect } from 'react';
import { Search, Filter, X } from 'lucide-react';

export default function TaskFilters({ 
  onFilterChange, 
  onSearch, 
  activeFilters = {}
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    priority: activeFilters.priority || '',
    status: activeFilters.status || '',
    dueDate: activeFilters.dueDate || ''
  });

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery !== '') {
        onSearch(searchQuery);
      } else {
        onSearch('');
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, onSearch]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      priority: '',
      status: '',
      dueDate: ''
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const hasActiveFilters = Object.values(filters).some(val => val !== '');

  return (
    <div className="mb-6 space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search tasks..."
            className="block w-full pl-10 pr-3 py-2 border border-white/10 bg-white/5 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Toggle Filters Button */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`inline-flex items-center justify-center px-4 py-2 border rounded-lg transition-colors ${
            hasActiveFilters
              ? 'bg-purple-500/10 border-purple-500/50 text-purple-400'
              : 'border-white/10 hover:bg-white/5 text-gray-300'
          }`}
        >
          <Filter className="w-4 h-4 mr-2" />
          Filters
          {hasActiveFilters && (
            <span className="ml-2 px-1.5 py-0.5 text-xs rounded-full bg-purple-500/20 text-purple-300">
              {Object.values(filters).filter(Boolean).length}
            </span>
          )}
        </button>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-gray-900/50 border border-white/10 rounded-xl p-4 space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="text-sm font-medium text-gray-300">Filter Tasks</h4>
            <div className="flex space-x-2">
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-xs text-gray-400 hover:text-white flex items-center"
                >
                  <X className="w-3 h-3 mr-1" /> Clear all
                </button>
              )}
              <button
                onClick={() => setShowFilters(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Priority Filter */}
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">
                Priority
              </label>
              <select
                name="priority"
                value={filters.priority}
                onChange={handleFilterChange}
                className="w-full bg-gray-800/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">All Priorities</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">
                Status
              </label>
              <select
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                className="w-full bg-gray-800/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">All Statuses</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
              </select>
            </div>

            {/* Due Date Filter */}
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">
                Due Date
              </label>
              <select
                name="dueDate"
                value={filters.dueDate}
                onChange={handleFilterChange}
                className="w-full bg-gray-800/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">All Dates</option>
                <option value="today">Today</option>
                <option value="tomorrow">Tomorrow</option>
                <option value="week">This Week</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
