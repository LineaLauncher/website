"use client"

import { DateTimeField } from "@/components/ApplyButtons/DateTimeField"
import { InputField } from "@/components/ApplyButtons/InputField"
import { OptionButtons } from "@/components/ApplyButtons/OptionButtons"
import { TextAreaField } from "@/components/ApplyButtons/TextAreaField"
import { useCallback, useState } from "react"
import { useGoogleReCaptcha } from "react-google-recaptcha-v3"

const postForm = async (token: string, formData: any) => {
    const res = await fetch("/api/apply", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "g-recaptcha-response": token,
        },
        body: JSON.stringify(formData),
        cache: "no-store",
    })

    const data = await res.json()
    return data
}

const EMPTY_FORM = {
    projectName: "",
    email: "",
    communicationChannel: "",
    username: "",
    webAddress: "",
    overview: "",
    whitepaper: "",
    launchDate: "",
    refundOption: "",
    fundraisingDetails: "",
    additionalDetails: "",
}

const Apply = () => {
    const [formData, setFormData] = useState<ApplyFormData>(EMPTY_FORM)

    const [warnings, setWarnings] = useState({
        communicationChannel: false,
        refundOption: false,
    })

    const [submitStarted, setSubmitStarted] = useState(false)
    const [success, setSuccess] = useState(false)

    const handleInputChange = (e: any) => {
        const { name, value } = e.target
        setFormData(prevData => ({ ...prevData, [name]: value }))
    }

    const toggleOption = (name: string, value: string) => {
        setFormData({ ...formData, [name]: value })
        setWarnings({ ...warnings, [name]: false })
    }

    const { executeRecaptcha } = useGoogleReCaptcha()

    const handleSubmit = useCallback(
        async (e: any) => {
            e.preventDefault()
            if (!executeRecaptcha) {
                return
            }

            let newWarnings = { ...warnings }

            if (!formData.communicationChannel) {
                newWarnings.communicationChannel = true
            }
            if (!formData.refundOption) {
                newWarnings.refundOption = true
            }

            setWarnings(newWarnings)

            if (newWarnings.communicationChannel || newWarnings.refundOption) {
                return
            }

            formData.launchDate = `${formData.launchDate}:00Z`

            setSubmitStarted(true)
            const token = await executeRecaptcha("apply_form_submit").catch(() => {
                alert("Something went wrong. Please try again.")
                setSubmitStarted(false)
            })

            if (!token) return

            const res = await postForm(token, formData).catch(() => {
                alert("Something went wrong. Please try again.")
                setSubmitStarted(false)
            })

            if (!res) return

            const success = res.success
            if (success) {
                setFormData(EMPTY_FORM)
                setSubmitStarted(false)
                setSuccess(true)
            }
        },
        [executeRecaptcha, formData, warnings]
    )

    return (
        <main className="flex flex-grow m-auto justify-center items-center p-8">
            <div className="flex flex-col space-y-4 m-auto justify-center">
                <h1 className="text-4xl font-bold p-4">Apply for IDO</h1>

                {success ? (
                    <p className="flex flex-col p-4">
                        Thanks for applying to LineaLauncher! Your application has been received. You will be contacted
                        after your application has been reviewed.
                    </p>
                ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col space-y-8 p-4">
                        <InputField
                            label="What is the name of your project?"
                            name="projectName"
                            placeholder="Project Name"
                            handleInputChange={handleInputChange}
                        />
                        <InputField
                            label="What is your email address?"
                            name="email"
                            placeholder="Email Address"
                            handleInputChange={handleInputChange}
                        />
                        <InputField
                            label="Could you provide the web address for your project?"
                            name="webAddress"
                            placeholder="Web Address"
                            handleInputChange={handleInputChange}
                        />
                        <InputField
                            label="Please provide a link to your whitepaper."
                            name="whitepaper"
                            placeholder="Whitepaper"
                            handleInputChange={handleInputChange}
                        />
                        <TextAreaField
                            label="Please provide a brief overview of your project."
                            name="overview"
                            placeholder="Overview in 1000 characters or less"
                            maxLength={1000}
                            handleInputChange={handleInputChange}
                        />
                        <DateTimeField
                            label="Can you provide an estimated launch date for your project (UTC)?"
                            name="launchDate"
                            handleInputChange={handleInputChange}
                        />
                        <OptionButtons
                            label="Which communication channel do you prefer for correspondence?"
                            name="communicationChannel"
                            options={["Discord", "Telegram"]}
                            selectedOption={formData.communicationChannel}
                            onOptionChange={toggleOption}
                            warning={warnings.communicationChannel}
                        />
                        <InputField
                            label="What is your username?"
                            name="username"
                            placeholder="Username"
                            handleInputChange={handleInputChange}
                        />
                        <OptionButtons
                            label="Would you like to have a refund option?"
                            name="refundOption"
                            options={["Yes", "No"]}
                            selectedOption={formData.refundOption}
                            onOptionChange={toggleOption}
                            warning={warnings.refundOption}
                        />
                        <TextAreaField
                            label="Could you outline your fundraising target, including relevant vesting details?"
                            name="fundraisingDetails"
                            placeholder="Fundraising Details in 1000 characters or less"
                            maxLength={1000}
                            handleInputChange={handleInputChange}
                        />
                        <TextAreaField
                            label="Is there anything else you would like to add?"
                            name="additionalDetails"
                            placeholder="Additional Details in 1000 characters or less"
                            maxLength={1000}
                            handleInputChange={handleInputChange}
                            required={false}
                        />
                        <button className="font-bold w-1/3 rounded-md px-4 py-2 border-2 border-white transition-all ease-in-out hover:bg-white hover:text-black">
                            <span className="flex flex-row justify-center text-center items-center space-x-4 group">
                                Submit {submitStarted && <div className="spinner ml-2 group-hover:bg-black" />}
                            </span>
                        </button>
                    </form>
                )}
            </div>
        </main>
    )
}

export default Apply
