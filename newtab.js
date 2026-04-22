document.addEventListener('DOMContentLoaded', () => {
    const listContainer = document.getElementById('listContainer');
    const searchInput = document.getElementById('searchInput');
    let readingListItems = [];

    chrome.readingList.query({}).then((items) => {
        readingListItems = items;
        renderList(readingListItems);
    });

    searchInput.addEventListener('input', (event) => {
        const query = event.target.value.toLowerCase();
        const filteredItems = readingListItems.filter(item =>
            (item.title && item.title.toLowerCase().includes(query)) ||
            (item.url && item.url.toLowerCase().includes(query))
        );
        renderList(filteredItems);
    });

    function renderList(dataArray) {
        listContainer.innerHTML = '';
        dataArray.forEach(item => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = item.url;
            a.textContent = item.title || item.url;
            li.appendChild(a);
            listContainer.appendChild(li);
        });
    }
});