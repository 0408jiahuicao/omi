import { tag, WeElement, h, extractClass } from 'omi'
import * as css from './index.scss'
import {MDCTopAppBar} from '@material/top-app-bar';
import '../icon'

interface Props {
  title: string,
  short: boolean,
  shortCollapsed: boolean,
  prominent: boolean,
  dense: boolean,
  fixed: boolean,
  navigationButton: object,
  actionItems: Array<object>
}

interface Data {

}

@tag('m-top-app-bar')
export default class topAppBar extends WeElement<Props, Data>{
  static css = css

  static propTypes = {
    title: String,
    short: Boolean,
    shortCollapsed: Boolean,
    prominent: Boolean,
    dense: Boolean,
    fixed: Boolean,
    navigationButton: Object,
    actionItems: Array
  }
  
  installed() {
    new MDCTopAppBar(this.shadowRoot.querySelector('.mdc-top-app-bar'));
  }
  
  render(props) {
    return (
      <header {...extractClass(props, 'mdc-top-app-bar', {
        'mdc-top-app-bar--fixed': props.fixed,
        'mdc-top-app-bar--dense': props.dense,
        'mdc-top-app-bar--short': props.short || props.shortCollapsed,
        'mdc-top-app-bar--short-collapsed': props.shortCollapsed,
        'mdc-top-app-bar--prominent': props.prominent
      })}>
        <div class="mdc-top-app-bar__row">
          <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
            <button class="material-icons mdc-top-app-bar__navigation-icon">
              {(props.navigationButton.path || props.navigationButton.paths) ?
              <m-icon {...props.navigationButton}></m-icon> : props.navigationButton.text}
            </button>
            <span class="mdc-top-app-bar__title">{props.title}</span>
          </section>
          <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end">
            {props.actionItems.map(item =>
              <button class="material-icons mdc-top-app-bar__action-item">
                {(item.path || item.paths) ? <m-icon {...item}></m-icon> : item.text}
              </button>
            )}
          </section>
        </div>
      </header>
    )
  }
}
