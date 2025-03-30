import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="w-[80%] mx-auto">
      <div className="flex">
        <div>
          <h1>Medispace</h1>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
