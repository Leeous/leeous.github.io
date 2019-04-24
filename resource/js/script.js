$(document).ready(() => {
    // Load our projects from data.json
    $.ajax({
        type: "GET",
        url: "data.json",
        dataType: "JSON",
        success: function(response) {
            postData = response.projects;

            $.each(postData, function(i, item) {
                var id = postData[i].id;
                var title = postData[i].name;
                var desc = postData[i].desc;
                var status = postData[i].status;
                $('.project-container').append('<div class="project" data-project="' + id + '"><h3 class="title">' + title + '</h3><p class="project_desc">' + desc + '</p><p></div>');
            });
        }
    });

    // Check for clicks on .project
    $('.project-container').on("click", ".project", (e) => {
        var clickedProject = e.currentTarget
        var projectToBeReturned = $(clickedProject).data('project')
        var jsonForProject = postData[projectToBeReturned];

        $('.project_modal').append('<h1>' + jsonForProject['name'] + '</h1><p>' + jsonForProject['desc'] + '</p><div class="project_links">' + jsonForProject['github_link'] + jsonForProject['steam_link'] + '</div>');
        $('.project_modal').fadeIn(); 
    });

    $('.project_modal').on('click', '.project_modal_back', (e) => {
        $('.project_modal').fadeOut(() => {
            $('.project_modal').children().not('.project_modal_back').remove();
        });
    });

    $('.alertDiscordTag').click(()=> {
        alert('Leeous#4510')
    })
});