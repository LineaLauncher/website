export default function Skeleton() {
    return (
        <div className="border-2 border-gray-800 rounded-lg p-4 space-y-4 w-[25rem] animate-pulse">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gray-400 rounded-full" />
                    <div>
                        <div className="h-4 bg-gray-400 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-400 rounded w-1/2 mt-2"></div>
                        <div className="h-3 bg-gray-400 rounded w-1/2 mt-2"></div>
                        <div className="h-3 bg-gray-400 rounded w-1/4 mt-2"></div>
                    </div>
                </div>
            </div>
            <div className="flex flex-row space-x-2">
                <div className="h-5 bg-gray-400 rounded w-1/4"></div>
                <div className="h-5 bg-gray-400 rounded w-1/4"></div>
                <div className="h-5 bg-gray-400 rounded w-1/4"></div>
                <div className="h-5 bg-gray-400 rounded w-1/4"></div>
                <div className="h-5 bg-gray-400 rounded w-1/4"></div>
                <div className="h-5 bg-gray-400 rounded w-1/4"></div>
                <div className="h-5 bg-gray-400 rounded w-1/4"></div>
            </div>
            <div className="h-4 bg-gray-400 rounded w-full mt-2"></div>
            <div className="border-2 border-gray-800 rounded-lg p-1 mt-2">
                <div className="bg-green-400 rounded-lg h-1"></div>
            </div>
            <div className="h-4 bg-gray-400 rounded w-3/4 mt-2"></div>
            <div className="h-4 bg-gray-400 rounded w-1/2 mt-2"></div>
            <div className="h-4 bg-gray-400 rounded w-1/2 mt-2"></div>
            <div className="flex justify-center items-center rounded-md m-auto">
                <div className="h-10 w-32 bg-gray-400 rounded"></div>
            </div>
        </div>
    )
}
