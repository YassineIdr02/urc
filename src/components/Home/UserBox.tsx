interface UserProp {
    username: string;
    last_login: string;
}

const UserBox = ({ User }: { User: UserProp }) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between p-5 w-full gap-4 z-0 hover:bg-gray-100 hover:text-gray-700 hover:cursor-pointer duration-200">
          <div className="flex flex-col justify-between">
            <h1>{User.username}</h1>
          </div>
        <div>
          <p className="text-gray-400 text-sm whitespace-nowrap">{User.last_login}</p>
        </div>
      </div>
      <div className="divider w-[80%] my-0 mx-auto opacity-30"></div> 
    </div>
  );
};

export default UserBox;
