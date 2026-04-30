// import { motion } from "motion/react";
import { AuroraBackground } from "@/components/ui/aurora-background";
// import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <BackgroundGradientAnimation>
    //   <div className="absolute z-50 inset-0">{children}</div>
    // </BackgroundGradientAnimation>
    <AuroraBackground>{children}</AuroraBackground>
  );
}
