import Skeleton from "./Skeleton"

export default function ProjectsLoading() {
    return (
        <div className="flex-grow p-2 md:p-6 py-6">
            <div className="md:px-16 lg:px-32 justify-evenly">
                <div className="flex justify-between mb-2 md:mb-4">
                    <button className="group rounded-md px-4 py-2 border-2 border-transparent transition-all duration-100 ease-in-out hover:border-white">
                        Upcoming and Current IDOs
                        <span className="block h-0.5 transition-all duration-300 bg-white w-full"></span>
                    </button>
                    <button className="group rounded-md px-4 py-2 border-2 border-transparent transition-all duration-100 ease-in-out hover:border-white">
                        Past IDOs
                    </button>
                </div>
                <div className="flex justify-center py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-16 lg:gap-24 items-center justify-center">
                        <Skeleton />
                    </div>
                </div>
            </div>
        </div>
    )
}
