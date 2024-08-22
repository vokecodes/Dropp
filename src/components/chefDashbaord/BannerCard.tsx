import React from 'react'
import { DashboardBannerCardProps } from '../../utils/Interfaces'


const BannerCard = ({ backgroundImage, text1, text2, text3 }: DashboardBannerCardProps) => {
    return (

        <div>
            <p>{text1}</p>
            <p>{text2}</p>
            <p>{text3}</p>
        </div> 



    )
}

export default BannerCard