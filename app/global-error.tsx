"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service in production
    if (process.env.NODE_ENV === "development") {
      console.error("Global Error Boundary caught:", error);
    }
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "32px",
          backgroundColor: "#fafaf6",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <h1
          style={{
            fontSize: "24px",
            fontWeight: "600",
            color: "#2a2520",
            marginBottom: "16px",
          }}
        >
          Something went wrong
        </h1>
        <p
          style={{
            fontSize: "14px",
            color: "#5a5650",
            marginBottom: "24px",
            textAlign: "center",
            maxWidth: "400px",
          }}
        >
          A critical error occurred. Please try refreshing the page.
        </p>

        {/* Show error details in dev */}
        {process.env.NODE_ENV === "development" && (
          <pre
            style={{
              padding: "16px",
              backgroundColor: "#1a1a1a",
              color: "#c8922a",
              fontSize: "12px",
              fontFamily: "monospace",
              borderRadius: "8px",
              marginBottom: "24px",
              maxWidth: "100%",
              overflow: "auto",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
            }}
          >
            {error.message}
            {"\n\n"}
            {error.stack}
          </pre>
        )}

        <button
          onClick={() => reset()}
          style={{
            padding: "12px 24px",
            background: "linear-gradient(to bottom, #d4a040, #a87520)",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: "600",
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(168, 117, 32, 0.4)",
          }}
        >
          Try again
        </button>

        <a
          href="/"
          style={{
            marginTop: "16px",
            fontSize: "13px",
            color: "#c8922a",
            textDecoration: "none",
          }}
        >
          Return to home
        </a>
      </body>
    </html>
  );
}
