import '../../src/top-app-bar/index.tsx'
import '../../src/icon-button/index.tsx'
import '../../src/avatar/index.tsx'
import '../../src/badge/index.tsx'

import { render, WeElement, define, h } from 'omi'

define('my-app', class extends WeElement {
  static css = `
    .mdc-typography--subtitle1 {
      font-size: 1rem;
      line-height: 1.75rem;
      font-weight: 400;
      letter-spacing: .009375em;
    }
    .demos-content-one {
      height: 130px;
      // background: #EEE;
    }
    .demos-content-two {
      height: 80px;
      // background: #EEE;
    }
    .demos-display {
      display: flex;
      flex-wrap: wrap;
      min-height: 200px;
    }
    .demo {
      display: inline-block;
      flex: 1 1 45%;
      justify-content: space-around;
      min-height: 200px;
      // min-width: 400px;
      padding: 15px;
    }
    .iframe {
      width: 100%;
      height: 200px;
    }
  `

  showDemoStart = false

  onDemoStart = e => {
    console.log(e.detail)
    this.showDemoStart = !this.showDemoStart
    this.update()
  }
  
  titleOmi = ' (Omi)'
  
  onMenu = e => {
    console.log(e.detail)
    this.titleOmi = this.titleOmi == '' ? ' (Omi)' : ''
    this.update()
  }

  render() {
    return(
      <div>
        {!this.showDemoStart &&
        <div id='demo-show-button'>
          <m-top-app-bar
            adjust
            heading='Click to show menus'
            navigation='zoom_out_map'
            onNavigation={this.onDemoStart}
            onAction={this.onMenu}
          >
            {/* <navigation>1</navigation>
            <navigation>2</navigation>
            <navigation>3</navigation> */}
            <actionitem>
              <m-avatar icon="person" backgroundColor='#fde3cf' color='#f56a00' />
            </actionitem>
            <actionitem>
              <m-icon-button icons={['favorite', 'favorite_border']}></m-icon-button>
            </actionitem>
            <actionitem>
              <m-badge content="99">
                <m-icon path="M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3 33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8 48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9a127.5 127.5 0 0 1 38.1 91v112.5c.8 9 0 17.9 15 17.9 177.1-59.7 304.6-227 304.6-424.1 0-247.2-200.4-447.3-447.5-447.3z" color="black" />
              </m-badge>
            </actionitem>
          </m-top-app-bar>
        </div>}
        {this.showDemoStart &&
        <div id='demo-start'>
          <m-top-app-bar
            adjust
            heading={'Standard' + this.titleOmi}
            navigation='favorite_border'
            action-items={['favorite', {text: 'Omi'},'favorite']}
            onNavigation={this.onMenu}
            onAction={this.onMenu}
          />
          <div style='height:15px;'></div>
          <m-top-app-bar
            adjust
            fixed
            heading={'Fixed' + this.titleOmi}
            navigation={{
                view: 48,
                path: 'M6 36h36v-4H6v4zm0-10h36v-4H6v4zm0-14v4h36v-4H6z'
            }}
            action-items={['favorite', 'favorite_border', {path: 'M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z'}]}
            onNavigation={this.onMenu}
            onAction={this.onMenu}
          />
          <div style='height:15px;'></div>
          <m-top-app-bar
            adjust
            dense
            fixed
            heading={'Dense + Fixed' + this.titleOmi}
            onNavigation={this.onMenu}
            navigation='favorite'
            onAction0={this.onMenu}
            onAction1={this.onMenu}
            onAction2={this.onMenu}
            onAction3={this.onMenu}
            action-items={[['favorite', 'wifi'], ['favorite', 'favorite_border'], 'wifi', 'favorite_border']}
          />
          <div style='height:15px;'></div>
          <m-top-app-bar
            adjust
            prominent
            fixed
            heading={'Prominent + Fixed' + this.titleOmi}
            onNavigation={this.onMenu}
            navigation={{
              mIcon: {
                view: 48,
                path: 'M6 36h36v-4H6v4zm0-10h36v-4H6v4zm0-14v4h36v-4H6z'
              }
            }}
            onAction0={this.onMenu}
            action-items={[
              {
                mIcon: {
                  view: 48,
                  path: 'M40 10H21.76L20 4H8C5.8 4 4 5.8 4 8v26c0 2.2 1.8 4 4 4h14l2 6h16c2.2 0 4-1.8 4-4V14c0-2.2-1.8-4-4-4zM14.33 29.17c-4.51 0-8.17-3.67-8.17-8.17s3.67-8.17 8.17-8.17c2.08 0 3.97.74 5.47 2.13l.13.13-2.44 2.36-.12-.11c-.57-.54-1.56-1.17-3.04-1.17-2.62 0-4.75 2.17-4.75 4.84s2.13 4.84 4.75 4.84c2.74 0 3.93-1.75 4.25-2.92h-4.42v-3.1h7.9l.03.14c.08.42.11.79.11 1.21-.01 4.71-3.24 7.99-7.87 7.99zm12.07-3.4c.67 1.2 1.48 2.35 2.38 3.4l-1.07 1.06-1.31-4.46zm1.54-1.54h-1.98l-.61-2.08h7.99s-.68 2.63-3.12 5.47c-1.07-1.23-1.81-2.43-2.28-3.39zM42 40c0 1.1-.9 2-2 2H26l4-4-1.63-5.53 1.84-1.84L35.58 36l1.46-1.46-5.41-5.37c1.8-2.07 3.2-4.5 3.83-7.01H38v-2.08h-7.27V18h-2.08v2.08h-3.92L22.35 12H40c1.1 0 2 .9 2 2v26z'
                }
              }
            ]}
          />
          <div style='height:15px;'></div>
          <m-top-app-bar
            adjust
            prominent
            dense
            fixed
            heading={'Prominent + Dense + Fixed' + this.titleOmi}
            onNavigation={this.onMenu}
            navigation={{
              mIcon: {
                view: 48,
                path: 'M6 36h36v-4H6v4zm0-10h36v-4H6v4zm0-14v4h36v-4H6z'
              }
            }}
            onAction0={this.onMenu}
            action-items='favorite'
          />
          <div style='height:15px;'></div>
          <m-top-app-bar
            adjust
            fixed
            heading='Click to hide menus'
            onNavigation={this.onDemoStart}
            navigation={{
              mIcon: {
                view: 24,
                path: 'M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z'
              }
            }}
            onAction0={this.onDemoStart}
            onAction1={this.onDemoStart}
            onAction2={this.onDemoStart}
            onAction3={this.onDemoStart}
            onAction4={this.onDemoStart}
            onAction5={this.onDemoStart}
            onAction6={this.onDemoStart}
            onAction7={this.onDemoStart}
            action-items={[
              {
                mIcon: {
                  view: 24,
                  path: 'M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z'
                }
              }, {
                mIcon: {
                  view: 24,
                  path: 'M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z'
                }
              }, {
                mIcon: {
                  view: 24,
                  path: 'M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z'
                }
              }, {
                mIcon: {
                  view: 24,
                  path: 'M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z'
                }
              }, {
                mIcon: {
                  view: 24,
                  path: 'M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z'
                }
              }, {
                mIcon: {
                  view: 24,
                  path: 'M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z'
                }
              }, {
                mIcon: {
                  view: 24,
                  path: 'M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z'
                }
              }, {
                mIcon: {
                  view: 24,
                  path: 'M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z'
                }
              }
            ]}
          />
          <div style='height:15px;'></div>
          <m-top-app-bar
            css={`
              .mdc-top-app-bar { 
                position: static;
              }
            `}
            adjust
            shortCollapsed
            heading={'Short - Always Collapsed' + this.titleOmi}
            onNavigation={this.onMenu}
            navigation={{
              mIcon: {
                view: 48,
                path: 'M6 36h36v-4H6v4zm0-10h36v-4H6v4zm0-14v4h36v-4H6z'
              }
            }}
            onAction0={this.onMenu}
            action-items='favorite'
          />
          <m-top-app-bar
            css={`
              .mdc-top-app-bar { 
                position: static;
                margin-top: -40px;
              }
            `}
            adjust
            short
            heading={'Short' + this.titleOmi}
            onNavigation={this.onMenu}
            navigation={{
              mIcon: {
                view: 48,
                path: 'M6 36h36v-4H6v4zm0-10h36v-4H6v4zm0-14v4h36v-4H6z'
              }
            }}
            onAction0={this.onMenu}
            action-items='favorite'
          />
          <m-top-app-bar
            css={`
              .mdc-top-app-bar { 
                position: static;
                margin-top: -40px;
              }
            `}
            adjust
            short
            dense
            heading={'Short + Dense' + this.titleOmi}
            onNavigation={this.onMenu}
            navigation={{
              mIcon: {
                view: 48,
                path: 'M6 36h36v-4H6v4zm0-10h36v-4H6v4zm0-14v4h36v-4H6z'
              }
            }}
            onAction0={this.onMenu}
            action-items='favorite'
          />
        </div>}
        <div id='demo-build' class='demos-display'>
          <div class='demo'>
            <div>
              <a href='./index-standard.script.html' target='_blank'>
                <h3 class='mdc-typography--subtitle1'>Standard</h3>
              </a>
            </div>
            <div>
              <div>
                <iframe class='iframe' src='./index-standard.script.html'></iframe>
              </div>
            </div>
          </div>
          <div class='demo'>
            <div>
              <a href='./index-fixed.script.html' target='_blank'>
                <h3 class='mdc-typography--subtitle1'>Fixed</h3>
              </a>
            </div>
            <div>
              <iframe class='iframe' src='./index-fixed.script.html'></iframe>
            </div>
          </div>
          <div class='demo'>
            <div>
              <a href='./index-dense.script.html' target='_blank'>
                <h3 class='mdc-typography--subtitle1'>Dense</h3>
              </a>
            </div>
            <div>
              <iframe class='iframe' src='./index-dense.script.html'></iframe>
            </div>
          </div>
          <div class='demo'>
            <div>
              <a href='./index-dense-fixed.script.html' target='_blank'>
                <h3 class='mdc-typography--subtitle1'>Dense + Fixed</h3>
              </a>
            </div>
            <div>
              <iframe class='iframe' src='./index-dense-fixed.script.html'></iframe>
            </div>
          </div>
          <div class='demo'>
            <div>
              <a href='./index-prominent.script.html' target='_blank'>
                <h3 class='mdc-typography--subtitle1'>Prominent</h3>
              </a>
            </div>
            <div>
              <iframe class='iframe' src='./index-prominent.script.html'></iframe>
            </div>
          </div>
          <div class='demo'>
            <div>
              <a href='./index-prominent-dense.script.html' target='_blank'>
                <h3 class='mdc-typography--subtitle1'>Prominent + Dense</h3>
              </a>
            </div>
            <div>
              <iframe class='iframe' src='./index-prominent-dense.script.html'></iframe>
            </div>
          </div>
          <div class='demo'>
            <div>
              <a href='./index-short.script.html' target='_blank'>
                <h3 class='mdc-typography--subtitle1'>Short</h3>
              </a>
            </div>
            <div>
              <iframe class='iframe' src='./index-short.script.html'></iframe>
            </div>
          </div>
          <div class='demo'>
            <div>
              <a href='./index-short-collapsed.script.html' target='_blank'>
                <h3 class='mdc-typography--subtitle1'>Short - Always Collapsed</h3>
              </a>
            </div>
            <div>
              <iframe class='iframe' src='./index-short-collapsed.script.html'></iframe>
            </div>
          </div>
          <div style='width:100%;height:500px;background:#EEE;'></div>
        </div>
      </div>
    )
  }
})
  
render(<my-app />, 'body')