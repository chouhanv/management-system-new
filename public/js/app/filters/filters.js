'use strict';

/* Filters */

angular.module('myApp.filters', [])
.filter('htmlToPlaintext', function() {
  return function(htmlText) {
    return String(htmlText).replace(/<[^>]+>/gm, '');
  }
})
.filter('range', function() {
  return function(input, total) {
    total = parseInt(total);
    for (var i=0; i<total; i++)
      input.push(i);
    return input;
  };
})
.filter('filterByCategory',function(){
    return function(contacts,category){
      if(category){
        var con = new Array();
        angular.forEach(contacts, function(val , i){
          if(val.category_id && val.category_id.categorie && val.category_id.categorie == category)
            con.push(val);
        });
        return con;
    } else {
      return contacts;
    } 
  }
})
.filter('filterMatter', function(){
  return function(matters,type){
      if(type){
        var mat = new Array();
        angular.forEach(matters, function(val , i){
          if(val.matter.type == type)
            mat.push(val);
        });
        return mat;
    } else {
      return matters;
    } 
  }
})
.filter('filterProspectiveClient',function(){
    return function(contacts,isProspective, category){
      if(category == "Clients" && isProspective){
        var con = new Array();
        angular.forEach(contacts, function(val , i){
          if(typeof val.prospective_client !='undefined' && val.prospective_client)
            con.push(val);
        });
        return con;
    } else {
      return contacts;
    } 
  }
})
.filter('matterContactFilter', function(){
  return function(matters, contactId){
      if(contactId){
        var data = [];
        angular.forEach(matters, function(val, i){
          if(val.parties.building_inspector && val.parties.building_inspector == contactId){
            data.push(val);
          } else if(val.parties.closer && val.parties.closer == contactId){
              data.push(val);
          } else if(val.parties.lender && val.parties.lender == contactId){
              data.push(val);
          } else if(val.parties.lender_agent && val.parties.lender_agent == contactId){
              data.push(val);
          } else if(val.parties.lender_attorney && val.parties.lender_attorney == contactId){
              data.push(val);
          } else if(val.parties.past_inspector && val.parties.past_inspector == contactId){
              data.push(val);
          } else if(val.parties.surveyor && val.parties.surveyor == contactId){
              data.push(val);
          } else if(val.parties.title_company && val.parties.title_company == contactId){
            data.push(val);
          } else if(val.parties.title_search && val.parties.title_search == contactId){
            data.push(val);
          } else if(val.parties.under_writer && val.parties.under_writer == contactId){
            data.push(val);
          } else {
            var inMatter = false;
              angular.forEach(val.parties.buyers, function(v,j){
                console.log(v , "dasda");
                if(v && v._id && v._id==contactId || v == contactId) inMatter = true;
              });
              if(inMatter) data.push(val);
              else {
                angular.forEach(val.parties.sellers, function(v,j){
                  console.log(v , "dasda");
                  if(v && v._id && (v._id==contactId || v == contactId)) inMatter = true;
                });
              if(inMatter) data.push(val);
              else {
                angular.forEach(val.parties.buyers_agent, function(v,j){
                  if(v && v._id && (v._id==contactId || v == contactId)) inMatter = true;
                });
                if(inMatter) data.push(val);
                else {
                  angular.forEach(val.parties.buyers_attorney, function(v,j){
                    if(v && v._id && (v._id==contactId || v == contactId)) inMatter = true;
                  });
                  if(inMatter) data.push(val);
                  else {
                    angular.forEach(val.parties.sellers_agent, function(v,j){
                      if(v && v._id && (v._id==contactId || v == contactId)) inMatter = true;
                    });
                    if(inMatter) data.push(val);
                    else {
                      angular.forEach(val.parties.sellers_attorney, function(v,j){
                        if(v && v._id && (v._id==contactId || v == contactId)) inMatter = true;
                      });
                      if(inMatter) data.push(val);
                    }
                  }
                }
              }
            }
          }
        });
      return data;
    } else {
      return matters;
    } 
  }
})
.filter('highlight', function () {
  return function (text, search, caseSensitive) {
    if ((search || angular.isNumber(search)) && text != null) {
      text = text.toString();
      search = search.toString();
      if (caseSensitive) {
        return text.split(search).join('<span class="ui-match">' + search + '</span>');
      } else {
        return text.replace(new RegExp(search, 'gi'), '<span class="ui-match">$&</span>');
      }
    } else if(text == null){
      return '';
    } else {
      return text;
    }
  };
})
.filter('filesFilter', function(){
  
  return function(filename){
    var filesType = ['.jpg',  '.jpeg','.gif', '.xls', '.xlsx', '.doc', '.ppt', '.pdf', '.txt', '.mp3', '.mp4', '.html', '.htm'];
    var filesClass = [
      ' fa-file-image-o',
      ' fa-file-image-o',
      ' fa-file-image-o',
      ' fa-file-excel-o',
      ' fa-file-excel-o',
      ' fa-file-word-o',
      ' fa-file-powerpoint-o',
      ' fa-file-pdf-o',
      ' fa-file-text',
      ' fa-file-sound-o',
      ' fa-file-video-o',
      ' fa-html5',
      ' fa-html5'
      ];
    var isFound = false;
    var foundIndex;
    angular.forEach(filesType, function(value, index){
      if(filename.toLowerCase().indexOf(value) >= 0){
        foundIndex = index;
        isFound = true;
      }
    });
    if(isFound){
      return filesClass[foundIndex];
    } else {
      return 'fa-file-o';
    }
  }
});