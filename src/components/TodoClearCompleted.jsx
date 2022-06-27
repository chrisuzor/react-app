import React, { useContext } from 'react';
import { TodosContext } from '../context/TodosContext';

function TodoClearCompleted(props) {

  const {todos, setTodos} = useContext(TodosContext);

  function clearCompleted(){
    setTodos([...todos].filter(todo => !todo.isComplete));
}
  return (
    <div onClick={clearCompleted} className="button">Clear completed</div>
  )
}

export default TodoClearCompleted