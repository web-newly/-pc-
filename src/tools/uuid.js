import { v4 as uuidv4 } from 'uuid';

export const uuId = () => {
    if(!(localStorage.getItem('uuid_token'))){
        localStorage.setItem('uuid_token',uuidv4())
    }
    return localStorage.getItem('uuid_token')
}