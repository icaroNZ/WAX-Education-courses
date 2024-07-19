import React, { useCallback, useEffect } from 'react'
import { clearNftTransaction } from '../features/actions/nftActionsSlice';
import { useToast } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';

const HandleToast = () => {
    const {error: claimError, lastTransaction} = useSelector(state => state.nftActions);
    const dispatch = useDispatch();
    const toast = useToast();
    const showToast = useCallback((title, description, status) => {
        toast({
            title,
            description,
            status,
            duration: 2500,
            isClosable: true
        })
    },[toast]);

    useEffect(() => {
        if(lastTransaction){
            showToast( "Claim Successful", `Successfuly claimed NFT with asset ID: `, "success")
        } else if(claimError){
            showToast("Claim Failed",  claimError, "error")
        }
        dispatch(clearNftTransaction())
    }, [lastTransaction, claimError, toast, dispatch])
}

export default HandleToast