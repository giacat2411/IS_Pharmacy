import React from "react"

const HeaderDefine=
      React.createContext({user:{
        phone: '9632222868',
        fullname:"",
        role:"Guest",
    }})
export const ThingsProvider=HeaderDefine.Provider

export default HeaderDefine;