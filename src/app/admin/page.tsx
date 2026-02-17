"use client";
import { useState, useEffect } from 'react';
import { getSupabaseClient } from '../../lib/supabase';
import { Project } from '../../data/projects';

type ProjectRow = Project & { id: string };

type MessageRow = {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
};

type Experience = {
  id?: string;
  company: string;
  role: string;
  period: string;
  summary: string;
  highlights: string[];
  details: string[];
};

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'projects' | 'experiences' | 'messages'>('projects');
  const [projects, setProjects] = useState<ProjectRow[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [messages, setMessages] = useState<MessageRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState<ProjectRow | null>(null);
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showExperienceForm, setShowExperienceForm] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const supabase = getSupabaseClient();
      // Load projects
      const { data: projectsData } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
      if (projectsData) setProjects(projectsData as ProjectRow[]);

      // Load experiences
      const { data: experiencesData } = await supabase.from('experiences').select('*').order('period', { ascending: false });
      if (experiencesData) setExperiences(experiencesData);

      // Load messages
      const { data: messagesData } = await supabase.from('messages').select('*').order('created_at', { ascending: false });
      if (messagesData) setMessages(messagesData as MessageRow[]);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProject = async (project: Project) => {
    try {
      const supabase = getSupabaseClient();
      if (editingProject) {
        await supabase.from('projects').update(project).eq('id', editingProject.id);
      } else {
        await supabase.from('projects').insert([project]);
      }
      await loadData();
      setShowProjectForm(false);
      setEditingProject(null);
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Failed to save project');
    }
  };

  const handleSaveExperience = async (experience: Experience) => {
    try {
      const supabase = getSupabaseClient();
      if (editingExperience?.id) {
        await supabase.from('experiences').update(experience).eq('id', experience.id);
      } else {
        await supabase.from('experiences').insert([experience]);
      }
      await loadData();
      setShowExperienceForm(false);
      setEditingExperience(null);
    } catch (error) {
      console.error('Error saving experience:', error);
      alert('Failed to save experience');
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      const supabase = getSupabaseClient();
      await supabase.from('projects').delete().eq('id', id);
      await loadData();
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('Failed to delete project');
    }
  };

  const handleDeleteExperience = async (id: string) => {
    if (!confirm('Are you sure you want to delete this experience?')) return;
    try {
      const supabase = getSupabaseClient();
      await supabase.from('experiences').delete().eq('id', id);
      await loadData();
    } catch (error) {
      console.error('Error deleting experience:', error);
      alert('Failed to delete experience');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-black mb-8">Admin Dashboard</h1>

        <div className="flex gap-4 mb-8 border-b border-border">
          <button
            onClick={() => setActiveTab('projects')}
            className={`pb-4 px-4 font-medium ${
              activeTab === 'projects' ? 'border-b-2 border-foreground text-foreground' : 'text-muted'
            }`}
          >
            Projects
          </button>
          <button
            onClick={() => setActiveTab('experiences')}
            className={`pb-4 px-4 font-medium ${
              activeTab === 'experiences' ? 'border-b-2 border-foreground text-foreground' : 'text-muted'
            }`}
          >
            Experiences
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`pb-4 px-4 font-medium ${
              activeTab === 'messages' ? 'border-b-2 border-foreground text-foreground' : 'text-muted'
            }`}
          >
            Messages
          </button>
        </div>

        {activeTab === 'projects' && (
          <div>
            <button
              onClick={() => {
                setEditingProject(null);
                setShowProjectForm(true);
              }}
              className="mb-6 px-6 py-2 bg-primary text-primary-foreground rounded-full font-bold hover:bg-accent hover:text-accent-foreground transition"
            >
              + Add Project
            </button>
            {showProjectForm && (
              <ProjectForm
                project={editingProject}
                onSave={handleSaveProject}
                onCancel={() => {
                  setShowProjectForm(false);
                  setEditingProject(null);
                }}
              />
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project) => (
                <div key={project.id} className="p-6 bg-card rounded-xl border border-border">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-muted mb-4">{project.role}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingProject(project);
                        setShowProjectForm(true);
                      }}
                      className="px-4 py-1 bg-card border border-border rounded-lg hover:bg-card/80"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProject(project.id)}
                      className="px-4 py-1 bg-red-900/50 rounded-lg hover:bg-red-900/70"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'experiences' && (
          <div>
            <button
              onClick={() => {
                setEditingExperience(null);
                setShowExperienceForm(true);
              }}
              className="mb-6 px-6 py-2 bg-primary text-primary-foreground rounded-full font-bold hover:bg-accent hover:text-accent-foreground transition"
            >
              + Add Experience
            </button>
            {showExperienceForm && (
              <ExperienceForm
                experience={editingExperience}
                onSave={handleSaveExperience}
                onCancel={() => {
                  setShowExperienceForm(false);
                  setEditingExperience(null);
                }}
              />
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {experiences.map((exp) => (
                <div key={exp.id} className="p-6 bg-card rounded-xl border border-border">
                  <h3 className="text-xl font-bold mb-2">{exp.role}</h3>
                  <p className="text-muted mb-1">{exp.company}</p>
                  <p className="text-muted-2 text-sm mb-4">{exp.period}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingExperience(exp);
                        setShowExperienceForm(true);
                      }}
                      className="px-4 py-1 bg-card border border-border rounded-lg hover:bg-card/80"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteExperience(exp.id!)}
                      className="px-4 py-1 bg-red-900/50 rounded-lg hover:bg-red-900/70"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'messages' && (
          <div className="space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className="p-6 bg-card rounded-xl border border-border">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold">{msg.name}</h3>
                    <p className="text-muted text-sm">{msg.email}</p>
                  </div>
                  <span className="text-muted-2 text-xs">
                    {new Date(msg.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-muted mt-4">{msg.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ProjectForm({
  project,
  onSave,
  onCancel,
}: {
  project: Project | null;
  onSave: (project: Project) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState<Project>(
    project || {
      title: '',
      role: '',
      description: '',
      tags: [],
      details: [],
    }
  );
  const [tagInput, setTagInput] = useState('');
  const [detailInput, setDetailInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 p-6 bg-card rounded-xl border border-border space-y-4">
      <input
        type="text"
        placeholder="Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        className="w-full px-4 py-2 bg-input border border-border rounded-lg"
        required
      />
      <input
        type="text"
        placeholder="Role"
        value={formData.role}
        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
        className="w-full px-4 py-2 bg-input border border-border rounded-lg"
        required
      />
      <textarea
        placeholder="Description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        className="w-full px-4 py-2 bg-input border border-border rounded-lg"
        rows={3}
        required
      />
      <div>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            placeholder="Add tag"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                if (tagInput.trim()) {
                  setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] });
                  setTagInput('');
                }
              }
            }}
            className="flex-1 px-4 py-2 bg-input border border-border rounded-lg"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.tags.map((tag, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-card border border-border rounded-full text-sm flex items-center gap-2"
            >
              {tag}
              <button
                type="button"
                onClick={() => setFormData({ ...formData, tags: formData.tags.filter((_, idx) => idx !== i) })}
                className="hover:text-red-400"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>
      <div>
        <div className="flex gap-2 mb-2">
          <textarea
            placeholder="Add detail"
            value={detailInput}
            onChange={(e) => setDetailInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && e.ctrlKey) {
                e.preventDefault();
                if (detailInput.trim()) {
                  setFormData({ ...formData, details: [...(formData.details || []), detailInput.trim()] });
                  setDetailInput('');
                }
              }
            }}
            className="flex-1 px-4 py-2 bg-input border border-border rounded-lg"
            rows={2}
          />
        </div>
        <p className="text-xs text-muted-2 mb-2">Press Ctrl+Enter to add detail</p>
        <div className="space-y-1">
          {(formData.details || []).map((detail, i) => (
            <div key={i} className="px-3 py-1 bg-card border border-border rounded flex items-center justify-between">
              <span className="text-sm">{detail}</span>
              <button
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    details: (formData.details || []).filter((_, idx) => idx !== i),
                  })
                }
                className="hover:text-red-400"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-2">
        <button type="submit" className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-bold hover:bg-accent hover:text-accent-foreground transition-colors">
          Save
        </button>
        <button type="button" onClick={onCancel} className="px-6 py-2 bg-card border border-border rounded-lg hover:bg-card/80 transition-colors">
          Cancel
        </button>
      </div>
    </form>
  );
}

function ExperienceForm({
  experience,
  onSave,
  onCancel,
}: {
  experience: Experience | null;
  onSave: (experience: Experience) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState<Experience>(
    experience || {
      company: '',
      role: '',
      period: '',
      summary: '',
      highlights: [],
      details: [],
    }
  );
  const [highlightInput, setHighlightInput] = useState('');
  const [detailInput, setDetailInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 p-6 bg-card rounded-xl border border-border space-y-4">
      <input
        type="text"
        placeholder="Company"
        value={formData.company}
        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
        className="w-full px-4 py-2 bg-input border border-border rounded-lg"
        required
      />
      <input
        type="text"
        placeholder="Role"
        value={formData.role}
        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
        className="w-full px-4 py-2 bg-input border border-border rounded-lg"
        required
      />
      <input
        type="text"
        placeholder="Period (e.g., 2020 — Present)"
        value={formData.period}
        onChange={(e) => setFormData({ ...formData, period: e.target.value })}
        className="w-full px-4 py-2 bg-input border border-border rounded-lg"
        required
      />
      <textarea
        placeholder="Summary"
        value={formData.summary}
        onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
        className="w-full px-4 py-2 bg-input border border-border rounded-lg"
        rows={3}
        required
      />
      <div>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            placeholder="Add highlight"
            value={highlightInput}
            onChange={(e) => setHighlightInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                if (highlightInput.trim()) {
                  setFormData({ ...formData, highlights: [...formData.highlights, highlightInput.trim()] });
                  setHighlightInput('');
                }
              }
            }}
            className="flex-1 px-4 py-2 bg-input border border-border rounded-lg"
          />
        </div>
        <div className="space-y-1">
          {formData.highlights.map((highlight, i) => (
            <div key={i} className="px-3 py-1 bg-card border border-border rounded flex items-center justify-between">
              <span className="text-sm">{highlight}</span>
              <button
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    highlights: formData.highlights.filter((_, idx) => idx !== i),
                  })
                }
                className="hover:text-red-400"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className="flex gap-2 mb-2">
          <textarea
            placeholder="Add detail"
            value={detailInput}
            onChange={(e) => setDetailInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && e.ctrlKey) {
                e.preventDefault();
                if (detailInput.trim()) {
                  setFormData({ ...formData, details: [...formData.details, detailInput.trim()] });
                  setDetailInput('');
                }
              }
            }}
            className="flex-1 px-4 py-2 bg-input border border-border rounded-lg"
            rows={2}
          />
        </div>
        <p className="text-xs text-muted-2 mb-2">Press Ctrl+Enter to add detail</p>
        <div className="space-y-1">
          {formData.details.map((detail, i) => (
            <div key={i} className="px-3 py-1 bg-card border border-border rounded flex items-center justify-between">
              <span className="text-sm">{detail}</span>
              <button
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    details: formData.details.filter((_, idx) => idx !== i),
                  })
                }
                className="hover:text-red-400"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-2">
        <button type="submit" className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-bold hover:bg-accent hover:text-accent-foreground transition-colors">
          Save
        </button>
        <button type="button" onClick={onCancel} className="px-6 py-2 bg-card border border-border rounded-lg hover:bg-card/80 transition-colors">
          Cancel
        </button>
      </div>
    </form>
  );
}
