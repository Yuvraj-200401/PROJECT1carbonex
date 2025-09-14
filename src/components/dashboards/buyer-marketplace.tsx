
'use client';

import { useState, useEffect } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ShoppingCart } from "lucide-react";
import { getProjects, type Project } from '@/lib/demo-data';


function BuyDialog({ listing, onPurchase }: { listing: Project, onPurchase: (amount: number) => void }) {
    const [amount, setAmount] = useState(1);
    const [isOpen, setIsOpen] = useState(false);
    const totalCost = (amount * (listing.pricePerTon || 20)).toFixed(2);

    const handlePurchase = () => {
        onPurchase(amount);
        setIsOpen(false);
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="w-full">
                    <ShoppingCart className="mr-2 size-4" />
                    Buy Token
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                <DialogTitle>Buy Carbon Credits</DialogTitle>
                <DialogDescription>
                    Purchase tokens from the &quot;{listing.name}&quot; project.
                </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="amount" className="text-right">
                        Amount (tCO₂)
                        </Label>
                        <Input
                        id="amount"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(Math.min(listing.tco2!, Math.max(1, parseInt(e.target.value) || 1)))}
                        className="col-span-3"
                        max={listing.tco2}
                        min={1}
                        />
                    </div>
                     <div className="text-right text-lg font-bold">
                        Total: <span className="text-primary">${totalCost}</span>
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={handlePurchase}>Confirm Purchase</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}


export default function BuyerMarketplace() {
    const { toast } = useToast();
    const [listings, setListings] = useState<Project[]>([]);

    useEffect(() => {
        const projects = getProjects();
        setListings(projects.filter(p => p.listed));
    }, []);


    const handlePurchase = (projectName: string, amount: number) => {
        console.log(`Simulating purchase of ${amount} tCO2 from ${projectName}`);
        // In a real app, we would update the project's available tco2
        toast({
            title: "Purchase Successful!",
            description: `You have purchased ${amount} CARBO tokens from ${projectName}.`,
        })
    }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">CARBO-NEX Marketplace</h1>
        <p className="text-muted-foreground">Browse and purchase verified carbon credits from projects around the world.</p>
      </div>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {listings.length > 0 ? listings.map((listing) => (
          <Card key={listing.id} className="bg-card/50 backdrop-blur-sm flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="font-headline text-xl">{listing.name}</CardTitle>
                <Badge variant="outline">Vintage {new Date(listing.date).getFullYear()}</Badge>
              </div>
              <CardDescription>Sold by <span className="text-primary">{listing.ngoName || 'Eco Ventures'}</span></CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
                <div className="text-3xl font-bold">{listing.tco2?.toLocaleString()} <span className="text-base font-normal text-muted-foreground">tCO₂ available</span></div>
                <div className="mt-4 text-2xl font-semibold text-primary">${(listing.pricePerTon || 20).toFixed(2)} <span className="text-sm font-normal text-muted-foreground">/ ton</span></div>
            </CardContent>
            <CardFooter className="flex gap-2">
                <BuyDialog listing={listing} onPurchase={(amount) => handlePurchase(listing.name, amount)} />
            </CardFooter>
          </Card>
        )) : (
            <p className="col-span-full text-center text-muted-foreground">There are no tokens currently listed on the marketplace.</p>
        )}
       </div>
    </div>
  );
}
