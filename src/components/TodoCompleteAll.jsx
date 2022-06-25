import React from 'react';
import PropTypes from 'prop-types';


TodoCompleteAll.propTypes = {
    remaining: PropTypes.func.isRequired
};

function TodoCompleteAll(props) {
  return (
    <div onClick={props.completeAllTodos} className="button">Check All</div>
  )
}

export default TodoCompleteAll