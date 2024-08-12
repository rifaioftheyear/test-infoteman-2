"use client";
import React, { useRef, useEffect, useState, Suspense } from "react";
import Head from "next/head";
import Hls from "hls.js";
import { useSearchParams } from "next/navigation";

function VideoPlayer() {
  const videoRef = useRef(null);
  const searchParams = useSearchParams();
  const iptv = searchParams.get("url");

  useEffect(() => {
    if (videoRef.current && iptv) {
      const hls = new Hls();
      hls.loadSource(iptv);
      hls.attachMedia(videoRef.current);
      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        videoRef.current.play();
      });

      return () => {
        hls.destroy();
      };
    }
  }, [iptv]);

  if (!iptv) {
    return <div className="loading"></div>;
  }

  return (
    <video className="video" ref={videoRef} controls poster="/trans.png" />
  );
}

export default function Play() {
  return (
    <>
      <Head>
        <title>IPTV Video Player</title>
        <style>{`
          body, html {
            margin: 0;
            padding: 0;
            width: 100%;
            overflow: hidden;
            background-color: black;
          }
          video {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            object-fit: cover;
          }
        `}</style>
      </Head>
      <Suspense fallback={<div className="loading">Loading...</div>}>
        <VideoPlayer />
      </Suspense>
    </>
  );
}
