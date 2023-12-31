import Image from "next/image";
import Link from "next/link";
import { getCurrentUser } from "@/lib/session";

import AuthProviders from "./AuthProviders";
import Button from "./Button";
import ProfileMenu from "./ProfileMenu";
import Hamburger from "./Hamburger";

const Navbar = async () => {
  const session = await getCurrentUser();

  return (
    <nav className="flexBetween navbar relative">
      <Hamburger />
      <div className="flexCenter gap-4">
        {session?.user ? (
          <>
            <ProfileMenu session={session} />

            <Link href="/create-project">
              <Button title="Share work" />
            </Link>
          </>
        ) : (
          <>
            <AuthProviders />
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
