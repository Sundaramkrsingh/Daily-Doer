const InputBox = ({ text, type, placeholder, value, onChange }: {
  text: string,
  type: string,
  placeholder: string,
  value: string,
  onChange: (e: string) => void
}) => {

  return <div className="w-full">
      <label htmlFor="input-label" className="block text-sm font-sans font-medium ml-1 mb-1 mt-3 text-sky-500">{ text }</label>
      <input type={ type } className="py-2 px-4 block w-full border border-sky-300 rounded-lg text-sm font-sans focus:border-sky-600 focus:ring-sky-600 focus:ring-1 hover:border-1.5 hover:shadow-sm hover:border-sky-600 focus:shadow-md outline-none" placeholder={ placeholder } value={ value } onChange={e => onChange(e.target.value)} />
  </div>
}

export default InputBox