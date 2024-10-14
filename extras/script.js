document.addEventListener('DOMContentLoaded', function () {
    const filterButton = document.getElementById('filter-button');
    const filters = document.getElementById('filters');

    filterButton.addEventListener('click', function () {
        filters.style.display = filters.style.display === 'block' ? 'none' : 'block';
    });

    const imageBoxes = document.querySelectorAll('.image-box');
    const previewContainer = document.getElementById('image-preview');
    const previewImg = document.getElementById('preview-img');

    imageBoxes.forEach(box => {
        box.addEventListener('mouseover', function () {
            const imageSrc = this.getAttribute('data-image-src');
            previewImg.src = imageSrc;
            previewContainer.style.display = 'flex';
        });

        box.addEventListener('mouseout', function () {
            previewContainer.style.display = 'none';
        });
    });

    previewContainer.addEventListener('click', function () {
        this.style.display = 'none';
    });
});
