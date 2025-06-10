import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LanguageProvider } from "./lib/LanguageContext";
import { Login } from "./screens/Login";
import { RequestForm } from "./screens/RequestForm";
import { SearchingJumpers } from "./screens/SearchingJumpers";
import { Welcome } from "./screens/Welcome";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/request" element={<RequestForm />} />
          <Route path="/searching" element={<SearchingJumpers />} />
        </Routes>
      </Router>
    </LanguageProvider>
  </StrictMode>
);