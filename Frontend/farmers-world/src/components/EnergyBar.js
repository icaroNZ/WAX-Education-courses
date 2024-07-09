import React from 'react'
import { Box, Progress, Text } from '@chakra-ui/react'
import {useSelector} from 'react-redux'
const EnergyBar = () => {
    const {isLoading, energy, maxEnergy, error } = useSelector(state => state.user);
    const {isLoggedIn} = useSelector(state => state.auth);
    if (!isLoggedIn){
        return null;
    }

    if(isLoading){
        return <Text>Loading Energy...</Text>
    }

    if(error){
        return <Text color="red.500">Error loading energy</Text>
    }

    return (
        <Box>
            <Text fontSize='x1' fontWeight='bold' mb={2}>Energy</Text>
            <Text>Energy: {energy} / {maxEnergy}</Text>
            <Progress value={energy/maxEnergy * 100} width='100%' colorScheme='green'/>
        </Box>
    )
}

export default EnergyBar