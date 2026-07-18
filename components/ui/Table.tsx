//EE
interface TableProps{
    children : React.ReactNode
}
export const TableContainer =({children} : TableProps)=>{
    return (
        <div className="w-full overflow-x-auto">
            <div className="min-w-[850px]">
                <table className="w-full">
                    {children}
                </table>
            </div>
        </div>
    )
}

interface TableHeaderProps{
    children : React.ReactNode;
    className? : string;
}
export const TableHeader =({children,className} : TableHeaderProps)=>{
    return <th className={`${className} sm:px-6 sm:py-4 py-2 text-xs sm:text-md`}>{children}</th>
}

interface TableCellProps{
    children : React.ReactNode;
    className? : string;
    colSpan? : number;
}
export const TableCell =({children,className,colSpan} : TableCellProps)=>{
    return (
        <td 
            colSpan={colSpan} 
            className={`${className} sm:px-6 sm:py-4 py-2 text-xs sm:text-md`}>
            {children}
        </td>
    )
}
