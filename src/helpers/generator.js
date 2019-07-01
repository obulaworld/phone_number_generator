 const generateNumber = (minimum, maximum) => {
        const randomNumber = Math.floor(Math.random() * (maximum - minimum) + minimum);
        const generatedphoneNumber = `0${randomNumber}`;
        return generatedphoneNumber;
 }

 export default generateNumber;