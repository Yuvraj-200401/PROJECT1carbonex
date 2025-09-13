
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

const purchases = [
    {
        projectName: "Sulu Sea Seagrass",
        seller: "Eco Ventures",
        tco2: 50,
        totalCost: 925.00,
        purchaseDate: "2023-11-05",
        vintage: 2023,
        imageUrl: "https://picsum.photos/seed/project-3/40/40"
    },
    {
        projectName: "Andaman Coast Conservation",
        seller: "Oceanic Guardians",
        tco2: 100,
        totalCost: 1575.00,
        purchaseDate: "2023-10-18",
        vintage: 2022,
        imageUrl: "https://picsum.photos/seed/project-mangrove/40/40"
    },
];

export default function PurchasesPage() {
  return (
    <div className="animate-fade-in-up space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">My Purchases</h1>
        <p className="text-muted-foreground">A history of your carbon credit acquisitions.</p>
      </div>

      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Purchase History</CardTitle>
          <CardDescription>
            You have purchased credits from {purchases.length} projects.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead>Seller</TableHead>
                <TableHead>Amount (tCO₂)</TableHead>
                <TableHead>Total Cost</TableHead>
                <TableHead>Purchase Date</TableHead>
                <TableHead>Vintage</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {purchases.map((purchase, index) => (
                <TableRow key={index}>
                    <TableCell>
                         <div className="flex items-center gap-3">
                            <Image src={purchase.imageUrl} alt={purchase.projectName} width={40} height={40} className="rounded-md object-cover" />
                            <span className="font-medium">{purchase.projectName}</span>
                        </div>
                    </TableCell>
                  <TableCell className="text-primary">{purchase.seller}</TableCell>
                  <TableCell className="font-semibold">{purchase.tco2.toLocaleString()}</TableCell>
                  <TableCell>${purchase.totalCost.toFixed(2)}</TableCell>
                  <TableCell className="text-muted-foreground">{purchase.purchaseDate}</TableCell>
                  <TableCell><Badge variant="outline">{purchase.vintage}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
