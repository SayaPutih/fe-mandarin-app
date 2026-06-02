import Sidebar from "../Sidebar/Sidebar";

export default function DashboardLayout({
    children
} : {
    children : React.ReactNode
}){
    return(
        <div
            className="min-h-screen flex p-2 bg-gray-200 gap-2"
        >
            
            <Sidebar />

            <main className="flex-1 ">
                {children}
            </main>

        </div>
    )
}