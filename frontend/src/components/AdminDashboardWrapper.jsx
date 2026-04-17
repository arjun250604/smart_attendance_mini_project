import ProviderWrapper from './ProviderWrapper';
import ProtectedRoute from './ProtectedRoute';
import AdminDashboardPage from './AdminDashboardPage';

export default function AdminDashboardWrapper() {
  return (
    <ProviderWrapper>
      <ProtectedRoute allowedRoles={['admin']}>
        <AdminDashboardPage />
      </ProtectedRoute>
    </ProviderWrapper>
  );
}
