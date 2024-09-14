import NavLink from "./NavLink";

const NavBar = () => {
  return (
    <nav className='flex items-center justify-between p-4'>
      <NavLink href='/'>LOGO Home</NavLink>

      <ul className=' flex gap-2'>
        {links.map(({ href, text }) => (
          <NavLink href={href} key={href}>
            {text}
          </NavLink>
        ))}
      </ul>
    </nav>
  );
};
export default NavBar;

const links = [
  { href: "/reviews", text: "Reviews" },
  { href: "/contact", text: "SignIn" },
];
