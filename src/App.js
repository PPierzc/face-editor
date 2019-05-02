import React from 'react'
import './App.css'
import SelectorCard from './components/SelectorCard'
import { Typography, Button } from '@material-ui/core'

const styles = {
  footer: {
    width: '100%',
    height: '80px',
    background: 'linear-gradient(to right, rgba(255,111,0,1) 31%, rgba(255,147,42,1) 70%, rgba(255,175,75,1) 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}

function App () {
  return (
    <>
      <div style={{
        width: '100%',
        height: '40px',
        padding: 10,
        background: ' linear-gradient(to right, rgba(255,111,0,1) 31%, rgba(255,147,42,1) 70%, rgba(255,175,75,1) 100%)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxSizing: 'border-box'
      }}
      >
        <Typography variant='button' style={{ color: '#ffffff', fontSize: '18px' }}>Neural Face Editor</Typography>
        <Button style={{ color: '#ffffff', fontSize: '15px' }} href={'https://github.com/PPierzc'}>Github</Button>
      </div>
      <div>
        <SelectorCard />
      </div>

      <div style={styles.footer} />
    </>
  )
}

export default App
