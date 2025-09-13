
'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { Send, List } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function MyTokensPage() {
    const { toast } = useToast();

    const tokens = [
        {
            projectName: "Sulu Sea Seagrass",
            tco2: 150,
            mintDate: "2023-10-26",
            status: "Available",
            vintage: 2023,
        },
        {
            projectName: "Palawan Mangrove Restoration",
            tco2: 950,
            mintDate: "2023-09-15",
            status: "Available",
            vintage: 2023,
        },
        {
            projectName: "Coastal Blue Carbon Initiative",
            tco2: 850,
            mintDate: "2023-08-01",
            status: "Listed",
            vintage: 2022,
        },
    ];

    const handleListForSale = (projectName: string) => {
        toast({
            title: "Tokens Listed!",
            description: `Your tokens for ${projectName} are now on the marketplace.`
        })
    }

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
                  {tokens.map((token, index) => (
                    <TableRow key={index}>
                        <TableCell className="font-medium">{token.projectName}</TableCell>
                        <TableCell className="font-semibold text-primary">{token.tco2.toLocaleString()}</TableCell>
                        <TableCell>{token.mintDate}</TableCell>
                        <TableCell><Badge variant="outline">{token.vintage}</Badge></TableCell>
                        <TableCell>
                            <Badge variant={token.status === 'Available' ? 'default' : 'secondary'} className={token.status === 'Available' ? 'bg-primary/20 text-primary-foreground' : ''}>
                                {token.status}
                            </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                           {token.status === 'Available' && (
                               <Button size="sm" onClick={() => handleListForSale(token.projectName)}>
                                    <List className="mr-2 size-4" />
                                    List for Sale
                                </Button>
                           )}
                           {token.status === 'Listed' && (
                                <Button size="sm" variant="ghost" disabled>
                                    On Marketplace
                                </Button>
                           )}
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
