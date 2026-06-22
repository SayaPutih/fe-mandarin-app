import {ButtonPrimary} from "./Buttons";
import {useRouter} from "next/navigation";

export const TokenExpiredNotificationModal = () => {
  const router = useRouter();

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
      <div
        className="
          bg-white
          w-full
          max-w-md
          rounded-2xl
          shadow-2xl
          p-6
          flex
          flex-col
          gap-6
        "
      >
        <div className="flex flex-col items-center text-center gap-3">
          <div
            className="
              w-16
              h-16
              rounded-full
              bg-blue-100
              flex
              items-center
              justify-center
              text-3xl
            "
          >
            📚
          </div>

          <h1
            className="
              text-xl
              sm:text-2xl
              font-bold
              text-gray-800
            "
          >
            Session Expired
          </h1>

          <p
            className="
              text-sm
              sm:text-base
              text-gray-600
              leading-relaxed
            "
          >
            Your session has expired. Please login again to continue using the application.
          </p>
        </div>

        <ButtonPrimary
          label="Login Again"
          onClick={() => {
            localStorage.removeItem("token");
            router.replace("/login");
          }}
        />
      </div>
    </div>
  );
};

interface Props{
    label : string;
    message : string;
    btnLabel : string;
    onClick : ()=>void
}

export const NewUserNotificationModal = ({
    label,
    message,
    btnLabel,
    onClick 
} : Props)=>{
    return(

        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-9999 flex items-center justify-center p-4">

            <div className="
                bg-white
                w-full
                max-w-md
                rounded-2xl
                shadow-2xl
                p-6
                flex
                flex-col
                gap-6
                animate-in
            ">

                <div className="flex flex-col items-center text-center gap-3">

                    <div className="
                        w-16
                        h-16
                        rounded-full
                        bg-blue-100
                        flex
                        items-center
                        justify-center
                        text-3xl
                    ">
                        📚
                    </div>

                    <h1 className="
                        text-xl
                        sm:text-2xl
                        font-bold
                        text-gray-800
                    ">
                        {label}
                    </h1>

                    <p className="
                        text-sm
                        sm:text-base
                        text-gray-600
                        leading-relaxed
                    ">
                        {message}
                    </p>

                </div>

                <ButtonPrimary
                    label={btnLabel}
                    onClick={onClick}
                />

            </div>

        </div>

    )
}

export const ReviewNotificationModal = ({
    label,
    message,
    btnLabel,
    onClick 
} : Props)=>{
    return(

        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-9999 flex items-center justify-center p-4">

            <div className="
                bg-white
                w-full
                max-w-md
                rounded-2xl
                shadow-2xl
                p-6
                flex
                flex-col
                gap-6
                animate-in
            ">

                <div className="flex flex-col items-center text-center gap-3">

                    <div className="
                        w-16
                        h-16
                        rounded-full
                        bg-blue-100
                        flex
                        items-center
                        justify-center
                        text-3xl
                    ">
                        📚
                    </div>

                    <h1 className="
                        text-xl
                        sm:text-2xl
                        font-bold
                        text-gray-800
                    ">
                        {label}
                    </h1>

                    <p className="
                        text-sm
                        sm:text-base
                        text-gray-600
                        leading-relaxed
                    ">
                        {message}
                    </p>

                </div>

                <ButtonPrimary
                    label={btnLabel}
                    onClick={onClick}
                />

            </div>

        </div>

    )
}