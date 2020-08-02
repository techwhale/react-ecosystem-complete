import React, {useEffect} from 'react';
import { connect } from  'react-redux';
import styled from "styled-components";
import TodoListItem from './TodoListItem';
import {
    getTodos,
    getTodosLoading,
    getCompletedTodos,
    getIncompleteTodos,
} from "./selectors";
import NewTodoForm from './NewTodoForm';
import {
    loadTodos,
    removeTodoRequest,
    markTodoAsCompletedRequest,
} from "./thunks";

const ListWrapper = styled.div`
    max-width: 700px;
    margin: auto;
`;

const TodoList = ({completedTodos, incompletedTodos, onRemovePressed, onMarkCompleted, isLoading, startLoadingTodos}) => {
    useEffect(() => {
        startLoadingTodos();
    }, [])
    const loadingMessage = <div>Loading...</div>;
    const content = (
        <ListWrapper>
            <NewTodoForm/>
            <h3>Incomplete:</h3>
            {incompletedTodos.map(todo =>
                <TodoListItem
                    todo={todo}
                    key={todo.id}
                    onRemovePressed={onRemovePressed}
                    onMarkCompleted={onMarkCompleted}
                />)}

            <h3>Complete:</h3>
            {completedTodos.map(todo =>
                <TodoListItem
                    todo={todo}
                    key={todo.id}
                    onRemovePressed={onRemovePressed}
                    onMarkCompleted={onMarkCompleted}
                />)}
        </ListWrapper>
    );
    return isLoading ? loadingMessage : content;
};

const mapStateToProps = state => ({
    isLoading: getTodosLoading(state),
    completedTodos: getCompletedTodos(state),
    incompletedTodos: getIncompleteTodos(state)
});

const mapDispatchToProps = dispatch => ({
    startLoadingTodos: () => dispatch(loadTodos()),
    onRemovePressed: id => dispatch(removeTodoRequest(id)),
    onMarkCompleted: id => dispatch(markTodoAsCompletedRequest(id)),
    // onMarkCompleted: text => dispatch(markTodoCompleted(text)),
    // onRemovePressed: text => dispatch(removeTodo(text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
