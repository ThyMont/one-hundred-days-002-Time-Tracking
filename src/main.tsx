import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App.tsx";
import { Provider } from "@/components/ui/provider";
import "@fontsource/roboto/400.css"; // Peso 400 padrão
import "@fontsource/roboto/300.css"; // Peso específico
import "@fontsource/roboto/700.css"; // Peso específico
import { AuthProvider } from "@/contexts/AuthContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
