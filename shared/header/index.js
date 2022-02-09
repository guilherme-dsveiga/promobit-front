import Link from "next/link";

function Header() {
  return (
    <header className="bg-purple text-white py-4 font-roboto">
      <Link passHref href="/">
        <div className="flex justify-center items-center cursor-pointer">
          <div className="text-2xl font-bold tracking-[.25em]	">TMDB</div>
          <div className="rounded-3xl bg-white w-[80px] h-[24px]"></div>
        </div>
      </Link>
    </header>
  );
}

export default Header;
