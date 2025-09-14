
'use client';
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, MoreHorizontal, PlusCircle, Send } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getProjects, updateProject, type Project } from "@/lib/demo-data";
import { useToast } from "@/hooks/use-toast";


export default function ProjectsPage() {
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    setProjects(getProjects());
  }, []);

  const handleMintTokens = (projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    if(project) {
        // In a real app, this would be a more complex flow. Here we just update the status.
        // For the demo, we'll assign a random tCO2 amount.
        const mintedTco2 = Math.floor(Math.random() * (2000 - 500 + 1) + 500);
        updateProject(projectId, { tco2: mintedTco2 });
        setProjects(getProjects()); // Refresh the project list
        toast({
            title: "Tokens Minted!",
            description: `${mintedTco2.toLocaleString()} CARBO tokens have been minted for ${project.name}.`,
        });
    }
  };

  return (
    <div className="animate-fade-in-up space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Projects</h1>
        <p className="text-muted-foreground">Manage your carbon credit projects and view their verification status.</p>
      </div>

      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader className="flex-row items-center justify-between">
            <div>
                <CardTitle>Your Projects</CardTitle>
                <CardDescription>A list of all your registered carbon sequestration projects.</CardDescription>
            </div>
            <Link href="/dashboard/verify">
                <Button>
                    <PlusCircle className="mr-2 size-4" />
                    New Project
                </Button>
            </Link>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[350px]">Project Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Area</TableHead>
                        <TableHead>Verified tCO₂</TableHead>
                        <TableHead>Last Update</TableHead>
                        <TableHead><span className="sr-only">Actions</span></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {projects.length > 0 ? projects.map((project) => (
                        <TableRow key={project.id}>
                            <TableCell className="font-medium">
                                <div className="flex items-center gap-3">
                                    <Image src={project.image.imageUrl} alt={project.name} width={40} height={40} className="rounded-md object-cover" data-ai-hint={project.image.imageHint} />
                                    <span>{project.name}</span>
                                </div>
                            </TableCell>
                            <TableCell>
                                <Badge 
                                    variant={project.status === 'Verified' ? 'default' : project.status === 'Pending' ? 'secondary' : 'destructive'}
                                    className={project.status === 'Verified' ? 'bg-primary/20 text-primary-foreground border-primary/50' : ''}
                                >
                                    {project.status}
                                </Badge>
                            </TableCell>
                            <TableCell>{project.area_ha} ha</TableCell>
                            <TableCell className="font-semibold text-primary">{project.tco2 ? project.tco2.toLocaleString() : 'N/A'}</TableCell>
                            <TableCell>{new Date(project.date).toLocaleDateString()}</TableCell>
                            <TableCell className="text-right">
                                {project.status === 'Verified' && !project.tco2 && (
                                    <Button size="sm" onClick={() => handleMintTokens(project.id)}>
                                        <Send className="mr-2 size-4" />
                                        Mint Tokens
                                    </Button>
                                )}
                                <Button variant="ghost" size="icon">
                                    <Eye className="size-4" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    )) : (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center text-muted-foreground">
                                You haven't submitted any projects yet.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  );
}
