import { useEffect, useState } from 'react'
import bgImage from '../assets/img/number-bg.png'
import closeWhite from '../assets/img/close-white.svg'
import closeBlack from '../assets/img/close-black.svg'

const NumberScreen = ({ toggleScreen, stateOpen }: { toggleScreen: () => void, stateOpen: boolean }) => {

    const nums = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
    const [number, setNumber] = useState('+7(___)___-__-__')
    const [closeBtnHover, setCloseBtnHover] = useState(false)
    const formattedNumber = number.match(/\d/g)
    const [isBtndisabled, setIsBtnDisabled] = useState(true)
    const [activeNum, setActiveNum] = useState(0)

    const typeNumber = (num: string) => {
        if (num === 'Enter') {
            return
        }
        const filteredNum = num.replace(/[^0-9]/g, '_')
        if (num === 'Backspace' && formattedNumber && formattedNumber.length > 1) {
            if (activeNum === 13) {
                setActiveNum(12)
            }
            setIsBtnDisabled(true)

            return setNumber(number.replace(/(\d)(?=[^\d]*$)/, '_'))
        }
        if (filteredNum.length < 2) {
            setNumber(number.replace(/_/, filteredNum))
        }
        acceptNumber()
    }

    const acceptNumber = () => {
        if (!formattedNumber) {
            setIsBtnDisabled(true)
        }

        if (formattedNumber?.length) {
            if (formattedNumber.length < 11) {
                setIsBtnDisabled(true)
            } else {
                setIsBtnDisabled(false)
            }
        }
    }

    useEffect(() => {

        const handleKeyDown = (event: KeyboardEvent) => {

            if (event.key === 'Enter' && activeNum > 0) {
                event.preventDefault()
                if (activeNum === 10 || activeNum === 11) {
                    return setNumber('+7(___)___-__-__')
                }
                if (activeNum === 12) {
                    console.log(activeNum);

                    return typeNumber('0')
                }
                setNumber(number.replace(/_/, String(activeNum)))
            }

            if (event.key === 'Spacebar' || event.key === ' ') {
                event.preventDefault()
            }

            if (event.key === 'Backspace') {
                event.preventDefault()
            }

            if (stateOpen) {
                typeNumber(String(event.key))
                if (event.key === 'ArrowUp' ||
                    event.key === 'ArrowDown' ||
                    event.key === 'ArrowRight' ||
                    event.key === 'ArrowLeft') {
                    if (activeNum === 0) {
                        setActiveNum(activeNum + 1)
                    }
                }

                if (event.key === 'ArrowUp' && activeNum > 3) {
                    setActiveNum(activeNum - 3)
                }

                if (event.key === 'ArrowDown' && activeNum > 0) {
                    setActiveNum(activeNum + 3)

                    if (activeNum > 9 && isBtndisabled) {
                        setActiveNum(activeNum)
                    }

                    if (activeNum > 9 && !isBtndisabled) {
                        setActiveNum(13)
                    }
                }

                if (event.key === 'ArrowLeft' && activeNum > 1
                    && activeNum !== 4
                    && activeNum !== 7
                    && activeNum !== 10
                    && activeNum !== 11
                    && activeNum !== 13) {
                    setActiveNum(activeNum - 1)
                }

                if (event.key === 'ArrowRight'
                    && activeNum !== 3
                    && activeNum !== 6
                    && activeNum !== 9
                    && activeNum !== 12) {
                    setActiveNum(activeNum + 1)

                    if (activeNum === 10) {
                        setActiveNum(activeNum + 2)
                    }
                }

            } else {
                return
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [stateOpen, activeNum, number]);


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
                            <button
                                key={item}
                                onClick={() => typeNumber(item)}
                                className={activeNum === Number(item) ? "screen-number__num screen-number__num_active" : "screen-number__num"}>
                                {item}
                            </button>
                        ))}
                    </div>
                    <div className="screen-number__keyboard-bottom">
                        <button
                            onClick={() => setNumber('+7(___)___-__-__')}
                            className={activeNum === 10 || activeNum === 11 ?
                                "screen-number__num screen-number__clear-btn screen-number__num_active"
                                : "screen-number__num screen-number__clear-btn"}>Стереть</button>
                        <button
                            onClick={() => typeNumber('0')}
                            className={activeNum === 12 ? "screen-number__num screen-number__num_active" : "screen-number__num"}>0</button>
                    </div>
                </div>
                <label className="screen-number__checkbox">
                    <input type="checkbox" />
                    <span className="screen-number__text screen-number__text_checkbox">Согласие на обработку персональных данных</span>
                </label>
                <button
                    disabled={isBtndisabled}
                    onClick={acceptNumber}
                    className={activeNum === 13 && !isBtndisabled ? "button button_active" : "button"}>
                    Подтвердить номер
                </button>
            </div>
        </div>
    )
}

export default NumberScreen
