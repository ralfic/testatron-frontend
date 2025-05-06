import { PiSpinner } from 'react-icons/pi';

export default function LoadingPage() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="flex flex-col gap-4 justify-center items-center">
        <PiSpinner className="animate-spin w-10 h-10" />
        <p>Please wait while we are redirecting you</p>
      </div>
    </div>
  );
}
