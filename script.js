'use strict'



function getUserRepo(userName) {

    fetch(`https://api.github.com/users/${userName}/repos`)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);

        })
        .then(responseJson =>
            displayResults(responseJson))
        .catch(error => alert('Something went wrong. Try again later.'));

};




function displayResults(responseJson) {

    $(".userInfo").remove();
    $(".repoLink").remove();

    console.log(responseJson);

    $(".js-resultsSection h2").append(`<span class="userInfo">Query results for ${responseJson[0].owner.login}</span>`);


    for (let i = 0; i < responseJson.length; i++) {
        $(".js-results").append(
            `<h3 class="repoLink">Repo name: ${responseJson[i].name}</h3><li><a href=${responseJson[i].html_url} class="repoLink" target="blank">${responseJson[i].html_url}</a></li>`);
    }

    console.log(responseJson[0].html_url);

}




function awaitInput() {
    $('form').submit(event => {
        event.preventDefault();
        let userName = $('#GitHub-user').val();
        getUserRepo(userName);
        console.log("submit button working!");
    })
}




$(function watchApp() {
    awaitInput();
    console.log("App is ready!");
})