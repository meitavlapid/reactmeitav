function ProtectedRoute({ children, requiredRole }) {
  const { user } = useUser();

  // בדוק אם המשתמש מחובר
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // בדוק אם למשתמש יש הרשאה מתאימה
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/home" replace />;
  }

  return children;
}
