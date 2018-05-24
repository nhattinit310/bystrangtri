export const DATATABLE_CONFIG = {
    // info: false,
    // jQueryUI: false,
    // pageLength: 10,
    // orderCellsTop: false,
    retrieve: true,
    // search: false,
    // serverSide: true,
    // pagingType: 'full_numbers',
    // dom: '<<t><"footer-wrapper"ipl>>',
    // ext: {
    //   errMode: 'none',
    // },
    // ordering: false,
    // paging: false,
    // searching: false,
    // lengthChange: false,
    // processing: false,
    // language: {
    //   lengthMenu: 'Hiển thị _MENU_ hàng',
    //   paginate: {
    //     first: '<i class="fa fa-backward" aria-hidden="true"></i>',
    //     last: '<i class="fa fa-forward" aria-hidden="true"></i>',
    //     next: '<i class="fa fa-play" aria-hidden="true"></i>',
    //     previous: '<i class="fa fa-play" style="transform: rotate(180deg);" aria-hidden="true"></i>'
    //   }
    // },

    //
    dom: '<<t><"footer-wrapper">>',
    pagingType: 'full_numbers',
    // pageLength: 50,
    language: {
        infoEmpty: 'Không tìm thấy dòng nào phù hợp',
        sProcessing: 'Đang xử lý...',
        sLengthMenu: 'Số dòng/trang: _MENU_',
        emptyTable: 'Không có dữ liệu',
        zeroRecords: 'Không tìm thấy dòng nào phù hợp',
        sZeroRecord: 'Hiển thị 0 dòng',
        sInfo: 'Hiển thị _START_ - _END_ của _TOTAL_',
        sInfoEmpty: 'Hiển thị 0 dòng',
        sInfoFiltered: '(được lọc từ _MAX_ mục)',
        sInfoPostFix: '',
        sSearch: 'Tìm:',
        sUrl: '',
        oPaginate: {
            'sFirst': '<i class="fa fa-angle-double-left" aria-hidden="true"></i>',
            'sPrevious': '<i class="fa fa-angle-left" aria-hidden="true"></i>',
            'sNext': '<i class="fa fa-angle-right" aria-hidden="true"></i>',
            'sLast': '<i class="fa fa-angle-double-right" aria-hidden="true"></i>'
        },
    },
    ext: {
        errMode: 'none',
    },
    ordering: true,
    paging: false,
    searching: false,
    lengthChange: false,
    processing: false,
    select: {
        style: 'os',
        selector: 'td:first-child'
    },
    // orderFixed: null,
    // order: null
};
