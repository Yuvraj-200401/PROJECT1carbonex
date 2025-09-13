import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";

const listings = [
  {
    projectName: "Sulu Sea Seagrass",
    vintage: 2023,
    tco2: 150,
    pricePerTon: 18.50,
    seller: "Eco Ventures"
  },
  {
    projectName: "Palawan Mangrove",
    vintage: 2023,
    tco2: 100,
    pricePerTon: 22.00,
    seller: "Eco Ventures"
  },
  {
    projectName: "Andaman Coast Conservation",
    vintage: 2022,
    tco2: 500,
    pricePerTon: 15.75,
    seller: "Oceanic Guardians"
  },
   {
    projectName: "Caribbean Reef Project",
    vintage: 2023,
    tco2: 250,
    pricePerTon: 25.00,
    seller: "Reef Savers Inc."
  },
];


export default function MarketplacePage() {
  return (
    <div className="animate-fade-in-up space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">CARBO-NEX Marketplace</h1>
        <p className="text-muted-foreground">Purchase verified carbon credits to offset your emissions and support vital conservation projects.</p>
      </div>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {listings.map((listing, index) => (
          <Card key={index} className="bg-card/50 backdrop-blur-sm flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="font-headline text-xl">{listing.projectName}</CardTitle>
                <Badge variant="outline">Vintage {listing.vintage}</Badge>
              </div>
              <CardDescription>Sold by <span className="text-primary">{listing.seller}</span></CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
                <div className="text-3xl font-bold">{listing.tco2.toLocaleString()} <span className="text-base font-normal text-muted-foreground">tCO₂ available</span></div>
                <div className="mt-4 text-2xl font-semibold text-primary">${listing.pricePerTon.toFixed(2)} <span className="text-sm font-normal text-muted-foreground">/ ton</span></div>
            </CardContent>
            <CardFooter className="flex gap-2">
                <Button className="w-full">
                    <ShoppingCart className="mr-2 size-4" />
                    Buy Now
                </Button>
                <Button variant="outline" className="w-full">
                    View Project
                </Button>
            </CardFooter>
          </Card>
        ))}
       </div>
    </div>
  );
}
