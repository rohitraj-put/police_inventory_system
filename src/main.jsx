import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { MalkhanaProvider } from "./context/MalkhanaContext.jsx";
import { KurkiProvider } from "./context/KurkiContext.jsx";
import { FslProvider } from "./context/FslContext.jsx";
import { OtherProvider } from "./context/OtherContext.jsx";
import { UnclaimedProvider } from "./context/UnclaimedContext.jsx";
import "./index.css";

// Corrected Providers Component
const Providers = ({ children }) => (
  <MalkhanaProvider>
    <KurkiProvider>
      <FslProvider>
        <OtherProvider>
          <UnclaimedProvider>{children}</UnclaimedProvider>
        </OtherProvider>
      </FslProvider>
    </KurkiProvider>
  </MalkhanaProvider>
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Providers>
        <App />
      </Providers>
    </BrowserRouter>
  </StrictMode>
);
