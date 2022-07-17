interface Auth {
  token: string|null;
  user: {
    isLogin: boolean;
    userNm: string;
    loginDt: Date|null;
  }
}

interface Action {
  type: string;
  input: Auth;
}

// action
const SET_AUTH: string = 'auth/SET_AUTH';
const RESET_AUTH: string = 'auth/RESET_AUTH'
const GET_AUTH: string = 'auth/GET_AUTH';

const setAuth = (input: Auth) => ({
  type: SET_AUTH,
  input
});

const resetAuth = () => ({
  type: RESET_AUTH
});

const initialState: Auth = {
  token: null,
  user: {
    isLogin: false,
    userNm: '',
    loginDt: null
  }
}

function authReducer(state: Auth = initialState, action: Action) {
  switch (action.type) {
    case SET_AUTH:
      return action.input;
    case RESET_AUTH:
      return initialState;
    default:
      return state;
  }
}

export { setAuth, resetAuth };
export type { Auth };
export default authReducer;