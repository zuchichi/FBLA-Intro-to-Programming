import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Apple, Sprout } from "lucide-react";

export default function Home() {
  return (
    <Card className="w-[400px] h-[520px] bg-[#e6e6e6] rounded-[24px] border-none shadow-2xl flex flex-col p-6 relative font-sans text-[#c43a31]">
      
      {/* Header Section */}
      <div className="text-center mt-2 mb-6">
        <h1 className="text-[22px] font-bold tracking-tight">
          Good afternoon, nil!
        </h1>
        <p className="text-[14px] font-bold mt-1">
          (pet-name) is currently feeling<br />studious today!
        </p>
      </div>

      {/* Body Text */}
      <div className="text-center text-[15px] leading-[1.4] font-bold mb-8 px-1">
        <p>
          After your math session just shortly ago, it seems that your pet picked up on your math & gained the personality trait of studious! Study more math to keep & develop your pets habit!
        </p>
      </div>

      {/* Stats Area */}
      <div className="flex px-1 mb-2 items-end justify-between">
        {/* Left Placeholder Box */}
        <div className="w-[145px] h-[145px] bg-[#b8b8b8] shrink-0" />
        
        {/* Right Bar Chart (Mockup) */}
        <div className="flex flex-col items-center">
          <div className="flex items-end h-[140px] gap-2.5 justify-center mb-2">
            <div className="w-[18px] bg-[#c43a31] h-[55%]" />
            <div className="w-[18px] bg-[#c43a31] h-[100%]" />
            <div className="w-[18px] bg-[#c43a31] h-[20%]" />
            <div className="w-[18px] bg-[#c43a31] h-[50%]" />
            <div className="w-[18px] bg-[#c43a31] h-[80%]" />
          </div>

          {/* Stats Text */}
          <div className="text-center">
            <p className="font-bold text-[15px]">Pets Stats for Today</p>
            <p className="font-bold text-[14px]">Your pet is (current), (response)</p>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="flex items-center justify-between mt-auto pt-2 pl-1">
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-1 font-bold">
            <Apple className="w-5 h-5 fill-[#c43a31] text-[#c43a31]" />
            <span className="text-[14px] pt-0.5">nil</span>
          </div>
          <div className="flex items-center gap-1 font-bold">
            <Sprout className="w-5 h-5 text-[#6c8f33]" strokeWidth={3} />
            <span className="text-[14px] pt-0.5 text-[#6c8f33]">nil</span>
          </div>
        </div>
        
        <Button className="bg-[#c43a31] hover:bg-[#a63028] text-white font-bold px-4 py-2 h-auto rounded-lg shadow-none border-none text-[15px]">
          Attend to Pet
        </Button>
      </div>

    </Card>
  );
}
