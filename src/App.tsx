import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

import Home from "./Home";
import Contact from "./Contact";
import Stream from "./Stream";
import Feature from "./Feature";
import SignIn from "./(auth)/sign-in";
import Privacy from "./Privacy";
import Terms from "./Terms";
import SimpleTest from "./components/Simpletest";
import Dashboard from "./dashboard";
import DashLayout from "./layouts/DashLayout";
import Profile from "./Profile";
import Demo from "./Demo";
import Price from "./Price";

import Mathmatics from "./Math";
import DemoStart from "./DemoStart";
import Natural from "./Natural";
import Social from "./Social";


import Physics2017Exam from "../server/src/physics/PHY2017";
import PhysicsExamsPage from "../server/src/physics/Physics";
import BiologyExamsPage from "../server/src/biology/Biology"
import ChemistryExamsPage from "../server/src/chemistry/Chemistry"
import ApptitudeExamsPage from "../server/src/scholastic-apptitude/Apptitude"
import EnglishExamsPage from "../server/src/english/English"
import MathNaturalExamsPage from "../server/src/Math-natural/MathNatural"
import HistoryExamsPage from "../server/src/history/History"
import  GeographyExamsPage from "../server/src/geography/Geography"
import EconomicsExamsPage from "../server/src/economics/Economics"

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
        <Route
          path="/test"
          element={
            <MainLayout>
              <SimpleTest />
            </MainLayout>
          }
        />
         <Route
          path="/demostart"
          element={
            <MainLayout>
              <DemoStart />
            </MainLayout>
          }
        />
        <Route
          path="/dashboard"
          element={
            <DashLayout>
              <Dashboard />
            </DashLayout>
          }
        />
        <Route
          path="/dashboard/price"
          element={
            <DashLayout>
              <Price />
            </DashLayout>
          }
        />
        <Route
          path="/dashboard/demo"
          element={
            <DashLayout>
              <Demo />
            </DashLayout>
          }
        />
        <Route
          path="/dashboard/profile"
          element={
            <DashLayout>
              <Profile />
            </DashLayout>
          }
        />
        <Route
          path="/dashboard/demo/math"
          element={
            <DashLayout>
              <Mathmatics />
            </DashLayout>
          }
        />
           <Route
          path="/dashboard/natural"
          element={
            <DashLayout>
              <Natural />
            </DashLayout>
          }
        />
           <Route
          path="/dashboard/social"
          element={
            <DashLayout>
              <Social />
            </DashLayout>
          }
        />
         <Route
          path="/dashboard/natural/physics"
          element={
            <DashLayout>
              <PhysicsExamsPage />
            </DashLayout>
          }
        />
         <Route
          path="/dashboard/natural/phy2017"
          element={
            <DashLayout>
              <Physics2017Exam />
            </DashLayout>
          }
        />
            <Route
          path="/dashboard/natural/biology"
          element={
            <DashLayout>
              <BiologyExamsPage />
            </DashLayout>
          }
        />
           <Route
          path="/dashboard/natural/chemistry"
          element={
            <DashLayout>
              <ChemistryExamsPage />
            </DashLayout>
          }
        />
          <Route
          path="/dashboard/natural/apptitude"
          element={
            <DashLayout>
              <ApptitudeExamsPage />
            </DashLayout>
          }
        />
           <Route
          path="/dashboard/natural/english"
          element={
            <DashLayout>
              <EnglishExamsPage />
            </DashLayout>
          }
        />
         <Route
          path="/dashboard/natural/mathmaticsnat"
          element={
            <DashLayout>
              <MathNaturalExamsPage />
            </DashLayout>
          }
        />
             <Route
          path="/dashboard/social/history"
          element={
            <DashLayout>
              <HistoryExamsPage />
            </DashLayout>
          }
        />
          <Route
          path="/dashboard/social/geography"
          element={
            <DashLayout>
              <GeographyExamsPage />
            </DashLayout>
          }
        />
             <Route
          path="/dashboard/social/economics"
          element={
            <DashLayout>
              <EconomicsExamsPage />
            </DashLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
