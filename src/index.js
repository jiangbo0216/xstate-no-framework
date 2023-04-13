import { assign, createMachine, interpret } from "xstate";
import "./styles.css";

document.getElementById("app").innerHTML = `
<h1>XState Example</h1>
<div>
  Open the <strong>Console</strong> to view the machine output.
</div>
`;

// Edit your machine(s) here
const machine = createMachine({
  id: "machine",
  initial: "inactive",
  context: {
    count: 0
  },
  states: {
    inactive: {
      on: { TOGGLE: "active" }
    },
    active: {
      entry: assign({
        count: (ctx) => ctx.count + 1
      }),
      on: { TOGGLE: "inactive" }
    }
  },
  predictableActionArguments: true
});

const actor = interpret(machine);
actor.subscribe((state) => {
  console.log(state.value, state.context);
});

actor.start();

actor.send("TOGGLE");
actor.send("TOGGLE");
