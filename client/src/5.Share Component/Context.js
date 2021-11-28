import axios from "axios";
import React, { useState,useEffect} from "react"

const HeaderDefine = React.createContext();

let session = {
  phone: '097100000',
  role: 'Guest',
  name: 'Hong Phuc',
  img: ''
};

// (async () => {
//   await axios.get('/api/get/session')
// })()

//  axios.get('/api/get/session').then((res) => {
//   console.log(res.data)
//   session = {
//     phone: res.data.phone === undefined ? '097100000': res.data.phone,
//     role: res.data.role === undefined ? 'Guest' : res.data.role,
//     name: res.data.firstname === undefined ? 'Hong Phuc' : res.data.firstname,
//     img: res.data.img === undefined ? '' : res.data.img
//   }
// })

const checkData=async()=>{
  await axios.get('/api/get/session').then((res)=>{
  console.log(res.data)
  session = {
    phone: res.data.phone? '097100000': res.data.phone,
    role: res.data.role? 'Guest' : res.data.role,
    name: res.data.firstname? 'Hong Phuc' : res.data.firstname,
    img: res.data.img? '' : res.data.img
  }
}
  )
}

export const HeaderProvider = ({children}) => {
useEffect(() => {
  setTimeout(() => {
      checkData();
  }, 1000);
}, []);
  console.log(session)
  const [phone, setPhone] = useState(session.phone);
  const [role, setRole] = useState(session.role);
  const [name, setName] = useState(session.name);
  const [img, setImg] = useState(session.img);

  return (
    <HeaderDefine.Provider value = {{phone, role,name, setPhone, setRole,setName,img, setImg}}>
      {children}
    </HeaderDefine.Provider>
  );
}

export default HeaderDefine;

