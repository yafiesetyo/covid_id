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
            console.log(data[0].attributes.Provinsi);
            $.each(data,function(i,val){
                
            });
            
        }
    });
}

get_indo();
get_province();
