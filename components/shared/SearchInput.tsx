import { Search } from 'lucide-react';
import { Input } from '../ui/input';

export function SearchInput() {
  return (
    <div className="relative h-10">
      <Input
        placeholder="Search"
        className="rounded-[20px]  h-10 pl-16 outline-none border-none "
      />
      <span className="absolute bg-primary top-0 h-10 rounded-[20px] w-14 flex items-center justify-center cursor-pointer">
        <Search className="bg-p h-5 w-5" />
      </span>
    </div>
  );
}
