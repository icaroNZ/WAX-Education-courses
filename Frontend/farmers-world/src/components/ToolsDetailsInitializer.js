import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {fetchToolsDetailsRequest} from '../features/tools/toolsDetailsSlice'

const ToolsDetailsInitiliazer = () => {
    const dispatch = useDispatch();
    const {isLoggedIn} = useSelector(state => state.auth)
    useEffect(() => {
        if(!isLoggedIn){
            return
        }
        
        dispatch(fetchToolsDetailsRequest())
        
    }, [dispatch, isLoggedIn])
    return null;
}

export default ToolsDetailsInitiliazer