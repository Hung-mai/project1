import { firebaseApp } from '../components/FirebaseConfig'
// tháng hiện tại
export const getIncomeCurrentMonth = (month, year) => {
    var items = [];
    var total = 0;
    firebaseApp.database().ref('/income_transactions').on('value', (dataSnapshot) => {
        dataSnapshot.forEach(snapshot => {
            items.push({
                money: snapshot.val().money,
                date: snapshot.val().date
            })
        })
    })
    items = items.filter(item => {
        return (item.date.split("/")[1] == month && item.date.split("/")[2] == year);
    });
    items.forEach(item => {
        total += parseInt(item.money);
    })

    return {total, month, year};
}
export const getSpendingCurrentMonth = (month, year) => {
    var items = [];
    var total = 0;
    firebaseApp.database().ref('/spending_transactions').on('value', (dataSnapshot) => {
        dataSnapshot.forEach(snapshot => {
            items.push({
                money: snapshot.val().money,
                date: snapshot.val().date
            })
        })
    })
    items = items.filter(item => {
        return (item.date.split("/")[1] == month && item.date.split("/")[2] == year);
    });
    items.forEach(item => {
        total += parseInt(item.money);
    })

    return {total, month, year};
}
// tháng hiện tại