type OptionButtonsProps = {
    label: string
    name: string
    options: string[]
    selectedOption: string
    onOptionChange: (field: string, value: string) => void
    warning: boolean
}

export function OptionButtons({ label, name, options, selectedOption, onOptionChange, warning }: OptionButtonsProps) {
    return (
        <div className="flex flex-col space-y-2">
            <label htmlFor={name} className="block font-bold mb-2">
                {label}
            </label>
            <div className="flex flex-row space-x-4">
                {options.map(option => (
                    <button
                        key={option}
                        type="button"
                        className={`font-bold rounded-md px-4 py-2 border-2 border-white transition-all ease-in-out ${
                            selectedOption === option ? "bg-white text-black" : ""
                        }`}
                        onClick={() => onOptionChange(name, option)}
                    >
                        {option}
                    </button>
                ))}
            </div>
            {warning && <p className="text-red-500">This field is required.</p>}
        </div>
    )
}
