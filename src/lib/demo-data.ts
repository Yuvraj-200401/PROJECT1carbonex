
'use client';

// This is a client-side only demo data store using localStorage.
// It is not suitable for production use.

export type ProjectStatus = 'Pending' | 'Verified' | 'Action Required';

export interface Project {
    id: string;
    name: string;
    ngoName: string;
    area_ha: number;
    status: ProjectStatus;
    date: string;
    tco2?: number;
    listed?: boolean;
    pricePerTon?: number;
    image: {
        imageUrl: string;
        imageHint: string;
    }
}

const DEMO_PROJECTS_KEY = 'carboNexDemoProjects';

const initialProjects: Project[] = [
  {
    id: "proj_1698336000000",
    name: "Sulu Sea Seagrass Meadow",
    ngoName: "Eco Ventures",
    area_ha: 1200,
    status: "Verified",
    date: "2023-10-26",
    tco2: 1500,
    listed: false,
    pricePerTon: 18.50,
    image: {
      imageUrl: "https://picsum.photos/seed/project-3/400/300",
      imageHint: "seagrass meadow"
    }
  },
  {
    id: "proj_1698076800000",
    name: "Palawan Mangrove Restoration",
    ngoName: "Eco Ventures",
    area_ha: 2500,
    status: "Verified",
    date: "2023-09-15",
    tco2: 950,
    listed: true,
    pricePerTon: 22.00,
    image: {
      imageUrl: "https://picsum.photos/seed/project-1/400/300",
      imageHint: "mangrove forest"
    }
  },
  {
    id: "proj_1697925600000",
    name: "Amazon Delta Reforestation",
    ngoName: "Rainforest Guardians",
    area_ha: 5000,
    status: "Pending",
    date: "2023-10-22",
    image: {
      imageUrl: "https://picsum.photos/seed/project-2/400/300",
      imageHint: "coastal wetland"
    }
  },
  {
    id: "proj_1697752800000",
    name: "Coastal Blue Carbon Initiative",
    ngoName: "Eco Ventures",
    area_ha: 850,
    status: "Action Required",
    date: "2023-10-20",
    image: {
      imageUrl: "https://picsum.photos/seed/project-4/400/300",
      imageHint: "coastal area"
    }
  },
];


function getInitialData(): Project[] {
  // Deep copy to prevent mutation of the initial data object
  return JSON.parse(JSON.stringify(initialProjects));
}

// Function to get projects from localStorage
export function getProjects(): Project[] {
    if (typeof window === 'undefined') {
        return [];
    }
    try {
        const projectsJSON = localStorage.getItem(DEMO_PROJECTS_KEY);
        if (!projectsJSON) {
            // If no data, initialize with default set
            localStorage.setItem(DEMO_PROJECTS_KEY, JSON.stringify(getInitialData()));
            return getInitialData();
        }
        return JSON.parse(projectsJSON);
    } catch (error) {
        console.error("Failed to parse projects from localStorage", error);
        return getInitialData();
    }
}

// Function to save projects to localStorage
function saveProjects(projects: Project[]): void {
     if (typeof window === 'undefined') return;
    localStorage.setItem(DEMO_PROJECTS_KEY, JSON.stringify(projects));
}

// Function to add a new project
export function addProject(projectData: any): Project {
    const projects = getProjects();
    const newProject: Project = {
        id: `proj_${Date.now()}`,
        name: projectData.siteName,
        ngoName: projectData.ngoName || 'New NGO',
        area_ha: projectData.area_ha,
        status: 'Pending',
        date: projectData.date,
        image: projectData.image || { imageUrl: `https://picsum.photos/seed/${projectData.siteName}/400/300`, imageHint: 'nature' },
    };
    const updatedProjects = [newProject, ...projects];
    saveProjects(updatedProjects);
    return newProject;
}

// Function to update a project's status or other properties
export function updateProject(projectId: string, updates: Partial<Project>): Project | undefined {
    const projects = getProjects();
    const projectIndex = projects.findIndex(p => p.id === projectId);
    if (projectIndex !== -1) {
        projects[projectIndex] = { ...projects[projectIndex], ...updates };
        saveProjects(projects);
        return projects[projectIndex];
    }
    return undefined;
}

// Function to reset data - useful for debugging
export function resetDemoData(): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(DEMO_PROJECTS_KEY, JSON.stringify(getInitialData()));
}
