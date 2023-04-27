import Logo from "../components/Logo";
import { Link, Outlet } from "react-router-dom";

export default function CompactLayout() {
  return (
    <div style={{ padding: 20 }}>
      <Link to='/'>
        <Logo />
      </Link>

      <div className='mail'>
        <Outlet />
      </div>
    </div>
  );
}
