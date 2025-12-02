import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { RootLayout, UserDashboard } from "../layouts";
import {
  HomePage,
  SubscriptionHistoryPage,
  SubscriptionPage,
  SignInPage,
  SignUpPage,
  SignInPageAction,
  SignUpPageAction,
  TermsPage,
} from "../pages";
import { GenerateAPIKeys } from "../components";
import { checkAuth } from "../hoc";
import { ActivationPage } from "../pages/email-verify";
import { EmailSentPage } from "../pages/email-sent";
import { RequestResetPassword, ResetPasswordForm } from "../pages/password-reset";

const ProtectedDashBoard = checkAuth(UserDashboard);

export const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<RootLayout />}>
        <Route index element={<HomePage />} />
      </Route>

      <Route path="/dashboard" element={<ProtectedDashBoard />}>
        <Route index element={<SubscriptionHistoryPage />} />
        <Route path="analytics" element={<h2>Coming soon</h2>} />
        <Route path="subscribe" element={<SubscriptionPage />} />
        <Route path="apikeys" element={<GenerateAPIKeys />} />
      </Route>

      <Route path="signin" element={<SignInPage />} action={SignInPageAction} />
      <Route path="signup" element={<SignUpPage />} action={SignUpPageAction} />
      <Route path="/auth/activate/:uid/:token" element={<ActivationPage />} />
      <Route
        path="/auth/password-reset/:uid/:token"
        element={<ResetPasswordForm />}
      />
      <Route path="/reset" element={<RequestResetPassword />} />
      <Route path="/email-sent" element={<EmailSentPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="*" element={<p>lost-404</p>} />
    </>
  )
);
