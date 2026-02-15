import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@repo/ui/components/ui/card";
import { Button } from "@repo/ui/components/ui/button";

export default function StatusPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Başvuru Durumu</h1>

            <Card>
                <CardHeader>
                    <CardTitle>Üyelik Başvurusu</CardTitle>
                    <CardDescription>Başvurunuzun güncel durumu aşağıdadır.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="rounded-lg bg-yellow-500/15 p-4 text-yellow-700 dark:text-yellow-400 border border-yellow-500/20">
                        <div className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-yellow-500 animate-pulse"></span>
                            <p className="font-semibold">İnceleniyor</p>
                        </div>
                        <p className="mt-2 text-sm">Başvurunuz yöneticilerimiz tarafından değerlendiriliyor. Sonuçlandığında e-posta ile bilgilendirileceksiniz.</p>
                    </div>

                    <div className="flex justify-end">
                        <Button variant="secondary">Desteğe Ulaş</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
