import Link from "next/link";

export default function HomeHeader() {
  return (
    <header className="px-[20px] py-[17px] h-[85px] border-b-2 border-b-gray-300 flex justify-between">
      <div>
        <Link href="/">
          <img src="/images/logo.png" alt="logo" />
        </Link>
      </div>
      <div className="flex gap-2">
        <Link href="/login" className="text-blue-500  ">
          Login
        </Link>
        <Link href="/register" className="text-blue-500">
          Register
        </Link>
      </div>
    </header>
  );
}
