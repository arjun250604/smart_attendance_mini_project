import ProviderWrapper from './ProviderWrapper';
import ProtectedRoute from './ProtectedRoute';
import FacultyDashboardPage from './FacultyDashboardPage';

export default function FacultyDashboardWrapper() {
  return (
    <ProviderWrapper>
      <ProtectedRoute allowedRoles={['teacher']}>
        <FacultyDashboardPage />
      </ProtectedRoute>
    </ProviderWrapper>
  );
}
