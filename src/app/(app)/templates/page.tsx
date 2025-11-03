
"use client"

import * as React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card"
import { Template } from "@/lib/store"
import { PlusCircle, FileText } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { useAppState } from "@/lib/context/app-state-provider"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { Skeleton } from "@/components/ui/skeleton"

function TemplatesSkeleton() {
    return (
        <TableBody>
            {Array.from({ length: 3 }).map((_, i) => (
                <TableRow key={i}>
                    <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-64" /></TableCell>
                    <TableCell><div className="flex gap-1"><Skeleton className="h-5 w-16" /> <Skeleton className="h-5 w-16" /></div></TableCell>
                    <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                </TableRow>
            ))}
        </TableBody>
    )
}

function NewTemplateDialog({ onTemplateCreated }: { onTemplateCreated: () => void }) {
  const { addTemplate } = useAppState();
  const [name, setName] = React.useState('');
  const [body, setBody] = React.useState('');
  const [tags, setTags] = React.useState('');
  const [variables, setVariables] = React.useState('');

  const handleCreate = () => {
    if (!name || !body) {
      toast.error("Name and Body are required.");
      return;
    }
    const newTemplate: Template = {
      id: `TMPL-${Date.now()}`,
      name,
      body,
      tags: tags.split(',').map(t => t.trim()).filter(t => t),
      variables: variables.split(',').map(v => v.trim()).filter(v => v),
    };
    addTemplate(newTemplate);
    toast.success("Template created", { description: `Template "${name}" has been created.` });
    setName('');
    setBody('');
    setTags('');
    setVariables('');
    onTemplateCreated();
  };

  return (
     <DialogContent>
        <DialogHeader>
            <DialogTitle>Create New Template</DialogTitle>
            <DialogDescription>
                Fill out the details for your new response template.
            </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
            <div className="space-y-2">
                <Label htmlFor="template-name">Name</Label>
                <Input id="template-name" value={name} onChange={e => setName(e.target.value)} placeholder="e.g., Quote for Part" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="template-body">Body</Label>
                <Textarea id="template-body" value={body} onChange={e => setBody(e.target.value)} placeholder="Hi {{customerName}}, the price for..." />
            </div>
            <div className="space-y-2">
                <Label htmlFor="template-tags">Tags</Label>
                <Input id="template-tags" value={tags} onChange={e => setTags(e.target.value)} placeholder="quote, stock (comma-separated)" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="template-variables">Variables</Label>
                <Input id="template-variables" value={variables} onChange={e => setVariables(e.target.value)} placeholder="customerName, price (comma-separated)" />
            </div>
        </div>
        <DialogFooter>
            <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleCreate}>Create Template</Button>
        </DialogFooter>
    </DialogContent>
  )
}

export default function TemplatesPage() {
  const [selectedTemplate, setSelectedTemplate] = React.useState<Template | null>(null);
  const [isNewTemplateOpen, setIsNewTemplateOpen] = React.useState(false);
  const { templates, isLoading } = useAppState();

  return (
    <div className="space-y-6">
      <Dialog open={isNewTemplateOpen} onOpenChange={setIsNewTemplateOpen}>
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Templates</h1>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Template
            </Button>
          </DialogTrigger>
        </div>
        <NewTemplateDialog onTemplateCreated={() => setIsNewTemplateOpen(false)} />
      </Dialog>
      <Card>
        <CardHeader>
          <CardTitle>Response Templates</CardTitle>
          <CardDescription>Manage your saved response templates.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Preview</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead className="text-right">Variables</TableHead>
              </TableRow>
            </TableHeader>
            {isLoading ? <TemplatesSkeleton /> : (
              templates.length > 0 ? (
                <TableBody>
                  {templates.map((template) => (
                    <TableRow key={template.id} className="cursor-pointer hover:bg-muted/50" onClick={() => setSelectedTemplate(template)}>
                      <TableCell className="font-medium">{template.name}</TableCell>
                      <TableCell className="text-muted-foreground truncate max-w-sm line-clamp-1">{template.body}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                            {template.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                        </div>
                      </TableCell>
                      <TableCell className="text-right text-xs text-muted-foreground">
                        {template.variables.map(v => `{{${v}}}`).join(', ')}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              ) : (
                <TableBody>
                  <TableRow>
                      <TableCell colSpan={4}>
                           <div className="text-center py-12 text-muted-foreground">
                                <FileText className="mx-auto h-12 w-12" />
                                <h3 className="mt-4 text-lg font-semibold">No Templates Yet</h3>
                                <p className="mt-1 text-sm">Create your first template to speed up your replies.</p>
                                <DialogTrigger asChild>
                                    <Button className="mt-4">
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    Create Template
                                    </Button>
                                </DialogTrigger>
                            </div>
                      </TableCell>
                  </TableRow>
                </TableBody>
              )
            )}
          </Table>
        </CardContent>
        {templates.length > 0 && !isLoading && (
          <CardFooter>
              <div className="text-xs text-muted-foreground">
                  Showing <strong>1-{templates.length}</strong> of <strong>{templates.length}</strong> templates.
              </div>
          </CardFooter>
        )}
      </Card>
      {selectedTemplate && (
         <Dialog open={!!selectedTemplate} onOpenChange={(isOpen) => !isOpen && setSelectedTemplate(null)}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{selectedTemplate.name}</DialogTitle>
                    <DialogDescription>
                        Template details.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                    <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Preview</h4>
                        <p className="mt-1 text-sm p-4 bg-muted rounded-md">{selectedTemplate.body}</p>
                    </div>
                     <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Tags</h4>
                        <div className="flex gap-2 mt-1">
                            {selectedTemplate.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                        </div>
                    </div>
                     <div>
                        <h4 className="text-sm font-medium text-muted-foreground">Variables</h4>
                        <div className="flex gap-2 flex-wrap mt-1">
                            {selectedTemplate.variables.map(variable => (
                                <code key={variable} className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-sm">{`{{${variable}}}`}</code>
                            ))}
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setSelectedTemplate(null)}>Close</Button>
                    <Button>Edit Template</Button>
                </DialogFooter>
            </DialogContent>
         </Dialog>
      )}
    </div>
  )
}
