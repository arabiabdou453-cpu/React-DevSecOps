import { AuthProvider } from './context/AuthProvider';
import { useAuth } from './hooks/useAuth';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import './index.css';

const MainAppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="app-root">
      {isAuthenticated ? <DashboardPage /> : <LoginPage />}
    </div>
  );
};

export function App() {
  return (
    <AuthProvider>
      <MainAppContent />
    </AuthProvider>
  );
}

export default App;
