import React, {
  useState,
  useEffect,
  useCallback,
  memo,
  Suspense,
} from "react";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Instagram,
  Sparkles,
} from "lucide-react";
import Spline from "@splinetool/react-spline";
import AOS from "aos";
import "aos/dist/aos.css";
import SplineErrorBoundary from "../components/SplineErrorBoundary";

/* ===================== CONSTANTS ===================== */

const WORDS = [
  "Electronics & Communication Engineering Student",
  "Web Developer | AI Enthusiast",
];

const TECH_STACK = ["React", "Django", "Node.js", "Tailwind CSS"];

const SOCIAL_LINKS = [
  { icon: Github, link: "https://github.com/sourabhbisht359-hub" },
  {
    icon: Linkedin,
    link: "https://www.linkedin.com/in/sourabh-bisht-a032a72ba",
  },
  { icon: Instagram, link: "https://www.instagram.com/_its_sourabh.06" },
];

/* ===================== UI COMPONENTS ===================== */

const StatusBadge = memo(() => (
  <div data-aos="zoom-in">
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 backdrop-blur-xl border border-white/10">
      <Sparkles className="w-4 h-4 text-indigo-400" />
      <span className="text-sm bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
        Ready to Innovate
      </span>
    </div>
  </div>
));

const CTAButton = memo(({ href, text, icon: Icon }) => (
  <a href={href}>
    <button className="px-6 py-3 rounded-xl bg-[#030014] border border-white/10 flex items-center gap-2 hover:border-white/30 transition">
      <span className="text-white">{text}</span>
      <Icon className="w-4 h-4 text-white" />
    </button>
  </a>
));

/* ===================== HOME COMPONENT ===================== */

const Home = () => {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);

  /* ---- Detect desktop vs mobile ---- */
  useEffect(() => {
    const checkDevice = () => {
      setIsDesktop(
        window.matchMedia("(pointer:fine)").matches &&
          window.innerWidth > 1024
      );
    };
    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  /* ---- AOS ---- */
  useEffect(() => {
    AOS.init({ once: true, offset: 10 });
  }, []);

  /* ---- Typing Effect ---- */
  const handleTyping = useCallback(() => {
    const word = WORDS[wordIndex];

    if (isTyping) {
      if (charIndex < word.length) {
        setText((p) => p + word[charIndex]);
        setCharIndex((p) => p + 1);
      } else {
        setTimeout(() => setIsTyping(false), 1500);
      }
    } else {
      if (charIndex > 0) {
        setText((p) => p.slice(0, -1));
        setCharIndex((p) => p - 1);
      } else {
        setWordIndex((p) => (p + 1) % WORDS.length);
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
      className="min-h-screen bg-[#030014] px-[5%] lg:px-[10%]"
    >
      <div className="min-h-screen flex flex-col lg:flex-row items-center justify-between gap-16">

        {/* ================= LEFT ================= */}
        <div className="w-full lg:w-1/2 space-y-8" data-aos="fade-right">
          <StatusBadge />

          <h1 className="text-5xl sm:text-6xl xl:text-7xl font-bold leading-tight">
            <span className="block bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              SOURABH BISHT
            </span>
            <span className="block mt-2 bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
              Electronics & Communication
            </span>
          </h1>

          <div className="text-xl text-gray-300">
            {text}
            <span className="ml-1 w-[2px] h-6 bg-purple-400 animate-pulse inline-block" />
          </div>

          <p className="text-gray-400 max-w-xl">
            Creating innovative, functional, and user-friendly digital
            experiences using modern web technologies.
          </p>

          <div className="flex flex-wrap gap-3">
            {TECH_STACK.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 text-sm rounded-full bg-white/5 border border-white/10 text-gray-300"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex gap-4">
            <CTAButton href="#Portofolio" text="Projects" icon={ExternalLink} />
            <CTAButton href="#Contact" text="Contact" icon={Mail} />
          </div>

          <div className="flex gap-4">
            {SOCIAL_LINKS.map((s, i) => (
              <a key={i} href={s.link} target="_blank" rel="noreferrer">
                <div className="p-3 rounded-xl bg-black/40 border border-white/10 hover:border-white/30 transition">
                  <s.icon className="w-5 h-5 text-gray-400 hover:text-white" />
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* ================= RIGHT ================= */}
        <div className="w-full lg:w-1/2 h-[420px] sm:h-[520px] lg:h-[650px] relative">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 blur-3xl rounded-3xl" />

          {/* ---- Desktop: Spline ---- */}
          {isDesktop ? (
            <SplineErrorBoundary>
              <Suspense
                fallback={
                  <div className="text-gray-400 flex items-center justify-center h-full">
                    Loading 3D Experience…
                  </div>
                }
              >
                <Spline
                  scene="https://prod.spline.design/Cvc7dzhRZaXrkQYQ/scene.splinecode"
                  className="w-full h-full"
                />
              </Suspense>
            </SplineErrorBoundary>
          ) : (
            /* ---- Mobile Fallback ---- */
            <div className="w-full h-full flex items-center justify-center text-center text-gray-400">
              <div>
                <p className="text-lg font-semibold">
                  3D Experience Disabled on Mobile
                </p>
                <p className="text-sm mt-2">
                  Optimized for performance & battery life
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default memo(Home);
