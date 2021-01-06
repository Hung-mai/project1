export const getMonthAndYear = (month, year) => {
    let monthToGet = (month+11)%12+1;
    if(month <= 0) {
        let yearToGet = year -1;
        return [monthToGet, yearToGet];
    } else{
        return [monthToGet, year];
    }
}