import NewLogin from "./NewLogin";

const LoginLayout = () => {
  document.title = "UCR | Login"
  return (
    <div
      className="relative flex justify-center items-center h-screen bg-cover bg-center bg-no-repeat"
      
    >
      <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent from-20% to-70%"></div>
      <div className="flex flex-col items-center justify-center w-full h-full z-10">
        <NewLogin />
      </div> 
    </div>
  );
};

export default LoginLayout;