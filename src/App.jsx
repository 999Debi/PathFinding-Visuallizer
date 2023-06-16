import "./App.css";
import Grid from "./components/Grid/Grid";
import Info from "./components/Info/Info";

import Navbar from "./components/Navbar/Navbar";


function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Info/>
      <Grid/>

    </div>
  );
}

export default App;
