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

  const processFiles = () => {
    const readFile = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(JSON.parse(e.target.result));
        reader.onerror = (error) => reject(error);
        reader.readAsText(file);
      });
    };

    Promise.all([
      followersFile ? readFile(followersFile) : Promise.resolve([]),
      followingFile
        ? readFile(followingFile)
        : Promise.resolve({ relationships_following: [] }),
    ])
      .then(([followersData, followingData]) => {
        setFollowers(followersData);
        setFollowing(followingData.relationships_following);
      })
      .catch((error) => {
        console.error("Error processing files:", error);
        // Qui potresti aggiungere una gestione degli errori più robusta
      });
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
    <div className="bg-black text-white min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-center mb-10">
          <h1 className="text-5xl font-extrabold">Non-Reciprocal Followers</h1>
        </div>

        <div className="bg-white bg-opacity-10 rounded-xl p-8 mb-10 shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <input
                type="file"
                id="followers-upload"
                className="hidden"
                onChange={(e) => handleFileUpload(e, "followers")}
              />
              <label
                htmlFor="followers-upload"
                className="flex items-center bg-white bg-opacity-10 rounded-lg p-4 cursor-pointer hover:bg-opacity-20 transition-all duration-300"
              >
                <Upload className="text-white mr-3" size={28} />
                <span className="text-lg font-semibold">Upload Followers</span>
              </label>
              {followersFile && (
                <Check className="text-green-500 ml-2" size={24} />
              )}
            </div>
            <div className="flex items-center">
              <input
                type="file"
                id="following-upload"
                className="hidden"
                onChange={(e) => handleFileUpload(e, "following")}
              />
              <label
                htmlFor="following-upload"
                className="flex items-center bg-white bg-opacity-10 rounded-lg p-4 cursor-pointer hover:bg-opacity-20 transition-all duration-300"
              >
                <Upload className="text-white mr-3" size={28} />
                <span className="text-lg font-semibold">Upload Following</span>
              </label>
              {followingFile && (
                <Check className="text-green-500 ml-2" size={24} />
              )}
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <button
              onClick={processFiles}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
              disabled={!followersFile || !followingFile}
            >
              Conferma e Processa File
            </button>
          </div>
          <div className="flex justify-between items-center mt-6">
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
