export interface Project {
  id: string;
  title: string;
  languages: Language[];
  description: string;
  link: string;
  images: Image[];
}
export interface ProjectModel {
  id: string;
  title: string;
  languages: string;
  images: Image[];
}

export interface Language {
  name: string;
  type: string;
}

export interface Image {
  url: string;
}
