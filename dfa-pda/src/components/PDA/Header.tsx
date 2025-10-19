export default function Header() {
  return (
    <div className="text-center mb-8">
      <h1 className="text-4xl font-bold mb-4">
        Pushdown Automaton Visualization
      </h1>
      <p className="text-lg text-foreground max-w-2xl mx-auto">
        Interactive demonstration of how Pushdown Automata work using a balanced parentheses checker.
        Watch the stack operations and state transitions as the PDA processes input strings.
      </p>
    </div>
  )
}
