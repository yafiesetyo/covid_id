// get all overall indonesia data
function get_indo(){
    $.ajax({
        url : 'https://api.kawalcorona.com/indonesia/',
        method : 'GET',
        dataType : 'JSON',
        success : function(data){
            let a = ' jiwa';
            $("#infects").append(data[0].positif+a);
            $("#death").append(data[0].meninggal+a);
            $("#recover").append(data[0].sembuh+a);
        }
    });
}

function get_province(){
    $.ajax({
        url : 'https://api.kawalcorona.com/indonesia/provinsi/',
        method : 'GET',
        dataType : 'JSON',
        success : function(data) {
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

get_indo();
get_province();

