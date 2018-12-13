# omi 3.0.7

Solving the staticStyle method did not exec when it's component lazy execution.

# omi 3.0.6

Solving the root component constructor name conflict of static style rendering.

# omi 3.0.5

Solving the component constructor name conflict of static style rendering.

# omi 3.0.4

* modify the render method args:

now:

``` js
import { render } from 'omi'

render(<App>, document.body, {
    store: store,
    merge: merge,
    empty: empty
})

```

# omi 3.0.3

* SSR
* fix render args

# omi 3.0.2

Remove the _dirty prop of component for ssr and free updating.


# omi 3.0.1

Solve component style scope. Component style will not pollute the child component.
