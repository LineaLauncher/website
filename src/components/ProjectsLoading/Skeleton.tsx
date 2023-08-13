export default function Skeleton() {
    return (
        <div className="border-2 border-gray-800 rounded-lg p-4 space-y-4 w-full sm:w-[15rem] md:w-[20rem] xl:w-[25rem] mx-auto animate-pulse">
            <div className="flex items-center justify-between space-x-4">
                <div className="w-10 h-10 bg-gray-400 rounded-full" />
                <div>
                    <div className="h-4 bg-gray-400 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-400 rounded w-1/2 mt-2"></div>
                    <div className="h-3 bg-gray-400 rounded w-1/4 mt-2"></div>
                </div>
            </div>
            <div className="flex flex-row space-x-2">
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
            <div className="flex flex-row items-center space-x-2 mt-2">
                <div className="h-5 bg-gray-400 rounded w-1/3"></div>
                <div className="h-5 bg-gray-400 rounded w-1/3"></div>
            </div>
            <div className="flex flex-row space-x-2">
                <div className="h-5 bg-gray-400 rounded w-1/4"></div>
                <div className="h-5 bg-gray-400 rounded w-1/4"></div>
                <div className="h-5 bg-gray-400 rounded w-1/4"></div>
                <div className="h-5 bg-gray-400 rounded w-1/4"></div>
            </div>
            <div className="flex flex-row w-1/3 rounded">
                <div className="h-5 rounded w-full"></div>
            </div>
            <div className="flex flex-row w-full bg-gray-400 rounded">
                <div className="h-5 bg-gray-400 rounded w-full"></div>
            </div>
            <div className="flex flex-row w-full bg-gray-400 rounded">
                <div className="h-5 bg-gray-400 rounded w-full"></div>
            </div>
        </div>
    )
}
