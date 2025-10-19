export default function DFAFooter() {
  return (
    <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Understanding Deterministic Finite Automata
      </h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-4 text-purple-900">
            Key Properties
          </h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="bg-red-100 text-red-500 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                D
              </span>
              <div>
                <strong>Deterministic:</strong> For each state and input symbol, there is exactly one transition.
              </div>
            </li>

            <li className="flex items-start">
              <span className="bg-orange-100 text-orange-400 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                F
              </span>
              <div>
                <strong>Finite:</strong> Has a finite number of states and transitions.
              </div>
            </li>

            <li className="flex items-start">
              <span className="bg-yellow-100 text-yellow-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                C
              </span>
              <div>
                <strong>Complete:</strong> Every has a transition for each input symbol.
              </div>
            </li>

            <li className="flex items-start">
              <span className="bg-green-100 text-green-500 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                A
              </span>
              <div>
                <strong>Accepting:</strong> Has designated accepting states for string acceptance.
              </div>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4 text-rose-400">
            How DFA Works
          </h3>
          <ol className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="bg-gray-800 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                1
              </span>
              <div>
                Start in the <strong>initial state</strong> (q0).
              </div>
            </li>

            <li className="flex items-start">
              <span className="bg-gray-800 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                2
              </span>
              <div>
                Read the <strong>next input symbol</strong> from left to right.
              </div>
            </li>

            <li className="flex items-start">
              <span className="bg-gray-800 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                3
              </span>
              <div>
                Follow the <strong>unique transition</strong> for current state and input.
              </div>
            </li>

            <li className="flex items-start">
              <span className="bg-gray-800 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                4
              </span>
              <div>
                Repeat until all input is consumed.
              </div>
            </li>

            <li className="flex items-start">
              <span className="bg-gray-800 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                5
              </span>
              <div>
                <strong>Accept</strong> if final state is accepting, <strong>reject</strong> otherwise.
              </div>
            </li>
          </ol>
        </div>
      </div>

      <div className="mt-8 grid md:grid-cols-3 gap-6">
        <div className="p-4 bg-purple-50 rounded-lg">
          <h4 className="font-semibold text-purple-900 mb-2">Example: "010110"</h4>
          <div className="text-purple-700 text-sm space-y-1">
            <p><strong>Path:</strong> q0 → q0 → q1 → q2 → q1 → q1 → q2</p>
            <p><strong>Result:</strong> ✓ ACCEPTED (ends in q2)</p>
            <p className="text-xs">String ends with "10"</p>
          </div>
        </div>

        <div className="p-4 bg-pink-50 rounded-lg">
          <h4 className="font-semibold text-pink-900 mb-2">Example: "01011"</h4>
          <div className="text-pink-600 text-sm space-y-1">
            <p><strong>Path:</strong> q0 → q0 → q1 → q2 → q1 → q1</p>
            <p><strong>Result:</strong> ✗ REJECTED (ends in q1)</p>
            <p className="text-xs">String doesn't end with "10"</p>
          </div>
        </div>

        <div className="p-4 bg-orange-50 rounded-lg">
          <h4 className="font-semibold text-orange-500 mb-2">Applications</h4>
          <ul className="text-orange-800 text-sm space-y-1 list-disc list-inside">
            <li>Lexical Analyzers</li>
            <li>Pattern Matcher</li>
            <li>Protocol Verification</li>
            <li>Regular Expression Engines</li>
            <li>Digital Circuit Design</li>
          </ul>
        </div>
      </div>

      <div className="mt-6 p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
        <h4 className="font-semibold text-yellow-800 mb-2">Key Insight</h4>
        <p className="text-yellow-700 text-sm">
          DFAs are powerful because they can recognize regular languages efficiently with linear time complexity. 
          The deterministic nature means there's never any ambiguity about which transition to take, making them 
          perfect for practical applications like compilers and text processing.
        </p>
      </div>
    </div>
  );
}
