export default function Unauthorized() {
  return (
    <div className="text-center p-10">
      <h1 className="text-3xl font-bold text-red-600">Access Denied</h1>
      <p className="text-xl font-bold text-red-600">You are not allowed to access this page.</p>
    </div>
  );
}
