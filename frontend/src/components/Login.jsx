import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (password === "admin123") {
      navigate("/dashboard");
    } else {
      navigate("/error");
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-black text-green-400">
      <h1 className="text-3xl mb-4">Restricted Admin Panel</h1>
      <input
        type="password"
        className="bg-black border border-green-600 p-2 w-64"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin} className="mt-4 bg-green-700 p-2">
        Login
      </button>
    </div>
  );
}
