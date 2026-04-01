import { BrowserRouter, Routes, Route, Form } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import NotePage from "./pages/NotePage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className={`app-shell`}>
        <header className="app-header">
          <h1 className="app-title">NoteSphere</h1>
        </header>

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/note/:id" element={<NotePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;
