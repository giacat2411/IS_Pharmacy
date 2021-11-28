import React, { useState } from "react"

const HeaderDefine = React.createContext();

export const HeaderProvider = ({children}) => {
  const [phone, setPhone] = useState('9632222868');
  const [role, setRole] = useState('Guest');
  const [name, setName] = useState('Hồng Phúc');
  const [img, setImg] = useState('https://www.pngkey.com/png/full/115-1150152_default-profile-picture-avatar-png-green.png');

  return (
    <HeaderDefine.Provider value = {{phone, role,name, setPhone, setRole,setName,img, setImg}}>
      {children}
    </HeaderDefine.Provider>
  );
}

export default HeaderDefine;

