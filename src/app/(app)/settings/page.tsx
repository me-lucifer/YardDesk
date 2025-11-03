
"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { ThemeToggle } from "@/components/theme-toggle"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account and application settings.</p>
      </div>
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="business">Business</TabsTrigger>
          <TabsTrigger value="messaging">Messaging</TabsTrigger>
          <TabsTrigger value="sla">SLA</TabsTrigger>
          <TabsTrigger value="retention">Retention</TabsTrigger>
        </TabsList>
        <TabsContent value="profile" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>This is how others will see you on the site.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue="John Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="john.doe@yarddesk.com" />
              </div>
              <Button>Save changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="appearance" className="mt-6">
           <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize the look and feel of the application.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                        <Label>Theme</Label>
                        <p className="text-sm text-muted-foreground">Select the theme for the dashboard.</p>
                    </div>
                    <ThemeToggle />
                </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notifications" className="mt-6">
           <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Configure how you receive notifications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive an email for new tickets and updates.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label>Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">Get push notifications on your devices.</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="business" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Business Profile</CardTitle>
              <CardDescription>Manage your business details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="yard-name">Yard Name</Label>
                <Input id="yard-name" defaultValue="YardDesk" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reply-from-name">Reply-from Name</Label>
                <Input id="reply-from-name" defaultValue="The YardDesk Team" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signature">Default Signature</Label>
                <Textarea id="signature" placeholder="Your default email signature..." defaultValue="Regards,\nThe YardDesk Team" />
              </div>
              <Button>Save changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="messaging" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Messaging Defaults</CardTitle>
              <CardDescription>Settings for customer communication.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Primary Channel Order</Label>
                <p className="text-sm text-muted-foreground">Set the preferred order of communication channels.</p>
                <div className="flex gap-2">
                  <Badge>SMS</Badge>
                  <Badge variant="secondary">WhatsApp</Badge>
                  <Badge variant="secondary">Email</Badge>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="opt-out-text">Opt-out Text</Label>
                <Textarea id="opt-out-text" defaultValue="To unsubscribe from marketing messages, reply STOP." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ivr-script">Consent Script for IVR</Label>
                 <Textarea id="ivr-script" defaultValue="To help us improve our service, this call may be recorded. By continuing, you consent to the recording." />
              </div>
              <Button>Save changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="sla" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>SLA Rules</CardTitle>
              <CardDescription>Define first-response time targets for tickets.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Priority</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Response time (minutes)</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>Urgent</TableCell>
                            <TableCell>New</TableCell>
                            <TableCell className="text-right">
                                <Input type="number" defaultValue={15} className="w-24 ml-auto" />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>High</TableCell>
                            <TableCell>New</TableCell>
                            <TableCell className="text-right">
                                <Input type="number" defaultValue={60} className="w-24 ml-auto" />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Medium</TableCell>
                            <TableCell>New</TableCell>
                            <TableCell className="text-right">
                                <Input type="number" defaultValue={240} className="w-24 ml-auto" />
                            </TableCell>
                        </TableRow>
                         <TableRow>
                            <TableCell>Low</TableCell>
                            <TableCell>Any</TableCell>
                            <TableCell className="text-right">
                                <Input type="number" defaultValue={1440} className="w-24 ml-auto" />
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <Button className="mt-4">Save SLA Rules</Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="retention" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Data Retention</CardTitle>
              <CardDescription>Manage how long data is stored.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <Label>Audio Retention</Label>
                  <p className="text-sm text-muted-foreground">Number of days to store call recordings.</p>
                </div>
                <Input type="number" defaultValue={30} className="w-24" />
              </div>
               <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <Label>Transcript Retention</Label>
                  <p className="text-sm text-muted-foreground">Number of days to store message transcripts.</p>
                </div>
                <Input type="number" defaultValue={365} className="w-24" />
              </div>
              <Button>Save Retention Policy</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

    