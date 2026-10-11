import {
  Home,
  PlaySquare,
  History,
  ListVideo,
  Clock3,
  ThumbsUp,
  Flame,
  ShoppingBag,
  Music2,
  Film,
  Radio,
  Gamepad2,
  Trophy,
  Settings,
  Flag,
  HelpCircle,
  MessageSquareWarning,
} from "lucide-react";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const sideBar = useSelector((store) => store.sidebar);

  if (!sideBar) return null;

  const mainMenu = [
    {
      label: "Home",
      icon: Home,
    },
    {
      label: "Shorts",
      icon: PlaySquare,
    },
    {
      label: "Subscriptions",
      icon: ListVideo,
    },
  ];

  const youMenu = [
    {
      label: "History",
      icon: History,
    },
    {
      label: "Playlists",
      icon: ListVideo,
    },
    {
      label: "Watch later",
      icon: Clock3,
    },
    {
      label: "Liked videos",
      icon: ThumbsUp,
    },
  ];

  const exploreMenu = [
    {
      label: "Trending",
      icon: Flame,
    },
    {
      label: "Shopping",
      icon: ShoppingBag,
    },
    {
      label: "Music",
      icon: Music2,
    },
    {
      label: "Movies & TV",
      icon: Film,
    },
    {
      label: "Live",
      icon: Radio,
    },
    {
      label: "Gaming",
      icon: Gamepad2,
    },
    {
      label: "Sports",
      icon: Trophy,
    },
  ];

  const moreMenu = [
    {
      label: "Settings",
      icon: Settings,
    },
    {
      label: "Report history",
      icon: Flag,
    },
    {
      label: "Help",
      icon: HelpCircle,
    },
    {
      label: "Send feedback",
      icon: MessageSquareWarning,
    },
  ];

  const MenuItem = ({ item }) => {
    const Icon = item.icon;

    return (
      <button
        type="button"
        className="
          w-full
          flex
          items-center
          gap-5
          px-3
          py-2
          rounded-lg
          text-sm
          text-gray-800
          hover:bg-gray-100
          transition
        "
      >
        <Icon className="w-5 h-5 shrink-0" strokeWidth={1.8} />

        <span className="truncate">{item.label}</span>
      </button>
    );
  };

  const Section = ({ title, items }) => {
    return (
      <section className="py-3 border-b border-gray-200 px-2">
        {title && (
          <h2 className="px-3 mb-2 text-base font-semibold">{title}</h2>
        )}

        <div className="space-y-1 ">
          {items.map((item) => (
            <MenuItem key={item.label} item={item} />
          ))}
        </div>
      </section>
    );
  };

  return (
    <aside
      className="
        fixed
        top-16
        left-0
        bottom-0
        w-55
        bg-white
        overflow-y-auto
        sidebar-scroll
        pb-6
      "
    >
      {/* Main navigation */}
      <Section items={mainMenu} />

      {/* You */}
      <Section title="You" items={youMenu} />

      {/* Explore */}
      <Section title="Explore" items={exploreMenu} />

      {/* More */}
      <Section title="More from YouTube" items={moreMenu} />

      {/* Footer */}
      <div className="px-4 py-5 text-xs text-gray-500 leading-5">
        <p>About &nbsp; Press &nbsp; Copyright</p>

        <p>Contact us &nbsp; Creators</p>

        <p>Advertise &nbsp; Developers</p>

        <p className="mt-3">Terms &nbsp; Privacy &nbsp; Policy & Safety</p>

        <p className="mt-4 text-gray-400">© 2026 YouTube</p>
      </div>
    </aside>
  );
};

export default Sidebar;
