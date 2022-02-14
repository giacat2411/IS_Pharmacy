import axios from "axios";
import React, { useState, useEffect } from "react"

const HeaderDefine = React.createContext();

let session = {
  phone: '',
  role: 'Guest',
  name: '',
  img: ''
};

(async () => {
  const res = await axios.get('https://mysql-healthcare.herokuapp.com/api/get/session', {params: {session_id: sessionStorage.getItem('sessionId')}});
  console.log(res.data)
  session = {
    phone: res.data.phone === undefined ? '' : res.data.phone,
    role: res.data.role === undefined ? 'Guest' : res.data.role,
    name: res.data.firstname === undefined ? '' : res.data.firstname,
    img: res.data.img === undefined ? '' : res.data.img
  }
  if (res.data.phone !== undefined)
    if (res.data.phone !== '') {
      const res2 = await axios.get('https://mysql-healthcare.herokuapp.com/api/get/role', { params: { phonenum: res.data.phone } });
      if (res2.data.role !== undefined) session.role = res2.data.role;
      console.log(res2.data.role);
    }
})()

// const checkData = async () => {
//   await axios.get('/api/get/session')
//   axios.get('/api/get/session').then((res) => {
//     console.log(res.data)
//     session = {
//       phone: res.data.phone ? '097100000' : res.data.phone,
//       role: res.data.role ? 'Guest' : res.data.role,
//       name: res.data.firstname ? 'Hong Phuc' : res.data.firstname,
//       img: res.data.img ? '' : res.data.img
//     }
//   }
//   )
// }

export const HeaderProvider = ({ children }) => {
  // useEffect(() => {
  //   setTimeout(() => {
  //     checkData();
  //   }, 1000);
  // }, []);

  // console.log(session)
  const [phone, setPhone] = useState(session.phone);
  const [role, setRole] = useState(session.role);
  const [name, setName] = useState(session.name);
  const [img, setImg] = useState(session.img);

  return (
    <HeaderDefine.Provider value={{ phone, role, name, setPhone, setRole, setName, img, setImg }}>
      {children}
    </HeaderDefine.Provider>
  );
}

export default HeaderDefine;

