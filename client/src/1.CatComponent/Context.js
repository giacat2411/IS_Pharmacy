import React, { useContext, useState } from "react"

const HeaderDefine = React.createContext();

export const HeaderProvider = ({children}) => {
  const [phone, setPhone] = useState('9632222868');
  const [role, setRole] = useState('Guest');
  const [name, setName] = useState('Hồng Phúc');

  return (
    <HeaderDefine.Provider value = {{phone, role,name, setPhone, setRole,setName}}>
      {children}
    </HeaderDefine.Provider>
  );
}

export default HeaderDefine;

