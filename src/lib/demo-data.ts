
'use client';

import { VerificationResult } from "./types";

export type Project = {
    id: string;
    status: 'Pending' | 'Verified' | 'Action Required' | 'Minted' | 'Listed' | 'Purchased';
    siteName: string;
    lat: number;
    lng: number;
    area_ha: number;
    date: string; // ISO string
    ownerId: 'NGO' | 'Buyer'; // To track ownership
    imageUrl?: string;
    verification?: VerificationResult['verification'];
    prediction?: VerificationResult['prediction'];
}

// In-memory store for the demo
let projects: Project[] = [];
const listeners = new Set<() => void>();

function notifyListeners() {
    listeners.forEach(listener => listener());
}

// Function to initialize data from localStorage
function initializeData() {
    try {
        if (typeof window !== 'undefined') {
            const storedProjects = localStorage.getItem('demoProjects');
            if (storedProjects) {
                projects = JSON.parse(storedProjects);
            } else {
                projects = [];
                localStorage.setItem('demoProjects', JSON.stringify(projects));
            }
        }
    } catch (error) {
        console.error("Could not access localStorage. Demo data will be ephemeral.", error);
        projects = []; 
    }
    notifyListeners();
}

// Call initialization once
if (typeof window !== 'undefined') {
    initializeData();
    window.addEventListener('storage', (event) => {
        if (event.key === 'demoProjects') {
            initializeData();
        }
    });
}


function saveData() {
    try {
        if (typeof window !== 'undefined') {
            localStorage.setItem('demoProjects', JSON.stringify(projects));
            notifyListeners();
        }
    } catch (error) {
        console.error("Could not save data to localStorage.", error);
    }
}

export function subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
}

export function getProjects(): Project[] {
    return [...projects].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getProjectById(id: string): Project | undefined {
    return projects.find(p => p.id === id);
}

export function addProject(projectData: Omit<Project, 'id' | 'status' | 'date' | 'ownerId'> & { verification: VerificationResult, imageUrl: string }): Project {
    const newProject: Project = {
        ...projectData,
        id: `proj_${Date.now()}`,
        status: 'Pending',
        date: new Date().toISOString(),
        ownerId: 'NGO', // Default owner
        verification: projectData.verification.verification,
        prediction: projectData.verification.prediction,
        imageUrl: projectData.imageUrl
    };
    projects.unshift(newProject);
    saveData();
    return newProject;
}

export function updateProjectStatus(id: string, status: Project['status']): Project | undefined {
    const project = projects.find(p => p.id === id);
    if (project) {
        project.status = status;
        saveData();
        return project;
    }
    return undefined;
}

export function purchaseProject(id: string): Project | undefined {
    const project = projects.find(p => p.id === id);
    if (project) {
        project.status = 'Purchased';
        project.ownerId = 'Buyer';
        saveData();
        return project;
    }
    return undefined;
}

// Function used by buyer dashboard to simulate purchase
export function removeProject(id: string) {
    projects = projects.filter(p => p.id !== id);
    saveData();
}
