type InputFieldProps = {
    label: string
    name: string
    placeholder: string
    handleInputChange: (e: any) => void
}

export function InputField({ label, name, placeholder, handleInputChange }: InputFieldProps) {
    return (
        <div className="flex flex-col space-y-2">
            <label htmlFor={name} className="block font-bold mb-2">
                {label}
            </label>
            <div className="flex items-center border-2 border-gray-800 rounded-md p-2 w-4/5 bg-black">
                <input
                    type="text"
                    name={name}
                    placeholder={placeholder}
                    className="bg-black w-3/4 focus:outline-none focus:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    required
                    onChange={handleInputChange}
                />
            </div>
        </div>
    )
}
