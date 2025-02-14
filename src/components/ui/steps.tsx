import { Check } from "lucide-react"

interface StepsProps {
    steps: { title: string }[]
    currentStep: number
}

export function Steps({ steps, currentStep }: StepsProps) {
    return (
        <div className="flex items-center justify-center mb-8">
            {steps.map((step, index) => (
                <div key={step.title} className="flex items-center">
                    <div
                        className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${index <= currentStep ? "border-[#FBC004] bg-[#FBC004] text-white" : "border-gray-300 text-gray-300"
                            }`}
                    >
                        {index < currentStep ? (
                            <Check className="w-5 h-5" />
                        ) : (
                            <span className="text-sm font-medium">{index + 1}</span>
                        )}
                    </div>
                    {index < steps.length - 1 && (
                        <div className={`w-12 h-1 ${index < currentStep ? "bg-[#FBC004]" : "bg-gray-300"}`} />
                    )}
                </div>
            ))}
        </div>
    )
}

