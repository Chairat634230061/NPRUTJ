import { FC } from "react";
import { Link } from "react-router-dom";
import  logo  from "../assets/logo.svg"



const Header: FC = () => {
  return (
    <>
    <header className='m:px-16 px-6 w-full flex 
   items-center py-5 top-0 z-20  bg-[#6633CC] '>
    
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto ">
        <Link to="/admin/home"><p className="text-white text-[18px] 
        font-bold cursor-pointer flex">
          <img 
          src={logo} 
          alt="logo" 
          className="w-20 h-9 object-contain"
          />Chairat &nbsp; 
        <span className='sm:block hidden'>| Duangsaat</span></p></Link>
   
        <ul className="list-none hidden sm:flex flex-row gap-10">
        <Link to="/admin/home" className="text-white text-secondary hover:text-[#DCDCDC] text-[18px]
        font-medium cursor-pointer">
          Home
        </Link>
        <Link to="/admin/menu" className="text-white text-secondary hover:text-[#DCDCDC] text-[18px]
        font-medium cursor-pointer">
          Menu
        </Link>
       </ul>

      </div>
      </header>
      
    </>
  );
};

export { Header };
