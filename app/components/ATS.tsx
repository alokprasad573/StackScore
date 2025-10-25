import React from 'react'

interface Suggestion {
    type: "good" | "improve";
    tip: string;
}

interface ATSProps {
    score: number;
    suggestions: Suggestion[];
}

const ATS: React.FC<ATSProps> = ({ score, suggestions }) => {
    // Determine background gradient based on score
    const gradientClass = score > 69
        ? 'from-green-100'
        : score > 49
            ? 'from-yellow-100'
            : 'from-red-100';

    // Determine icon based on score
    const iconSrc = score > 69
        ? '/icons/ats-good.svg'
        : score > 49
            ? '/icons/ats-warning.svg'
            : '/icons/ats-bad.svg';

    // Determine subtitle based on score
    const subtitle = score > 69
        ? 'Great Job!'
        : score > 49
            ? 'Good Start'
            : 'Needs Improvement';

    return (
        <div className={`bg-gradient-to-b ${gradientClass} to-white rounded-xl sm:rounded-2xl shadow-lg w-full p-4 sm:p-6`}>
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-4 sm:mb-6">
                <img src={iconSrc} alt="ATS Score Icon" className="w-10 h-10 sm:w-12 sm:h-12" />
                <div className="text-center sm:text-left">
                    <h2 className="text-xl sm:text-2xl font-bold">ATS Score - {score}/100</h2>
                </div>
            </div>

            <div className="mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-2">{subtitle}</h3>
                <p className="text-gray-600 mb-4 text-sm sm:text-base">
                    This score represents how well your resume is likely to perform in Applicant Tracking Systems used by employers.
                </p>

                <div className="space-y-3">
                    {suggestions.map((suggestion, index) => (
                        <div key={index} className="flex items-start gap-3">
                            <img
                                src={suggestion.type === "good" ? "/icons/check.svg" : "/icons/warning.svg"}
                                alt={suggestion.type === "good" ? "Check" : "Warning"}
                                className="w-4 h-4 sm:w-5 sm:h-5 mt-1 flex-shrink-0"
                            />
                            <p className={`text-sm sm:text-base ${suggestion.type === "good" ? "text-green-700" : "text-amber-700"}`}>
                                {suggestion.tip}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <p className="text-gray-700 italic text-sm sm:text-base">
                Keep refining your resume to improve your chances of getting past ATS filters and into the hands of recruiters.
            </p>
        </div>
    )
}

export default ATS