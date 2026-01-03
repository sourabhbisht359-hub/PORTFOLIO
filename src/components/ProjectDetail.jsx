import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Code2,
  Star,
  ChevronRight,
  Layers,
  Layout,
  Globe,
  Package,
  Cpu,
  Code,
} from "lucide-react";
import Swal from "sweetalert2";

/* -------------------- ICON MAP -------------------- */
const TECH_ICONS = {
  React: Globe,
  Tailwind: Layout,
  Express: Cpu,
  Python: Code,
  Javascript: Code,
  HTML: Code,
  CSS: Code,
  default: Package,
};

/* -------------------- HELPERS -------------------- */
const normalizeArray = (value) => {
  if (Array.isArray(value)) return value;
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  return [];
};

/* -------------------- COMPONENTS -------------------- */
const TechBadge = ({ tech }) => {
  const Icon = TECH_ICONS[tech] || TECH_ICONS.default;

  return (
    <div className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
      <Icon className="w-4 h-4 text-indigo-400" />
      <span className="text-sm text-gray-300">{tech}</span>
    </div>
  );
};

const FeatureItem = ({ feature }) => (
  <li className="flex items-start gap-3 text-gray-300">
    <span className="w-2 h-2 mt-2 rounded-full bg-indigo-400" />
    <span>{feature}</span>
  </li>
);

const ProjectStats = ({ techCount, featureCount }) => (
  <div className="grid grid-cols-2 gap-4">
    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
      <div className="text-2xl font-bold text-indigo-400">{techCount}</div>
      <p className="text-xs text-gray-400">Technologies</p>
    </div>
    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
      <div className="text-2xl font-bold text-purple-400">{featureCount}</div>
      <p className="text-xs text-gray-400">Features</p>
    </div>
  </div>
);

/* -------------------- MAIN -------------------- */
const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const storedProjects =
      JSON.parse(localStorage.getItem("projects")) || [];

    const found = storedProjects.find(
      (p) => String(p.id) === String(id)
    );

    if (!found) return;

    setProject({
      ...found,
      TechStack: normalizeArray(found.TechStack),
      Features: normalizeArray(found.Features),
      Github:
        found.Github ||
        "https://github.com/sourabhbisht359-hub",
    });
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#030014] flex items-center justify-center">
        <p className="text-gray-400 text-lg">Loading project...</p>
      </div>
    );
  }

  const handleGithubClick = (e) => {
    if (project.Github === "Private") {
      e.preventDefault();
      Swal.fire({
        icon: "info",
        title: "Private Repository",
        text: "This project’s source code is private.",
        background: "#030014",
        color: "#ffffff",
        confirmButtonColor: "#6366f1",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#030014] px-[5%] py-10 text-white">
      {/* Header */}
      <div className="flex items-center gap-4 mb-10">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <div className="flex items-center text-gray-400 text-sm gap-1">
          Projects <ChevronRight size={14} />
          <span className="text-white">{project.Title}</span>
        </div>
      </div>

      {/* Content */}
      <div className="grid lg:grid-cols-2 gap-12">
        {/* LEFT */}
        <div className="space-y-6">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            {project.Title}
          </h1>

          <p className="text-gray-300 leading-relaxed">
            {project.Description}
          </p>

          <ProjectStats
            techCount={project.TechStack.length}
            featureCount={project.Features.length}
          />

          <div className="flex flex-wrap gap-3">
            <a
              href={project.Link}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-indigo-500/10 border border-indigo-500/30 hover:bg-indigo-500/20 flex items-center gap-2"
            >
              <ExternalLink size={18} />
              Live Demo
            </a>

            <a
              href={project.Github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleGithubClick}
              className="px-6 py-3 rounded-xl bg-purple-500/10 border border-purple-500/30 hover:bg-purple-500/20 flex items-center gap-2"
            >
              <Github size={18} />
              GitHub
            </a>
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Code2 size={18} />
              Technologies Used
            </h3>

            {project.TechStack.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {project.TechStack.map((tech, i) => (
                  <TechBadge key={i} tech={tech} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">
                No technologies listed.
              </p>
            )}
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-6">
          <div className="rounded-2xl overflow-hidden border border-white/10">
            <img
              src={project.Img}
              alt={project.Title}
              className="w-full object-cover"
            />
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <h3 className="text-xl font-semibold flex items-center gap-2 mb-4">
              <Star className="text-yellow-400" size={18} />
              Key Features
            </h3>

            {project.Features.length > 0 ? (
              <ul className="space-y-3">
                {project.Features.map((f, i) => (
                  <FeatureItem key={i} feature={f} />
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">
                No features available.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
