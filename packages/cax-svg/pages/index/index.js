import cax, { html, SVG } from '../../cax/index'

Page({
  onLoad: function (options) {
    const info = wx.getSystemInfoSync()
    const stage = new cax.Stage(info.windowWidth, info.windowHeight / 2, 'myCanvas', this)



    const rect = new SVG(html`
    <svg>
      <rect x="10" y="10" height="100" width="100"
            style="stroke:#ff0000; fill: #0000ff"/>
    </svg>`)

    stage.add(rect)

    const circle = new SVG(html`
    <svg >
      <circle cx="140" cy="40" r="24" style="stroke:#006600; fill:#00cc00"/>
      <ellipse cx="240" cy="40" rx="30" ry="15"
      style="stroke:#006600; fill:#00cc00"/>
    </svg>`)
    stage.add(circle)
    const lines = new SVG(html`
    <svg x="100" y="100"> 
      <line x1="0"  y1="10" x2="0" y2="100" style="stroke:#006600;"/>
      <line x1="10" y1="10" x2="100" y2="100" style="stroke:#006600;"/>
      <line x1="20" y1="10" x2="100" y2="50"  style="stroke:#006600;"/>
      <line x1="30" y1="10" x2="110" y2="10"  style="stroke:#006600;"/>
    </svg>
        `)
    stage.add(lines)
    

    const polyline = new SVG(html`
    <svg x="100" y="100"> 
    <polyline points="0,0  30,0  15,30"
    style="stroke:#006600;"/>

    <polyline points="30,2  80,2  55,52"
    style="stroke:#006600; stroke-width: 4;
           fill: #33cc33;"/>


    <polyline points="110,2  160,2  135,52  110,2"
    style="stroke:#006600; fill: #33cc33;"/>
    </svg>
        `)
    stage.add(polyline)
    
    stage.update()


    // const rect = new cax.Rect(100, 100, {
    //   fillStyle: 'black'
    // })

    // rect.originX = 50
    // rect.originY = 50
    // rect.x = 100
    // rect.y = 100
    // rect.rotation = 30

    // rect.on('touchstart', () => {
    //   console.log('rect touchstart')
    // })

    // rect.on('touchmove', () => {
    //   console.log('rect touchmove')
    // })

    // rect.on('touchend', () => {
    //   console.log('rect touchend')
    // })

    // rect.on('tap', () => {
    //   console.log('rect tap')
    // })


    // stage.add(rect)


    // cax.To.get(rect).to().x(200, 2000, cax.easing.elasticInOut).start()




    // setInterval(function () {
    //   rect.rotation++
    //   stage.update()
    // }, 16)

  }
})
