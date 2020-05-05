google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawPie);
  
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

    for (index = 5; index < arr_prov.length; index++) {
        others += arr_prov[index][1];  
    }
    console.log(others);
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
        // var options ={
        //     is3D:true
        // }
    var chart = new google.visualization.PieChart(document.getElementById('pie'));
    chart.draw(data);
}

function pagination(){
    $(document).ready( function () {
        $('#tabel').DataTable({
            'searching':false,
            "lengthMenu": [[5,10,15, 20, -1], [5,10,15, 20, "All"]],
            "scrollY":"200px",
        });
    } );
}

pagination();


    
    
    
    
