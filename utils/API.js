
import { CONSTANTS } from './constant'
import Axios from 'axios'

Axios.defaults.baseURL = CONSTANTS.serverURL

export const getProductList = async () => {
    const DATA = await Axios.get(CONSTANTS.productListURL,
        // {headers:{
        //     'Access-Control-Allow-Methods':'*',
        //     'Access-Control-Allow-Headers':'*',
        //     'Access-Control-Allow-Origin':'*'
        // }}
    ).then((res) => {
        if (res.status == 200) {
            console.log("this is api data: ", res.data);
            return res.data;
        }
    }).catch((err) => {
        console.log(err);
    })
    return DATA
}
