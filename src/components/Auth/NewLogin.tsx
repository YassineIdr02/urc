
import InitialButtons from "./InitialButtons";
import NewLoginForm from "./NewLoginForm";
import NewSignup from "./NewSignup";
import { useState } from "react";
import { motion } from "framer-motion";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';



const NewLogin = () => {
  const [showLogin, setLogin] = useState(false);
  const [showSignup, setSignup] = useState(false);
  const [showInitials, setInitials] = useState(true);

  const showLoginForm = () => {
    setLogin(true);
    setInitials(false);
    setSignup(false);
  };

  const showSignupForm = () => {
    setSignup(true);
    setLogin(false);
    setInitials(false);
  };

  const notify = () => toast.success("User created successfully")

  return (
    <motion.article
      className="rounded-2xl p-4 sm:p-6 lg:p-8 w-[30%] z-20 bg-white shadow-lg"
      initial={{ y: -200 }}
      animate={{ y: 0 }}
      transition={{ duration: 2, type:"spring", stiffness:300 }}
    >
      <div className="flex flex-col gap-5">
        <div className="h-20 rounded-full">
          <img src={"https://www.tech-brest-iroise.fr/preview/1427/w960q100bFFFFFFm/51866_UBO_Hor_Noir_vecto.png"} alt="" className="object-contain w-full h-full" />
        </div>


        <h1 className="text-center text-2xl font-bold">Welcome to UCR</h1>
        {showInitials && (
          <InitialButtons
            showLoginForm={showLoginForm}
            showSignupForm={showSignupForm}
          />
        )}
        {showSignup && <NewSignup showLoginForm={showLoginForm} notify={notify} />}
        {showLogin && <NewLoginForm />}
      </div>
      <ToastContainer theme="colored" />
    </motion.article>
  );
};

export default NewLogin;
