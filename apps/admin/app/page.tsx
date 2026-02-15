import { ChartAreaInteractive } from "@/components/dashboard/chart-area-interactive"
import { DataTable } from "@/components/dashboard/data-table"
import { SectionCards } from "@/components/dashboard/section-cards"
import data from "./data.json"

export default function AdminPage() {
    return (
        <div className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <h1 className="text-2xl font-bold tracking-tight">Genel Bakış</h1>
            <div className="flex flex-col gap-4">
                <SectionCards />
                <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
                    <div className="xl:col-span-2">
                        <ChartAreaInteractive />
                    </div>
                    {/* Additional widgets can go here */}
                </div>
                <DataTable data={data} />
            </div>
        </div>
    )
}
