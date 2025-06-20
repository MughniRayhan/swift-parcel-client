import React from 'react'
import Banner from '../Banner/Banner'
import OurServices from '../OurServices/OurServices'
import SalesTeam from '../SalesTeam/SalesTeam'
import FeatureCards from '../FeatureCards/FeatureCards'
import MerchantBe from '../MerchantBe/MerchantBe'
import HowItWorks from '../HowItWorks/HowItWorks'
import Faq from '../FAQ/Faq'

function Home() {
  return (
    <div>
        <Banner/>
        <HowItWorks/>
        <OurServices/>
        <SalesTeam/>
        <FeatureCards/>
        <MerchantBe/>
        <Faq/>
    </div>
  )
}

export default Home