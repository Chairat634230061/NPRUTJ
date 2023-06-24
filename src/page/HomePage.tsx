import { FC } from "react";
import PlanetCanvas from "../component/canvas/PlanetCanvas";
import { HomeVariants } from '../../utils/motion'
import { motion } from 'framer-motion'


const HomePage: FC = () => {
  return (
    <motion.div
    variants={HomeVariants}
    initial="hidden"
    whileInView="show">

    <section className=" w-full h-screen mx-auto fixed left-1/2 -translate-x-1/2 ">
      
      <div className="absolute inset-0
      top-[40px] max-w-7xl mx-auto flex flex-row items-start gap-5">
        
        <div>
          <h1 className="font-black text-black lg:text-[70px] sm:text-[60px] xs:text-[50px] text-[40px] lg:leading-[98px] mt-2"
          >Hi, I'm <span 
          className="text-[#804dee]"
          >Chairat</span></h1>
            <p className=
            "text-black font-medium lg:text-[30px] sm:text-[26px] xs:text-[20px] text-[16px] lg:leading-[40px] mt-2 "
            ><span 
            className="text-[#804dee] font-black"
            >Welcome&nbsp;</span>to My
            <span 
            className="text-[#804dee] font-black"
            >&nbsp;World</span>

            </p>
        </div>
      </div>
        <PlanetCanvas />
      
      </section>
      </motion.div>
  );
};

export { HomePage };
