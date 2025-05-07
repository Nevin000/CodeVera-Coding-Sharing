import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "../../Config/Debounce";
import { searchUserAction } from "../../Redux/User/Action";
import SearchUserCard from "./SearchUserCard";

const SearchComponent = () => {
  const token = localStorage.getItem("token");
  const { user } = useSelector((store) => store);
  const dispatch = useDispatch();

  const handleSearchUser = (query) => {
    dispatch(searchUserAction({ jwt: token, query }));
  };

  const debouncedHandleSearchUser = debounce(handleSearchUser, 1000);

  return (
    <div className="w-full h-screen overflow-y-auto p-4 bg-white border-r">
      <h1 className="text-xl mb-4 font-semibold">Search</h1>
      <input
        onChange={(e) => debouncedHandleSearchUser(e.target.value)}
        className="w-full px-3 py-2 rounded bg-gray-100 focus:outline-none"
        type="text"
        placeholder="Search..."
      />
      <hr className="my-4" />
      <div className="space-y-3">
        {!user?.searchResult?.isError ? (
          user?.searchResult?.map((item) => (
            <SearchUserCard
              key={item.id}
              username={item.username}
              image={item?.image}
            />
          ))
        ) : (
          <p className="text-center font-bold pt-10">User Not Exist</p>
        )}
      </div>
    </div>
  );
};

export default SearchComponent;
