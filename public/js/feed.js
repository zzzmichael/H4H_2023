window.addEventListener('load', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const greetingValue = urlParams.get('greeting');
    console.log(greetingValue);  
});