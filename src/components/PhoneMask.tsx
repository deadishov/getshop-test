import React, { useState } from 'react';

function PhoneMask() {
    const [phoneNumber, setPhoneNumber] = useState<string>('+7');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputText = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
        const formattedText = formatPhoneNumber(inputText); // Format the phone number
        setPhoneNumber(`+7(${formattedText.slice(0, 3)})${formattedText.slice(3, 6)}-${formattedText.slice(6, 8)}-${formattedText.slice(8, 10)}`);
    };

    function formatPhoneNumber(phoneNumber: string) {
        return phoneNumber.padEnd(10, '_'); // Pad with underscores to match the desired format
    }

    return (
        <div>
            <input
                type="text"
                placeholder="+7(___)___-__-__"
                value={phoneNumber}
                onChange={handleInputChange}
            />
            <div>{phoneNumber}</div>
        </div>
    );
}

export default PhoneMask;
