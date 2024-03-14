import  { useState } from 'react'
import SignIn from "./components/SignIn"
import SignUp from "./components/SignUp"

export default function Authentication() {
    const [authOption, setAuthOption] = useState("Sign In");
    let authToShow = null;
    // const { loggedIn } = useAuthStatus();
    switch (authOption) {
        case "Sign In":
            authToShow = (
                <SignIn setAuthOption={setAuthOption} />
            );
            break;
        case "Sign Up":
            authToShow = (
                <SignUp setAuthOption={setAuthOption} />
            );
            break;
        default:
            break;
    }
    // if (loggedIn) {
    //     return <Navigate to="/" />;
    // }
    return (
        <div className="flex justify-center items-center p-5 md:p-0 h-full md:h-[80vh]">
            <div className="max-w-5xl mx-auto">
                <div className="flex shadow-2xl rounded-xl">
                    {authToShow}
                </div>
            </div>
        </div>
    )
}