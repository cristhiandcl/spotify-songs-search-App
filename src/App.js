import React, { useState, useEffect } from "react";
import Pagination from "./components/pagination";

function App() {
  //spotify client data and auth page
  const CLIENT_ID = "4f9db3f78fea42dab9677a85e2f540ad";
  const REDIRECT_URI =
    "https://cristhiandcl.github.io/spotify-songs-search-App";
  const AUTH_ENDPOINT = "http://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  //user token, song search and array to save all fetched data
  const [token, setToken] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [songs, setSongs] = useState([]);

  //states to control pagination
  const [currentPage, setCurrentPage] = useState(1);
  const songsPerPage = 10;

  //getting the user token on login
  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");
    // removing everything but the user token
    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];
      //deleting token info
      window.location.hash = "";
      //saving token in local storage to avoid losing logged session
      window.localStorage.setItem("token", token);
    }

    setToken(token);
  }, []);

  // log out from App
  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  // function to fetch the data
  const searchArtists = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${searchKey}&type=track&limit=48`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();
    setSongs(data.tracks.items);
    //going back to page 1
    setCurrentPage(1);
  };

  // Get current songs
  const indexOfLastSong = currentPage * songsPerPage;
  const indexOfFirstSong = indexOfLastSong - songsPerPage;
  const currentSongs = songs.slice(indexOfFirstSong, indexOfLastSong);

  // Change page
  const paginateFront = () => {
    indexOfLastSong < songs.length && setCurrentPage(currentPage + 1);
  };
  const paginateBack = () => {
    indexOfFirstSong > 0 && setCurrentPage(currentPage - 1);
  };

  //rendering all songs
  const renderSongs = currentSongs.map((song) => (
    <div
      className="border-2 border-green-600 my-4 py-4 hover:bg-blue-100"
      key={song.id}
    >
      {song.album.images.length ? (
        <img
          className="w-[100px] mx-auto"
          src={song.album.images[0].url}
          alt={song.album.name}
        />
      ) : (
        <div>No Image</div>
      )}
      <p>{song.name}</p>
      <p>{song.artists[0].name}</p>
      <a
        className="text-blue-300"
        href={song.external_urls.spotify}
        target="_blank"
      >
        Play song
      </a>
    </div>
  ));

  return (
    <div
      className={`text-green-500 font-bold text-center bg-green-100 ${
        songs.length > 0 && "py-8"
      }`}
    >
      {token ? (
        <div
          className={`flex flex-col justify-center items-center space-x-2 ${
            songs.length === 0 && "h-screen"
          }`}
        >
          <div className="flex space-x-2 items-baseline">
            <p className="text-xl">Type down any song you want to listen</p>
            <button
              onClick={logout}
              className="font-bold text-blue-300 hover:text-black"
            >
              Log out
            </button>
          </div>
          <>
            <form onSubmit={searchArtists} className="py-4">
              <input
                className="border-2 border-green-300 mr-2"
                placeholder="Search for any song"
                type="text"
                value={searchKey}
                name="searchKey"
                onChange={(e) => setSearchKey(e.target.value)}
              />
              <button className="font-bold" type={"submit"}>
                Search
              </button>
            </form>
            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-x-2">
              {renderSongs}
            </div>
            {songs.length > 0 && (
              <Pagination
                songsPerPage={songsPerPage}
                totalSongs={songs.length}
                paginateBack={paginateBack}
                paginateFront={paginateFront}
                currentPage={currentPage}
              />
            )}
          </>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-screen">
          <p className="text-6xl mb-4 animate-pulse">
            Spotify Songs Search App
          </p>
          <a
            className="text-2xl text-blue-300 hover:text-black "
            href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
          >
            Login
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
