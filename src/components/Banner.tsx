import React from 'react'
import qrCode from '../assets/img/qr-code.png'

const Banner = ({ toggleScreen, bannerState }: { toggleScreen: () => void, bannerState: boolean }) => {
    return (
        <div className={bannerState ? "screen__banner screen__banner_open" : "screen__banner"}>
            <p className="screen__banner-title">ИСПОЛНИТЕ МЕЧТУ ВАШЕГО МАЛЫША! <br />
                ПОДАРИТЕ ЕМУ СОБАКУ!</p>
            <img src={qrCode} alt="" />
            <p className="screen__banner-text">Сканируйте QR-код <br />
                или нажмите ОК</p>
            <button onClick={toggleScreen} className="screen__banner-button button">OK</button>
        </div>
    )
}

export default Banner
