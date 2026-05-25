export interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  tags: string[];
  link: string;
  year: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface Skill {
  name: string;
  category: "Core" | "Frontend" | "Backend" | "Design" | "Tools";
  level: number; // 0 to 100
  iconName: string;
}
