import { FC } from "react";
import { Link } from "react-router-dom";


const MenuPage: FC = () => {
    return (
      <>
      <div className="grid grid-cols-1 gap-2 p-2 md:grid-cols-2 xl:grid-cols-3 ">
        <Link to="/admin/news" className="npru-button text-center">
          News
        </Link>
        <Link to="/admin/user" className="npru-button text-center">
          User
        </Link>
        <Link to="/admin/member" className="npru-button text-center">
        Menuber
        </Link>
        <Link to="/admin/member-list" className="npru-button text-center">
        MenuberList
        </Link>
        <button className="npru-button">Menu #5</button>
        <button className="npru-button">Logout</button>
      </div>
      
    </>
  );
};

export { MenuPage };
