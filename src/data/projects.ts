export interface Project {
  title: string;
  role: string;
  description: string;
  tags: string[];
  details?: string[];
}

export const projects: Project[] = [
  {
    title: "GebetaMaps",
    role: "Chief Operations Officer",
    description: "A geospatial API platform for Africa featuring multi-theme tile rendering and real-time monitoring.",
    tags: ["Figma", "Tailwind CSS", "GIS"],
    details: [
      "Led the operational rollout of a mapping platform serving governments, logistics operators, and enterprises across multiple regions.",
      "Worked closely with engineers and designers to balance performance, cartographic clarity, and product constraints.",
      "Introduced feedback loops with key customers to continuously refine data quality, coverage, and feature priorities.",
    ],
  },
  {
    title: "Gebeta Food",
    role: "Full Stack Lead",
    description: "Complete food and drinks ordering platform with responsive web and app interfaces.",
    tags: ["Full Stack", "Product Design", "Marketing"],
    details: [
      "Designed and shipped a full ordering flow that worked reliably across different bandwidth conditions and devices.",
      "Coordinated between product, engineering, and marketing to align promotions, UX flows, and onboarding.",
      "Oversaw the creation of dashboards and operational tools for vendors and internal teams.",
    ],
  },
  {
    title: "Nor Advertising",
    role: "UI/UX Designer",
    description: "An all-in-one advertising solution where consumers earn cash for engagement.",
    tags: ["Figma", "UX Design", "Responsive"],
    details: [
      "Created UX flows that balanced advertiser goals with an intuitive, low-friction experience for end users.",
      "Developed responsive layouts and design systems that scaled across campaigns and channels.",
      "Collaborated with stakeholders to translate complex business rules into clear interfaces.",
    ],
  },
  {
    title: "Public Sector (Ethiopost/NID)",
    role: "Product Lead",
    description: "Designed websites and applications for mainstream national government projects.",
    tags: ["Government", "Scale", "UI/UX"],
    details: [
      "Worked with government partners to scope, prioritize, and deliver citizen-facing digital services.",
      "Balanced compliance, accessibility, and performance in environments with diverse device and connectivity constraints.",
      "Aligned internal teams and external vendors around a shared roadmap and delivery milestones.",
    ],
  }
];