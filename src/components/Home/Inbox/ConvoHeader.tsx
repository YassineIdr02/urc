import userEvent from "@testing-library/user-event";

const ConvoHeader = ({User} : any) => {
  return (
    <div className="navbar bg-base-100 border-b-2 flex flex-rox justify-between  h-20 px-[5%] sticky top-0 z-0">
      <div className="flex-row flex gap-4 ">
        
        <h1 className="font-semibold text-lg">{User.username}</h1>
      </div>

    </div>
  );
};

export default ConvoHeader;