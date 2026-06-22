import HomeSection from "./HomeSection";
import ProfileComponent from "../profile/ProfileComponent";

export default function HomePage(){
    return(
        <section className="flex gap-6 h-full sm:flex-row flex-col min-h-[calc(100vh-200px)]">
            <ProfileComponent />
            
            <div className="flex-1 min-w-0 ">
                <HomeSection />
            </div>

        </section>
    )
}