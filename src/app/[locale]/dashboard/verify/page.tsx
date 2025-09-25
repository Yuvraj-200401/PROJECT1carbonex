'use client';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { verifyAndPredict } from '@/lib/actions';
import { addProject } from '@/lib/demo-data';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Sparkles } from 'lucide-react';
import { fileToDataUri } from '@/lib/utils';
import { motion } from 'framer-motion';

const formSchema = z.object({
  siteName: z.string().min(3, "Site name is required"),
  lat: z.coerce.number().min(-90).max(90),
  lng: z.coerce.number().min(-180).max(180),
  area_ha: z.coerce.number().positive("Area must be positive"),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), "Invalid date"),
  biomass_density: z.coerce.number().nonnegative(),
  soil_carbon: z.coerce.number().nonnegative(),
  NDVI: z.coerce.number(),
  sampleMetadata: z.string().optional(),
  csvData: z.instanceof(File).refine(file => file.size > 0, 'CSV data is required.'),
  imageData: z.instanceof(File).refine(file => file.size > 0, 'Image data is required.'),
});

type FormValues = z.infer<typeof formSchema>;

export default function VerificationPage() {
    const { toast } = useToast();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          siteName: 'Sulu Sea Seagrass Meadow',
          lat: 8.5833,
          lng: 120.8333,
          area_ha: 1500,
          date: new Date().toISOString().split('T')[0],
          biomass_density: 25.5,
          soil_carbon: 12.3,
          NDVI: 0.78,
          sampleMetadata: 'Drone survey at 100m altitude, clear sky conditions.',
        },
    });

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        setIsSubmitting(true);
        
        try {
            const imageDataUri = await fileToDataUri(data.imageData);
            
            const formData = new FormData();
            Object.entries(data).forEach(([key, value]) => {
                if (key !== 'imageData' && value !== undefined) {
                    formData.append(key, value as string | Blob);
                }
            });
            formData.append('imageDataUri', imageDataUri);

            const result = await verifyAndPredict(null, formData);
            
            if (result?.error) {
                toast({ variant: 'destructive', title: 'Verification Failed', description: result.error });
            } else if (result) {
                const newProject = addProject({
                    siteName: data.siteName,
                    lat: data.lat,
                    lng: data.lng,
                    area_ha: data.area_ha,
                    verification: result,
                    imageUrl: imageDataUri, // Pass the data URI to be stored
                });
                
                toast({
                    title: 'Verification Submitted!',
                    description: 'Your project is now pending review.',
                });
                router.push(`/dashboard/projects/${newProject.id}`);
            }

        } catch (error) {
             toast({ variant: 'destructive', title: 'An Unexpected Error Occurred', description: 'Please try again.' });
             console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };
    
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Card>
                 <CardHeader>
                    <CardTitle className="text-2xl font-bold font-headline">New Project Verification</CardTitle>
                    <CardDescription>
                        Submit your project data for AI-powered verification and CO₂ capture prediction.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <FormProvider {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Column 1 */}
                            <div className="space-y-4">
                               <FormField
                                    control={form.control}
                                    name="siteName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Site Name</FormLabel>
                                            <FormControl><Input placeholder="e.g., Sulu Sea Seagrass Meadow" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="grid grid-cols-2 gap-4">
                                     <FormField
                                        control={form.control}
                                        name="lat"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Latitude</FormLabel>
                                                <FormControl><Input type="number" step="any" {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                     <FormField
                                        control={form.control}
                                        name="lng"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Longitude</FormLabel>
                                                <FormControl><Input type="number" step="any" {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="area_ha"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Area (ha)</FormLabel>
                                                <FormControl><Input type="number" step="any" {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="date"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Collection Date</FormLabel>
                                                <FormControl><Input type="date" {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <FormField
                                    control={form.control}
                                    name="sampleMetadata"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Sample Metadata</FormLabel>
                                            <FormControl><Textarea placeholder="e.g., Drone survey at 100m altitude..." {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Column 2 */}
                             <div className="space-y-4">
                                <div className="grid grid-cols-3 gap-4">
                                     <FormField
                                        control={form.control}
                                        name="biomass_density"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Biomass Density</FormLabel>
                                                <FormControl><Input type="number" step="any" {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                     <FormField
                                        control={form.control}
                                        name="soil_carbon"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Soil Carbon</FormLabel>
                                                <FormControl><Input type="number" step="any" {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                     <FormField
                                        control={form.control}
                                        name="NDVI"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>NDVI</FormLabel>
                                                <FormControl><Input type="number" step="any" {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                
                                <FormField
                                    control={form.control}
                                    name="csvData"
                                    render={({ field: { onChange, value, ...rest }}) => (
                                        <FormItem>
                                            <FormLabel>Site Data (CSV)</FormLabel>
                                            <FormControl>
                                                <Input type="file" accept=".csv" onChange={e => onChange(e.target.files?.[0])} {...rest} />
                                            </FormControl>
                                            <FormDescription>Upload the CSV file with detailed site metrics.</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                 <FormField
                                    control={form.control}
                                    name="imageData"
                                    render={({ field: { onChange, value, ...rest } }) => (
                                        <FormItem>
                                            <FormLabel>Drone Image</FormLabel>
                                            <FormControl>
                                                <Input type="file" accept="image/*" onChange={e => onChange(e.target.files?.[0])} {...rest} />
                                            </FormControl>
                                            <FormDescription>Upload a high-resolution drone image of the site.</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        <div className="flex justify-end pt-8">
                            <Button type="submit" size="lg" disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Submitting...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="mr-2 h-4 w-4" />
                                        Submit for AI Verification
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                    </FormProvider>
                </CardContent>
            </Card>
        </motion.div>
    );
}
