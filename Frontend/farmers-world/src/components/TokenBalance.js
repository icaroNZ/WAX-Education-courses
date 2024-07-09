import React from 'react';
import {HStack, Text, Spinner} from '@chakra-ui/react'
import {useSelector} from 'react-redux'
const TokenBalance = () => {
    const {WOOD, FOOD, GOLD, isLoading, error} = useSelector(state => state.tokens)
    const {isLoggedIn} = useSelector(state => state.auth)

    if(!isLoggedIn){
        return
    }
    if(isLoading){
        return <Spinner size='sm'/>
    }

    if(error){
        return <Text color='red.500'>Error loading balances</Text>
    }
    
    return(
        <HStack spacing={4} fontSize='sm'>
            <Text>FOOD: {FOOD}</Text>
            <Text>WOOD: {WOOD}</Text>
            <Text>GOLD: {GOLD}</Text>
        </HStack>
    )
}

export default TokenBalance