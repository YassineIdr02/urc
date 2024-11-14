import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoins,
  faFileContract,
  faHandHoldingHand,
  faMessage,
  faPlus,
  faRightFromBracket,
  faShop,
} from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";



const AnimationVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: (d: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 * d,
    },
  }),
};

const Sidebar = ({User} : any) => {
  

  
  return (
    <>
      <div className="flex h-screen flex-col justify-between border-e shadow-md bg-white w-full sticky top-0">
        <div className="px-4 py-6">
          <div className="flex items-center">
            <div className="h-7 rounded-full mx-4">
              {/* <img src={logo} alt="" className="object-contain w-full h-full" /> */}
            </div>
            <h2 className="text-2xl font-bold sm:inline hidden ">UCR</h2>
          </div>
          <ul className="mt-6 space-y-5 text-lg font-semibold text-center">
            
            <motion.li
              whileHover={{ scale: 1.03 }}
              variants={AnimationVariants}
              initial="initial"
              animate={AnimationVariants.animate(1)}
            >
              <Link to={"/inbox"}>
                <button className="rounded-lg w-full px-4 py-2   hover:bg-gray-100 hover:text-gray-700 text-gray-500 flex flex-row items-center gap-2 duration-200 ">
                  <FontAwesomeIcon icon={faHandHoldingHand} />
                  <span className="hidden sm:inline">Inbox</span>
                </button>
              </Link>
            </motion.li>

            <motion.li
              whileHover={{ scale: 1.03 }}
              variants={AnimationVariants}
              initial="initial"
              animate={AnimationVariants.animate(2)}
            >
              <Link
                to={"/home/rooms"}
                className="flex flex-row rounded-lg w-full px-4 py-2  items-center justify-between hover:bg-gray-100 hover:text-gray-700 text-gray-500 gap-2 duration-200 "
              >
                <button className="  flex flex-row items-center gap-2 ">
                  <FontAwesomeIcon icon={faMessage} />
                  <span className="hidden sm:inline">Salon</span>
                </button>
                <div className="badge bg-gray-200  ">100</div>
              </Link>
            </motion.li>

            <motion.li
              whileHover={{ scale: 1.03 }}
              variants={AnimationVariants}
              initial="initial"
              animate={AnimationVariants.animate(5)}
            >
              <Link to={"/"}>
                <button className="rounded-lg  w-full px-4 py-2   hover:bg-gray-100 hover:text-gray-700 text-gray-500 flex flex-row items-center gap-2 ">
                  <FontAwesomeIcon icon={faRightFromBracket} />{" "}
                  <span className="hidden sm:inline"> Logout</span>
                </button>
              </Link>
            </motion.li>
          </ul>
        </div>

        <div className="sticky inset-x-0 bottom-0 border-t border-gray-100 flex justify-between items-center p-5 lg:flex-row  sm:flex-col xs:flex-col sm:gap-6 xs:gap-3">
          <div className="flex items-center gap-2 bg-white hover:bg-gray-50">
              <p className="text-lg  hidden sm:inline ">
                <strong className="block font-semibold">{User.username}</strong>
              </p>

          </div>
          
        </div>
      </div>

      
    </>
  );
};

export default Sidebar;
