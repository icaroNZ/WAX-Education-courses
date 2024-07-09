import { Box } from '@chakra-ui/react'
import NavBar from './components/NavBar';
import SessionInitializer from './components/SessionInitializer';
import InGameTokens from './components/InGameTokens';
import EnergyBar from './components/EnergyBar';

function App(){
  return (
    <Box p={4}>
      <SessionInitializer />
      <NavBar />
      <EnergyBar />
      <InGameTokens />
    </Box>
  )
}

export default App;