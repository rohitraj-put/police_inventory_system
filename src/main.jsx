import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { MalkhanaProvider } from "./context/MalkhanaContext.jsx";
import { KurkiProvider } from "./context/KurkiContext.jsx";
import { FslProvider } from "./context/FslContext.jsx";
import { OtherProvider } from "./context/OtherContext.jsx";
import { UnclaimedProvider } from "./context/UnclaimedContext.jsx";
import { MvactProvider } from "./context/MvactContext.jsx";
import { ArtoProvider } from "./context/ArtoContaxt.jsx";
import { IpcVehicleProvider } from "./context/IPCVehicleContext.jsx";
import { ExciseVehicleProvider } from "./context/ExciseVehicleContext.jsx";
import { UnclaimedVehicleContextProvider } from "./context/UnclaimedVehicleContext.jsx";
import { SeizureVehicleProvider } from "./context/SeizureVehicleContext.jsx";
import { SummonProvider } from "./context/SummonContext.jsx";
import { ImportDataProvider } from "./context/ImportDataContext.jsx";
import "./index.css";

// Corrected Providers Component
const Providers = ({ children }) => (
  <MalkhanaProvider>
    <KurkiProvider>
      <FslProvider>
        <OtherProvider>
          <UnclaimedProvider>
            <MvactProvider>
              <ArtoProvider>
                <IpcVehicleProvider>
                  <ExciseVehicleProvider>
                    <UnclaimedVehicleContextProvider>
                      <SeizureVehicleProvider>
                        <SummonProvider>
                          <ImportDataProvider>{children}</ImportDataProvider>
                        </SummonProvider>
                      </SeizureVehicleProvider>
                    </UnclaimedVehicleContextProvider>
                  </ExciseVehicleProvider>
                </IpcVehicleProvider>
              </ArtoProvider>
            </MvactProvider>
          </UnclaimedProvider>
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
