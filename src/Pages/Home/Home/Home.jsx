import React from 'react'
import Banner from '../Banner/Banner'
import OurServices from '../OurServices/OurServices'
import SalesTeam from '../SalesTeam/SalesTeam'
import FeatureCards from '../FeatureCards/FeatureCards'
import MerchantBe from '../MerchantBe/MerchantBe'
import HowItWorks from '../HowItWorks/HowItWorks'

function Home() {
  return (
    <div>
        <Banner/>
        <HowItWorks/>
        <OurServices/>
        <SalesTeam/>
        <FeatureCards/>
        <MerchantBe/>
    </div>
  )
}

export default Home