import NewLogin from "../components/Auth/NewLogin";

const LoginLayout = () => {
  document.title = "UCR | Login"
  return (
    <div
      className="relative flex justify-center items-center h-screen bg-slate-50"
      
    >
      <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent from-20% to-70%"></div>
      <div className="flex flex-col items-center justify-center w-full h-full z-10">
        <NewLogin />
      </div> 
    </div>
  );
};

export default LoginLayout;