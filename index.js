function updateDateTime() {
    let currentDateTime = new Date();
    document.getElementById('datetime').innerHTML = currentDateTime.toLocaleString();
}

setInterval(updateDateTime, 0);

$(document).ready(function() {
    $('#DiscountCode').click(function() {
        let text = "HOLIDAY";
        navigator.clipboard.writeText(text).then(function() {
            alert('Discount code copied');
        }, function(err) {
            alert('Failed to copy text: ', err);
        });
    });
});

function initMap() {
    let addressCoordinates = { lat: 40.7712, lng: -111.9002 };

    let map = new google.maps.Map(document.getElementById('map'), {
        center: addressCoordinates,
        zoom: 17
    });

    let marker = new google.maps.Marker({
        position: addressCoordinates,
        map: map,
        title: 'CyberCore Technology'
    });
}

$(document).ready(function() {
    const totalReviews = $('#review-slider .testimonials').length;
    const reviewsPerPage = 3;
    let currentPage = 1;

    function showReviews(page) {
        $('#review-slider .testimonials').hide();
        for (let i = (page - 1) * reviewsPerPage; i < page * reviewsPerPage; i++) {
            $('#review-slider .testimonials').eq(i).fadeIn();
        }
    }

    function setupPagination() {
        const pageCount = Math.ceil(totalReviews / reviewsPerPage);
        updatePaginationButtons(pageCount, currentPage);
    }

    function updatePaginationButtons(pageCount, currentPage) {
        $('#pagination').empty();
        $('#pagination').append('<button class="rounded-2 page-btn" data-page="prev">Prev</button>');

        let startPage = Math.max(currentPage - 2, 1);
        let endPage = Math.min(currentPage + 2, pageCount);

        if (currentPage <= 3) {
            endPage = Math.min(5, pageCount);
        }
        if (currentPage > pageCount - 3) {
            startPage = Math.max(1, pageCount - 4);
        }

        for (let i = startPage; i <= endPage; i++) {
            $('#pagination').append(`<button class="rounded-2 page-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`);
        }

        $('#pagination').append('<button class="rounded-2 page-btn" data-page="next">Next</button>');
    }

    $(document).on('click', '.page-btn', function() {
        const page = $(this).data('page');
        if (page === "prev") {
            currentPage = Math.max(1, currentPage - 1);
        } else if (page === "next") {
            currentPage = Math.min(Math.ceil(totalReviews / reviewsPerPage), currentPage + 1);
        } else {
            currentPage = parseInt(page);
        }
        showReviews(currentPage);
        updatePaginationButtons(Math.ceil(totalReviews / reviewsPerPage), currentPage);
    });

    setupPagination();
    showReviews(currentPage);
});

$(document).ready(function() {
    $('.comment-form').on('submit', function(e) {
        e.preventDefault();

        $(this).hide();
        $('#submission-message').show();
    });
});