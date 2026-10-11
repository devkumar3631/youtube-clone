import { Menu, Plus } from "lucide-react";
import { GoBell } from "react-icons/go";
import { IoSearchOutline } from "react-icons/io5";
import { PiMicrophone } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { toogleState } from "../store/slices/sideBarSlice";
import { useEffect, useState } from "react";
import { cacheResult } from "../store/slices/searchSlice";

const Header = () => {
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestion, setShowSuggestion] = useState(false);

  const searchCache = useSelector((store) => store.search);

  const dispatch = useDispatch();

  const handleSearch = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    const query = searchText.trim();
    if (!query) {
      setSuggestions([]);
      return;
    }

    // Check Redux cache first
    const cachedResult = searchCache[query];

    if (cachedResult) {
      setSuggestions(cachedResult);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const response = await fetch(
          `http://suggestqueries.google.com/complete/search?client=chrome&ds=yt&q=${encodeURIComponent(
            searchText,
          )}`,
        );

        const data = await response.json();

        // console.log(data);

        setSuggestions(data[1] || []);
        dispatch(
          cacheResult({
            key: searchText,
            results: data[1],
          }),
        );
      } catch (error) {
        console.error("Suggestion API error:", error);
        setSuggestions([]);
      }
    }, 300);

    // IMPORTANT: cleanup
    return () => {
      clearTimeout(timer);
    };
  }, [searchText]);

  const handleSideBar = () => {
    dispatch(toogleState());
  };

  return (
    <header className="sticky top-0 z-50 h-16  px-4 flex items-center justify-between bg-white">
      {/* LEFT — Menu + Logo */}
      <section className="flex items-center gap-4 shrink-0">
        <button
          type="button"
          className="p-2 rounded-full hover:bg-gray-100 transition"
          aria-label="Menu"
          onClick={handleSideBar}
        >
          <Menu className="w-6 h-6" />
        </button>

        <div className="flex items-center cursor-pointer">
          <img src="/youtube.png" alt="YouTube" className="h-7 w-auto" />

          <span className="text-xl font-semibold tracking-tight">YouTube</span>
        </div>
      </section>

      {/* CENTER — Search */}
      <section className="hidden md:flex items-center flex-1 max-w-2xl mx-8 relative">
        <form onSubmit={handleSearch} className="flex items-center w-full">
          <div className="flex items-center flex-1 h-10 border border-gray-300 rounded-l-full overflow-hidden focus-within:border-blue-500">
            <input
              type="text"
              name="search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onFocus={() => setShowSuggestion(true)}
              onBlur={() => setShowSuggestion(false)}
              id="search"
              placeholder="Search"
              className="w-full h-full px-5 outline-none text-sm"
            />
          </div>

          <button
            type="submit"
            className="h-10 w-16 flex items-center justify-center border border-l-0 border-gray-300 bg-gray-50 hover:bg-gray-100 rounded-r-full transition"
            aria-label="Search"
          >
            <IoSearchOutline className="w-5 h-5" />
          </button>

          <button
            type="button"
            className="ml-3 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition"
            aria-label="Voice search"
          >
            <PiMicrophone className="w-5 h-5" />
          </button>
        </form>

        {/* SEARCH SUGGESTIONS */}
        {showSuggestion && suggestions.length > 0 && (
          <div className="absolute top-12 left-0 w-[calc(100%-7rem)] h-110  bg-white rounded-xl shadow-lg border border-gray-200 overflow-x-auto z-50 button-scroll">
            {suggestions.map((suggestion, index) => {
              // Handles both:
              // "react tutorial"
              // ["react tutorial", ...]
              const text = Array.isArray(suggestion)
                ? suggestion[0]
                : suggestion;

              return (
                <button
                  key={`${text}-${index}`}
                  type="button"
                  onMouseDown={() => {
                    setSearchText(text);
                    setSuggestions([]);
                  }}
                  className="w-full flex items-center gap-4 px-5 py-3 text-left hover:bg-gray-100 transition"
                >
                  <IoSearchOutline className="w-5 h-5 text-gray-600 shrink-0" />

                  <span className="text-sm text-gray-800 truncate">{text}</span>
                </button>
              );
            })}
          </div>
        )}
      </section>

      {/* RIGHT — Create + Notifications + Profile */}
      <section className="flex items-center gap-2 shrink-0">
        {/* Create */}
        <button
          type="button"
          className="hidden sm:flex items-center gap-2 px-4 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition font-medium text-sm"
        >
          <Plus className="w-5 h-5" />
          <span>Create</span>
        </button>

        {/* Notifications */}
        <button
          type="button"
          className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
          aria-label="Notifications"
        >
          <GoBell className="w-5 h-5" />

          {/* notification badge */}
          <span className="absolute top-1 right-1 min-w-4 h-4 px-1 flex items-center justify-center rounded-full bg-red-600 text-white text-[9px] font-semibold">
            3
          </span>
        </button>

        {/* Profile */}
        <button
          type="button"
          className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-medium"
          aria-label="Account"
        >
          D
        </button>
      </section>
    </header>
  );
};

export default Header;
