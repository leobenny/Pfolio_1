"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Linkedin, Send, Download } from 'lucide-react';
import { projects as staticProjects } from '../data/projects';
import ProjectCard from '../components/ProjectCard';
import ContactForm from '../components/ContactForm';
import { supabase } from '../lib/supabase';

type Experience = {
  company: string;
  role: string;
  period: string;
  summary: string;
  highlights: string[];
  details: string[];
};


export default function Home() {
  const [projects, setProjects] = useState(staticProjects);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [selectedProject, setSelectedProject] = useState<(typeof staticProjects)[number] | null>(null);
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Load projects from Supabase, fallback to static
      const { data: projectsData } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
      if (projectsData && projectsData.length > 0) {
        setProjects(projectsData as any);
      }

      // Load experiences from Supabase, fallback to static
      const { data: experiencesData } = await supabase.from('experiences').select('*').order('period', { ascending: false });
      if (experiencesData && experiencesData.length > 0) {
        setExperiences(experiencesData as any);
      } else {
        // Use static experiences as fallback
        setExperiences([
          {
            company: 'Gebeta Maps',
            role: 'Co-founder & COO',
            period: '2020 — Present',
            summary:
              'Leading product and operations for a geo-intelligence startup serving governments and enterprises.',
            highlights: [
              'Scaled operations across multiple regions with lean, data-driven processes.',
              'Directed cross-functional teams from discovery to launch for mission-critical products.',
            ],
            details: [
              'Built and led cross-functional teams across product, engineering, operations, and partnerships to deliver mapping and geo-intelligence tools tailored for African markets.',
              'Established operating rhythms, KPIs, and feedback loops that tightened the connection between on-the-ground users, product roadmap, and executive decisions.',
              'Negotiated and managed strategic partnerships with public sector and enterprise clients, aligning complex stakeholder needs into a coherent product strategy.',
              'Oversaw delivery of spatial products used for infrastructure planning, logistics, and government services with a strong emphasis on reliability and UX.',
            ],
          },
          {
            company: 'Product & Strategy Consulting',
            role: 'Independent',
            period: '2017 — 2020',
            summary:
              'Partnered with fintech and public sector teams to bring complex products from idea to market.',
            highlights: [
              'Defined roadmaps and go-to-market for multi-stakeholder digital platforms.',
              'Advised leaders on prioritization, risk, and portfolio alignment.',
            ],
            details: [
              'Worked with founders and executives to clarify product vision, shape narratives, and translate strategy into actionable delivery plans.',
              'Designed research and discovery processes that surfaced real user constraints in emerging markets, informing everything from onboarding to pricing.',
              'Guided teams through prioritization frameworks that balanced regulatory, technical, and commercial constraints.',
              'Helped organizations mature their product practice: rituals, documentation, and decision-making models that survive beyond a single project.',
            ],
          },
        ]);
      }
    } catch (error) {
      console.error('Error loading data:', error);
      // Use static fallback on error
      setExperiences([
        {
          company: 'Gebeta Maps',
          role: 'Co-founder & COO',
          period: '2020 — Present',
          summary:
            'Leading product and operations for a geo-intelligence startup serving governments and enterprises.',
          highlights: [
            'Scaled operations across multiple regions with lean, data-driven processes.',
            'Directed cross-functional teams from discovery to launch for mission-critical products.',
          ],
          details: [
            'Built and led cross-functional teams across product, engineering, operations, and partnerships to deliver mapping and geo-intelligence tools tailored for African markets.',
            'Established operating rhythms, KPIs, and feedback loops that tightened the connection between on-the-ground users, product roadmap, and executive decisions.',
            'Negotiated and managed strategic partnerships with public sector and enterprise clients, aligning complex stakeholder needs into a coherent product strategy.',
            'Oversaw delivery of spatial products used for infrastructure planning, logistics, and government services with a strong emphasis on reliability and UX.',
          ],
        },
        {
          company: 'Product & Strategy Consulting',
          role: 'Independent',
          period: '2017 — 2020',
          summary:
            'Partnered with fintech and public sector teams to bring complex products from idea to market.',
          highlights: [
            'Defined roadmaps and go-to-market for multi-stakeholder digital platforms.',
            'Advised leaders on prioritization, risk, and portfolio alignment.',
          ],
          details: [
            'Worked with founders and executives to clarify product vision, shape narratives, and translate strategy into actionable delivery plans.',
            'Designed research and discovery processes that surfaced real user constraints in emerging markets, informing everything from onboarding to pricing.',
            'Guided teams through prioritization frameworks that balanced regulatory, technical, and commercial constraints.',
            'Helped organizations mature their product practice: rituals, documentation, and decision-making models that survive beyond a single project.',
          ],
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setSelectedProject(null);
    setSelectedExperience(null);
  };

  return (
    <>
      <main className="bg-zinc-950 text-zinc-200 min-h-screen selection:bg-zinc-500/30">
      {/* Sticky Header */}
      <nav className="fixed top-0 w-full z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800 px-8 py-5 flex justify-between items-center">
        <span className="font-bold text-xl tracking-tighter text-white">BENAYAS.</span>
        <div className="hidden md:flex gap-8 text-sm font-medium text-zinc-500">
          <a href="#projects" className="hover:text-white transition">Projects</a>
          <a href="#experience" className="hover:text-white transition">Experience</a>
          <a href="#contact" className="hover:text-white transition">Contact</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-48 pb-24 px-8 max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter text-white">
            Benayas <br/> <span className="text-zinc-600">Teshome</span>
          </h1>
          <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl leading-relaxed mb-12">
            Results-driven Product & Business Leader bridging technical fluency with executive leadership[cite: 3, 5].
          </p>
          <div className="flex gap-4">
            <a href="/Resume_OG.pdf" download className="flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-purple-600 hover:text-white transition-all">
              <Download size={18} /> Download CV 
            </a>
          </div>
        </motion.div>
      </section>

      {/* Skills / Stack Section [cite: 7] */}
      <motion.section
        className="py-20 px-8 max-w-6xl mx-auto border-y border-zinc-800 relative overflow-hidden group"
        whileHover={{ backgroundColor: 'rgba(24,24,27,0.85)' }}
        transition={{ type: 'spring', stiffness: 120, damping: 18 }}
      >
        {/* subtle ambient hover glow */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        >
          <div className="absolute -top-32 left-1/4 h-64 w-64 rounded-full bg-zinc-700/10 blur-3xl" />
          <div className="absolute -bottom-32 right-1/4 h-64 w-64 rounded-full bg-zinc-800/15 blur-3xl" />
        </motion.div>

        <div className="relative grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-widest group-hover:tracking-[0.2em] transition-all duration-300">
              Design
            </h4>
            <p className="text-zinc-500 text-sm group-hover:text-zinc-300 transition-colors">
              Figma, Illustrator, Blender [cite: 8, 11]
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-widest group-hover:tracking-[0.2em] transition-all duration-300">
              Leadership
            </h4>
            <p className="text-zinc-500 text-sm group-hover:text-zinc-300 transition-colors">
              COO, Agile, Roadmap Management [cite: 12, 28]
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-widest group-hover:tracking-[0.2em] transition-all duration-300">
              Dev
            </h4>
            <p className="text-zinc-500 text-sm group-hover:text-zinc-300 transition-colors">
              Responsive Design, spatial UI [cite: 9, 10]
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-widest group-hover:tracking-[0.2em] transition-all duration-300">
              Focus
            </h4>
            <p className="text-zinc-500 text-sm group-hover:text-zinc-300 transition-colors">
              GIS, Fintech, Government [cite: 13]
            </p>
          </div>
        </div>
      </motion.section>

      {/* Projects Section */}
      <section id="projects" className="py-32 px-8 max-w-6xl mx-auto">
        <h2 className="text-4xl font-black text-white mb-16 tracking-tight">Selected Projects [cite: 37]</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((p, i) => (
            <ProjectCard
              key={i}
              project={p}
              index={i}
              onOpen={() => setSelectedProject(p)}
            />
          ))}
        </div>
      </section>

      {/* Experience Section */}
      <section
        id="experience"
        className="py-32 px-8 max-w-6xl mx-auto border-y border-zinc-800 relative overflow-hidden"
      >
        {/* Ambient background glow */}
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.3 }}
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-zinc-700/20 blur-3xl" />
          <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-zinc-800/30 blur-3xl" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.2 }}
          className="relative"
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                Experience
              </h2>
              <p className="mt-4 text-zinc-400 max-w-xl text-sm md:text-base">
                A snapshot of the roles where strategy, product thinking, and execution came together.
              </p>
            </div>
            <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
              TRACK RECORD
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8">
            {experiences.map((exp, index) => (
              <motion.article
                key={exp.company}
                initial={{ opacity: 0, y: 40, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
                whileHover={{
                  y: -10,
                  scale: 1.01,
                  rotateX: 2,
                  rotateY: -2,
                  transition: { type: 'spring', stiffness: 260, damping: 18 },
                }}
                whileTap={{ scale: 0.99, rotateX: 0, rotateY: 0 }}
                className="group relative cursor-pointer rounded-3xl bg-gradient-to-b from-zinc-900/90 via-zinc-900/40 to-zinc-900/90 border border-zinc-800/80 px-7 py-8 md:px-8 md:py-9 shadow-[0_25px_60px_rgba(0,0,0,0.6)]/20"
                onClick={() => setSelectedExperience(exp)}
              >
                {/* Interactive border highlight */}
                <div className="absolute inset-0 rounded-3xl border border-zinc-700/40 opacity-0 group-hover:opacity-100 group-hover:border-zinc-500/70 transition-all duration-300 pointer-events-none" />

                <div className="flex items-start gap-4">
                  <div className="mt-1 h-10 w-px bg-gradient-to-b from-zinc-500 via-zinc-500/40 to-transparent group-hover:from-zinc-200 group-hover:via-zinc-200/40 transition-all duration-300" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                          {exp.period}
                        </p>
                        <h3 className="mt-2 text-xl font-semibold text-white tracking-tight">
                          {exp.role}
                        </h3>
                        <p className="text-sm text-zinc-400 mt-1">{exp.company}</p>
                      </div>
                      <div className="h-9 px-3 rounded-full border border-zinc-700/80 text-[11px] uppercase tracking-[0.18em] text-zinc-400 flex items-center justify-center group-hover:border-zinc-500 group-hover:text-zinc-200 group-hover:bg-zinc-900/80 transition-all duration-300">
                        Impact
                      </div>
                    </div>

                    <p className="mt-5 text-sm text-zinc-300/90 leading-relaxed">
                      {exp.summary}
                    </p>

                    <ul className="mt-5 space-y-2.5 text-sm text-zinc-400">
                      {exp.highlights.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 group-hover:text-zinc-200/90 transition-colors"
                        >
                          <span className="mt-1 h-1 w-1 rounded-full bg-zinc-400 group-hover:bg-zinc-100 transition-colors" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Contact Section [cite: 2] */}
      <section id="contact" className="py-32 px-8 bg-zinc-900/60 border-t border-zinc-800">
        <div className="max-w-6xl mx-auto flex flex-col items-center">
          <h2 className="text-5xl font-black text-white mb-8 tracking-tighter">Let's Connect.</h2>
          <div className="flex gap-6 mb-8">
            <a
              href="mailto:benayas@gebeta.app"
              className="p-4 rounded-full bg-zinc-950/80 text-zinc-300 hover:bg-zinc-800 hover:text-white hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(0,0,0,0.8)] transition-all"
            >
              <Mail />
            </a>
            <a
              href="https://linkedin.com"
              className="p-4 rounded-full bg-zinc-950/80 text-zinc-300 hover:bg-zinc-800 hover:text-white hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(0,0,0,0.8)] transition-all"
            >
              <Linkedin />
            </a>
            <a
              href="https://t.me/benayas"
              className="p-4 rounded-full bg-zinc-950/80 text-zinc-300 hover:bg-zinc-800 hover:text-white hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(0,0,0,0.8)] transition-all"
            >
              <Send />
            </a>
          </div>
          <ContactForm />
          <p className="mt-12 text-zinc-600 text-sm">© 2026 Benayas Teshome. Based in Addis Ababa[cite: 1, 35].</p>
        </div>
      </section>
      </main>

      {/* Shared Modal for Projects & Experience */}
      <AnimatePresence>
        {(selectedProject || selectedExperience) && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
            />
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative z-10 w-full max-w-2xl rounded-3xl bg-zinc-950 border border-zinc-800/80 shadow-[0_30px_80px_rgba(0,0,0,0.85)] p-7 md:p-9"
            >
              <button
                onClick={closeModal}
                className="absolute right-5 top-5 text-xs uppercase tracking-[0.18em] text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900/70 px-3 py-1.5 rounded-full border border-zinc-800/80 hover:border-zinc-600 transition-all"
              >
                Close
              </button>

              {selectedProject && (
                <div className="space-y-5 md:space-y-6">
                  <div className="space-y-2">
                    <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">
                      Project
                    </p>
                    <h2 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">
                      {selectedProject.title}
                    </h2>
                    <p className="text-sm text-zinc-400">
                      {selectedProject.role}
                    </p>
                  </div>

                  <p className="text-sm md:text-base text-zinc-300/90 leading-relaxed">
                    {selectedProject.description}
                  </p>

                  {Array.isArray((selectedProject as any).details) && (
                    <ul className="mt-2 space-y-2.5 text-sm text-zinc-400">
                      {(selectedProject as any).details.map((item: string) => (
                        <li key={item} className="flex gap-2">
                          <span className="mt-1 h-1 w-1 rounded-full bg-zinc-400" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="pt-4 flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-2.5 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-700/70 text-zinc-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selectedExperience && (
                <div className="space-y-5 md:space-y-6">
                  <div className="space-y-2">
                    <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">
                      Experience
                    </p>
                    <h2 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">
                      {selectedExperience.role}
                    </h2>
                    <div className="flex flex-wrap items-center gap-2 text-sm text-zinc-400">
                      <span>{selectedExperience.company}</span>
                      <span className="h-1 w-1 rounded-full bg-zinc-600" />
                      <span>{selectedExperience.period}</span>
                    </div>
                  </div>

                  <p className="text-sm md:text-base text-zinc-300/90 leading-relaxed">
                    {selectedExperience.summary}
                  </p>

                  <ul className="mt-2 space-y-2.5 text-sm text-zinc-400">
                    {selectedExperience.details.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-1 h-1 w-1 rounded-full bg-zinc-400" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}