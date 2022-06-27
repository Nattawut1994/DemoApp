import {ACTION_ADD_MEMBER, ACTION_EDIT_MEMBER, ACTION_REMOVE_MEMBER} from './actionType';

const initialState = {
  members: [],
  isLoading: true
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
  
    case ACTION_ADD_MEMBER:
      return {...state, members: payload, isLoading: false};

    case ACTION_REMOVE_MEMBER:
      return {...state, members: payload, isLoading: false};

    case ACTION_EDIT_MEMBER:
      return {...state, members: payload, isLoading: false};

    default:
      return state;
  }
};
