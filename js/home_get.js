// get all overall indonesia data
function get_indo(){
    $.ajax({
        url : 'https://eligiblestore.com/api/covid19idn/',
        method : 'GET',
        dataType : 'JSON',
        success : function(data){
            $("#date").append(data.Tanggal);
            $("#infects").append(data.Jumlah_Kasus_Kumulatif);
            $("#death").append(data.Jumlah_Pasien_Meninggal);
            $("#recover").append(data.Jumlah_Pasien_Sembuh);
            // $("#perawatan").append(data.Jumlah_pasien_dalam_perawatan+a)
            $("#now").append(data.Jumlah_Kasus_Baru_per_Hari)
        }
    });
}

function addCommas(nStr)
{
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

function get_province(){
    $.ajax({
        url : 'https://eligiblestore.com/api/covid19id/',
        method : 'GET',
        dataType : 'JSON',
        success : function(data) {
            $.each(data,function(i,val){
                var positive = parseInt(data[i]['Kasus Positif']);
                var sembuh = parseInt(data[i]['Kasus Sembuh']);
                var meninggal = parseInt(data[i]['Kasus Meninggal']);
                $("#province").append(`
                <tr>
                    <td>`+data[i].Provinsi+`</td>
                    <td>`+positive+`</td>
                    <td>`+sembuh+`</td>
                    <td>`+meninggal+`</td>
                </tr>`);
            });
            $('#tabel').DataTable({
                'searching':true,
                "lengthMenu": [[10,15, 20, -1], [10,15, 20, "All"]],
                responsive: true,
                rowReorder: {
                    selector: 'td:nth-child(2)'
                },
            });
        }
    });
}

function search_province() {
            var input, filter, table, tr, td, i, txtValue;
            input = document.getElementById("input");
            filter = input.value.toUpperCase();
            console.log(filter)
            table = document.getElementById("tabel");
            tr = table.getElementsByTagName("tr");
            for (i = 0; i < tr.length; i++) {
                td = tr[i].getElementsByTagName("td")[0];
                if (td) {
                    txtValue = td.textContent || td.innerText;
                    if (txtValue.toUpperCase().indexOf(filter) > -1) {
                        tr[i].style.display = "";
                    } else {
                        tr[i].style.display = "none";
                    }
                }
            }

        }

get_indo();
get_province();
// search_province();