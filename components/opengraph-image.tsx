import { ImageResponse } from "next/og";

export type Props = {
  title?: string;
  bottomText?: string;
};

async function loadPoppinsFont() {
  const response = await fetch(
    "https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap",
  );
  const css = await response.text();
  const fontUrl = css.match(/url\((https:\/\/fonts\.gstatic\.com[^)]+)\)/)?.[1];

  if (!fontUrl) {
    return null;
  }

  try {
    const fontResponse = await fetch(fontUrl);
    return await fontResponse.arrayBuffer();
  } catch (error) {
    // Font loading failed (network error, timeout, etc.)
    // Return null to gracefully fall back to system font
    return null;
  }
}

export default async function OpengraphImage(
  props?: Props,
): Promise<ImageResponse> {
  const title = props?.title || "The Platform Press";
  const { bottomText } = props || {};

  const poppinsFont = await loadPoppinsFont();

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        height: "100%",
        width: "100%",
        flexDirection: "column",
        backgroundColor: "white",
        padding: "60px",
        fontFamily: '"Poppins", sans-serif',
      }}
    >
      {/* Brand name at top */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "40px",
        }}
      >
        <h1
          style={{
            fontSize: "36px",
            fontWeight: 700,
            color: "black",
            margin: 0,
            letterSpacing: "-0.02em",
          }}
        >
          The Platform Press
        </h1>
      </div>

      {/* Main title */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          textAlign: "center",
          paddingLeft: "40px",
          paddingRight: "40px",
        }}
      >
        <h2
          style={{
            fontSize:
              title.length > 60 ? "48px" : title.length > 30 ? "56px" : "64px",
            fontWeight: 700,
            color: "black",
            margin: 0,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
          }}
        >
          {title}
        </h2>
      </div>

      {/* Bottom text section */}
      {bottomText && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "40px",
            textAlign: "center",
          }}
        >
          <span
            style={{
              fontSize: "24px",
              fontWeight: 400,
              color: "#666666",
            }}
          >
            {bottomText}
          </span>
        </div>
      )}
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: poppinsFont
        ? [
            {
              name: "Poppins",
              data: poppinsFont,
              style: "normal",
              weight: 700,
            },
          ]
        : undefined,
    },
  );
}
