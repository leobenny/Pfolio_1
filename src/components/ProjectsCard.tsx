export interface Project {
    title: string;
    role: string;
    description: string;
    tags: string[];
  }
  
  export const projects: Project[] = [
    {
      title: "GebetaMaps",
      role: "Chief Operations Officer",
      description: "A geospatial API platform for Africa featuring multi-theme tile rendering and real-time monitoring.",
      tags: ["Figma", "Tailwind CSS", "GIS"]
    },
    {
      title: "Gebeta Food",
      role: "Full Stack Lead",
      description: "Complete food and drinks ordering platform with responsive web and app interfaces.",
      tags: ["Full Stack", "Product Design", "Marketing"]
    },
    {
      title: "Nor Advertising",
      role: "UI/UX Designer",
      description: "An all-in-one advertising solution where consumers earn cash for engagement.",
      tags: ["Figma", "UX Design", "Responsive"]
    },
    {
      title: "Public Sector (Ethiopost/NID)",
      role: "Product Lead",
      description: "Designed websites and applications for mainstream national government projects.",
      tags: ["Government", "Scale", "UI/UX"]
    }
  ];