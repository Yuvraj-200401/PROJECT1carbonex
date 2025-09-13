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
import { ArrowUpRight, ArrowDownLeft, Send } from 'lucide-react';
import { CarboNexLogo } from '@/components/icons';
import { Badge } from '@/components/ui/badge';

export default function WalletPage() {
  const balance = 1800;
  const transactions = [
    {
      type: 'Minted',
      amount: 150,
      date: '2023-10-26',
      project: 'Sulu Sea Seagrass',
      status: 'Completed',
    },
    {
      type: 'Sale',
      amount: -100,
      date: '2023-10-22',
      project: 'Marketplace Buyer',
      status: 'Completed',
    },
    {
      type: 'Minted',
      amount: 950,
      date: '2023-09-15',
      project: 'Palawan Mangrove Restoration',
      status: 'Completed',
    },
    {
      type: 'Transfer',
      amount: -50,
      date: '2023-09-10',
      project: 'Partner NGO',
      status: 'Pending',
    },
    {
      type: 'Minted',
      amount: 850,
      date: '2023-08-01',
      project: 'Coastal Blue Carbon Initiative',
      status: 'Completed',
    },
  ];

  return (
    <div className="animate-fade-in-up space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">My Wallet</h1>
        <p className="text-muted-foreground">
          Manage your CARBO tokens and view your transaction history.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <Card className="bg-card/50 backdrop-blur-sm sticky top-24">
            <CardHeader>
              <CardTitle>Current Balance</CardTitle>
              <CardDescription>Your available CARBO tokens.</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center gap-4">
              <CarboNexLogo className="size-12 text-primary" />
              <div>
                <p className="text-4xl font-bold">
                  {balance.toLocaleString()}
                </p>
                <p className="text-muted-foreground">CARBO</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <Send className="mr-2 size-4" />
                List Tokens for Sale
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>
                A record of your recent token activities.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Details</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((tx, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {tx.amount > 0 ? (
                            <div className="p-1.5 bg-primary/20 rounded-full">
                                <ArrowDownLeft className="size-4 text-primary" />
                            </div>
                          ) : (
                             <div className="p-1.5 bg-secondary/20 rounded-full">
                                <ArrowUpRight className="size-4 text-secondary" />
                            </div>
                          )}
                          <span className="font-medium">{tx.type}</span>
                        </div>
                      </TableCell>
                      <TableCell
                        className={`font-semibold ${
                          tx.amount > 0 ? 'text-primary' : 'text-secondary'
                        }`}
                      >
                        {tx.amount.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {tx.date}
                      </TableCell>
                      <TableCell>{tx.project}</TableCell>
                      <TableCell className="text-right">
                        <Badge
                          variant={
                            tx.status === 'Completed' ? 'default' : 'secondary'
                          }
                           className={tx.status === 'Completed' ? 'bg-primary/20 text-primary-foreground' : ''}
                        >
                          {tx.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
