import Link from "next/link";
import { IoBug } from "react-icons/io5";

const Navbar = () => {
  const Links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];
  return (
    <nav className="flex h-14 items-center space-x-6 mb-5 border-b border-zinc-500 px-5 max-w-[1440px] mx-auto">
      <Link href="/">
        <IoBug size={25} />
      </Link>
      <ul className="flex space-x-6">
        {Links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-lg text-zinc-500 hover:text-zinc-800 transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
