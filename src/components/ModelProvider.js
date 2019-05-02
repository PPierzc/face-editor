import React, { useState, useEffect } from 'react'
import * as tf from '@tensorflow/tfjs'

const loadModel = (setter) => {
  console.log('Model Loading')
  tf.loadLayersModel('/decoder_v3/model.json')
    .then(model => {
      setter(model)
      console.log('Model Loaded')
    })
}

const ModelProvider = ({ children }) => {
  const [model, setModel] = useState()

  useEffect(() => loadModel(setModel), [])

  return (
    <div>
      {React.Children && React.Children.map(children, child => React.cloneElement(child, {
        model: model,
        ...child.props
      }))
      }
    </div>
  )
}

export default ModelProvider
