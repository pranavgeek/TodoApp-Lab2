import { ADD_TODO, DELETE_TODO, EDIT_TODO } from "../actionTypes";

const initialState = {
  todo_list: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO: {
      const { id, task, status } = action.payload
      return {
        ...state,
        todo_list: [ ...state.todo_list, { id, task, status }]
      };
    }
    case DELETE_TODO: {
      const { id } = action.payload
      return {
        ...state,
        todo_list: state.todo_list.filter((todo) => todo.id != id)
      };
    }
    case EDIT_TODO: {
      // console.log('Handling EDIT_TODO action:', action);
      const {id, updateTask, updateStatus} = action.payload
      return {
        ...state,
        todo_list: state.todo_list.map(todo =>
          todo.id === action.payload.id
            ? { ...todo, task: action.payload.updateStatus, status: action.payload.updatedStatus }
            : todo
        ),
      };
    }
    default:
      return state;
  }
}