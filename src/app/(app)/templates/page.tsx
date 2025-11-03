
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
import { templates } from "@/lib/store"
import { PlusCircle, FileText } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function TemplatesPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Templates</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Template
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Response Templates</CardTitle>
          <CardDescription>Manage your saved response templates.</CardDescription>
        </CardHeader>
        <CardContent>
          {templates.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Preview</TableHead>
                  <TableHead>Tags</TableHead>
                  <TableHead className="text-right">Variables</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {templates.map((template) => (
                  <TableRow key={template.id} className="cursor-pointer hover:bg-muted/50">
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
            </Table>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
                <FileText className="mx-auto h-12 w-12" />
                <h3 className="mt-4 text-lg font-semibold">No Templates Yet</h3>
                <p className="mt-1 text-sm">Create your first template to speed up your replies.</p>
                <Button className="mt-4">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create Template
                </Button>
            </div>
          )}
        </CardContent>
        {templates.length > 0 && (
          <CardFooter>
              <div className="text-xs text-muted-foreground">
                  Showing <strong>1-{templates.length}</strong> of <strong>{templates.length}</strong> templates.
              </div>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}
