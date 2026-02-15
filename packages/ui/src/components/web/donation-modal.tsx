"use client";

import { Copy } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Field, FieldGroup } from "../ui/field";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export function DonationModal({ children }: { children: React.ReactNode }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-md border-none">
                <DialogHeader>
                    <DialogTitle>UGKTED'e Destek Olun</DialogTitle>
                    <DialogDescription>
                        Girişimcilik kültürünü yaygınlaştırmak ve projelerimizi sürdürmek için desteğiniz bizim için çok değerli.
                    </DialogDescription>
                </DialogHeader>

                <Tabs defaultValue="bank" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="bank">Banka Havalesi</TabsTrigger>
                        <TabsTrigger value="card" disabled>Kredi Kartı (Yakında)</TabsTrigger>
                    </TabsList>

                    <TabsContent value="bank" className="space-y-4 pt-4">
                        <FieldGroup>
                            <Field>
                                <Label htmlFor="iban">IBAN</Label>
                                <div className="flex items-center space-x-2">
                                    <Input
                                        id="iban"
                                        value="TR00 0000 0000 0000 0000 0000 00"
                                        readOnly
                                        className="font-mono bg-muted border-none ring-0 focus-visible:ring-1 ring-primary"
                                    />
                                    <Button
                                        size="icon"
                                        variant="secondary"
                                        onClick={() => handleCopy("TR00 0000 0000 0000 0000 0000 00")}
                                    >
                                        <Copy className="h-4 w-4" />
                                    </Button>
                                </div>
                            </Field>

                            <Field>
                                <Label htmlFor="account-name">Alıcı Adı</Label>
                                <div className="flex items-center space-x-2">
                                    <Input
                                        id="account-name"
                                        value="UGKTED Derneği"
                                        readOnly
                                        className="bg-muted border-none ring-0 focus-visible:ring-1 ring-primary"
                                    />
                                    <Button
                                        size="icon"
                                        variant="secondary"
                                        onClick={() => handleCopy("UGKTED Derneği")}
                                    >
                                        <Copy className="h-4 w-4" />
                                    </Button>
                                </div>
                            </Field>
                        </FieldGroup>

                        <div className="rounded-lg bg-red-50 p-4 text-sm text-red-800 dark:bg-red-900/20 dark:text-red-200">
                            <p>
                                Lütfen açıklama kısmına <strong>"Bağış - [Adınız Soyadınız]"</strong> yazmayı unutmayınız.
                            </p>
                        </div>
                    </TabsContent>

                    <TabsContent value="card">
                        <div className="flex h-[200px] items-center justify-center rounded-lg border border-dashed text-muted-foreground">
                            Kredi kartı ile ödeme sistemi yakında aktif olacaktır.
                        </div>
                    </TabsContent>
                </Tabs>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="secondary">Kapat</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
