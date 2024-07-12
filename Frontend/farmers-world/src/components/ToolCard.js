import React from 'react'
import { Box, Spinner, VStack, Text, Image, HStack, Button } from '@chakra-ui/react'

const ToolCard = ({tool, toolDetails, userGold, userEnergy}) => {
    const currentDurability = tool.currentDurability.toNumber();
    const maxDurability = tool.maxDurability.toNumber();
    const canClaim = true;
    const handleClaim = () => {
        console.log('Claim')
    }
    const canFix = true;
    const handleFix = () => {
        console.log('Fix')
    }
    if(!tool || !toolDetails){
        return(
            <Box
                borderWidth='1px'
                borderRadius='1g'
                overflow='hidden'
                boxShadow='1g'
                p={2}
                bg='white'
                width="180px"
                height="300px"
                display="flex"
                justifyContent="center"
                alignItems='center'
            >
              <Spinner/>  
            </Box>
        )
    }
    return (
        <Box
            borderWidth='1px'
            borderRadius='1g'
            overflow='hidden'
            boxShadow='1g'
            p={2}
            _hover={{ boxShadow: "x1" }}
            transition="box-shadow 0.3s"
            bg="white"
            width="180px"
        >
            <VStack spacing={2}>
                <Box
                    width="150px"
                    height="210px"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    {toolDetails.img ? (
                        <Image 
                            src={`https://atomichub-ipfs.com/ipfs/${toolDetails.img}`}
                            alt={toolDetails.name}
                            objectFit="contain"
                            width="100%"
                            height="100%"
                            fallback={<Spinner/>}
                        />
                    ):(
                       <Text>Image Not Available</Text>
                    )}

                </Box>
                <Text fontWeight="semibold" fontSize="large">{toolDetails.name}</Text>
                <HStack borderWidth={2} borderRadius='full' px={3} py={1} borderColor={(maxDurability - currentDurability) <= 0 ? "green.500" : "red.500"}>
                    <Text>Durability: {currentDurability}/{maxDurability}</Text>
                </HStack>
                <HStack spacing={2}>
                    <Button colorScheme='orange' p={2} size='small' onClick={handleClaim} isDisabled={!canClaim}>
                        Claim
                    </Button>
                    <Button colorScheme="green" p={2} size="small" onClick={handleFix} isDisabled={!canFix}>
                        Fix
                    </Button>
                </HStack>
            </VStack>

        </Box>
    )
}

export default ToolCard