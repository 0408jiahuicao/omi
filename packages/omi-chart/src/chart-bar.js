import { WeElement, h, define } from Omi

define('chart-bar', class extends WeElement {
  installed() {
    this.chart = new Chart(this.canvas.getContext('2d'), {
      type: 'bar',
      data: this.props.data,
      options: this.props.options
    })
  }

  receiveProps(props) {
    this.chart.data = props.data
    this.chart.options = props.options
    this.chart.update()
  }

  render(props) {
    return (
      <div style={{ width: props.width + 'px', height: props.height + 'px' }}>
        <canvas ref={(e) => { this.canvas = e }}>
        </canvas>
      </div>
    )
  }
})
