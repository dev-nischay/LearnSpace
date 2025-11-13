import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { Home } from "./components/home/Home";
import { SignIn } from "./components/auth/SignIn";
import { SignUp } from "./components/auth/SignUp";
import { Error } from "./components/error/Error";
import { Test } from "./test";
import PaymentPage from "./components/payment/Payment";
import { Purchases } from "./components/payment/Purchases";
// import { PaymentPage } from "./components/home/Payment";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="signup" element={<SignUp />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="*" element={<Error />} />
          <Route path="home" element={<Home />} />
          <Route path="payment" element={<PaymentPage />} />
          <Route path="test" element={<Test />} />
          <Route path="purchases" element={<Purchases />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
  p;
}

// landing page on / route
export default App;
