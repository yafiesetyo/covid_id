// get all overall indonesia data
function get_indo(){
    $.ajax({
        url : 'https://eligiblestore.com/api/covid19idn/',
        method : 'GET',
        dataType : 'JSON',
        success : function(data){
            let a = ' jiwa';
            $("#date").append(data.Tanggal);
            $("#infects").append(data.Jumlah_Kasus_Kumulatif+a);
            $("#death").append(data.Jumlah_Pasien_Meninggal+a);
            $("#recover").append(data.Jumlah_Pasien_Sembuh+a);
            // $("#perawatan").append(data.Jumlah_pasien_dalam_perawatan+a)
            $("#now").append(data.Jumlah_Kasus_Baru_per_Hari+a)
        }
    });
}

function get_province(){
    $.ajax({
        url : 'https://api.kawalcorona.com/indonesia/provinsi/',
        method : 'GET',
        dataType : 'JSON',
        success : function(data) {
            console.log(data[0].attributes.Provinsi);
            $.each(data,function(i,val){
                $("#province").append(`<tr>
                <td>`+data[i].attributes.Provinsi+`</td>
                <td>`+data[i].attributes.Kasus_Meni+`</td>
                <td>`+data[i].attributes.Kasus_Semb+`</td>
                <td>`+data[i].attributes.Kasus_Posi+`</td></tr>`);
            });
            
        }
    });
}

function search_province() {
            var input, filter, table, tr, td, i, txtValue;
            input = document.getElementById("input");
            filter = input.value.toUpperCase();
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
search_province();