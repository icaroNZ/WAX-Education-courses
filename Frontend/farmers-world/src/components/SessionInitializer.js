import { useEffect } from 'react';
import {useDispatch} from 'react-redux';
import { restoreSessionRequest } from '../features/auth/authSlice';
const SessionInitializer = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(restoreSessionRequest())
    }, [dispatch])
}

export default SessionInitializer;