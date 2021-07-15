import {requests} from './axios'

export const isAuthenticated = async () =>
{
    let retVal = false;
    await requests.get("/")
    .then(res => {
        if(res.status === 201)
        {
            retVal = true;
        }
    }).catch(err => {retVal = false})
    console.log(retVal)

    return retVal;
}
