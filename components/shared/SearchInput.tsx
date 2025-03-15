import { Search } from 'lucide-react';
import { Input } from '../ui/input';

export function SearchInput() {
  return (
    <div className="relative h-10">
      <Input
        placeholder="Search"
        className="bg-[#928979] rounded-[20px] placeholder:text-white h-10 pl-16 outline-none border-none text-white"
      />
      <span className="bg-[#473c33] absolute  top-0 h-10 rounded-[20px] w-14 flex items-center justify-center cursor-pointer">
        <Search className="text-white h-5 w-5" />
      </span>
    </div>
  );
}
// #473c33
