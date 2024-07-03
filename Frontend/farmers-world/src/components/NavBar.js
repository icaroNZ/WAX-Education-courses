import React from "react";
import { Box, Button, Flex, Heading, Spacer } from "@chakra-ui/react";
import {login, logout} from '../features/auth/authSlice'
import {useSelector, useDispatch} from 'react-redux'
const NavBar = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const handleAuthClick = () => {
        if(isLoggedIn){
            dispatch(logout());
        } else {
            dispatch(login());
        }
    }
    return(
        <Box bg="gray.100" px={4}>
            <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                <Heading size="md">Farmers World</Heading>
                <Spacer />
                <Button colorScheme="blue" onClick={handleAuthClick}>{isLoggedIn ? 'Logout' : 'Login'}</Button>
            </Flex>
        </Box>
    )
}

export default NavBar;