google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawPie);

function drawPie(){

    var jsonData = $.ajax({
        url : 'https://api.kawalcorona.com/indonesia/provinsi/',
        method : 'GET',
        dataType : 'JSON',
        async : false
    });

    jsonData = jsonData.responseJSON;

    var others = 0;
    for (i=4; i<jsonData.length;i++){
        others += jsonData[i].attributes.Kasus_Posi;
    }

    var data = google.visualization.arrayToDataTable([
        ['Provinsi','Jumlah Positif'],
        [jsonData[0].attributes.Provinsi,jsonData[0].attributes.Kasus_Posi],
        [jsonData[1].attributes.Provinsi,jsonData[1].attributes.Kasus_Posi],
        [jsonData[2].attributes.Provinsi,jsonData[2].attributes.Kasus_Posi],
        [jsonData[3].attributes.Provinsi,jsonData[3].attributes.Kasus_Posi],
        [jsonData[4].attributes.Provinsi,jsonData[4].attributes.Kasus_Posi],
        ['lainnya',others]
    ]);
    // var options ={
    //     is3D:true
    // }
    var chart = new google.visualization.PieChart(document.getElementById('pie'));
    chart.draw(data);
}



