import useLocalStorege from './use-local-storege';
import {Task} from '../types';
import {nanoid} from 'nanoid';
import {shuffle} from 'lodash';
import { useContext, useState } from 'react';
import TaskContext from '../contexts/task-store';

const useTaskStore = () => {
    const [tasks, setTasks] = useContext(TaskContext);
    const [focusedTaskId, setFocusedTaskId] = useState<string | undefined>(undefined);
  
  
    const addTask = (task: Pick<Task, "label">) => {
      const id = nanoid()
      setTasks(tasks => [...tasks, { id:id, label: task.label, isComplete: false }]);
        if(!focusedTaskId) setFocusedTaskId(id)
  
    }
  
    const updateTaskCompletion = (taskId: string, isComplete: boolean ) => {
      setTasks(tasks => tasks.map(task => {
        if (task.id === taskId) return { ...task, isComplete};
        return task;
      })
      );
    }
  
    const focusedTask = tasks.find((task) => task.id === focusedTaskId);
  
    const shuffleFocusTask = () => {
      setFocusedTaskId(
        shuffle(tasks.filter(task => !task.isComplete))[0]?.id 
        );
    };
  
    const api = {addTask, focusedTask, tasks, setTasks, shuffleFocusTask, updateTaskCompletion };

    return api;
}

export default useTaskStore;