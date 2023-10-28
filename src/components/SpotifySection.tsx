import { ChangeEvent, useState, useEffect, MouseEventHandler } from "react";
import {
  Search,
  PlayCircle,
  PauseCircle,
  ChevronFirst,
  ChevronLast,
  X,
} from "lucide-react";

function SpotifySection() {
  const [isInputFocused, setInputFocused] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("");

  function handleFocus(): void {
    setInputFocused(true);
  }

  function handleBlur(): void {
    setInputFocused(false);
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    setSearchValue(e.target.value);
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchValue(searchValue);
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchValue]);

  useEffect(() => {
    if (debouncedSearchValue !== "") {
      console.log(debouncedSearchValue);
    }
  }, [debouncedSearchValue]);

  function handleClick(): void {
    setSearchValue("");
  }

  return (
    <section className="w-1/2">
      <div
        className={`w-full search-bar flex items-center justify-between bg-lightblack rounded-lg px-2 py-3 mb-2 transition-shadow ${
          isInputFocused
            ? "shadow-white shadow-whiteshadow"
            : "hover:shadow-whiteshadow"
        }`}
      >
        <Search
          className={`w-8 mr-1 transition-opacity ${
            isInputFocused ? "opacity-100" : "opacity-60"
          }`}
        />
        <input
          type="text"
          name=""
          id=""
          placeholder="What do you want to listen to ?"
          className="w-full bg-lightblack text-white text-sm text-ellipsis focus:outline-none"
          onFocus={() => handleFocus()}
          onBlur={() => handleBlur()}
          onChange={(e) => handleChange(e)}
          value={searchValue}
        />

        <button onClick={() => handleClick()} disabled={!searchValue}>
          <X className={`w-8 ${searchValue ? "" : "opacity-0"}`} />
        </button>
      </div>

      {/* TO DO input
       *
       * opacity ->  search icon focus/!focus
       * Value !empty = icon delete visible / Onclick = setValue = ''
       * Value !empty afficher résultat recherche + cacher player
       * Form ->>  https://api.spotify.com/v1/search?q=MA_RECHERCHE
       *
       *
       */}
      {/* Spotify Player */}
      <div className="aspect-square bg-green">
        <img
          src="/images/icons/Spotify_Icon_RGB_White.png"
          alt="spotify logo"
          className="h-full w-full object-contain p-2 flex-shrink-0"
        />
      </div>

      {/* Spotify info */}
      <div className="flex flex-col">
        <p>title</p>
        <p>artist</p>
        <div className="w-1/2 mx-auto flex justify-between">
          <span>
            <ChevronFirst />
          </span>
          <span>
            <PlayCircle />
          </span>
          {/*<span><PauseCircle/></span>*/}
          <span>
            <ChevronLast />
          </span>
        </div>
      </div>
    </section>
  );
}

export default SpotifySection;
