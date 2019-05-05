# Neural Face Editor
A face editor based on a Artificial Neural Network.

<img src="" />

*[Demo](https://nervous-austin-615801.netlify.com) works best on desktop!*

## Architecture
Built using an autoencoder, with the following architecture.

Then the model was split into the encoder and decoder.
For the client app only the decoder is served.
The inputs are transformed using PCA in order to extract high variance explaining components.
As a result sliders have been created that change the values in the PCA components.
Hence a very basic editor has been created.

## Training Data
For training data from [Data](https://data.vision.ee.ethz.ch/cvl/rrothe/imdb-wiki/)
```
Rasmus Rothe and Radu Timofte and Luc Van Gool.
Deep expectation of real and apparent age from a single image without facial landmarks.
International Journal of Computer Vision (IJCV)
July 2016
```
```
Rasmus Rothe, Radu Timofte, and Luc Van Gool.
Dex: Deep expectation of apparent agefrom a single image.
InIEEE International Conference on Computer Vision Workshops(ICCVW),
December 2015.
```

Data required some preprocessing to unify image dimension and image quality.
OpenCV was used to detect faces and extract images with faces in them.

## Technology
- The neural network was trained using **Keras**.
- Client side serving of the network is handled by **Tensorflow.js**
- The app is built using **React.js**.
  
