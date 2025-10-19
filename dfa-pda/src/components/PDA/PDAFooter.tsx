export default function PDAFooter() {
  return (
    <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Understanding Pushdown Automata
      </h2>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-4 text-purple-600">
            Key Components
          </h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="bg-purple-100 text-purple-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                S
              </span>
              <div>
                <strong>States:</strong> Control states like FSM (q0, q1, qf)
              </div>
            </li>
            <li className="flex items-start">
              <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                T
              </span>
              <div>
                <strong>Transitions:</strong> Rules with input, stack pop/push
                operations
              </div>
            </li>
            <li className="flex items-start">
              <span className="bg-green-100 text-green-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                K
              </span>
              <div>
                <strong>Stack:</strong> LIFO memory for storing symbols
              </div>
            </li>
            <li className="flex items-start">
              <span className="bg-orange-100 text-orange-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                I
              </span>
              <div>
                <strong>Input Tape:</strong> Read-only input string
              </div>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4 text-rose-600">
            How It Works
          </h3>
          <ol className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="bg-gray-800 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                1
              </span>
              <div>
                Start in initial state with empty stack (except bottom marker Z)
              </div>
            </li>
            <li className="flex items-start">
              <span className="bg-gray-800 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                2
              </span>
              <div>Read input symbol and check top of stack</div>
            </li>
            <li className="flex items-start">
              <span className="bg-gray-800 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                3
              </span>
              <div>
                Find matching transition based on state, input, and stack top
              </div>
            </li>
            <li className="flex items-start">
              <span className="bg-gray-800 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                4
              </span>
              <div>
                Execute transition: change state, pop/push stack, advance input
              </div>
            </li>
            <li className="flex items-start">
              <span className="bg-gray-800 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                5
              </span>
              <div>
                Accept if in final state with empty stack at end of input
              </div>
            </li>
          </ol>
        </div>
      </div>

      <div className="mt-8 grid md:grid-cols-2 gap-6">
        <div className="p-4 bg-violet-50 rounded-lg">
          <h4 className="font-semibold text-violet-800 mb-2">
            Example: Balanced Parentheses
          </h4>
          <div className="text-violet-700 text-sm space-y-1">
            <p>
              <strong>Input:</strong> ((()))
            </p>
            <p>
              <strong>Process:</strong>
            </p>
            <ul className="list-disc list-inside ml-2 space-y-1">
              <li>Push '(' for each opening parenthesis</li>
              <li>Pop '(' for each closing parenthesis</li>
              <li>Accept if stack is empty at the end</li>
            </ul>
          </div>
        </div>

        <div className="p-4 bg-pink-50 rounded-lg">
          <h4 className="font-semibold text-pink-800 mb-2">
            Real-World Applications
          </h4>
          <ul className="text-pink-700 text-sm space-y-1 list-disc list-inside">
            <li>Compiler syntax checking</li>
            <li>XML/HTML tag matching</li>
            <li>Mathematical expression parsing</li>
            <li>Programming language parsers</li>
            <li>Context-free grammar recognition</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
