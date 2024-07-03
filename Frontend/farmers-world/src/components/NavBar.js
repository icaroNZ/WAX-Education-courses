import React from "react";
import { Box, Button, Flex, Heading, Spacer } from "@chakra-ui/react";

const NavBar = () => {
    return(
        <Box bg="gray.100" px={4}>
            <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                <Heading size="md">Farmers World</Heading>
                <Spacer />
                <Button colorScheme="blue">Login</Button>
            </Flex>
        </Box>
    )
}

export default NavBar;