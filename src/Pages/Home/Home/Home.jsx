import React from 'react'
import Banner from '../Banner/Banner'
import OurServices from '../OurServices/OurServices'
import SalesTeam from '../SalesTeam/SalesTeam'
import FeatureCards from '../FeatureCards/FeatureCards'

function Home() {
  return (
    <div>
        <Banner/>
        <OurServices/>
        <SalesTeam/>
        <FeatureCards/>
    </div>
  )
}

export default Home