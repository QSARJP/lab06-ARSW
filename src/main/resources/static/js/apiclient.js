const Url = 'http://localhost:8080/blueprints/';
apiclient = (function () {
    var f=[]
    return {
        getBlueprintsByAuthor: function (name, callback) {
                $.get(Url+name,function(data){
                    f=data;
                });
                return callback(f)
        },
        getBlueprintsByNameAndAuthor: function(author, name, callback) {
            jQuery.ajax({
                url: Url+author+"/"+name,
                success: function (result) {
                    callback(result);
                },
                async: true
            });
        }
    };
})();