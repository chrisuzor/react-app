import React, {useContext} from 'react';
import TodoItemsRemaining from './TodoItemsRemaining';
import TodoClearCompleted from './TodoClearCompleted';
import TodoCompleteAll from './TodoCompleteAll';
import TodoFilters from './TodoFilters';
import useToggle from '../hooks/useToggle';
import { TodosContext } from '../context/TodosContext';
import { CSSTransition } from 'react-transition-group';
import { TransitionGroup } from 'react-transition-group';

function TodoList(props) {
    const {todosFiltered, todos, setTodos} = useContext(TodosContext);
    const [isFeaturesOneVisible, setFeaturesOneVisible] = useToggle();
    const [isFeaturesTwoVisible, setFeaturesTwoVisible] = useToggle();

    function deleteTodo(id){
      setTodos([...todos].filter(todo => todo.id !== id));
  }

  function cancelEditing(event, id){
    const updatedTodos = todos.map(todo => {
        if (todo.id === id){
            todo.isEditing = false
        }
        
        return todo;
   });
   setTodos(updatedTodos);
}

function markAsEditing(id){
  const updatedTodos = todos.map(todo => {
      if (todo.id === id){
          todo.isEditing = true
      }
      
      return todo;
 });

 setTodos(updatedTodos);
}

function updateTodo(event, id){
  const updatedTodos = todos.map(todo => {
       if (todo.id === id){
          if (event.target.value.trim().length === 0){
              todo.isEditing = false
              return todo;
          }
           todo.title = event.target.value
           todo.isEditing = false
       }
       
       return todo;
  });

  setTodos(updatedTodos);
}

function completeTodo(id){
  const updatedTodos = todos.map(todo => {
       if (todo.id === id){
           todo.isComplete = !todo.isComplete
       }
       
       return todo;
  });

  setTodos(updatedTodos);
}



  return (
    <>
    <TransitionGroup component="ul" className="todo-list">
        {todosFiltered().map((todo, index) => (
          <CSSTransition key={todo.id} timeout={300}
          classNames="slide-horizontal" >
      <li  className="todo-item-container">
        <div className="todo-item">
          <input type="checkbox" 
          onChange={() => completeTodo(todo.id)}
          checked={todo.isComplete ? true : false}
          />
          {!todo.isEditing ? (
          <span 
          onDoubleClick={() => markAsEditing(todo.id)}
          className={`todo-item-label ${todo.isComplete ? 'line-through' : ''}`}>
              {todo.title}</span>) : (
          <input type="text" 
          onBlur={(event) => updateTodo(event, todo.id)}
          onKeyDown= { event => {
              if(event.key === 'Enter'){
                updateTodo(event, todo.id);
              }else if (event.key === 'Escape'){
                  cancelEditing(event, todo.id)
              }
          }}
          className="todo-item-input" 
          defaultValue={todo.title}
          autoFocus
          />
              )}
        </div>
        <button onClick={() => deleteTodo(todo.id)} className="x-button">
          <svg
            className="x-button-icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </li>
      </CSSTransition>
         ) )}
    </TransitionGroup>

    <div className='toggles-container'>
      <button
      onClick={setFeaturesOneVisible}
      className="button">Feature One Toggle</button>

      <button  onClick={setFeaturesTwoVisible} className="button">Feature Two Toggle</button>
    </div>
    <CSSTransition
    in={isFeaturesOneVisible}
    timeout={300}
    classNames="slide-vertical"
    unmountOnExit
    >
    <div className="check-all-container">
      
    <TodoCompleteAll />

    <TodoItemsRemaining />
    </div>
    </CSSTransition>

    <CSSTransition
    in={isFeaturesTwoVisible}
    timeout={300}
    classNames="slide-vertical"
    unmountOnExit
    >
    <div className="other-buttons-container">
     <TodoFilters />
      <div>
      <TodoClearCompleted />
    
      </div>
    </div>
    </CSSTransition>
    </>
  )
}

export default TodoList