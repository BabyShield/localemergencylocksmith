interface DirectAnswerProps {
  question: string
  answer: string
}

export default function DirectAnswer({ question, answer }: DirectAnswerProps) {
  return (
    <div className="direct-answer bg-[#F7F7F5] border-l-4 border-[#FFB800] rounded-r-xl p-5 md:p-6">
      <p className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-2">Quick Answer</p>
      <p className="font-black text-[#0F1B2D] text-lg mb-2">{question}</p>
      <p className="text-gray-700 leading-relaxed">{answer}</p>
    </div>
  )
}
