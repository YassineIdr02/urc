
import profile from "/prf.png"

const MessagesHeader = () => {
  return (
    <div className="navbar bg-base-100 border-b-2 flex flex-rox justify-between  h-20 px-[5%] sticky top-0 z-0">
      <div className="flex-row flex gap-4 ">
        <img
          className="size-16 avatar rounded-full "
          alt="Tailwind CSS Navbar component"
          src={profile}
        />
        <h1 className="font-semibold text-lg">Reed Thompson</h1>
      </div>

    </div>
  );
};

export default MessagesHeader;