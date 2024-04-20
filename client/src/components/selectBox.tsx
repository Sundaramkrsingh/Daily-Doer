const SelectBox = ({ label, options, onChange }: {
    label: string, 
    options: string[],
    onChange: (e: string) => void
}) => {
    return <div className="w-full pt-3">
        <label className="ml-1 text-sm text-sky-500 font-semibold">{ label }</label>
        <select className="mt-1 py-2.5 px-4 pe-9 block w-full border text-sm text-gray-500 font-base border-sky-300 rounded-lg  focus:border-sky-600 focus:ring-sky-600 focus:ring-1 hover:border-1.5 hover:shadow-sm hover:border-sky-600 focus:shadow-md outline-none cursor-pointer" onChange={(e) => onChange(e.target.value)}>
            <option selected={true} className="bg-slate-400 text-white font-semibold font-sans hover:">{ label }</option>
            <option className="bg-red-400 text-white font-semibold font-sans hover:">{ options[0] }</option>
            <option className="bg-yellow-300 text-white font-semibold font-sans hover:">{ options[1] }</option>
            <option className="bg-green-400 text-white font-semibold font-sans hover:">{ options[2] }</option>
        </select>
    </div>
}

export default SelectBox