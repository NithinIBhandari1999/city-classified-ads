import { useLocation } from 'react-router-dom';

export function GetParamNameWithDefault(param_name , default_value ){
    let query = new URLSearchParams(useLocation().search);
    param_name = query.get(param_name)
    if( param_name === null ){
        return default_value;
    } else {
        return param_name;
    }
}