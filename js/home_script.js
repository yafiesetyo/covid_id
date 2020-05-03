google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawPie);


function drawPie(){
    var data = google.visualization.arrayToDataTable([
        ['Task', 'Hours per Day'],
        ['Work', 8],
        ['Friends', 2],
        ['Eat', 2],
        ['TV', 2],
        ['Gym', 2],
        ['Sleep', 8]
    ]);
    var options ={
        legend : 'none',
        is3D:true
    }
    var chart = new google.visualization.PieChart(document.getElementById('pie'));
    chart.draw(data,options);
}