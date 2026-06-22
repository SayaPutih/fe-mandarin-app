export default function LoadingModel(){
    return (
        <div
            className="
                    flex flex-col
                    items-center
                    justify-center  w-full h-full
                    gap-6 flex-1
                "
            >
                <div
                    className="
                        h-20 w-20
                        rounded-full
                        border-4
                        border-gray-200
                        border-t-black
                        animate-spin
                    "
                />

                <div className="text-center">
                    <h2 className="text-2xl font-bold">
                        Updating Memory
                        Model
                    </h2>

                    <p className="text-gray-500 mt-2">
                        Calculating next
                        review
                        schedule...
                    </p>
                </div>
            </div>
    )
}