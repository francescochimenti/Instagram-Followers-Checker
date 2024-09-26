import React, { useState, useEffect } from "react";
import { UserX, UserCheck, Users } from "lucide-react";
import followersData from "./data/followers_1.json";
import followingData from "./data/following.json";

const App = () => {
  const [followers] = useState(followersData);
  const [following] = useState(followingData.relationships_following);
  const [hiddenUsers, setHiddenUsers] = useState([]);
  const [displayedUsers, setDisplayedUsers] = useState([]);

  useEffect(() => {
    const nonReciprocal = following.filter((follow) => {
      const followingValue = follow.string_list_data[0].value;
      return !followers.some(
        (follower) => follower.string_list_data[0].value === followingValue
      );
    });
    setDisplayedUsers(
      nonReciprocal.map((user) => user.string_list_data[0].value)
    );
  }, [followers, following]);

  const hideUser = (user) => {
    setHiddenUsers([...hiddenUsers, user]);
    setDisplayedUsers(displayedUsers.filter((u) => u !== user));
  };

  return (
    <div className="bg-black text-white min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-center mb-10">
          <h1 className="text-5xl font-extrabold">Non-Reciprocal Followers</h1>
        </div>

        <div className="bg-white bg-opacity-10 rounded-xl p-8 mb-10 shadow-2xl">
          <div className="flex justify-between items-center">
            <div className="flex items-center bg-white bg-opacity-10 rounded-lg p-4">
              <Users className="text-white mr-3" size={28} />
              <span className="text-2xl font-semibold">
                Displayed: {displayedUsers.length}
              </span>
            </div>
            <div className="flex items-center bg-white bg-opacity-10 rounded-lg p-4">
              <UserX className="text-white mr-3" size={28} />
              <span className="text-2xl font-semibold">
                Unfollowed: {hiddenUsers.length}
              </span>
            </div>
          </div>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedUsers.map((user, index) => (
            <li key={index} className="group">
              <a
                href={`https://instagram.com/${user}`}
                target="_blank"
                rel="noreferrer"
                className="block bg-white bg-opacity-10 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:bg-opacity-20"
                onClick={(e) => {
                  e.preventDefault();
                  hideUser(user);
                  window.open(`https://instagram.com/${user}`, "_blank");
                }}
              >
                <div className="p-6">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">{user}</span>
                    <UserCheck
                      className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      size={24}
                    />
                  </div>
                  <p className="text-sm text-white opacity-70 mt-2">
                    Click to open profile
                  </p>
                </div>
                <div className="bg-white h-1 w-0 group-hover:w-full transition-all duration-300"></div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
