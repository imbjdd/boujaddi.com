"use client";

import { StaticMeshGradient } from "@paper-design/shaders-react";

export function HackathonAtlasBanner() {
  return (
    <div className="relative w-full h-[300px] rounded-lg overflow-hidden">
      <StaticMeshGradient
        scale={1}
        rotation={0}
        positions={42}
        waveX={0.45}
        waveXShift={0}
        waveY={1}
        waveYShift={0}
        mixing={0}
        grainMixer={0.37}
        grainOverlay={0.78}
        colors={["#000000", "#082400", "#B1AA91", "#8E8C15"]}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <h2 className="text-white font-bold text-2xl md:text-3xl">
          Hackathon Atlas
        </h2>
      </div>
    </div>
  );
}
