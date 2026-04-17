import ProviderWrapper from './ProviderWrapper';
import ProtectedRoute from './ProtectedRoute';
import StudentDashboardPage from './StudentDashboardPage';

export default function StudentDashboardWrapper() {
  return (
    <ProviderWrapper>
      <ProtectedRoute allowedRoles={['student']}>
        <StudentDashboardPage />
      </ProtectedRoute>
    </ProviderWrapper>
  );
}
