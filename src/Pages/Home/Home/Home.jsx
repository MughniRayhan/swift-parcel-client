import React from 'react'
import Banner from '../Banner/Banner'
import OurServices from '../OurServices/OurServices'
import SalesTeam from '../SalesTeam/SalesTeam'
import FeatureCards from '../FeatureCards/FeatureCards'
import MerchantBe from '../MerchantBe/MerchantBe'

function Home() {
  return (
    <div>
        <Banner/>
        <OurServices/>
        <SalesTeam/>
        <FeatureCards/>
        <MerchantBe/>
    </div>
  )
}

export default Home