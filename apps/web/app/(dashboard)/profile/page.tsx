import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@repo/ui/components/ui/card";
import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
import { Label } from "@repo/ui/components/ui/label";

export default function ProfilePage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Profilim</h1>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Kişisel Bilgiler</CardTitle>
                        <CardDescription>Profil bilgilerinizi buradan güncelleyebilirsiniz.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-2">
                            <Label>Ad Soyad</Label>
                            <Input defaultValue="Burak Özcan" />
                        </div>
                        <div className="grid gap-2">
                            <Label>E-posta</Label>
                            <Input defaultValue="burak@example.com" disabled />
                        </div>
                        <Button>Kaydet</Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Şifre Değiştir</CardTitle>
                        <CardDescription>Güvenliğiniz için şifrenizi düzenli güncelleyin.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-2">
                            <Label>Mevcut Şifre</Label>
                            <Input type="password" />
                        </div>
                        <div className="grid gap-2">
                            <Label>Yeni Şifre</Label>
                            <Input type="password" />
                        </div>
                        <Button variant="outline">Şifreyi Güncelle</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
