import React from 'react'

import PropTypes from 'prop-types';


TodoClearCompleted.propTypes = {
    clearCompleted: PropTypes.func.isRequired
};

function TodoClearCompleted(props) {
  return (
    <div onClick={props.clearCompleted} className="button">Clear completed</div>
  )
}

export default TodoClearCompleted