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

import Physics2017Exam from "./physics/PHY2017";
import PhysicsExamsPage from "./physics/Physics";
import BiologyExamsPage from "./biology/Biology";
import ChemistryExamsPage from "./chemistry/Chemistry";
import ApptitudeExamsPage from "./scholastic-apptitude/Apptitude";
import EnglishExamsPage from "./english/English";
import MathNaturalExamsPage from "./Math-natural/MathNatural";
import HistoryExamsPage from "./history/History";
import GeographyExamsPage from "./geography/Geography";
import EconomicsExamsPage from "./economics/Economics";
import MathSocialExamsPage from "./Math-social/MathSocial";
import Payment from "./Payment";
import Support from "./Support";
import Paid from "./Paid";

import Userpage from "./User";
import Admin from "./Admin";
import Questions from "./Questions";
import ResetPassword from "./ResetPassword";
import Chemistry from "./Chemo";
import Geography from "./Geo";

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
          path="/dashboard/demo/mathematics"
          element={
            <DashLayout>
              <Mathmatics />
            </DashLayout>
          }
        />
          <Route
          path="/dashboard/demo/chemistry"
          element={
            <DashLayout>
              <Chemistry/>
            </DashLayout>
          }
        />
              <Route
          path="/dashboard/demo/geography"
          element={
            <DashLayout>
              <Geography/>
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
          path="/dashboard/apptitude"
          element={
            <DashLayout>
              <ApptitudeExamsPage />
            </DashLayout>
          }
        />
        <Route
          path="/dashboard/english"
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
        <Route
          path="/dashboard/social/mathmaticssoc"
          element={
            <DashLayout>
              <MathSocialExamsPage />
            </DashLayout>
          }
        />
        <Route
          path="/dashboard/privacy"
          element={
            <DashLayout>
              <Privacy />
            </DashLayout>
          }
        />
        <Route
          path="/dashboard/terms"
          element={
            <DashLayout>
              <Terms />
            </DashLayout>
          }
        />
        <Route
          path="/dashboard/payment"
          element={
            <DashLayout>
              <Payment />
            </DashLayout>
          }
        />
        <Route
          path="/dashboard/support"
          element={
            <DashLayout>
              <Support />
            </DashLayout>
          }
        />
        <Route
          path="/dashboard/admin/paid"
          element={
            <DashLayout>
              <Paid />
            </DashLayout>
          }
        />
        <Route
          path="/dashboard/admin/user"
          element={
            <DashLayout>
              <Userpage />
            </DashLayout>
          }
        />
        <Route
          path="/dashboard/admin"
          element={
            <DashLayout>
              <Admin />
            </DashLayout>
          }
        />
        <Route
          path="/dashboard/admin/request"
          element={
            <DashLayout>
              <Questions />
            </DashLayout>
          }
        />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
