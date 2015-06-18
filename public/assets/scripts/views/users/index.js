define(["marionette", "datatables", "datepicker", "moment"], function(){
  var usersIndex = Backbone.Marionette.ItemView.extend({

    template: "#js-users-index-tmpl",
    // className: "overlay",
    id: "js-main",

    ui: {
      search: ".js-search-users",
      reset: ".js-reset-users",
      showUser: ".js-view-user-info"
    },

    events: {
      "click @ui.search"  : "search",
      "click @ui.reset"  : "reset",
      "click @ui.showUser"  : "show"
    },

    collectionEvents: {
      "change": "updateDataTable",
      "reset": "updateDataTable",
      "sync": "makeDataTable"
    },

    onShow: function(){
      this.makeDataTable();
    },

    reset: function(){
      this.collection.fetch();
    },

    search: function(){
      params = {};
      params.id = $("input.js-input-user-id").val();
      params.email = $("input.js-input-user-email").val();
      params.name = $("input.js-input-user-name").val();
      params.vanity_slug = $("input.js-input-user-vanity-slug").val();
      params.created_at_from = $("input.js-input-user-created-at-from").val();
      params.created_at_to = $("input.js-input-user-created-at-to").val();
      this.collection.search(params);
    },

    makeDataTable: function(event) {
      if(this.dataTable){
        this.updateDataTable();
        return;
      }

      if(this.collection.length > 0){
        var table = $('#sample_1');
        /* Table tools samples: https://www.datatables.net/release-datatables/extras/TableTools/ */

        /* Set tabletools buttons and button container */


        this.dataTable = table.dataTable({

            // Internationalisation. For more info refer to http://datatables.net/manual/i18n
            "language": {
                "aria": {
                    "sortAscending": ": activate to sort column ascending",
                    "sortDescending": ": activate to sort column descending"
                },
                "emptyTable": "No data available in table",
                "info": "Showing _START_ to _END_ of _TOTAL_ entries",
                "infoEmpty": "No entries found",
                "infoFiltered": "(filtered1 from _MAX_ total entries)",
                "lengthMenu": "Show _MENU_ entries",
                "search": "Search:",
                "zeroRecords": "No matching records found"
            },

            "order": [
                [4, 'desc']
            ],

            "lengthMenu": [
                [5, 15, 20, -1],
                [5, 15, 20, "All"] // change per page values here
            ],
            // set the initial value
            "pageLength": 10,

            "dom": "<'row' <'col-md-12'T>><'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r><'table-scrollable't><'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>", // horizobtal scrollable datatable

            // Uncomment below line("dom" parameter) to fix the dropdown overflow issue in the datatable cells. The default datatable layout
            // setup uses scrollable div(table-scrollable) with overflow:auto to enable vertical scroll(see: assets/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.js).
            // So when dropdowns used the scrollable div should be removed.
            //"dom": "<'row' <'col-md-12'T>><'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r>t<'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>",

            "tableTools": {
                "sSwfPath": "../../assets/global/plugins/datatables/extensions/TableTools/swf/copy_csv_xls_pdf.swf",
                "aButtons": [{
                    "sExtends": "pdf",
                    "sButtonText": "PDF"
                }, {
                    "sExtends": "csv",
                    "sButtonText": "CSV"
                }, {
                    "sExtends": "xls",
                    "sButtonText": "Excel"
                }, {
                    "sExtends": "print",
                    "sButtonText": "Print",
                    "sInfo": 'Please press "CTR+P" to print or "ESC" to quit',
                    "sMessage": "Generated by DataTables"
                }]
            },
            "data": this.collection.convertForDataTable(),
            "columns": [
            { title: "ID", data: "id"},
            { title: "Email", data: "email", render:function(data){
                if(data.length > 30){
                  return data.substr(0,28) + "..";
                }else{
                  return data;
                }
              }
            },
            { title: "Name", data: "name", render:function(data){
                if(data.length > 30){
                  return data.substr(0,28) + "..";
                }else{
                  return data;
                }
              }
            },
            { title: "Vanity Slug", data: "vanity_slug"},

            { title: "Created At",
              render: function(data){
                return moment(data).format("MM/DD/YY hh:mm A");
              },
              iDataSort: 5,
              data: "created_at"
            },
            { mDataProp: "created_at",
              bVisible: false
            },
            { title: "Flagged",
              render: function(data, type, row, meta){
                if(data){
                  return '<a href="/#user/' + row.id + '/flags" style="text-decoration:none"><span class="label label-danger">Unreviewed</span></a>';
                }else{
                  return '<span class="label label-success">Safe</span>';
                }
              },
              data: "flagged",
              iDataSort:7
            },
            { mDataProp: "flagged",
              bVisible: false
            },
            { title: "Actions",
              render: function(data){
                return '<a href="#user/' + data + '/user" class="btn btn-xs default js-view-user-info"><i class="fa fa-search"></i> View</a>';
              },
              data: "id"
            }
        ]
        });
        this.dataTable.find("thead").append($("#js-users-table-filter").html());

        // setTimeout(function(){
          //init date pickers
          $('.date-picker').datepicker({
              rtl: true,
              autoclose: true
          });
        // },2000);
      }
    },
    updateDataTable: function(){
      this.dataTable.fnClearTable();
      oSettings = this.dataTable.fnSettings();

      var newData = this.collection.convertForDataTable();
      for (var i=0; i<newData.length; i++)
      {
        this.dataTable.oApi._fnAddData(oSettings, newData[i]);
      }
      this.dataTable.fnDraw();
    }
  });

  return usersIndex;
});