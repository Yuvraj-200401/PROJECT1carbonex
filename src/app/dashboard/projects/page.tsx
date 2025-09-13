
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, MoreHorizontal, PlusCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const projects = [
  {
    name: "Sulu Sea Seagrass Meadow",
    area: "1,200 ha",
    status: "Verified",
    lastUpdate: "2023-10-26",
    tco2: "1,500",
    image: PlaceHolderImages.find(img => img.id === 'project-image-3')
  },
  {
    name: "Amazon Delta Reforestation",
    area: "5,000 ha",
    status: "Pending",
    lastUpdate: "2023-10-22",
    tco2: "N/A",
    image: PlaceHolderImages.find(img => img.id === 'project-image-2')
  },
  {
    name: "Coastal Blue Carbon Initiative",
    area: "850 ha",
    status: "Action Required",
    lastUpdate: "2023-10-20",
    tco2: "N/A",
    image: PlaceHolderImages.find(img => img.id === 'project-image-1')
  },
  {
    name: "Palawan Mangrove Restoration",
    area: "2,500 ha",
    status: "Verified",
    lastUpdate: "2023-09-15",
    tco2: "950",
    image: PlaceHolderImages.find(img => img.id === 'project-image-1')
  },
];


export default function ProjectsPage() {
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
                    {projects.map((project) => (
                        <TableRow key={project.name}>
                            <TableCell className="font-medium">
                                <div className="flex items-center gap-3">
                                    {project.image && <Image src={project.image.imageUrl} alt={project.name} width={40} height={40} className="rounded-md object-cover" data-ai-hint={project.image.imageHint} />}
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
                            <TableCell>{project.area}</TableCell>
                            <TableCell className="font-semibold text-primary">{project.tco2}</TableCell>
                            <TableCell>{project.lastUpdate}</TableCell>
                            <TableCell className="text-right">
                                <Button variant="ghost" size="icon">
                                    <Eye className="size-4" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="size-4" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  );
}
