const form = document.querySelector('form');
const input = document.querySelector('.post-content');

form.addEventListener('submit', (event) => {
    console.log('in event listener');
    const postContent = document.getElementById("post-content");
    const newPost = JSON.parse(`{'userId':"exampleUsername",'content':${postContent},'upvotes':0}`);

    const response = fetch('/api/posts.js', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPost),
    });
    return response.json();
});