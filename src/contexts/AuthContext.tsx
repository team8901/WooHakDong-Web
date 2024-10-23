import { LoginData } from 'types/auth';
import { createContext, useContext, ReactNode, useReducer, useMemo } from 'react';

type UserState = {
  memberEmail: string;
  memberName: string;
};

interface AuthContextProps {
  user: UserState | null;
  login: (loginData: LoginData) => void;
  logout: () => void;
}

type UserAction = { type: 'LOGIN'; user: UserState } | { type: 'LOGOUT' };

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

const initialUserState: UserState | null = null;

const userReducer = (state: UserState | null, action: UserAction) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...action.user };
    case 'LOGOUT':
      return initialUserState;
    default:
      return state;
  }
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, dispatch] = useReducer(userReducer, initialUserState);

  const login = (loginData: LoginData) => {
    const { accessToken, refreshToken } = loginData;
    // const newUser = { memberEmail, memberName };
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    // dispatch({ type: "LOGIN", user: newUser });
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    dispatch({ type: 'LOGOUT' });
  };

  const contextValue = useMemo(() => ({ user, login, logout }), [user]);

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
