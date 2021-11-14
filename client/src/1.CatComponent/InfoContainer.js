
import {HeaderDefine, ThingsProvider} from './Context';

const InfoContainer = props =>{
    const input = {
        user:{
            phone: '9632222868',
            fullname:"",
            role:"Guest",
        }
    }
    return <ThingsProvider value={input}/>
}