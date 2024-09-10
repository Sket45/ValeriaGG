import Link from "next/link";
import Navstyles from "../styles/Navbar.module.scss";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const path = usePathname();

  console.log(path);

  return (
    <div className={Navstyles.Container}>
      <Link href="/">Valeria GG</Link>
      <div>
        <Link
          href="/home"
          className={`${Navstyles.Container_Current} ${
            path === "/home" ? Navstyles.Container_Selected : ""
          }`}
        >
          <div>Home</div>
        </Link>
        <Link
          href="/cv"
          className={`${Navstyles.Container_CV} ${
            path === "/cv" ? Navstyles.Container_Selected : ""
          }`}
        >
          <div>CV</div>
        </Link>
        <Link
          href="/contact"
          className={`${Navstyles.Container_Contact} ${
            path === "/contact" ? Navstyles.Container_Selected : ""
          }`}
        >
          <div>Contact</div>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
