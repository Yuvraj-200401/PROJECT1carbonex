
"use client";

import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from 'next/navigation';

import { verifyAndPredict } from "@/lib/actions";
import { addProject } from "@/lib/demo-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { VerificationResults } from "./verification-results";
import { Co2PredictionChart } from "./co2-prediction-chart";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";


const formSchema = z.object({
  siteName: z.string().min(3, "Site name must be at least 3 characters."),
  lat: z.coerce.number().min(-90).max(90, "Invalid latitude."),
  lng: z.coerce.number().min(-180).max(180, "Invalid longitude."),
  area_ha: z.coerce.number().positive("Area must be a positive number."),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date" }),
  biomass_density: z.coerce.number().nonnegative(),
  soil_carbon: z.coerce.number().nonnegative(),
  NDVI: z.coerce.number(),
  sampleMetadata: z.string().min(10, "Please provide some metadata."),
  csvData: z.any().refine(file => file?.size > 0, "A CSV file is required."),
  imageData: z.any().refine(file => file?.size > 0, "An image file is required."),
});


export function VerificationForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      siteName: "Sulu Sea Seagrass",
      lat: 10.43,
      lng: 120.3,
      area_ha: 1500,
      date: new Date().toISOString().split("T")[0],
      biomass_density: 45.2,
      soil_carbon: 12.5,
      NDVI: 0.78,
      sampleMetadata: "Drone imagery captured at 100m altitude during low tide. Water sample PH 8.1.",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    // Simulate API call delay
    setTimeout(() => {
        const ngoName = localStorage.getItem('userName') || 'Eco Ventures';
        
        addProject({
            ...values,
            id: `proj_${Date.now()}`,
            ngoName: ngoName,
            status: 'Pending',
            image: { // Use a random placeholder for the demo
                imageUrl: `https://picsum.photos/seed/${values.siteName}/400/300`,
                imageHint: 'satellite imagery'
            }
        });
        
        toast({
            title: "Project Submitted!",
            description: "Your project has been submitted for verification.",
        });
        
        setIsLoading(false);
        router.push('/dashboard/projects');
    }, 1500);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField control={form.control} name="siteName" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Site Name</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="date" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Collection Date</FormLabel>
                        <FormControl><Input type="date" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="lat" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Latitude</FormLabel>
                        <FormControl><Input type="number" step="any" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                 <FormField control={form.control} name="lng" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Longitude</FormLabel>
                        <FormControl><Input type="number" step="any" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="area_ha" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Area (hectares)</FormLabel>
                        <FormControl><Input type="number" step="any" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
            </div>

            <h3 className="text-lg font-semibold font-headline pt-4 border-t">Site Metrics</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <FormField control={form.control} name="biomass_density" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Biomass Density (t/ha)</FormLabel>
                        <FormControl><Input type="number" step="any" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="soil_carbon" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Soil Carbon (%)</FormLabel>
                        <FormControl><Input type="number" step="any" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="NDVI" render={({ field }) => (
                    <FormItem>
                        <FormLabel>NDVI</FormLabel>
                        <FormControl><Input type="number" step="any" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
            </div>
             <FormField control={form.control} name="sampleMetadata" render={({ field }) => (
                <FormItem>
                    <FormLabel>Sample Metadata</FormLabel>
                    <FormControl><Textarea rows={4} {...field} /></FormControl>
                     <FormDescription>Any additional notes about data collection.</FormDescription>
                    <FormMessage />
                </FormItem>
            )} />

             <h3 className="text-lg font-semibold font-headline pt-4 border-t">Data Files</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField control={form.control} name="csvData" render={({ field: { onChange, onBlur, name, ref } }) => (
                    <FormItem>
                        <FormLabel>Site Data (CSV)</FormLabel>
                        <FormControl><Input type="file" accept=".csv" onChange={(e) => onChange(e.target.files?.[0])} onBlur={onBlur} name={name} ref={ref} /></FormControl>
                        <FormDescription>CSV with detailed sample data.</FormDescription>
                        <FormMessage />
                    </FormItem>
                )} />
                 <FormField control={form.control} name="imageData" render={({ field: { onChange, onBlur, name, ref } }) => (
                    <FormItem>
                        <FormLabel>Drone/Satellite Image</FormLabel>
                        <FormControl><Input type="file" accept="image/*" onChange={(e) => onChange(e.target.files?.[0])} onBlur={onBlur} name={name} ref={ref} /></FormControl>
                        <FormDescription>A recent image of the project site.</FormDescription>
                        <FormMessage />
                    </FormItem>
                )} />
            </div>
          
          <Button type="submit" disabled={isLoading} className="w-full md:w-auto">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
              </>
            ) : (
              "Submit for Verification"
            )}
          </Button>
        </form>
      </Form>
    </>
  );
}
