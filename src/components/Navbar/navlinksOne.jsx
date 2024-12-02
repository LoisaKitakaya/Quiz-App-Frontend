const NavLinksOne = (props) => {
  return (
    <>
      <ul className="menu menu-horizontal px-1 menu-sm">
        <li>
          <a>Item 1</a>
        </li>
        <li>
          <details>
            <summary>Parent</summary>
            <ul className="bg-base-100 rounded-box z-[1] w-32 p-2 shadow mt-5 border">
              <li>
                <a>Submenu 1</a>
              </li>
              <li>
                <a>Submenu 2</a>
              </li>
            </ul>
          </details>
        </li>
        <li>
          <a>Item 3</a>
        </li>
      </ul>
    </>
  );
};

export default NavLinksOne;
