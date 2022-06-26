import '../reset.css';
import '../App.css';
import NoTodos from './NoTodos';
import TodoList from './TodoList';
import TodoForm from './TodoForm';
import useLocalStorage from '../hooks/useLocalStorage';
import { useEffect, useMemo, useRef } from 'react';

function App() {
    const [name, setName] = useLocalStorage('name', '');
    const nameInputEl = useRef(null);
    const [todos, setTodos] = useLocalStorage('todos', []);
    // const [todos, setTodos] = useState([
    //    {
    //     id: 1,
    //     title: 'Finish React Series',
    //     isComplete: false,
    //     isEditing: false
    //    },
    //    {
    //     id: 2,
    //     title: 'Go Grocery',
    //     isComplete: true,
    //     isEditing: false
    //    },
    //    {
    //     id: 3,
    //     title: 'Take over world',
    //     isComplete: false,
    //     isEditing: false
    //    },
    // ]);

    
    const [idForTodo, setIdForTodo] = useLocalStorage('idForTodo', 1);


    function addTodo(todo){
       
        setTodos([
            ...todos,
            {
            id: idForTodo,
            title: todo,
            isComplete: false,
            isEditing: false
        }])

        setIdForTodo(prevIdForTodo => prevIdForTodo + 1);
    }

    function deleteTodo(id){
        setTodos([...todos].filter(todo => todo.id !== id));
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

    function markAsEditing(id){
        const updatedTodos = todos.map(todo => {
            if (todo.id === id){
                todo.isEditing = true
            }
            
            return todo;
       });

       setTodos(updatedTodos);
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

    function remainingCalculation(){
        return todos.filter(todo => !todo.isComplete).length;
    }

    const remaining = useMemo(remainingCalculation, [todos]);

    function clearCompleted(){
        setTodos([...todos].filter(todo => !todo.isComplete));
    }

    function completeAllTodos(){
        const updatedTodos = todos.map(todo => {
            todo.isComplete = true;

            return todo;
        });

        setTodos(updatedTodos);
    }

    function todosFiltered(filter){
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
        <TodoForm addTodo={addTodo} />

        {todos.length > 0 ? (
        <TodoList todos={todos}
            completeTodo={completeTodo}
            markAsEditing={markAsEditing}
            updateTodo={updateTodo}
            cancelEditing={cancelEditing}
            deleteTodo={deleteTodo}
            remaining={remaining}
            clearCompleted={clearCompleted}
            completeAllTodos={completeAllTodos}
            todosFiltered={todosFiltered}
        />
        ): (
         <NoTodos />
        )
        }
      </div>
    </div>
  );
}

export default App;