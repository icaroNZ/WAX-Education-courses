import { Box } from '@chakra-ui/react'
import NavBar from './components/NavBar';
import SessionInitializer from './components/SessionInitializer';
import InGameTokens from './components/InGameTokens';
import EnergyBar from './components/EnergyBar';
import ToolsDetailsInitiliazer from './components/ToolsDetailsInitializer';
import ToolCarousel from './components/ToolsCarousel';

function App(){
  return (
    <Box p={4}>
      <SessionInitializer />
      <ToolsDetailsInitiliazer />
      <NavBar />
      <EnergyBar />
      <InGameTokens />
      <ToolCarousel />
    </Box>
  )
}

export default App;