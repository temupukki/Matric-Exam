import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

import Home from "./Home";
import Contact from "./Contact";
import Stream from "./Stream";
import Feature from "./Feature";
import SignIn from "./(auth)/sign-in";
import Privacy from "./privacy";
import Terms from "./Terms";

function App() {
  return (
    <Router>
      <Routes>
        {/* Normal pages use MainLayout */}
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />
        <Route
          path="/contact"
          element={
            <MainLayout>
              <Contact />
            </MainLayout>
          }
        />
        <Route
          path="/feature"
          element={
            <MainLayout>
              <Feature />
            </MainLayout>
          }
        />
        <Route
          path="/stream"
          element={
            <MainLayout>
              <Stream />
            </MainLayout>
          }
        />

        {/* Auth pages use AuthLayout (no Navbar, no Footer) */}
        <Route
          path="/sign-in"
          element={
            <AuthLayout>
              <SignIn />
            </AuthLayout>
          }
        />
            <Route
          path="/privacy"
          element={
            <MainLayout>
              <Privacy />
            </MainLayout>
          }
        />
          <Route
          path="/terms"
          element={
            <MainLayout>
              <Terms />
            </MainLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
