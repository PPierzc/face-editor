import React from 'react'

class Image extends React.Component {
  componentDidMount () {
    document.createElement('canvas')
  }

  componentDidUpdate (prevPros) {
    if (prevPros.input !== this.props.input || prevPros.model !== this.props.model) {
      if (this.props.model) {
        const prediction = this.props.model.predict(this.props.input)
        const predictionData = prediction.dataSync()
        const max = predictionData.reduce((res, cur) => res < cur ? cur : res, -Infinity)
        const min = predictionData.reduce((res, cur) => res > cur ? cur : res, Infinity)

        const arr = new Uint8ClampedArray(256 * 256 * 4)
        // Iterate through every pixel

        let pos = 0
        for (let i = 0; i < arr.length; i += 4) {
          arr[i] = (predictionData[pos] - min) / max * 255 // R value
          arr[i + 1] = (predictionData[pos + 1] - min) / max * 255 // G value
          arr[i + 2] = (predictionData[pos + 2] - min) / max * 255 // B value
          arr[i + 3] = 255 // A value
          pos += 3
        }

        // Initialize a new ImageData object
        const image = new ImageData(arr, 256, 256)

        const context = this.refs.canvas.getContext('2d')
        context.putImageData(image, 0, 0)
      }
    }
  }

  render () {
    return (
      <div style={{
        border: '4px solid #fff',
        width: 256,
        height: 256,
        boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)'
      }}>
        <canvas ref='canvas' width='256' height='256' style={{ backgroundColor: '#fff' }} />
      </div>
    )
  }
}

export default Image
