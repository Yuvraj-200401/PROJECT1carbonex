import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SettingsPage() {
  return (
    <div className="animate-fade-in-up space-y-8">
       <div>
        <h1 className="text-3xl font-bold font-headline">Settings</h1>
        <p className="text-muted-foreground">Manage your account and application preferences.</p>
      </div>
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Update your organization's information.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="org-name">Organization Name</Label>
                <Input id="org-name" defaultValue="Eco Ventures" />
            </div>
             <div className="space-y-2">
                <Label htmlFor="email">Contact Email</Label>
                <Input id="email" type="email" defaultValue="contact@ecoventures.org" />
            </div>
        </CardContent>
        <CardFooter>
            <Button>Save Changes</Button>
        </CardFooter>
      </Card>

      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Password</CardTitle>
          <CardDescription>Change your account password.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
            </div>
             <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
            </div>
        </CardContent>
        <CardFooter>
            <Button>Update Password</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
