interface Remember {
  store: boolean;
  id: string;
}

interface Action {
  type: string;
  input: Remember
}

// action
const SET_REMEMBER: string = 'remember/SET_REMEMBER';

const setRemember = (input: Remember) => ({
  type: SET_REMEMBER,
  input
});

const initialState: Remember = {
  store: true,
  id: ''
};

function rememberReducer(state: Remember = initialState, action: Action) {
  switch (action.type) {
    case SET_REMEMBER:
      return action.input;
    default:
      return state;
  }
}

export { setRemember };
export type { Remember };
export default rememberReducer;