import React, {useState} from 'react';
import { connect } from 'react-redux';
// import { createTodo } from "./action";
import {getTodos} from "./selectors";
import {addTodoRequest} from "./thunks";
import styled from "styled-components";

// connect()(NewTodoForm) - higher order function

const FormContainer = styled.div`
    border-radius: 8px;
    padding: 16px;
    text-align: center;
    box-shadow: 0 4px 8px grey;
`;

const NewTodoInput = styled.input`
    font-size: 16px;
    padding: 8px;
    border: none;
    border-bottom: 2px solid #ddd;
    border-radius: 8px;
    width: 70%;
    outline: none;
`;

const NewTodoButton = styled.button`
    font-size: 16px;
    padding: 8px;
    border: none;
    border-radius: 8px;
    outline: none;
    cursor: pointer;
    margin-left: 8px;
    width: 20%;
    background-color: #22ee22;
`;

const NewTodoForm = ({todos, onCreatePressed}) => {
  const [inputValue, setInputValue] = useState('');
  return (
    <FormContainer>
      <NewTodoInput
        type="text"
        value={inputValue}
        placeholder="Type your new todo list"
        onChange={e => setInputValue(e.target.value)}
        />
      <NewTodoButton
          onClick={() => {
              const isDuplicateText =
                  todos.some(todo => todo.text === inputValue);
              if (! isDuplicateText) {
                  onCreatePressed(inputValue);
                  setInputValue('');
              }
          }}
      >Create Todo</NewTodoButton>
    </FormContainer>
  )
};

const mapStateToProps = state => ({
    todos: getTodos(state),
});
const mapDispatchToProps = dispatch => ({
    // onCreatePressed: text => dispatch(createTodo(text))
    onCreatePressed: text => dispatch(addTodoRequest(text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewTodoForm);
