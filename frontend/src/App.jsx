import { Box, Container } from "@chakra-ui/react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import UserPage from "./pages/UserPage";
import PostPage from "./pages/PostPage";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import { useRecoilValue } from "recoil";
import userAtom from "./atoms/userAtom";
import UpdateProfilePage from "./pages/UpdateProfilePage";
import CreatePost from "./components/CreatePost";
import ChatPage from "./pages/ChatPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminAnalyticsPage from "./pages/AdminAnalyticsPage";
import AdminPostsPage from "./pages/AdminPostsPage";
import AdminReportedUsersPage from "./pages/AdminReportedUsersPage";
import AdminUsersPage from "./pages/AdminUsersPage";
import AdminReportedPostsPage from "./pages/AdminReportedPostsPage";
import AdminHeader from "./components/AdminHeader";
import { SettingsPage } from "./pages/SettingsPage";

function App() {
  const user = useRecoilValue(userAtom);
  const admin = JSON.parse(localStorage.getItem("admin"));
  const { pathname } = useLocation();

  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <Box position={"relative"} w="full">
      <Container maxW={{ base: "620px", md: "900px" }}>
        {isAdminRoute ? <AdminHeader /> : <Header />}

        <Routes>
          <Route
            path="/"
            element={user ? <HomePage /> : <Navigate to="/auth" />}
          />
          <Route
            path="/auth"
            element={!user ? <AuthPage /> : <Navigate to="/" />}
          />
          <Route
            path="/update"
            element={user ? <UpdateProfilePage /> : <Navigate to="/auth" />}
          />

          <Route
            path="/:username"
            element={
              user ? (
                <>
                  <UserPage />
                  <CreatePost />
                </>
              ) : (
                <UserPage />
              )
            }
          />
          <Route path="/:username/post/:pid" element={<PostPage />} />
          <Route
            path="/chat"
            element={user ? <ChatPage /> : <Navigate to={"/auth"} />}
          />
          <Route
            path="/settings"
            element={user ? <SettingsPage /> : <Navigate to={"/auth"} />}
          />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin" element={<Navigate to="/admin/login" />} />
          <Route
            path="/admin/dashboard"
            element={
              admin ? <AdminDashboardPage /> : <Navigate to={"/admin"} />
            }
          />
          <Route
            path="/admin/analytics"
            element={
              admin ? <AdminAnalyticsPage /> : <Navigate to={"/admin"} />
            }
          />
          <Route
            path="/admin/posts"
            element={admin ? <AdminPostsPage /> : <Navigate to={"/admin"} />}
          />
          <Route
            path="/admin/reported-users"
            element={
              admin ? <AdminReportedUsersPage /> : <Navigate to={"/admin"} />
            }
          />
          <Route
            path="/admin/posts"
            element={admin ? <AdminPostsPage /> : <Navigate to={"/admin"} />}
          />
          <Route
            path="/admin/users"
            element={admin ? <AdminUsersPage /> : <Navigate to={"/admin"} />}
          />
          <Route
            path="/admin/reported-posts"
            element={
              admin ? <AdminReportedPostsPage /> : <Navigate to={"/admin"} />
            }
          />
        </Routes>
      </Container>
    </Box>
  );
}

export default App;
