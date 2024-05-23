export default function DisplayResult({ score, listQuestion, userChoices }) {
  return (
    <div>
      <h2 className="text-2xl bg-slate-400 text-center">Your Score is: {score}</h2>
      <ul className="flex flex-col gap-5 py-5">
        {listQuestion.map((question, index) => {
          const userChoice = userChoices.find(
            (choice) => choice.questionId === question.id
          );
          const correctAnswer = question.choices.find(
            (choice) => choice.isCorrect
          );
          const isCorrect =
            userChoice && userChoice.choiceId === correctAnswer.id;

          return (
            <li key={question.id} className="flex flex-row gap-5">
              <p>{index + 1}</p>
              <h1>{question.name}</h1>
              <p>
                Your answer:{" "}
                {userChoice
                  ? question.choices.find(
                      (choice) => choice.id === userChoice.choiceId
                    ).name
                  : "No answer"}
              </p>
              <p>Correct answer: {correctAnswer.name}</p>
              <p className={isCorrect ? "text-green-600" : "text-red-600"}>
                {isCorrect ? "Correct" : "Incorrect"}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
