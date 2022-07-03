import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { GlobalStyle } from "./styles/global";

import { AuthProvider } from "./hooks/useAuth";

import { Routes } from "src/routes";

function App() {
  return (
    <div className="App">
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_RIGHT} />
      <AuthProvider>
        <GlobalStyle />
        <Routes />
      </AuthProvider>
    </div>
  );
}

export default App;
