window.addEventListener('load', () => {
    const urlPath = window.location.pathname.split('/');
    const community = urlPath[2].split('.')[0];
    const list = document.querySelector('ul');
    console.log(community)

    fetch('/public/posts.json', {
        method: 'GET'
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data[community])
        for (const post of data[community]) {
            const listItem = document.createElement('li');
            const divItem = document.createElement('div');
            divItem.className = "post-box";
            divItem.appendChild(document.createElement('h2')).textContent = post.userid;
            divItem.appendChild(document.createElement('p')).textContent = post.content;
            listItem.appendChild(divItem);
            list.appendChild(listItem);
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});