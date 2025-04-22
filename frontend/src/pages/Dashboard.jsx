import FakeTerminal from "../components/FakeTerminal";

export default function Dashboard() {
  return (
    <div className="h-screen">
      <h2 className="text-green-400 bg-gray-900 text-xl p-2">admin@outdated-terminal:~$</h2>
      <FakeTerminal />
    </div>
  );
}
