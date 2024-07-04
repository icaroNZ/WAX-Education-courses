import React from "react";
import { Box, Button, Flex, Heading, Spacer } from "@chakra-ui/react";
import {loginRequest, logoutRequest} from '../features/auth/authSlice'
import {useSelector, useDispatch} from 'react-redux'
const NavBar = () => {
    const dispatch = useDispatch();
    const {isLoggedIn, isLoading} = useSelector((state) => state.auth);
    const handleAuthClick = () => {
        if(isLoggedIn){
            dispatch(logoutRequest());
        } else {
            dispatch(loginRequest());
        }
    }
    return(
        <Box bg="gray.100" px={4}>
            <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                <Heading size="md">Farmers World</Heading>
                <Spacer />
                <Button isLoading={isLoading} colorScheme="blue" onClick={handleAuthClick}>{isLoggedIn ? 'Logout' : 'Login'}</Button>
            </Flex>
        </Box>
    )
}

export default NavBar;