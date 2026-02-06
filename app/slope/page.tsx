"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    dataLayer: unknown[];
    UnityLoader?: {
      instantiate: (
        containerId: string,
        buildUrl: string,
        options?: {
          onProgress?: (progress: number) => void;
          Module?: {
            onRuntimeInitialized?: () => void;
          };
        }
      ) => void;
    };
    UnityProgress?: (progress: number | "complete") => void;
  }
}

export default function Slope() {
  useEffect(() => {
    // --- Google Analytics ---
    const gtagScript = document.createElement("script");
    gtagScript.async = true;
    gtagScript.src =
      "https://www.googletagmanager.com/gtag/js?id=G-VKK1BVCT2G";
    document.head.appendChild(gtagScript);

    window.dataLayer = window.dataLayer || [];
    function gtag(...args: unknown[]) {
      window.dataLayer.push(args);
    }
    gtag("js", new Date());
    gtag("config", "G-VKK1BVCT2G");

    // --- Unity ---

    const unityLoader = document.createElement("script");
    unityLoader.src = "/TemplateData/unityloader41.js";

    unityLoader.onload = () => {
      if (window.UnityLoader) {
        window.UnityLoader.instantiate("gameContainer", "/Build/slope.json", {
            Module: {
                onRuntimeInitialized: () => {
                console.log("Unity loaded");
                },
            },
        });
      }
    };

    document.body.appendChild(unityLoader);

    // --- Clicky ---
    const clicky = document.createElement("script");
    clicky.async = true;
    clicky.src = "//static.getclicky.com/101393847.js";
    document.body.appendChild(clicky);

    return () => {
      unityLoader.remove();
      clicky.remove();
    };
  }, []);

  return (
    <>
      <div className="webgl-content" style={{ margin: 0, overflow: "hidden" }}>
        <div
          id="gameContainer"
          style={{ width: "75%", height: "75%", margin: 0, justifySelf: "center" }}
        />
      </div>
    </>
  );
}
