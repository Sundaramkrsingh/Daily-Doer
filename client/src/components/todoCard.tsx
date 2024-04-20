const TodoCard = ({ title, status, priority }: {
    title: string, 
    status: string, 
    priority: string
}) => {
    const colors: Map<string, string> = new Map()
    colors.set("Pending", "red-400")
    colors.set("Started", "yellow-300")
    colors.set("Done", "green-400")
    colors.set("High", "red-400")
    colors.set("Moderate", "yellow-300")
    colors.set("Normal", "green-400")

    return <div className={`flex flex-col items-center subpixel-antialiased border-4  border-sky-300 hover:border-sky-500 hover:shadow-xl h-max w-56 m-3 rounded-lg p-1 bg-${colors.get(status)}`}>
        <div className="w-full rounded-lg bg-white">
            <div className="border-b">
                <Heading text={"title"} />
                <div className="font-semibold text-center pb-2 text-sky-400">
                    {title}
                </div>
            </div>
            
            <div className="border-b">
                <Heading text={"status"} />
                <div className="text-sm text-center pb-1 text-slate-600">
                    {status}
                </div>
            </div>

            <div className={`border-b`}>
                <Heading text={"priority"} />
                <div className="text-sm text-center pb-1 ">
                    {priority}
                </div>
            </div>

            <div className="h-10">
                
            </div>
        </div>
    </div>  
}

function Heading({ text }: { text: string }) {
    
    return <div className="pl-2 pt-1 text-xs text-slate-400">
        { text }
    </div>
}

export default TodoCard;
