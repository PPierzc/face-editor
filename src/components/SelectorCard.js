import React from 'react'
import * as tf from '@tensorflow/tfjs'

import { Card, CardContent, Typography, Button } from '@material-ui/core'
import Slider from '@material-ui/lab/Slider'
import { PCA } from 'ml-pca'
import { Matrix } from 'ml-matrix'

import Image from './Image'
import ModelProvider from './ModelProvider'

import encoded from '../encoded'

const invert = (pca, dataset) => {
  dataset = Matrix.checkMatrix(dataset)

  const inverse = dataset.mmul(pca.U.transpose())

  if (pca.center) {
    if (pca.scale) {
      inverse.mulRowVector(pca.stdevs)
    }
    inverse.addRowVector(pca.means)
  }

  return inverse
}

const normComponents = (mu, std) => (v, key) => {
  const norm = (v - mu[key]) / (3 * std[key])
  const trans = (norm + 1) * 50
  return trans
}

const invNormComponents = (mu, std) => (v, key) => {
  const trans = v / 50 - 1
  const norm = trans * (3 * std[key]) + mu[key]
  return norm
}

class SelectorCard extends React.Component {
  constructor (props) {
    super(props)

    const pca = new PCA(encoded.X)
    const std = pca.getStandardDeviations()

    const baseId = (Math.random() * 1000).toFixed(0)

    const baseImage = encoded.X[baseId]
    const imgPCA = pca.predict([baseImage])
    const mu = imgPCA.data[0]

    const components = imgPCA.data[0].map(normComponents(mu, std))
    const invComponents = components.map(invNormComponents(mu, std))

    const recon = invert(pca, [invComponents]).data

    this.state = {
      input: components,
      _i: tf.tensor([recon]),
      pca,
      mu,
      std,
      baseId
    }

    this.updateInput = this.updateInput.bind(this)
    this.updateI = this.updateI.bind(this)
    this.randomizeImage = this.randomizeImage.bind(this)
    this.resetImage = this.resetImage.bind(this)
  }

  randomizeImage () {
    const {
      pca,
      std
    } = this.state

    const baseId = (Math.random() * 4000).toFixed(0)
    const baseImage = encoded.X[baseId]

    const imgPCA = pca.predict([baseImage])
    const mu = imgPCA.data[0]

    const components = imgPCA.data[0].map(normComponents(mu, std))

    this.setState({
      input: components,
      _i: tf.tensor([[baseImage]]),
      baseId,
      mu
    })
  }

  resetImage () {
    const {
      pca,
      mu,
      std,
      baseId
    } = this.state

    const baseImage = encoded.X[baseId]

    const imgPCA = pca.predict([baseImage])

    const components = imgPCA.data[0].map(normComponents(mu, std))

    this.setState({
      input: components,
      _i: tf.tensor([[baseImage]]),
      baseId
    })
  }

  updateInput (input, key) {
    return (event, value) => {
      input[key] = value
      this.setState({
        input
      })
    }
  }

  updateI (input) {
    const {
      pca,
      mu,
      std
    } = this.state

    const invComponents = input.map(invNormComponents(mu, std))

    const recon = invert(pca, [invComponents]).data
    return () => {
      this.setState({
        _i: tf.tensor([recon])
      })
    }
  }

  render () {
    const sliderOptions = [
      'background color',
      'shirt color',
      'face color',
      'vertical lighting',
      'Redness',
      'vertical lighting',
      'background lighting',
      'center lighting',
      'face ilumination',
      'face vibrance',
      'hair shading',
      'makeup',
      'direction of looking',
      'hair thickness',
      'angular lighting',
      'vertical lighting',
      'horizontal lighting',
      'horizontal lighting',
      'face shading',
      'eye shape',
      'eye openness',
      'eye shadow'
    ]
    return (
      <div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{
            padding: 30,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(to right, rgba(255,111,0,1) 31%, rgba(255,147,42,1) 70%, rgba(255,175,75,1) 100%)'
          }}>
            <ModelProvider>
              <Image input={this.state._i} />
            </ModelProvider>
            <Button
              onClick={this.randomizeImage}
              color={'secondary'}
              variant={'contained'}
              style={{ marginTop: 30 }}
            >
              Randomize
            </Button>
            <Button
              onClick={this.resetImage}
              color={'primary'}
              variant={'contained'}
              style={{ marginTop: 30 }}
            >
              Reset
            </Button>
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 30,
            marginBottom: 30
          }}>
            {Array(sliderOptions.length).fill(1).map((v, key) => (
              <>
                <div style={{ width: '100%' }}>
                  <Typography variant={'button'} style={{
                    marginRight: 10,
                    marginLeft: 10,
                    float: 'left',
                    fontSize: 12,
                    color: '#7e7e7e'
                  }}>
                    {sliderOptions[key]}
                  </Typography>
                </div>
                <div style={{
                  height: 50,
                  width: '100%',
                  maxWidth: 350,
                  marginBottom: 20,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <Typography style={{ marginRight: 10, marginLeft: 10 }}>Less</Typography>
                  <Slider
                    value={this.state.input[key]}
                    style={{ width: '50%', maxWidth: 200 }}
                    onChange={this.updateInput(this.state.input, key)}
                    onDragEnd={this.updateI(this.state.input)}
                  />
                  <Typography style={{ marginRight: 10, marginLeft: 10 }}>More</Typography>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default SelectorCard
