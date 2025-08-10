import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/features/auth/authSlice";

const Dashboard = () => {
  const dispatch = useAppDispatch();
  return (
    <div style={{ maxWidth: 720, margin: "40px auto" }}>
      <h2>Dashboard</h2>
      <p>Protected content.</p>
      <button onClick={() => dispatch(logout())}>Logout</button>
    </div>
  );
};

export default Dashboard;
