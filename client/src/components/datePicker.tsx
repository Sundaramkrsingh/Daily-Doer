const DatePicker = ({ onChange }: {
    onChange: (e: string) => void
}) => {

    return <div className="w-full">
        <label htmlFor="input-label" className="block text-sm font-sans font-medium ml-1 mb-1 mt-3 text-sky-500">due date</label>
        <div className="relative w-full">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                </svg>
            </div>
            < input type="text" className="bg-gray-50 border border-sky-300 rounded-lg text-sm font-sans focus:border-sky-600 focus:ring-sky-600 focus:ring-1 hover:border-1.5 hover:shadow-sm hover:border-sky-600 focus:shadow-md outline-none block w-full ps-10 p-2.5" placeholder="Enter date" onChange={(e) => onChange(e.target.value)} />
        </div>
    </div>    
}

export default DatePicker