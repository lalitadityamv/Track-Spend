import Link from "next/link";
import Image from "next/image";

export const HeaderLogo = () => {
  return (
    <Link href="/">
      <div className="items-center hidden lg:flex">
        <Image src="/logo.png" alt="Logo" height={45} width={45} />
        <p className="font-semibold text-stone-900 text-2xl ml-2.5">
          Track Spend
        </p>
      </div>
    </Link>
  );
};
