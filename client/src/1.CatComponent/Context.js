import React, { useContext } from "react"


const HeaderDefine=
      React.createContext({
        phone: '9632222868',
        fullname:"",
        role:"Guest",
        pwd:"",
        repwd:"",
        date:"",
    })
export const ThingsProvider=HeaderDefine.Provider

export default HeaderDefine;

