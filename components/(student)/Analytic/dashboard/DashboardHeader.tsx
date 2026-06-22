interface Props{
    title : string;
    description : string;
}

const DashboardHeader =({
    title,
    description,
} : Props)=>{
    return(
        <div className="mb-4">
          <h1 className="text-3xl font-bold">
            {title}
          </h1>

          <p className="text-gray-500 text-sm mt-1">
            {description}
          </p>
        </div>
    )
}

export default DashboardHeader