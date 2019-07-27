import React from 'react';

import './todo-list-item.css';

export default class TodoListItem extends React.Component {

  render() {
    const { label, onDeleted, onToggleImportant, onToggleDone, done, important } = this.props;
    let classNames = 'todo-list-item';
    if (done)
      classNames += ' done';
    if (important)
      classNames += ' important';

    return (
      <span className={classNames}>
        <span
          onClick={onToggleDone}
          className="todo-list-item-label"
        >
          {label}
        </span>


        <button type="button"
          className="btn btn-outline-danger btn-sm float-right"
          onClick={onDeleted}
        >
          <i className="fa fa-trash-o" />
        </button>

        <button type="button"
          className="btn btn-outline-primary btn-sm float-right"
          onClick={onToggleImportant}
        >
          <i className="fa fa-exclamation" />
        </button>
      </span>
    );
  }
};
