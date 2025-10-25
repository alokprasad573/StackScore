import ScoreBadge from "~/components/ScoreBadge";

const Category = ({title, score}: { title: string, score: number }) => {
    const textColor = score > 70 ? 'text-green-600'
        : score > 49
            ? 'text-yellow-600' : 'text-red-600';

    return (
        <div className="resume-summary">
            <div className="category">
                <div className="flex flex-col sm:flex-row gap-2 items-center justify-center">
                    <p className="text-lg sm:text-xl md:text-2xl font-semibold">{title}</p>
                    <ScoreBadge score={score}/>
                </div>
                <p className="text-lg sm:text-xl md:text-2xl font-bold">
                    <span className={textColor}>{score}</span>/100
                </p>
            </div>
        </div>
    )
}

export default Category;
