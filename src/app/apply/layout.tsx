"use client"

import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3"

const ApplyLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <GoogleReCaptchaProvider
            reCaptchaKey="6LeH3o8nAAAAACI31VJ-B5dICWzqMI3tUdxyLo3g"
            scriptProps={{
                async: false,
                defer: false,
                appendTo: "head",
                nonce: undefined,
            }}
        >
            {children}
        </GoogleReCaptchaProvider>
    )
}

export default ApplyLayout
