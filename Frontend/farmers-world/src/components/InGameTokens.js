import { Box, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";

const InGameTokens = () => {
    const {balances, isLoading, error } = useSelector(state => state.user);
    const {isLoggedIn} = useSelector(state => state.auth);

    if(!isLoggedIn){
        return
    }

    if(isLoading){
        return <Text>Loading token balances...</Text>
    }

    if(error){
        return <Text color="red.500">Error loading the tokens</Text>
    }

    return(
        <Box>
            <Text>Token Balances</Text>
            <VStack align="start" spacing={1}>
                {Object.entries(balances).map(([token, amount])=>(
                    <Text key={token}>{token}:{amount}</Text>
                ))}
            </VStack>
        </Box>
    )
}

export default InGameTokens