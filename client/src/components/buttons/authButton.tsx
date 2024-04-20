const AuthButton = ({ text, onClick }: {
    text: string,
    onClick: () => void
}) => {
    return <button type="button" className="w-full focus:outline-none text-white bg-sky-500 hover:bg-sky-700 focus:ring-4 focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2" onClick={onClick}>{ text }</button>

}

export default AuthButton