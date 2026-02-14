"use client";

import { useEffect, useState } from "react";

const slides = [
  { url: "/images/clinic-1.jpg" },
  { url: "/images/clinic-2.jpg" },
];

export default function ClinicCinematic() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="cinematic fade-in">
      <div className="cinematic-slider">
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`cinematic-slide${i === current ? " active" : ""}`}
            style={{ backgroundImage: `url(${slide.url})` }}
          />
        ))}
      </div>
      <div className="cinematic-overlay" />
      <div className="cinematic-content">
        <div className="cinematic-line" />
        <h2>전문 의료진의 섬세한 진료</h2>
        <p>
          정밀한 진단부터 안전한 시술까지, 환자 한 분 한 분에게 최선을 다합니다
        </p>
      </div>
    </section>
  );
}
