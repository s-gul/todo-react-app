import './App.css';
import React, { useState } from 'react';
function App() {
  const date = new Date();

  const getTheDate = () => {
    return ((date.getMonth()-1) < 10 ? ('0'+(date.getMonth()-1)) : (date.getMonth()-1))  + '/' + ((date.getDate() < 10) ? ('0'+ date.getDate()) : date.getDate()) + '/' + date.getFullYear();
  };

  const [todoItems, setTodoItems] = React.useState([]);
  const addTodo = text => {
    if(text.length <= 117){
      const newTodoItems = [...todoItems, {text:text, check:false, date: getTheDate()}];
      setTodoItems(newTodoItems);
    }
  };
  const delItem = index => {
    const newTodoItems = [...todoItems];
    newTodoItems.splice(index, 1);
    setTodoItems(newTodoItems);
  };
  const done = index => {
    const newTodoItems = [...todoItems];
    newTodoItems[index].check = true;
    setTodoItems(newTodoItems);
  };
  return (
    <div className="App">
      <div className='submitForm'><TodoForm addTodo={addTodo}/></div>
      <div className = "todoList">
        {todoItems.map((todo, index) => (
          <TodoItem index={index} todo={todo} delItem={delItem} done={done}/>
        ))}
      </div>
    </div>
  );
}

function TodoItem({todo, delItem, done, index}){
  return (
          <div className = "todo">
            <div className="delete" onClick={()=>delItem(index)}></div>
            <div className='todoContent'>
              <div className='date'>{todo.date}</div>
              <div className="todoText" style={{textDecoration: todo.check ? "line-through" : ""}}>{todo.text}</div>
              <button className='done' onClick={()=>done(index)}>done</button>
            </div>
          </div>)
};

function TodoForm({addTodo}){
  const[input, setInput] = useState("");
  const handleSubmit = e => {
    e.preventDefault();
    if(input==="") return;
    addTodo(input);
    setInput("");
  };

  return (
  <form onSubmit={handleSubmit}>
    <input type="text" value={input} onChange={e=>setInput(e.target.value)}></input>
    <button className="submitButton" type='submit'>submit</button>
  </form>
  );
};

export default App;
