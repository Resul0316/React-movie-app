import { createContext, useEffect, useState } from "react";
import { userObserver } from "../auth/firebase";

// I created a context = AuthContext. Ve bunu uygulamanin her yerinden cagirabiliriz. Consume edebiliriz. (bu kisim consume kismi)
export const AuthContext = createContext();

// Uretim kismi. Produce!
const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    userObserver(setCurrentUser);
  }, []);

  return (
    // bunun arasindaki butun childrenlar icin gecerli. Valuenin icine gondermek istedigimiz degeri yazariz.
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
