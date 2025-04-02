import { Outlet } from "react-router-dom";
import Logo from "../../assets/Logomark.svg";

export default function AuthLayout() {
  return (
    <div className="w-full mx-auto h-screen bg-[#fefefe] py-16 space-y-4">
      <div className="w-[80%] mx-auto flex items-center justify-center gap-4">
        <img src={Logo} height={24} width={24} />
      </div>
      <div className="w-[80%] flex-1 mx-auto flex items-center justify-center">
        <Outlet />
      </div>
    </div>
  );
}
