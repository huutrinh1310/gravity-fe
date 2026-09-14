export interface ProfileType {
  name: string;
  title: string;
  description: string;
  skills: string[];
  projects: ProjectType[];
}

export interface SkillType {
  id: string;
  name: string;
}

export interface ProjectType {
  id: string;
  name: string;
  description: string;
  tags: string[];
}
