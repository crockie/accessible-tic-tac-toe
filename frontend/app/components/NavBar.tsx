import React from "react";
import Link from "next/link";
import Image from "next/image";

const NavBar: React.FC = () => {
  return (
    <nav className="navbar bg-primary mb-5">
      <Link href="/" aria-label="Navigate to home page">
        <div className="btn btn-ghost text-2xl font-semibold p-3 flex align-middle">
          <Image src="/logo.svg" alt="Website logo" width={35} height={35} />
          Tic-Tac-Toe
        </div>
      </Link>
    </nav>
  );
};

export default NavBar;
