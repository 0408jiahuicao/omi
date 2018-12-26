import { define, WeElement } from 'omi'
import css from './_index.css'
import path from './path'

define('o-icon', class extends WeElement {
  css() {
    return css
  }

  render(pops) {
    const props  = {}
    if(this.props.rotate){
      props.class = 'rotate '
    }
    return (
      <i class={`o-icon ${this.props.class||''}`}>
        <svg viewBox="0 0 1024 1024" {...props} data-icon="loading" width="1em" height="1em" fill="currentColor" aria-hidden="true">
          <path d={path[this.props.type]}></path>
        </svg>
      </i>
    )

  }
})
