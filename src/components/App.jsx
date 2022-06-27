import '../reset.css';
import '../App.css';
import NoTodos from './NoTodos';
import TodoList from './TodoList';
import TodoForm from './TodoForm';
import useLocalStorage from '../hooks/useLocalStorage';
import { useEffect, useRef, useState } from 'react';
import { TodosContext } from '../context/TodosContext';

function App() {
    const [name, setName] = useLocalStorage('name', '');
    const nameInputEl = useRef(null);
    const [todos, setTodos] = useLocalStorage('todos', []);
    const [idForTodo, setIdForTodo] = useLocalStorage('idForTodo', 1);
    const [filter, setFilter] = useState('all');
    

    function todosFiltered(){
        if (filter === 'active'){
            return todos.filter( todo => !todo.isComplete);
        }else if(filter === 'completed'){
            return todos.filter( todo => todo.isComplete);
        }
        return todos;
    }

    useEffect(() => {
        nameInputEl.current.focus();

        return function cleanup(){
            //when you have some cleaning up to do
        };
    }, []);

    function handleNameInput(event){
        setName(event.target.value);
    }

  return (
      <TodosContext.Provider value={{todos,
       setTodos,
        idForTodo,
        setIdForTodo,
         todosFiltered,
         filter,
         setFilter
         }}>
    <div className="todo-app-container">
      <div className="todo-app">
        <div className="name-container">
            <h2> What is your name? </h2>
            <form action="#">
                <input type="text"
                 className="todo-input"
                 ref={nameInputEl}
                  placeholder="What is your name?"
                  value={name}
                  onChange={handleNameInput}
                  />
            </form>
            {name && <p className="name-label" >Hello, {name}</p>}
        </div>

        <h2>Todo App </h2>
        <TodoForm />

        {todos.length > 0 ? (
        <TodoList />
        ): (
         <NoTodos />
        )
        }
      </div>
    </div>
    </TodosContext.Provider>
  );
}

export default App;