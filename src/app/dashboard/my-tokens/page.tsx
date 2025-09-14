
'use client'
import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { List } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getProjects, updateProject, type Project } from '@/lib/demo-data';

export default function MyTokensPage() {
    const { toast } = useToast();
    const [tokens, setTokens] = useState<Project[]>([]);

    useEffect(() => {
        const projects = getProjects();
        // Filter for tokens that are minted but not yet listed
        setTokens(projects.filter(p => p.status === 'Verified' && p.tco2 && !p.listed));
    }, []);

    const handleListForSale = (projectId: string) => {
        const project = updateProject(projectId, { listed: true });
        if (project) {
            setTokens(prevTokens => prevTokens.filter(t => t.id !== projectId));
            toast({
                title: "Tokens Listed!",
                description: `Your tokens for ${project.name} are now on the marketplace.`
            });
        }
    };

    const mintedTokens = getProjects().filter(p => p.status === 'Verified' && p.tco2);

  return (
    <div className="animate-fade-in-up space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">My Tokens</h1>
        <p className="text-muted-foreground">
          Manage your minted CARBO tokens and list them for sale.
        </p>
      </div>

      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
            <CardTitle>My Token Holdings</CardTitle>
            <CardDescription>A list of all carbon credit tokens you have minted.</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Project</TableHead>
                    <TableHead>Amount (tCO₂)</TableHead>
                    <TableHead>Mint Date</TableHead>
                    <TableHead>Vintage</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mintedTokens.length > 0 ? mintedTokens.map((token) => (
                    <TableRow key={token.id}>
                        <TableCell className="font-medium">{token.name}</TableCell>
                        <TableCell className="font-semibold text-primary">{token.tco2?.toLocaleString()}</TableCell>
                        <TableCell>{new Date().toLocaleDateString()}</TableCell>
                        <TableCell><Badge variant="outline">{new Date().getFullYear()}</Badge></TableCell>
                        <TableCell>
                            <Badge variant={!token.listed ? 'default' : 'secondary'} className={!token.listed ? 'bg-primary/20 text-primary-foreground' : ''}>
                                {token.listed ? 'Listed' : 'Available'}
                            </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                           {!token.listed ? (
                               <Button size="sm" onClick={() => handleListForSale(token.id)}>
                                    <List className="mr-2 size-4" />
                                    List for Sale
                                </Button>
                           ) : (
                                <Button size="sm" variant="ghost" disabled>
                                    On Marketplace
                                </Button>
                           )}
                        </TableCell>
                    </TableRow>
                  )) : (
                    <TableRow>
                        <TableCell colSpan={6} className="text-center text-muted-foreground">
                            You have not minted any tokens yet.
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
