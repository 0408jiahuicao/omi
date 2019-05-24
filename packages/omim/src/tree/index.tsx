import { tag, WeElement, h, extractClass, classNames } from 'omi'
import * as css from './index.scss'

//@ts-ignore
import { theme } from '../theme.ts'

interface Props {
  path?: string,
  paths?: object,
  view?: number,
  scale?: number,
  color?: string,
  rotate?: boolean
}

interface Data {

}


@tag('m-tree')
export default class Tree extends WeElement<Props, Data>{
  static css = theme() + css

  static defaultProps = {
    view: 1024,
    scale: 2
  }

  static propTypes = {
    path: String,
    paths: Object,
    view: Number,
    scale: Number,
    color: String,
    rotate: Boolean
  }

  _preSelected = null

  toggle = (id, open) => {
    this.fire('toggle', { id, open })
  }

  onNodeClick = (id) => {
    this.fire('nodeClick', { id, pre: this._preSelected  })
  }

  renderNode(node) {
    if(node.selected){
      this._preSelected = node.id
    }
    return <ul>
      <li class={classNames('tree-item', {
        'close': node.close
      })}>
        {node.children && node.children.length > 0 && <svg onClick={_ => this.toggle(node.id, !node.close)} viewBox="0 0 1024 1024"
          class="arrow" data-icon="caret-down" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false">
          <path d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"></path>
        </svg>}
        <span onClick={_ => this.onNodeClick(node.id)} class={classNames('mdc-tree-title', {
        'selected': node.selected
      })}>{node.title}</span>

        <div class='children' style={`height: ${node.close ? 0 : (node.children ? (this._getChildCount(node)) * 30 : 0)}px;`}> {node.children && node.children.length > 0 && node.children.map(_ => this.renderNode(_))}</div>
      </li>
    </ul>
  }

  _getChildCount(node) {
    let count = 0
    if (node.children) {
      count += node.children.length
      node.children.forEach(child => {
        count += this._getChildCount(child)
      })
    }

    return count

  }
  render(props) {

    return this.renderNode(props.node)
  }
}
