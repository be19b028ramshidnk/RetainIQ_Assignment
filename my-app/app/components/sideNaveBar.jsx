import Image from 'next/image';
import { FaMeta} from "react-icons/fa6";
import { LuShirt, LuCreditCard, LuSettings, LuImage } from "react-icons/lu";
import { HiOutlineLightningBolt } from "react-icons/hi";
const sidebar = () => {
  return (
    <div className="fixed top-0 left-0 h-screen w-20 bg-dark-400 shadow-lg z-10">
      <div className="h-4/5 flex flex-col p-4 gap-8 items-center ">
        <Image src="/logo.png" alt="Logo" width={30} height={30} className="cursor-pointer" />
        <HiOutlineLightningBolt color="#A6A6A6" className="size-6 cursor-pointer" />
        <LuImage color="#A6A6A6" className="size-6 cursor-pointer" />
        <FaMeta className="size-6 cursor-pointer fill-dark-50"/>
        <LuShirt color="#A6A6A6" className="size-6 cursor-pointer" />
      </div>

      <div className="h-1/5 flex flex-col justify-end p-4 gap-8 items-center">
        <LuCreditCard color="#A6A6A6" className="size-6 cursor-pointer" />
        <LuSettings color="#A6A6A6" className="size-6 cursor-pointer" />
      </div>
    </div>
  );
};

export default sidebar;