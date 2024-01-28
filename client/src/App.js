
// ADDS CONTEXT TO THE APP

import { DataProvider } from "./GlobalState";

// IMPORTING ALL COMPONENTS

import Header from "./components/Headers/Header";
import Pages from "./components/Pages/Pages";

// CREATES THE REACT FUNCTIONAL COMPONENT FOR THE APP

function App() {

  // RETURNS THE JSX TO THE CLIENT

  return (

    // ADDS THE CREATED CONTEXT FROM THE GLOBAL STATE TO THE APP

    <DataProvider>

      <div className="App">
        <Header />
        <Pages />
      </div>
      
    </DataProvider>
  );
}

export default App;
