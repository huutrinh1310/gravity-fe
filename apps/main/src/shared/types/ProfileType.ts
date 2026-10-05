export interface ProfileType {
  description: string;
  name: string;
  projects: ProjectType[];
  skills: string[];
  title: string;
}

export interface ProjectType {
  description: string;
  id: string;
  name: string;
  tags: string[];
}

export interface SkillType {
  id: string;
  name: string;
}

export interface PortfolioType {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  domainUrl: string;
  profileId: string;
  isPublic: boolean;
  isIntegrated: boolean;
  templateId: string;
  lastModified: string;
}