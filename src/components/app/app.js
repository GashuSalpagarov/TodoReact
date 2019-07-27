import React, { Component } from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';

export default class App extends Component {

  maxId = 100;

  state = {
    todoData: [this.createTodoItem('First thing to do')],
    term: '',
    filter: 'all' // all, active, done
  };
  filter(items, filter) {
    switch (filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter((item) => !item.done);
      case 'done':
        return items.filter((item) => item.done);
      default:
        return items;
    };
  };
  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++
    };
  };
  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const newTodoData = [...todoData];
      const idx = newTodoData.findIndex((el) => el.id === id);
      newTodoData.splice(idx, 1);
      return {
        todoData: newTodoData
      };
    });
  };

  addItem = (text) => {
    this.setState(({ todoData }) => {
      const newItem = this.createTodoItem(text);
      const newTodoData = [...todoData, newItem];
      return {
        todoData: newTodoData
      };
    });
  };
  toggleProperty = (arr, id, propName) => {
    const idx = arr.findIndex((el) => el.id === id);
    const oldItem = arr[idx];
    const newItem = {
      ...oldItem,
      [propName]: !oldItem[propName]
    };

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  }
  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done')
      };
    });
  };
  onToggleImportant = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      };
    });
  };
  onSearchChange = (term) => {
    this.setState({ term });
  };
  onFilterChange = (filter) => {
    this.setState({ filter });
  };
  search(items, term) {
    if (term.length === 0) {
      return items;
    };
    return items.filter((item) => {
      return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
    });
  }

  render() {
    const { todoData, term, filter } = this.state;
    const visibleItems = this.filter(this.search(todoData, term), filter);
    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;
    return (
      <div className="todo-app" >
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel
            onSearchChange={this.onSearchChange}
          />
          <ItemStatusFilter
            filter={filter}
            onFilterChange={this.onFilterChange}
          />
        </div>

        <TodoList
          todos={visibleItems}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />
        <ItemAddForm
          onItemAdded={this.addItem}
        />
      </div>
    );
  };

};

