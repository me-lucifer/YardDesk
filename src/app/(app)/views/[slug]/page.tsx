import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function SavedViewPage({ params }: { params: { slug: string } }) {
    const viewName = params.slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Saved View: {viewName}</h1>
       <Card>
        <CardHeader>
          <CardTitle>Tickets in this view</CardTitle>
          <CardDescription>A list of tickets matching the criteria for {viewName}.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="text-center py-12 text-muted-foreground">
                <p>There are no tickets in this view yet.</p>
                <p className="text-sm">This is a placeholder page for the saved view.</p>
            </div>
        </CardContent>
      </Card>
    </div>
  )
}
