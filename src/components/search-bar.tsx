import { Search } from "lucide-react";

const SearchBar = () => (
  <div className="relative mb-8 max-w-[500px]">
    <input
      type="text"
      placeholder="Search channels..."
      className="w-full bg-gray-800 text-white border-2 border-gray-700 rounded-md py-3  pl-12 focus:outline-none focus:border-yellow-500 transition-colors duration-300 px-8 max-w-[500px]"
    />
    <Search
      className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
      size={20}
    />
  </div>
);

export default SearchBar;
