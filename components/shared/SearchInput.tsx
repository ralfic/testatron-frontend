import { Search } from 'lucide-react';
import { Input } from '../ui/input';

interface IProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

export function SearchInput({ onChange, value }: IProps) {
  return (
    <div className="relative h-10">
      <Input
        placeholder="Search"
        className="rounded-[20px]  h-10 pl-16 outline-none border-none "
        onChange={onChange}
        value={value}
      />
      <span className="absolute bg-primary top-0 h-10 rounded-[20px] w-14 flex items-center justify-center cursor-pointer">
        <Search className="bg-p h-5 w-5" />
      </span>
    </div>
  );
}
