import { ImageResponse } from "next/og";
import { colors } from "@/config/theme";

export const alt = "Ruben Sagnier — Photographie de surf et d’océan";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: colors.background,
          color: colors.white,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 14,
            textTransform: "uppercase",
            color: colors.detail,
          }}
        >
          Photographe
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 40,
            fontSize: 104,
            letterSpacing: 4,
          }}
        >
          Ruben Sagnier
        </div>
        <div
          style={{
            display: "flex",
            width: 120,
            height: 2,
            marginTop: 48,
            backgroundColor: colors.cta,
          }}
        />
        <div
          style={{
            display: "flex",
            marginTop: 48,
            fontSize: 34,
            letterSpacing: 2,
            color: "rgba(250, 250, 250, 0.6)",
          }}
        >
          Photographie de surf et d’océan
        </div>
      </div>
    ),
    size
  );
}
