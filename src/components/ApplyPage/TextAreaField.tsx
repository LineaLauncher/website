type TextAreaFieldProps = {
    label: string
    name: string
    placeholder: string
    maxLength: number
    handleInputChange: (e: any) => void
    required?: boolean
}

export default function TextAreaField({ label, name, placeholder, maxLength, handleInputChange, required }: TextAreaFieldProps) {
    return (
        <div className="flex flex-col space-y-2">
            <label htmlFor={name} className="block font-bold mb-2">
                {label}
            </label>
            <div className="flex items-center border-2 border-gray-800 rounded-md p-2 w-4/5 bg-black">
                <textarea
                    name={name}
                    placeholder={placeholder}
                    maxLength={maxLength}
                    className="bg-black text-white w-full focus:outline-none focus:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    required={required === undefined}
                    onChange={handleInputChange}
                />
            </div>
        </div>
    )
}
