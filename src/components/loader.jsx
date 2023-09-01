import { Spinner } from "@chakra-ui/spinner";

export default function Loader() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Spinner className="w-6 h-6 text-blue-400" />
    </div>
  );
}