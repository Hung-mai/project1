import { firebaseApp } from '../components/FirebaseConfig'

// tháng hiện tại 
export const getIncomeCurrentMonth = (month, year) => {
    var items = [];
    let luongThuong = [];
    let tongLuongThuong = 0;
    let troCap = [];
    let tongTroCap = 0;
    let tienLatVat = [];
    let tongTienLatVat = 0;
    firebaseApp.database().ref('/income_transactions').on('value', (dataSnapshot) => {
        dataSnapshot.forEach(snapshot => {
            items.push({
                money: snapshot.val().money,
                date: snapshot.val().date,
                category: snapshot.val().income_category_id,
            })
        })
    })
    //loc theo thang
    items = items.filter(item => {
        return (item.date.split("/")[1] == month && item.date.split("/")[2] == year);
    });
    //loc theo luong thuong
    luongThuong = items.filter(item => {
        return (item.category == "-MKnX5sM74WfTh58Ai8u");
    });
    luongThuong.forEach(item => {
        tongLuongThuong += parseInt(item.money);
    });
    // loc theo tro cap
    troCap = items.filter(item => {
        return (item.category == "-MKnWbiO7A5c0HOyt4sn");
    });
    troCap.forEach(item => {
        tongTroCap += parseInt(item.money);
    });
    // loc theo tien lat vat
    tienLatVat = items.filter(item => {
        return (item.category == "-MKnWeJT5I_ShA56TISN");
    });
    tienLatVat.forEach(item => {
        tongTienLatVat += parseInt(item.money);
    });

    return {  tongLuongThuong,  tongTroCap, tongTienLatVat, month, year};

}

export const getSpendingCurrentMonth = (month, year) => {
    var items = [];

    let anUong = [];
    let giaiTri = [];
    let tiecTung = [];
    let thueNha = [];
    let duLich = [];
    let quaCap = [];
    let muaSam = [];
    let xeCo = [];

    let tonganUong = 0;
    let tonggiaiTri = 0;
    let tongtiecTung = 0;
    let tongthueNha = 0;
    let tongduLich = 0;
    let tongquaCap = 0;
    let tongmuaSam = 0;
    let tongxeCo = 0;
    firebaseApp.database().ref('/spending_transactions').on('value', (dataSnapshot) => {
        dataSnapshot.forEach(snapshot => {
            items.push({
                money: snapshot.val().money,
                date: snapshot.val().date,
                category: snapshot.val().spending_category_id,
            })
        })
    })
    //loc theo thang
    items = items.filter(item => {
        return (item.date.split("/")[1] == month && item.date.split("/")[2] == year);
    });

    //loc theo an uong
    anUong = items.filter(item => {
        return (item.category == "-MKnWtBvYFm-oWKsYL6_");
    });
    anUong.forEach(item => {
        tonganUong += parseInt(item.money);
    });

    // loc theo giai tri
    giaiTri = items.filter(item => {
        return (item.category == "-MKnXMwP056QHMve5U9e");
    });
    giaiTri.forEach(item => {
        tonggiaiTri += parseInt(item.money);
    });

    // loc theo tien tiec tung
    tiecTung = items.filter(item => {
        return (item.category == "-MKnXS5_zSv8d7KP4RSg");
    });
    tiecTung.forEach(item => {
        tongtiecTung += parseInt(item.money);
    });

    // loc theo tien thue nha
    thueNha = items.filter(item => {
        return (item.category == "-MKnX_BwDPoc9eck2Snb");
    });
    thueNha.forEach(item => {
        tongthueNha += parseInt(item.money);
    });

    // loc theo tien du lich
    duLich = items.filter(item => {
        return (item.category == "-MKnYCmHATFzH2ds2igz");
    });
    duLich.forEach(item => {
        tongduLich += parseInt(item.money);
    });

    // loc theo tien qua cap
    quaCap = items.filter(item => {
        return (item.category == "-MKnYMWzK67hzy7X_04k");
    });
    quaCap.forEach(item => {
        tongquaCap += parseInt(item.money);
    });

    // loc theo tien mua sam
    muaSam = items.filter(item => {
        return (item.category == "-MKnip2JOE7CWFntqulR");
    });
    muaSam.forEach(item => {
        tongmuaSam += parseInt(item.money);
    });

    // loc theo tien xe co
    xeCo = items.filter(item => {
        return (item.category == "-MKnjGgXqbEE2oglRqRb");
    });
    xeCo.forEach(item => {
        tongxeCo += parseInt(item.money);
    });

    return {tonganUong , tonggiaiTri , tongtiecTung , tongthueNha , tongduLich , tongquaCap , tongmuaSam , tongxeCo, month, year};
}
// tháng hiện tại