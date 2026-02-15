import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@repo/ui/components/ui/card";
import { Button } from "@repo/ui/components/ui/button";

export default function DashboardEventsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Etkinlikler</h1>
                <Button>
                    Etkinlik Öner
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((i) => (
                    <Card key={i} className="overflow-hidden">
                        <div className="h-40 bg-muted flex items-center justify-center text-muted-foreground">
                            Cover Image
                        </div>
                        <CardHeader>
                            <div className="text-xs font-semibold text-primary mb-1">12 NİSAN 2024</div>
                            <CardTitle className="line-clamp-1">Global Girişimcilik Zirvesi</CardTitle>
                            <CardDescription>İstanbul, Kongre Merkezi</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button variant="secondary" className="w-full">Detayları Gör</Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
