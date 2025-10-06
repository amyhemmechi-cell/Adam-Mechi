
export interface Audit {
  brandIdentity: string;
  contentInventory: string;
  strengthsWeaknesses: string;
}

export interface Readiness {
  festivalSuccessPotential: {
    rating: number;
    justification: string;
  };
  platformInterest: {
    rating: number;
    justification: string;
  };
}

export interface PageVision {
  title: string;
  metaDescription: string;
  layout: string;
  content: string;
  cta?: string;
}

export interface Project {
    title: string;
    logline: string;
    description: string;
}

export interface Album {
    title: string;
    concept: string;
}

export interface ProjectsPageVision extends PageVision {
    projectsList: Project[];
    albumSeries: {
        intro: string;
        albums: Album[];
    }
}

export interface Vision {
  home: PageVision;
  projects: ProjectsPageVision;
  about: PageVision;
  contact: PageVision;
}

export interface AnalysisResponse {
  audit: Audit;
  readiness: Readiness;
  vision: Vision;
}
