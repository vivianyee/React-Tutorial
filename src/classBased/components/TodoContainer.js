import React from "react"
import { v4 as uuidv4 } from "uuid";
import TodosList from "./TodosList";
import Header from "./Header"
import InputTodo from "./InputTodo"
class TodoContainer extends React.Component {
  state = {
    todos: []
  };

  handleChange = id => {
    this.setState(prevState => ({
      todos: prevState.todos.map(todo => { // prevState or this.state
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          }
        }
        return todo;
      })
    }));
  };

  delTodo = id => {
    this.setState({
      todos: [
        ...this.state.todos.filter(todo => { // make todos 
          return todo.id !== id;
        })
      ]
    });
  };

  addTodoItem = title => {
    const newTodo = {
      id: uuidv4(),
      title: title,
      completed: false
    };
    this.setState({
      todos: [...this.state.todos, newTodo]
    });
  };

  setUpdate = (updatedTitle, id) => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.title = updatedTitle
        }
        return todo
      }),
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.todos !== this.state.todos) {
      const temp = JSON.stringify(this.state.todos)
      localStorage.setItem("todos", temp)
    }
  }

  componentDidMount() {
    const temp = localStorage.getItem("todos")
    const loadedTodos = JSON.parse(temp)
    if (loadedTodos) {
      this.setState({
        todos: loadedTodos
      })
    }
  }

  render() {
    return (
      <React.Fragment>
        <ul>
          {this.state.todos.map(todo => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        </ul>

        <div>
          <TodosList todos={this.state.todos} />
        </div>

        <div className = "container">
          <div className = "inner">
            <Header /><InputTodo addTodoProps={this.addTodoItem}/>
            <TodosList deleteTodoProps={this.delTodo}
              todos={this.state.todos} 
              handleChangeProps={this.handleChange}
              setUpdate = {this.setUpdate}/>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
export default TodoContainer