import { firebaseApp } from '../components/FirebaseConfig'

export const recurringIncome = () => {
    let listRecurringIncome = [];
    let result = false ;
    firebaseApp.database().ref('/income_recurring_transactions').on('value', dataSnapshot => {
        dataSnapshot.forEach(snapshot => {
            listRecurringIncome.push({
                id: snapshot.key,
                income_category_id: snapshot.val().income_category_id,
                date: snapshot.val().date,
                money: snapshot.val().money,
                traded_month: snapshot.val().traded_month,
            })
        })
    })
    // check xem có đến ngày định kỳ chưa
    listRecurringIncome.forEach(item => {
        if(item.date <= new Date().getDate() && (item.traded_month+1)%12 == new Date().getMonth()){
            // nếu đến hoặc quá ngày định kỳ của tháng đó thì tạo 1 giao dịch
            firebaseApp.database().ref('/income_transactions').push({
                date: item.date + '/' + (new Date().getMonth() + 1) + '/' + new Date().getFullYear(),
                money: item.money,
                user_id: 1,
                income_category_id: item.income_category_id
            })

            var tien;
            firebaseApp.database().ref('/user').on("value", snapshot => {
                tien = snapshot.val().wallet

            })
            tien = parseInt(tien) + parseInt(item.money);

            firebaseApp.database().ref('user').set({
                id: 1,
                name: 'hung',
                wallet: tien,
            });

            firebaseApp.database().ref('income_recurring_transactions').child(item.id).update({
                traded_month: item.traded_month+1
            });

            result = true;
        }
    })

    return result;

}


export const recurringSpending = () => {
    let listRecurringSpending = [];
    let result = false ;
    firebaseApp.database().ref('/spending_recurring_transactions').on('value', dataSnapshot => {
        dataSnapshot.forEach(snapshot => {
            listRecurringSpending.push({
                id: snapshot.key,
                spending_category_id: snapshot.val().spending_category_id,
                date: snapshot.val().date,
                money: snapshot.val().money,
                traded_month: snapshot.val().traded_month,
            })
        })
    })
    // check xem có đến ngày định kỳ chưa
    listRecurringSpending.forEach(item => {
        if(item.date <= new Date().getDate() && (item.traded_month+1)%12 == new Date().getMonth()){
            // nếu đến hoặc quá ngày định kỳ của tháng đó thì tạo 1 giao dịch
            firebaseApp.database().ref('/spending_transactions').push({
                date: item.date + '/' + (new Date().getMonth() + 1) + '/' + new Date().getFullYear(),
                money: item.money,
                user_id: 1,
                spending_category_id: item.spending_category_id
            })

            var tien;
            firebaseApp.database().ref('/user').on("value", snapshot => {
                tien = snapshot.val().wallet

            })
            tien = parseInt(tien) + parseInt(item.money);

            firebaseApp.database().ref('user').set({
                id: 1,
                name: 'hung',
                wallet: tien,
            });

            console.log(item.key);

            firebaseApp.database().ref('spending_recurring_transactions').child(item.id).update({
                traded_month: item.traded_month+1
            });

            result = true;
        }
    })

    return result;

}