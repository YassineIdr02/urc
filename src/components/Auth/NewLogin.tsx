
import InitialButtons from "./InitialButtons";
import NewLoginForm from "./NewLoginForm";
import NewSignup from "./NewSignup";
import { useState } from "react";
import { motion } from "framer-motion";


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

  return (
    <motion.article
      className="rounded-2xl p-4 sm:p-6 lg:p-8 w-[30%] z-20 bg-white shadow-lg"
      initial={{ y: -200 }}
      animate={{ y: 0 }}
      transition={{ duration: 2, type:"spring", stiffness:300 }}
    >
      <div className="flex flex-col gap-5">
        <div className="h-7 rounded-full">

        </div>

        <h1 className="text-center text-2xl font-bold">Welcome to ProEx</h1>
        {showInitials && (
          <InitialButtons
            showLoginForm={showLoginForm}
            showSignupForm={showSignupForm}
          />
        )}
        {showSignup && <NewSignup showLoginForm={showLoginForm} />}
        {showLogin && <NewLoginForm />}
      </div>
    </motion.article>
  );
};

export default NewLogin;