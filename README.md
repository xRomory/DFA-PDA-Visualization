# DFA & PDA Visualization

An **interactive web application** that visually demonstrates the concepts and differences between **Deterministic Finite Automata (DFA)** and **Pushdown Automata (PDA)**.

This project helps users **understand how these automata work** by allowing them to **input strings, observe state transitions**, and explore how each automaton processes input step by step.

---

## Project Overview

This project was created as part of a **school activity** in **Automata Theory**, focusing on comparing **DFA** and **PDA** both **conceptually and visually**.

The main objective is to:
- **Illustrate the operation** of Deterministic Finite Automata (DFA) and Pushdown Automata (PDA).
- **Highlight their differences** in computation and memory handling.
- **Provide an interactive experience** where users can test inputs and see transitions in real time.

---

## Features

- 🎨 **Visual Representation** — Displays DFA and PDA state diagrams with transitions.
- ⚙️ **Interactive Simulation** — Users can manually input strings to see how each automaton processes them.
- 🔍 **Step-by-Step Execution** — Observe how states and stacks (for PDA) change as each symbol is read.
- 💡 **Educational Comparison** — Clearly shows why PDA is more powerful than DFA (e.g., stack memory usage).

---

## Technologies Used

| Technology | Purpose |
|-------------|----------|
| **React (TypeScript)** | Component-based frontend framework |
| **TailwindCSS** | Utility-first CSS framework for styling |
| **Vite** | Fast development and build tool |
| **HTML5 & CSS3** | Core web technologies |
| **JavaScript (ES6)** | For interactivity and logic handling |

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/xRomory/DFA-PDA-Visualization.git
cd DFA-PDA-Visualization
cd dfa-pda
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```

Then open your browser and go to http://localhost:5173/ (or the URL shown in your terminal).

## Understanding the Automata
### Deterministic Finite Automaton (DFA)

- Has finite states and no extra memory.
- Each state transition is fully determined by the current state and input symbol.
- Recognizes regular languages (simple patterns).

### Pushdown Automaton (PDA)

- Extends DFA by adding a stack (unbounded memory with LIFO access).
- Can handle nested or recursive structures.
- Recognizes context-free languages, such as { aⁿbⁿ | n ≥ 0 }.

This visualization project demonstrates these differences through interactive simulations and visual cues.

## Author

**Chris Lawrence De Vera**  
*Individual School Project — Automata Theory*  
*A visual learning aid for understanding DFA and PDA concepts.*

---

## License

This project is open-source and available under the **MIT License**.

---

## Acknowledgments

- Thanks to the **Automata Theory course** for inspiring this project.  
- Created for educational purposes to help students understand **abstract computation models** through **visual interaction**.

---

### ⭐ If you found this project helpful, consider giving it a star on GitHub!
