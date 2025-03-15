import { Input } from '../ui/input';
import { Button } from '../ui/button';

export function JoinTest() {
  return (
    <div className="max-w-[460px] flex gap-6 flex-col mx-auto items-center tracking-wider">
      <h1 className="text-4xl font-semibold">Join Test</h1>
      <img src="/join-banner.png" alt="join-banner" />
      <div className="flex gap-4 flex-col w-full">
        <div>
          <p className="text-lg">Students</p>
          <Input placeholder="Enter your code here" />
        </div>
        <Button>Join</Button>
      </div>
    </div>
  );
}
