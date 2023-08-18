import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

const Index = ({ children }) => {
  return (
    <div>
      <Header></Header>
      <main>
        {children}
      </main>
      <Footer/>

    </div>
  )
}

export default Index
