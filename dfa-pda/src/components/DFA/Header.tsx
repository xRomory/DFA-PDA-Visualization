export default function Header() {
  return (
    <div className="text-center mb-8">
      <h1 className="text-4xl font-bold mb-4">
        Deterministic Finite Automaton Visualization
      </h1>
      <p className="text-lg text-foreground max-w-2xl mx-auto">
        Interactive demonstration of how Deterministic Finite work. This DFA accepts
        binary strings that end with "10". Watch the state transitions as you process input strings.
      </p>
    </div>
  )
}
