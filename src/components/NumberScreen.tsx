import { useState } from 'react'
import bgImage from '../assets/img/number-bg.png'
import closeWhite from '../assets/img/close-white.svg'
import closeBlack from '../assets/img/close-black.svg'

const NumberScreen = ({ toggleScreen, stateOpen }: { toggleScreen: () => void, stateOpen: boolean }) => {

    const nums = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
    const [number, setNumber] = useState('+7(___)___-__-__')
    const [closeBtnHover, setCloseBtnHover] = useState(false)

    const typeNumber = (num: string) => {
        setNumber(number.replace(/_/, num))
        number.replace(/\D/g, '');
    }

    const acceptNumber = () => {
        const formattedNumber = number.match(/\d/g)

        console.log(formattedNumber?.length);


        if (formattedNumber?.length) {
            if (formattedNumber.length < 10) {
                setNumber(number.replace(/_/g, '0'))
            }
        }
    }

    return (
        <div className={stateOpen ? 'screen-number screen-number_open' : 'screen-number'}>
            <img onMouseEnter={() => setCloseBtnHover(true)}
                onMouseLeave={() => setCloseBtnHover(false)}
                onClick={toggleScreen}
                src={closeBtnHover ? closeBlack : closeWhite}
                alt=""
                className="screen-number__close-btn" />
            <img src={bgImage} alt="background-img" />
            <div className="screen-number__window">
                <p className="screen-number__title">Введите ваш номер
                    мобильного телефона</p>
                <div style={number.charAt(3) === '_' ? { letterSpacing: 2 } : { letterSpacing: 0 }} className="screen-number__phone">{number}</div>
                <p className="screen-number__text">и с Вами свяжется наш менеждер для дальнейшей консультации</p>
                <div className="screen-number__keyboard">
                    <div className="screen-number__nums">
                        {nums.map((item) => (
                            <button key={item} onClick={() => typeNumber(item)} className="screen-number__num">{item}</button>
                        ))}
                    </div>
                    <div className="screen-number__keyboard-bottom">
                        <button onClick={() => setNumber('+7(___)___-__-__')} className="screen-number__num screen-number__clear-btn">Стереть</button>
                        <button onClick={() => typeNumber('0')} className="screen-number__num">0</button>
                    </div>
                </div>
                <label className="screen-number__checkbox">
                    <input type="checkbox" />
                    <span className="screen-number__text screen-number__text_checkbox">Согласие на обработку персональных данных</span>
                </label>
                <button onClick={acceptNumber} className="button">Подтвердить номер</button>
            </div>
        </div>
    )
}

export default NumberScreen
