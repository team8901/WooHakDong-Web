import { createContext, useContext, ReactNode, useReducer } from "react";

interface UserState {
  accessToken: string;
  refreshToken: string;
  userID: number;
}

interface AuthContextProps {
  user: UserState | null;
  login: (newUser: UserState) => void;
  logout: () => void;
}

type UserAction = { type: "LOGIN"; user: UserState } | { type: "LOGOUT" };

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

const initialUserState: UserState | null = null;

const userReducer = (state: UserState | null, action: UserAction) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("userID", "12342");
      return { ...action.user };
    case "LOGOUT":
      localStorage.removeItem("userID");
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

  const login = (newUser: UserState) => {
    dispatch({ type: "LOGIN", user: newUser });
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
