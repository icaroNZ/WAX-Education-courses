import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Center, Spinner, Text } from '@chakra-ui/react';
import Slider from 'react-slick';
import ToolCard from './ToolCard';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const settings = {
    dots: true,
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive:[
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,            
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,            
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,            
            }
        }
    ]
}

const ToolCarousel = () => {
    const userToolsState = useSelector(state => state.userTools);
    const toolsDetailsState = useSelector(state => state.toolsDetails);
    const userState = useSelector(state => state.user)
    const isLoading = !userToolsState || userToolsState.isLoading || !toolsDetailsState || toolsDetailsState.isLoading || !userState || userState.isLoading

    const {userTools} = userToolsState;
    const toolsDetails = toolsDetailsState.tools;
    const userGold = parseFloat(userState.balances.GOLD || 0);
    const userEnergy = parseFloat(userState.energy || 0);

    if(isLoading){
        return (
            <Center height="300px">
                <Spinner size="x1"/>
            </Center>
        )
    }
    if(Object.keys(userTools).length === 0){
        <Center height="300px">
            <Text>No tools found</Text>
        </Center>
    }
  return (
    <Box maxWidth="1000px" margin="auto" padding={4}>
        <Slider {...settings}>
            {Object.values(userTools).map(tool => {
                const templateId = tool.templateId.toNumber()
                const assetId = tool.assetId.toNumber()
                return (
                    <Box key={assetId} padding={2}>
                        <ToolCard tool={tool} toolDetails={toolsDetails[templateId]} userGold={userGold} userEnergy={userEnergy} />
                    </Box>
                )
            })}
        </Slider>
    </Box>
  )
};

export default ToolCarousel;