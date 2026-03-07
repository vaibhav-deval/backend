import { AppRoutes } from "./AppRoute";
import "./style.scss";
import { AuthProvider } from "./features/auth/auth.context.jsx";
import { PostProvider } from "./features/post/post.context.jsx";

const App = () => {
  return (
    <AuthProvider>
      <PostProvider>
        <AppRoutes />
      </PostProvider>
    </AuthProvider>
  );
};

export default App;
