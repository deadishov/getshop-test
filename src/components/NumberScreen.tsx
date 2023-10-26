import { useEffect, useState } from 'react'
import bgImage from '../assets/img/number-bg.png'
import closeWhite from '../assets/img/close-white.svg'
import closeBlack from '../assets/img/close-black.svg'

const NumberScreen = ({ toggleScreen, stateOpen }: { toggleScreen: () => void, stateOpen: boolean }) => {

    const nums = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
    const [number, setNumber] = useState('+7(___)___-__-__')
    const [closeBtnHover, setCloseBtnHover] = useState(false)
    const formattedNumber = number.match(/\d/g)
    const [isBtnDisabled, setIsBtnDisabled] = useState(true)
    const [activeNum, setActiveNum] = useState(0)
    const [agree, setAgree] = useState(false)
    const [final, setFinal] = useState(false)

    const typeNumber = (num: string) => {
        if (num === 'Enter') {
            return;
        }
        const filteredNum = num.replace(/[^0-9]/g, '_');
        const updatedNumber = number.replace(/_/, filteredNum);

        if (num === 'Backspace' && formattedNumber && formattedNumber.length > 1) {
            setIsBtnDisabled(true);
            if (activeNum === 13) {
                setActiveNum(12);
            }
            setNumber(number.replace(/(\d)(?=[^\d]*$)/, '_'));
            acceptNumber(number.replace(/(\d)(?=[^\d]*$)/, '_'));
            return;
        }

        if (filteredNum.length < 2) {
            setNumber(updatedNumber);
        }

        acceptNumber(updatedNumber);
    }

    const toggleAgree = () => {
        setAgree(prev => !prev)
        const updatedFormattedNumber = number.match(/\d/g);

        if (updatedFormattedNumber && updatedFormattedNumber.length > 10) {
            setIsBtnDisabled(false);
        }
    }

    const acceptNumber = (updatedNumber: string) => {
        setIsBtnDisabled(true);

        const updatedFormattedNumber = updatedNumber.match(/\d/g);
        if (updatedFormattedNumber?.length) {
            if (updatedFormattedNumber.length < 11) {
                setIsBtnDisabled(true);
            }
            if (updatedFormattedNumber.length > 10 && agree) {
                setIsBtnDisabled(false);
            }
        }
    }

    const sendNumber = () => {
        setFinal(true)

        const timeout = setTimeout(() => {
            setFinal(false)
            resetAll()

        }, 3000)

        return () => clearTimeout(timeout)
    }

    const resetAll = () => {
        setNumber('+7(___)___-__-__')
        setAgree(false)
        setActiveNum(0)
    }

    useEffect(() => {
        acceptNumber(number);
    }, [number, agree, isBtnDisabled]);

    useEffect(() => {

        const handleKeyDown = (event: KeyboardEvent) => {

            if (event.key === 'Enter' && activeNum > 0) {
                event.preventDefault()
                if (activeNum === 10 || activeNum === 11) {
                    return setNumber('+7(___)___-__-__')
                }
                if (activeNum === 12) {

                    return typeNumber('0')
                }
                if (activeNum === 13) {
                    sendNumber()
                }
                if (activeNum === 14) {
                    return toggleScreen()
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

                if (event.key === 'ArrowDown' && activeNum > 0 && activeNum !== 13) {
                    setActiveNum(activeNum + 3)

                    if (activeNum === 10 || activeNum === 11 || activeNum === 12) {

                        if (isBtnDisabled) {
                            setActiveNum(activeNum)
                        }
                        if (!isBtnDisabled) {
                            setActiveNum(13)
                        }
                    }
                }

                if (event.key === 'ArrowLeft' && activeNum > 1
                    && activeNum !== 4
                    && activeNum !== 7
                    && activeNum !== 10
                    && activeNum !== 11
                    && activeNum !== 13) {
                    setActiveNum(activeNum - 1)

                    if (activeNum === 14) {
                        setActiveNum(3)
                    }
                }

                if (event.key === 'ArrowRight') {
                    setActiveNum(activeNum + 1)

                    if (activeNum === 3
                        || activeNum === 6
                        || activeNum === 9
                        || activeNum === 12) {
                        setActiveNum(14)
                    }

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
    }, [stateOpen, activeNum, number, toggleAgree]);

    useEffect(() => {
        let timerId: NodeJS.Timeout | undefined;


        const startTimer = () => {
            timerId = setTimeout(() => {
                toggleScreen();
                resetAll()
            }, 10000);
        };

        const handleUserActions = () => {
            clearTimeout(timerId);
            startTimer();
        };

        if (stateOpen) {
            startTimer();

            document.addEventListener('mousemove', handleUserActions);
            document.addEventListener('keydown', handleUserActions)
        } else {
            clearTimeout(timerId);
            document.removeEventListener('mousemove', handleUserActions);
            document.removeEventListener('keydown', handleUserActions)
        }

        return () => {
            document.removeEventListener('mousemove', handleUserActions);
            document.removeEventListener('keydown', handleUserActions);
        };
    }, [stateOpen, toggleScreen]);


    return (
        <div className={stateOpen ? 'screen-number screen-number_open' : 'screen-number'}>
            <img onMouseEnter={() => setCloseBtnHover(true)}
                onMouseLeave={() => setCloseBtnHover(false)}
                onClick={() => {
                    toggleScreen()
                    resetAll()
                }}
                src={closeBtnHover || activeNum === 14 ? closeBlack : closeWhite}
                alt=""
                className="screen-number__close-btn" />
            <img src={bgImage} alt="background-img" />
            <div className="screen-number__window">
                {final ?
                    <div className="screen-number__final">
                        <h3 className="screen-number__final-title">ЗАЯВКА ПРИНЯТА</h3>
                        <p className="screen-number__final-text">Держите телефон под рукой. Скоро с Вами свяжется наш менеджер. </p>
                    </div> :
                    <>
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
                            <input onChange={toggleAgree} type="checkbox" />
                            <span className="screen-number__text screen-number__text_checkbox">Согласие на обработку персональных данных</span>
                        </label>
                        <button
                            onClick={sendNumber}
                            disabled={isBtnDisabled}
                            className={activeNum === 13 && !isBtnDisabled ? "button button_active" : "button"}>
                            Подтвердить номер
                        </button>
                    </>
                }
            </div>
        </div>
    )
}

export default NumberScreen
