"use client";

import TextPressure from "@/components/reactbits/TextPressure";

export default function TextPressureTestPage() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#000000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: 0,
        padding: 0,
        boxSizing: "border-box"
      }}
    >
      <div
        style={{
          width: "900px",
          height: "250px"
        }}
      >
        <TextPressure
          text="HELLO!"
          flex={true}
          alpha={false}
          stroke={false}
          width={true}
          weight={true}
          italic={true}
          textColor="#ffffff"
          strokeColor="#ffffff"
          minFontSize={36}
        />
      </div>
    </div>
  );
}
