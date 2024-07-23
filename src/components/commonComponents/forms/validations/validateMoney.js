function validateMoney(money){
    const regex = /^\$\d+/
    return regex.test(money)
}
export default validateMoney