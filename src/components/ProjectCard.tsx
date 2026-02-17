"use client";
import { motion } from 'framer-motion';
import { Project } from '@/data/projects';

export default function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
}) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      className="group bg-card border border-border p-6 rounded-2xl hover:border-accent/60 transition-all cursor-pointer"
      onClick={onOpen}
    >
      <div className="aspect-video bg-input rounded-lg mb-6 overflow-hidden border border-border">
        <div className="w-full h-full bg-gradient-to-br from-accent/20 to-background group-hover:scale-105 transition duration-500" />
      </div>
      <span className="text-accent text-xs font-mono uppercase tracking-widest">{project.role}</span>
      <h3 className="text-2xl font-bold mt-2 mb-3 text-foreground">{project.title}</h3>
      <p className="text-muted text-sm leading-relaxed mb-6">{project.description}</p>
      <div className="flex gap-2">
        {project.tags.map(tag => (
          <span key={tag} className="text-[10px] px-2 py-1 rounded bg-card text-muted-2 border border-border">{tag}</span>
        ))}
      </div>
    </motion.div>
  );
}