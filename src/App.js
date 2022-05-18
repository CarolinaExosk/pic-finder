import React from "react";
import PerfilGaleria from "./components/PerfilGaleria";
import Galeria from './components/Galeria';

function App() {
  return (
    <div className="App">
      <PerfilGaleria />
      <div style={{ marginTop: '20px' }}>
        <h1>Minha Galeria</h1>
        <Galeria />
      </div>
    </div>
  );
}

export default App;