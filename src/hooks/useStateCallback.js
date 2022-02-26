// https://stackoverflow.com/questions/54954091/how-to-use-callback-with-usestate-hook-in-react
// answer by ford04

/*
NOTE
We need this hook in order to do something after `useState` updates state. One of the frustrating
things you will come across when dealing with `useState` is that it doesn't update state when you
think it does. This is by design– the devs at React have written `useState` so that it does its
thing efficiently and sometimes that means that state isn't updated right away. All of this points
to the fact that if you try to do something like this–

   setCount(count + 1);
   console.log(count);

the log to the console will not be increased by +1 like you expect it to be. It works in the UI
because, again, the React devs have taken this into account so the component re-renders and everything
looks great.

In our case however, we need to get the updated count so we can use it to get something out of an
array and then pass that value to update the UI. It's the getting the item out of the array with the
updated count that messes things up.

This custom hook, however, solves the problem and we use it instead of `useState`. In a high-level way,
we would describe this hook at something that wraps `useState` and if you look at this code, you can
see it's using it along with other hooks. You do not need to understand the details of how this hook
works for now but below is a general summary of what it's doing.

  1. It's configured with `useStateCallback(<someValue>)` and fully replaces calling `useState(<someValue>)`
  2. The verb part of the configuration takes two arguments which is not how it works with `useState` which
     took only one.
  3. The first argument is a function that updates state.
  4. The second argument is a function that does something after state is updated. This is the callback
     function. A callback function is a function that is fired after everything else is done and this
     makes perfect sense in our case– want want a function to fire after state has been fully updated.

So if we had a simple React counter app and integrated this hook, we'd use it like this below.

  const [counter, setCounter] = useStateCallback(0);
  setCounter(previousState => previousState + 1, newState => console.log(newState));

Notice that we are capturing two values here, `previousState` and `newState`, so that we can then do
something with them. This is exactly the same thing we've seen when we need to capture the event
object on click.

If you look at what this hook returns on its penultimate line, it corresponds with these two values.

*/

import { useCallback, useEffect, useRef, useState } from "react";

export default function useStateCallback(initialState) {
  const [state, setState] = useState(initialState);
  const cbRef = useRef(null); // init mutable ref container for callbacks

  const setStateCallback = useCallback((state, cb) => {
    cbRef.current = cb; // store current, passed callback in ref
    setState(state);
  }, []); // keep object reference stable, exactly like `useState`

  useEffect(() => {
    // cb.current is `null` on initial render, 
    // so we only invoke callback on state *updates*
    if (cbRef.current) {
      cbRef.current(state);
      cbRef.current = null; // reset callback after execution
    }
  }, [state]);

  return [state, setStateCallback];
}