google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawPie);
google.charts.setOnLoadCallback(drawChart);
google.charts.setOnLoadCallback(peta_covid);

function drawPie(){

    // get JSON data
    var jsonData = $.ajax({
        url : 'https://eligiblestore.com/api/covid19id/',
        method : 'GET',
        dataType : 'JSON',
        async : false
    });
    jsonData = jsonData.responseJSON;
    // end section

    //Fetch provinces name and their positive number
    var arr_prov = []
    var others = 0;
    for ( i = 0; i < jsonData.length; i++) {
        arr_prov.push([jsonData[i].Provinsi,jsonData[i]['Kasus Positif']]); 
    }
    //end section

    //sort based positive numbers (get top 5 and others will counted)
    arr_prov.sort(function(a,b){
        return b[1]-a[1]
    });

    for (index = 3; index < arr_prov.length; index++) {
        others += arr_prov[index][1];  
    }
    // console.log(others);
    // end section

    var data = google.visualization.arrayToDataTable([
        ['Provinsi','Jumlah Positif'],
        [arr_prov[0][0],parseInt(arr_prov[0][1])],
        [arr_prov[1][0],parseInt(arr_prov[1][1])],
        [arr_prov[2][0],parseInt(arr_prov[2][1])],
        [arr_prov[3][0],parseInt(arr_prov[3][1])],
        [arr_prov[4][0],parseInt(arr_prov[4][1])],
        ['Lainnya',others]
    ]);
    var options ={
        legendPositon:'top',
        chartArea:{width:'90%',height:'70%'}
    }

    
    var chart = new google.visualization.PieChart(document.getElementById('pie'));
    chart.draw(data,options);
}

function drawChart(){
    var jsonData = $.ajax({
        url : 'https://eligiblestore.com/api/covid19id/',
        method : 'GET',
        dataType : 'JSON',
        async : false
    });
    jsonData = jsonData.responseJSON;

    var arr_prov = []
    for ( i = 0; i < jsonData.length; i++) {
        arr_prov.push([jsonData[i].Provinsi,jsonData[i]['Kasus Sembuh']]); 
    }
    arr_prov.sort(function(a,b){
        return b[1]-a[1]
    });
    var data = google.visualization.arrayToDataTable([
        ['Provinsi','Jumlah Sembuh'],
        [arr_prov[0][0],parseInt(arr_prov[0][1])],
        [arr_prov[1][0],parseInt(arr_prov[1][1])],
        [arr_prov[2][0],parseInt(arr_prov[2][1])],
        [arr_prov[3][0],parseInt(arr_prov[3][1])],
        [arr_prov[4][0],parseInt(arr_prov[4][1])],
    ]);
    var options ={
        legendPositon:'top',
        chartArea:{width:'50%',height:'70%'}
    }
    var chart = new google.visualization.BarChart(document.getElementById("bar_chart"));
    chart.draw(data, options);


}

function pindah1(){
    document.getElementById("satu").style.display= "block";
    document.getElementById("dua").style.display="none";
}
function pindah2(){
    document.getElementById("satu").style.display= "none";
    document.getElementById("dua").style.display= "block";
      
}
function peta_covid(){
    var peta = new google.maps.Map(document.getElementById("peta"), {
        zoom: 5,
        zoomControl: true,
        center: new google.maps.LatLng(-1.4187812,117.9853305),
        mapTypeId:google.maps.MapTypeId.ROADMAP,

    });
    $.ajax({
        url : 'https://services5.arcgis.com/VS6HdKS0VfIhv8Ct/arcgis/rest/services/COVID19_Indonesia_per_Provinsi/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json',
        method : 'GET',
        dataType : 'JSON',
        success : function(data) {
            $.each(data['features'],function(i,val){
                if(i<34){
                    var konten =
                        "<h6>Informasi Covid-19 Tiap Provinsi Di Indonesia</h6>"+new Date().toLocaleString()+
                        "<hr style=height:2px;border-width:0;color:black;background-color:black;opacity: 0.5;>"+
                        "<table class=table table-striped>"+
                            "<tbody class=font-weight-bold>"+
                                "<tr class=table-secondary>"+
                                    "<td > Provinsi</td>"+
                                    "<td>"+data['features'][i]['attributes']['Provinsi']+"</td>"+
                                "</tr>"+
                                "<tr>"+
                                    "<td>Jumlah Terinfeksi </td>"+
                                    "<td>"+data['features'][i]['attributes']['Kasus_Posi']+"</td>"+
                                "</tr>"+
                                "<tr class=table-secondary>"+
                                    "<td>Sembuh </td>"+
                                    "<td>"+data['features'][i]['attributes']['Kasus_Semb']+"</td>"+
                                "</tr>"+
                                "<tr>"+
                                    "<td>Meninggal </td>"+
                                    "<td>"+data['features'][i]['attributes']['Kasus_Meni']+"</td>"+
                                "</tr>"+
                            "</tbody>"+
                        "</table>";

                    var info_label = new google.maps.InfoWindow({
                        content: konten,
                    });
                    var marker = new google.maps.Marker({
                        position: new google.maps.LatLng(data['features'][i]['geometry']['y'],data['features'][i]['geometry']['x']),
                        map: peta,
                        title:data['features'][i]['attributes']['Provinsi'],
                        icon: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|ddd',

                    });
                    marker.addListener("click", function () {
                        info_label.open(peta, marker);
                    });
                }
            });
            console.log(data['features'][0])
        }

    });
 }

$(window).resize(function() {
    drawPie();
    drawChart();
    peta_covid();
});



    
    
    
    
