import React, { useState, useEffect, useCallback, memo, Suspense } from "react";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Instagram,
  Sparkles
} from "lucide-react";
import Spline from "@splinetool/react-spline";
import AOS from "aos";
import "aos/dist/aos.css";
import SplineErrorBoundary from "../components/SplineErrorBoundary";

/* ===================== UI COMPONENTS ===================== */

const StatusBadge = memo(() => (
  <div data-aos="zoom-in" data-aos-delay="400">
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 backdrop-blur-xl border border-white/10">
      <Sparkles className="w-4 h-4 text-indigo-400" />
      <span className="text-sm bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
        Ready to Innovate
      </span>
    </div>
  </div>
));

const MainTitle = memo(() => (
  <h1
    className="text-5xl sm:text-6xl xl:text-7xl font-bold leading-tight"
    data-aos="fade-up"
    data-aos-delay="600"
  >
    <span className="block bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
      STUDENT
    </span>
    <span className="block mt-2 bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
      Electronics & Communication
    </span>
  </h1>
));

const TechStack = memo(({ tech }) => (
  <span className="px-4 py-2 text-sm rounded-full bg-white/5 border border-white/10 text-gray-300">
    {tech}
  </span>
));

const CTAButton = memo(({ href, text, icon: Icon }) => (
  <a href={href}>
    <button className="relative px-6 py-3 rounded-xl bg-[#030014] border border-white/10 flex items-center gap-2 hover:border-white/30 transition">
      <span className="text-white">{text}</span>
      <Icon className="w-4 h-4 text-white" />
    </button>
  </a>
));

const SocialLink = memo(({ icon: Icon, link }) => (
  <a href={link} target="_blank" rel="noopener noreferrer">
    <div className="p-3 rounded-xl bg-black/40 border border-white/10 hover:border-white/30 transition">
      <Icon className="w-5 h-5 text-gray-400 hover:text-white transition" />
    </div>
  </a>
));

/* ===================== CONSTANTS ===================== */

const WORDS = ["Electronics and Communication Student", "Tech Enthusiast"];
const TECH_STACK = ["React", "Django", "Node.js", "Tailwind"];

const SOCIAL_LINKS = [
  { icon: Github, link: "https://github.com/sourabhbisht359-hub" },
  { icon: Linkedin, link: "https://www.linkedin.com/in/sourabh-bisht-a032a72ba" },
  { icon: Instagram, link: "https://www.instagram.com/_its_sourabh.06" }
];

/* ===================== HOME ===================== */

const Home = () => {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    AOS.init({ once: true, offset: 10 });
  }, []);

  const handleTyping = useCallback(() => {
    const word = WORDS[wordIndex];

    if (isTyping) {
      if (charIndex < word.length) {
        setText(prev => prev + word[charIndex]);
        setCharIndex(prev => prev + 1);
      } else {
        setTimeout(() => setIsTyping(false), 2000);
      }
    } else {
      if (charIndex > 0) {
        setText(prev => prev.slice(0, -1));
        setCharIndex(prev => prev - 1);
      } else {
        setWordIndex((prev) => (prev + 1) % WORDS.length);
        setIsTyping(true);
      }
    }
  }, [charIndex, isTyping, wordIndex]);

  useEffect(() => {
    const timer = setTimeout(handleTyping, isTyping ? 100 : 50);
    return () => clearTimeout(timer);
  }, [handleTyping, isTyping]);

  return (
    <section
      id="Home"
      className="min-h-screen bg-[#030014] px-[5%] lg:px-[10%] overflow-hidden"
    >
      <div className="min-h-screen flex flex-col lg:flex-row items-center justify-between gap-16">

        {/* LEFT */}
        <div className="w-full lg:w-1/2 space-y-8" data-aos="fade-right">
          <StatusBadge />
          <MainTitle />

          <div className="flex items-center text-xl text-gray-300">
            {text}
            <span className="ml-1 w-[2px] h-6 bg-purple-400 animate-blink" />
          </div>

          <p className="text-gray-400 max-w-xl">
            Creating innovative, functional, and user-friendly websites to deliver impactful digital solutions.
          </p>

          <div className="flex flex-wrap gap-3">
            {TECH_STACK.map((tech, i) => (
              <TechStack key={i} tech={tech} />
            ))}
          </div>

          <div className="flex gap-4">
            <CTAButton href="#Portofolio" text="Projects" icon={ExternalLink} />
            <CTAButton href="#Contact" text="Contact" icon={Mail} />
          </div>

          <div className="flex gap-4">
            {SOCIAL_LINKS.map((s, i) => (
              <SocialLink key={i} {...s} />
            ))}
          </div>
        </div>

        {/* RIGHT — SPLINE 3D */}
        <div
          className="w-full lg:w-1/2 h-[420px] sm:h-[520px] lg:h-[650px] xl:h-[750px] relative"
          data-aos="fade-left"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 blur-3xl rounded-3xl" />

         {typeof window !== "undefined" &&
          window.matchMedia("(pointer:fine)").matches && (
           <SplineErrorBoundary>
              <Suspense fallback={<div className="text-gray-400">Loading 3D…</div>}>
               <Spline
                   scene="https://prod.spline.design/Cvc7dzhRZaXrkQYQ/scene.splinecode"
                   className="w-full h-full"
               />
              </Suspense>
           </SplineErrorBoundary>
)}

        </div>

      </div>
    </section>
  );
};

export default memo(Home);
