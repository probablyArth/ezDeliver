import "./App.css";
import { Container } from "@mui/material";

import LandingPage from "./components/Landingpage";

function App() {
  return (
    <div className="App">
      <Container maxWidth="xl">
        <LandingPage />
      </Container>
    </div>
  );
}

export default App;
