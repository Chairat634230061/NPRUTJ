import { FC } from "react";
import { Link } from "react-router-dom";
import  facebook  from "../assets/facebook.svg"
import  github  from "../assets/github.svg"
import  instagram  from "../assets/instagram.svg"


const Footer: FC = () => {
  return (
    <>
   
      <div className="flex gap-4 h-[50px] w-full  text-black fixed bottom-0 text-center justify-center bg-white p-2 ">
            <Link to='https://github.com/Chairat634230061'>
            <img
             src={github} 
             alt="email" 
             className="w-10 h-6 object-contain "/>
             </Link>
            <Link to='https://www.instagram.com/43iamd/'>
            <img
             src={instagram} 
             alt="email" 
             className="w-10 h-6 object-contain"/>
             </Link>
            <Link to='https://web.facebook.com/chairatdooy'>
            <img
             src={facebook} 
             alt="email" 
             className="w-10 h-6 object-contain"/>
             </Link>
          </div>
    </>
  );
};

export { Footer };
