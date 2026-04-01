import { BrowserRouter, Routes, Route, Form } from "react-router-dom";
import Dashboard, { ThemeContext } from "./pages/Dashboard";
import NotePage from "./pages/NotePage";
import { useContext } from "react";
import "./App.css";

function App() {
  const { theme } = useContext(ThemeContext);
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className={`app-shell ${theme}`}>
          <header className="app-header">
            <h1 className="app-title">NoteSphere</h1>
          </header>

          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/note/:id" element={<NotePage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}
export default App;
