export const LoadingBar =({
    index,
    total,
    done,
} : {
    index : number;
    total : number;
    done : boolean;
})=>{

    const percentage = done ? 100 : ((index)/total) * 100;

    return(
        <div className="w-full">
            <div className="flex justify-between items-center flex-col text-sm mb-2">
                <span>
                   {index + 1} / {total}
                </span>
            </div>

            <div className={`w-full h-3 bg-gray-200 rounded-xl overflow-hidden`}>
                <div className={`h-full bg-green-600 transition-all duration-300`}
                    style={{width : `${percentage}%`}}
                ></div>
            </div>
        </div>
    )
}



// <div className="w-full">
//       <div className="flex justify-between text-sm mb-2">
//         <span>
//           {index + 1} / {total}
//         </span>

//         <span>
//           {Math.round(percentage)}%
//         </span>
//       </div>

//       <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
//         <div
//           className="
//             h-full
//             bg-green-500
//             transition-all
//             duration-300
//           "
//           style={{
//             width: `${percentage}%`,
//           }}
//         />
//       </div>
//     </div>