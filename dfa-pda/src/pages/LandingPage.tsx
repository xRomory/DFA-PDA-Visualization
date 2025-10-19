import { DFADiagram } from "@/components/DFA/DFADiagram";
import Header from "@/components/DFA/Header";

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto py-8">
        <Header />
        <DFADiagram />
      </div>
    </div>
  )
}