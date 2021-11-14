import React, { useContext, useState } from "react"

const HeaderDefine = React.createContext();

export const HeaderProvider = ({children}) => {
  const [phone, setPhone] = useState('9632222868');
  const [role, setRole] = useState('Guest');

  return (
    <HeaderDefine.Provider value = {{phone, role, setPhone, setRole}}>
      {children}
    </HeaderDefine.Provider>
  );
}

export default HeaderDefine;

