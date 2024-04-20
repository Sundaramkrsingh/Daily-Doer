const TodoButton = ({ text, redirectPage }: {
    text: string,
    redirectPage: string
}) => {
    return <a href={`/${redirectPage}`} className="relative px-5 py-2 font-medium text-white group">
    <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-sky-500 group-hover:bg-sky-700 group-hover:skew-x-12"></span>
    <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-12 bg-sky-700 group-hover:bg-sky-500 group-hover:-skew-x-12"></span>
    <span className="absolute bottom-0 left-0 hidden w-10 h-20 transition-all duration-100 ease-out transform -translate-x-8 translate-y-10 bg-sky-600 -rotate-12"></span>
    <span className="absolute bottom-0 right-0 hidden w-10 h-20 transition-all duration-100 ease-out transform translate-x-10 translate-y-8 bg-sky-400 -rotate-12"></span>
    <span className="relative">{ text }</span>
    </a>
}

export default TodoButton