import React from "react";
import RestaurantTracker from "./FoodPicker";
import "./App.css";

function App() {
  return (
    <div
      className="App"
      style={{
        backgroundImage: `url('/background.jpg')`,
        backgroundSize: "cover",        // Ensures it covers the whole screen
        backgroundPosition: "center",   // Centers the image
        backgroundRepeat: "no-repeat",  // Prevents tiling
        width: "100vw",                 // Full viewport width
        height: "100vh",                // Full viewport height
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <RestaurantTracker />
    </div>
  );
}

export default App;
