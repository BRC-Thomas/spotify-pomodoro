import { ChangeEvent, useState, useEffect } from "react";
import { Search, PlayCircle, ChevronFirst, ChevronLast, X } from "lucide-react";
import getToken from "../features/spotify";

type SpotifyData = {
  tracks: {
    href: string;
    limit: number;
    next: string;
    offset: number;
    previous: null;
    total: number;
    items: TrackItem[];
    id: string;
  };
  playlists: {
    href: string;
    limit: number;
    next: string;
    offset: number;
    previous: null;
    total: number;
    items: PlaylistItem[];
    id: string;
  };
};

type PlaylistItem = {
  collaborative: boolean;
  description: string;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: {
    height: number;
    url: string;
    width: number;
  }[];
  name: string;
  owner: {
    display_name: string;
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    type: string;
  };
  primary_color: null;
  public: null;
  snapshot_id: string;
  tracks: {
    href: string;
    total: number;
  };
  type: string;
  uri: string;
  album: {
    album_type: string;
    artists: {
      external_urls: {
        spotify: string;
      };
      href: string;
      id: string;
      name: string;
      type: string;
      uri: string;
    }[];
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    images: {
      height: number;
      url: string;
      width: number;
    }[];
    name: string;
    release_date: string;
    release_date_precision: string;
    total_tracks: number;
    type: string;
    uri: string;
  };
};

type TrackItem = {
  album: {
    album_type: string;
    artists: {
      external_urls: {
        spotify: string;
      };
      href: string;
      id: string;
      name: string;
      type: string;
      uri: string;
    }[];
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    images: {
      height: number;
      url: string;
      width: number;
    }[];
    name: string;
    release_date: string;
    release_date_precision: string;
    total_tracks: number;
    type: string;
    uri: string;
  };
  artists: {
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
  }[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: {
    isrc: string;
  };
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  is_local: boolean;
  is_playable: boolean;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
};

function SpotifySection() {
  const [isInputFocused, setInputFocused] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState<string>("");
  const [token, setToken] = useState<string | null>(null);
  const [data, setData] = useState<SpotifyData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedToken = await getToken();
      setToken(fetchedToken?.token);
    };

    fetchData();
  }, []);

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
      searchSpotify(token, debouncedSearchValue);
    }
  }, [debouncedSearchValue, token]);

  async function searchSpotify(
    token: string | null,
    searchValue: string
  ): Promise<void> {
    try {
      if (token) {
        const response = await fetch(
          `https://api.spotify.com/v1/search?q=${encodeURIComponent(
            searchValue
          )}&type=playlist%2Ctrack&market=FR`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data: SpotifyData = await response.json();
          setData(data);
          console.log(data);
        } else {
          console.error("La recherche Spotify a échoué");
        }
      }
    } catch (error) {
      console.error(
        "Une erreur s'est produite lors de la recherche Spotify",
        error
      );
    }
  }

  function handleClick(): void {
    setSearchValue("");
  }

  return (
    <section className="w-1/2">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          searchSpotify(token, searchValue);
        }}
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
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          value={searchValue}
        />

        <button onClick={handleClick} disabled={!searchValue}>
          <X className={`w-8 ${searchValue ? "" : "opacity-0"}`} />
        </button>
      </form>

      {/* Afficher les résultats des playlists */}
      <div className="h-1/2 max-h-72 overflow-y-auto flex-wrap">
        <h3 className="sticky top-0 bg-black">Playlists</h3>
        {data?.playlists?.items.slice(0, 10).map((playlist) => (
          <div key={playlist.id} className="flex h-20 mb-1">
            <img
              src={playlist.images[0].url}
              alt=""
              className="w-20 h-20 object-cover"
            />
            <div className="flex flex-col ml-1">
              <p className="truncate line-clamp-2 w-full whitespace-pre-wrap">
                {playlist.name}
              </p>
              <span className="text-gray-500">Playlist</span>
            </div>
          </div>
        ))}
      </div>

      {/* Afficher les résultats des tracks */}
      <div className="h-1/2 max-h-72 overflow-y-auto flex-wrap">
        <h3 className="sticky top-0 bg-black pt-2">Tracks</h3>
        {data?.tracks?.items.slice(0, 10).map((track) => (
          <div key={track.id} className="flex h-20 mb-1">
            <img
              src={track.album.images[0].url}
              alt=""
              className="w-20 h-20 object-cover"
            />
            <div className="flex flex-col ml-1">
              <p className="truncate line-clamp-2 w-full whitespace-pre-wrap">
                {track.name}
              </p>
              <span className="text-gray-500">
                Track • {track.album.artists[0].name}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* TO DO input
       *
       * Réduire résultat playlist/track
       * keypressed enter => recherche
       *
       *
       */}
      {/* Spotify Player */}
      {/*<div className="aspect-square bg-green">
        <img
          src="/images/icons/Spotify_Icon_RGB_White.png"
          alt="spotify logo"
          className="h-full w-full object-contain p-2 flex-shrink-0"
        />
      </div>*/}

      {/* Spotify info */}
      {/*<div className="flex flex-col">
        <p>title</p>
        <p>artist</p>
        <div className="w-1/2 mx-auto flex justify-between">
          <span>
            <ChevronFirst />
          </span>
          <span>
            <PlayCircle />
          </span>*/}
      {/*<span><PauseCircle/></span>*/}
      {/*<span>
            <ChevronLast />
          </span>
        </div>
      </div>*/}
    </section>
  );
}

export default SpotifySection;
