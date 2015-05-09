var Samples = Samples || {};

Samples.Lists = (function ($) {
   

    var getAllItems = function (baseUrl, listName, callback) {
        $.ajax({
                url: baseUrl + "/_api/Web/Lists/GetByTitle('" + listName + "')/Items",
                type: "GET",
                datatype: "JSON",
                headers: {
                    "Accept": "application/json;odata=verbose"
                }
            })
            .done(function(data) {
                callback(null, data.d.results);
            })
            .fail(function(jqxhr, textStatus, error) {
                var err = textStatus + ", " + error;
                callback(err);
            });
    };
    
     var createItem = function (baseUrl, listName, object, callback) {
        
        getListItemEntityTypeFullName(baseUrl, listName, function(err, data)
        {
            if( !err)
            {
                var metadata = {
                    '__metadata': { 'type': data }, 
                    'Title': object.Title  
                    };
                    
                $.ajax({
                    url: baseUrl + "/_api/Web/Lists/GetByTitle('" + listName + "')/Items",
                    type: "POST",
                    data: JSON.stringify(metadata),
                    headers: {
                        "Accept": "application/json;odata=verbose",
                        "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                        "content-type":"application/json;odata=verbose"
                    }
                })
                .done(function(data) {
                    callback(null, data.d);
                })
                .fail(function(jqxhr, textStatus, error) {
                    var err = textStatus + ", " + error;
                    callback(err);
                });
            } 
        });
        
        
    };

   var getListItemEntityTypeFullName = function(baseUrl, listName, callback){
        $.ajax({
                url: baseUrl + "/_api/Web/Lists/GetByTitle('" + listName + "')?$select=ListItemEntityTypeFullName ",
                type: "GET",
                datatype: "JSON",
                headers: {
                    "Accept": "application/json;odata=verbose",
                      "X-RequestDigest": $("#__REQUESTDIGEST").val()
                }
            })
            .done(function(data) {
                callback(null, data.d.ListItemEntityTypeFullName);
            })
            .fail(function(jqxhr, textStatus, error) {
                var err = textStatus + ", " + error;
                callback(err);
            });
   }

    var getSpecificItem = function (baseUrl, listName, itemId, callback) {
        var url = baseUrl + "/_api/Web/Lists/GetByTitle('" + listName + "')/Items("+itemId+")";
        $.ajax({
            url: url,
            type: "GET",
            datatype: "JSON",
            headers: {
                "Accept": "application/json;odata=verbose"
            }
        })
            .done(function (data) {
                callback(null, data.d);
            })
            .fail(function (jqxhr, textStatus, error) {
                var err = textStatus + ", " + error;
                callback(err);
            });
    };

   
    

    return {
        getItems: getAllItems,
        getSpecificItem: getSpecificItem,
        getListItemEntityTypeFullName: getListItemEntityTypeFullName,
        createItem: createItem
    };

})(jQuery);