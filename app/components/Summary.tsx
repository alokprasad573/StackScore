import ScoreGauge from "~/components/ScoreGauge";
import Category  from "~/components/Category";

const Summary = ({ feedback }: { feedback: Feedback }) => {
    return (
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg w-full">
            <div className="flex flex-col sm:flex-row items-center p-4 sm:p-6 gap-4 sm:gap-8">
                <ScoreGauge score={feedback.overallScore} />

                <div className="flex flex-col gap-2 text-center sm:text-left">
                    <h2 className="text-xl sm:text-2xl font-bold">Your Resume Score</h2>
                    <p className="text-sm text-gray-500">
                        This score is calculated based on the variables listed below.
                    </p>
                </div>
            </div>

            <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                <Category title="Tone & Style" score={feedback.toneAndStyle.score} />
                <Category title="Content" score={feedback.content.score} />
                <Category title="Structure" score={feedback.structure.score} />
                <Category title="Skills" score={feedback.skills.score} />
            </div>
        </div>
    )
}
export default Summary