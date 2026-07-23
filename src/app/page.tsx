import ActOneExperience from "@/components/sections/act1/ActOneExperience";
import TheEngineer from "@/components/sections/act2/TheEngineer";
import TheExhibition from "@/components/sections/act3/TheExhibition";
import CameraHUD from "@/components/ui/CameraHUD";
import TheToolkit from "@/components/sections/act4/TheToolkit";
import GrowthThroughBuilding from "@/components/sections/act4/GrowthThroughBuilding";
import ProofOfImpact from "@/components/sections/act4/ProofOfImpact";
import LetsBuildTogether from "@/components/sections/act5/LetsBuildTogether";

export default function Home() {
  return (
    <>
      <CameraHUD />
      {/* ACT I — Enter the Frame */}
      <ActOneExperience />

      {/* ACT II — Meet the Creator */}
      <TheEngineer />

      {/* ACT III — Built With Purpose (The Exhibition) */}
      <TheExhibition />

      {/* ACT IV — Skills & Expertise */}
      <TheToolkit />
      <GrowthThroughBuilding />
      <ProofOfImpact />

      {/* ACT V — Final Frame */}
      <LetsBuildTogether />
    </>
  );
}
