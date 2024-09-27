import React, { useState, useEffect } from "react";
import { UserX, UserCheck, Users, Upload, Check } from "lucide-react";

const App = () => {
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [hiddenUsers, setHiddenUsers] = useState([]);
  const [displayedUsers, setDisplayedUsers] = useState([]);
  const [followersFile, setFollowersFile] = useState(null);
  const [followingFile, setFollowingFile] = useState(null);

  const handleFileUpload = (event, type) => {
    const file = event.target.files[0];
    if (type === "followers") {
      setFollowersFile(file);
    } else if (type === "following") {
      setFollowingFile(file);
    }
  };

  const readFile = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(JSON.parse(e.target.result));
      reader.onerror = (error) => reject(error);
      reader.readAsText(file);
    });
  };

  const processFiles = async () => {
    try {
      const followersData = followersFile ? await readFile(followersFile) : [];
      const followingData = followingFile
        ? await readFile(followingFile)
        : { relationships_following: [] };

      setFollowers(followersData);
      setFollowing(followingData.relationships_following);
    } catch (error) {
      console.error("Error processing files:", error);
    }
  };

  useEffect(() => {
    if (followers.length && following.length) {
      const nonReciprocal = following.filter((follow) => {
        const followingValue = follow.string_list_data[0].value;
        return !followers.some(
          (follower) => follower.string_list_data[0].value === followingValue
        );
      });
      setDisplayedUsers(
        nonReciprocal.map((user) => user.string_list_data[0].value)
      );
    }
  }, [followers, following]);

  const hideUser = (user) => {
    setHiddenUsers([...hiddenUsers, user]);
    setDisplayedUsers(displayedUsers.filter((u) => u !== user));
  };

  return (
    <div className="bg-black min-h-screen p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-center mb-6 sm:mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-yellow-400 text-center">
            Non-Reciprocal Followers
          </h1>
        </div>

        <div className="bg-white bg-opacity-5 rounded-xl p-4 sm:p-8 mb-6 sm:mb-10 shadow-2xl">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6 space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center w-full sm:w-auto">
              <input
                type="file"
                id="followers-upload"
                className="hidden"
                onChange={(e) => handleFileUpload(e, "followers")}
              />
              <label
                htmlFor="followers-upload"
                className="flex items-center justify-center w-full sm:w-auto bg-yellow-400 text-black rounded-lg p-3 cursor-pointer hover:bg-yellow-300 transition-all duration-300"
              >
                <Upload className="mr-2" size={20} />
                <span className="text-sm sm:text-base font-semibold">
                  Upload Followers
                </span>
              </label>
              {followersFile && (
                <Check className="text-yellow-400 ml-2" size={20} />
              )}
            </div>
            <div className="flex items-center w-full sm:w-auto">
              <input
                type="file"
                id="following-upload"
                className="hidden"
                onChange={(e) => handleFileUpload(e, "following")}
              />
              <label
                htmlFor="following-upload"
                className="flex items-center justify-center w-full sm:w-auto bg-yellow-400 text-black rounded-lg p-3 cursor-pointer hover:bg-yellow-300 transition-all duration-300"
              >
                <Upload className="mr-2" size={20} />
                <span className="text-sm sm:text-base font-semibold">
                  Upload Following
                </span>
              </label>
              {followingFile && (
                <Check className="text-yellow-400 ml-2" size={20} />
              )}
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <button
              onClick={processFiles}
              className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-2 px-4 sm:py-3 sm:px-6 rounded-full transition-colors duration-300 transform hover:scale-105 text-sm sm:text-base"
              disabled={!followersFile || !followingFile}
            >
              Confirm and Process
            </button>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center mt-4 sm:mt-6 space-y-4 sm:space-y-0">
            <div className="flex items-center bg-white bg-opacity-10 rounded-lg p-3 w-full sm:w-auto">
              <Users className="text-yellow-400 mr-2" size={20} />
              <span className="text-lg sm:text-xl font-semibold text-white">
                Displayed: {displayedUsers.length}
              </span>
            </div>
            <div className="flex items-center bg-white bg-opacity-10 rounded-lg p-3 w-full sm:w-auto">
              <UserX className="text-yellow-400 mr-2" size={20} />
              <span className="text-lg sm:text-xl font-semibold text-white">
                Unfollowed: {hiddenUsers.length}
              </span>
            </div>
          </div>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {displayedUsers.map((user, index) => (
            <li key={index} className="group">
              <a
                href={`https://instagram.com/${user}`}
                target="_blank"
                rel="noreferrer"
                className="block bg-white bg-opacity-5 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:bg-opacity-10"
                onClick={(e) => {
                  e.preventDefault();
                  hideUser(user);
                  window.open(`https://instagram.com/${user}`, "_blank");
                }}
              >
                <div className="p-4 sm:p-6">
                  <div className="flex justify-between items-center">
                    <span className="text-lg sm:text-xl font-bold text-yellow-400">
                      {user}
                    </span>
                    <UserCheck
                      className="text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      size={20}
                    />
                  </div>
                  <p className="text-xs sm:text-sm text-white opacity-70 mt-2">
                    Click to open profile
                  </p>
                </div>
                <div className="bg-yellow-400 h-1 w-0 group-hover:w-full transition-all duration-300"></div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
