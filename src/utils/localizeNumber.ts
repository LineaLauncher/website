export default function localizeNumber(num: number, convertSmallerValues?: boolean) {
    switch (true) {
        case isNaN(num):
            return "0"
        case num >= 1_000_000_000_000:
            return (num / 1_000_000_000_000).toFixed(2) + "T"
        case num >= 1_000_000_000:
            return (num / 1_000_000_000).toFixed(2) + "B"
        case num >= 1_000_000:
            return (num / 1_000_000).toFixed(2) + "M"
        case num >= 1000:
            return (num / 1000).toFixed(2) + "K"
        case num < 1:
            if (convertSmallerValues) {
                return num === 0 ? "0" : "<1"
            }
            return num.toFixed(2)
        default:
            const fixed = num.toFixed(1)
            if (fixed.endsWith(".0")) {
                return fixed.slice(0, fixed.length - 2)
            }
            return fixed
    }
}
