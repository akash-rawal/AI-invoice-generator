import React, { createContext,    useEffect, useState } from "react";

export const AuthContext = createContext();



export const AuthProvider =({children})=>{
  const [user,setUser] = useState(null);
  const [loading,setloading] = useState(true);
  const [isAuthenticated,setIsAuthenticated] = useState(false);

  useEffect(()=>{
    checkAuthStatus();
},[]);

  const checkAuthStatus = async()=>{
    try {
      const token = localStorage.getItem('token');
      const userStr = localStorage.getItem('user');
      if(token && userStr){
        const userData = JSON.parse(userStr);
        setUser(userData)
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('auth check failed;',error)
    }finally{
      setloading(false);
    }
  };
  
  const login = (userData,token)=>{
      localStorage.setItem('token',token);
      localStorage.setItem('user',JSON.stringify(userData));
      setUser(userData);
      setIsAuthenticated(true);
  };

  const logout =()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');

    setUser(null);
    setIsAuthenticated(false);
    window.location.href='/';
  };

  const updateUser = (updateUserData)=>{
    const newUserData = {...user,...updateUserData};
    localStorage.setItem('user',JSON.stringify(newUserData));
    setUser(newUserData);
  };

  const value ={
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    updateUser,
    checkAuthStatus
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );

}
