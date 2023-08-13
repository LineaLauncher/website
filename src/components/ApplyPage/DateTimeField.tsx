interface DateTimeFieldProps {
    label: string
    name: string
    handleInputChange: (e: any) => void
}

export default function DateTimeField({ label, name, handleInputChange }: DateTimeFieldProps) {
    return (
        <div className="flex flex-col space-y-2">
            <label htmlFor={name} className="block font-bold mb-2">
                {label}
            </label>
            <div className="flex items-center border-2 border-gray-800 rounded-md p-2 w-4/5 bg-black">
                <input
                    type="datetime-local"
                    max="9999-12-31T23:59"
                    name={name}
                    className="bg-black text-white w-3/4 focus:outline-none focus:ring-0"
                    required
                    onChange={handleInputChange}
                />
            </div>
        </div>
    )
}
