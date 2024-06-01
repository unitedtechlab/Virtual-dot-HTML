function searchTable() {
    var input, filter, table, tr, td, i, j, txtValue;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("jobTableBody");
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
        tr[i].style.display = "none";
        td = tr[i].getElementsByTagName("td");
        for (j = 0; j < td.length; j++) {
            if (td[j]) {
                txtValue = td[j].textContent || td[j].innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                    break;
                }
            }
        }
    }
}
document.addEventListener('DOMContentLoaded', function () {
    const rowsPerPageSelect = document.getElementById('rowsPerPageSelect');
    const jumpToPageInput = document.getElementById('jumpToPage');
    const jumpBtn = document.getElementById('jumpBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const rowsInfo = document.getElementById('rowsInfo');
    const currentPageInfo = document.getElementById('currentPageInfo');

    let rowsPerPage = parseInt(rowsPerPageSelect.value, 10);
    let currentPage = 1;

    const tableBody = document.getElementById('jobTableBody');
    const rows = Array.from(tableBody.getElementsByClassName('table-content'));
    const totalRows = rows.length;

    function updatePagination() {
        const totalPages = Math.ceil(totalRows / rowsPerPage);
        displayRows(currentPage);
        rowsInfo.textContent = `Showing ${(currentPage - 1) * rowsPerPage + 1}-${Math.min(currentPage * rowsPerPage, totalRows)} of ${totalRows}`;
        currentPageInfo.textContent = `${currentPage}/${totalPages}`;

        prevBtn.disabled = currentPage === 1;
        nextBtn.disabled = currentPage === totalPages;
    }

    function displayRows(page) {
        tableBody.innerHTML = '';

        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        const rowsToDisplay = rows.slice(start, end);

        rowsToDisplay.forEach(row => tableBody.appendChild(row));
    }

    rowsPerPageSelect.addEventListener('change', function () {
        rowsPerPage = parseInt(rowsPerPageSelect.value, 10);
        currentPage = 1;
        updatePagination();
    });

    prevBtn.addEventListener('click', function () {
        if (currentPage > 1) {
            currentPage--;
            updatePagination();
        }
    });

    nextBtn.addEventListener('click', function () {
        if (currentPage < Math.ceil(totalRows / rowsPerPage)) {
            currentPage++;
            updatePagination();
        }
    });

    jumpBtn.addEventListener('click', function () {
        const jumpPage = parseInt(jumpToPageInput.value, 10);
        if (jumpPage >= 1 && jumpPage <= Math.ceil(totalRows / rowsPerPage)) {
            currentPage = jumpPage;
            updatePagination();
        }
    });

    updatePagination(); 
});