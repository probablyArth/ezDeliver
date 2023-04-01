import { useState } from 'react'
import './App.css'
import {Box, Container} from '@mui/material';

import LandingPage from './components/Landingpage';

function App() {

  return (
    <div className="App">
      <Container maxWidth="xl">
        <LandingPage/>
      </Container>
    </div>
  )
}

export default App