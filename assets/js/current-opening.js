document.addEventListener("DOMContentLoaded", function () {
    // get single job post
    async function getSingleJobPost() {
        let id = getParameterByName('id');
        console.log("id: ", id)
        try {
            const response = await fetch(`http://localhost:8000/career-job?id=${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            if (response.ok) {
                const jobs = await response.json();
                
                document.getElementById("designation").innerHTML = jobs.jobname;
                document.getElementById("designation-2").innerHTML = jobs.jobname;
                document.getElementById("jobtype").innerHTML = "🕓" + jobs.jobtype;
                document.getElementById("joblocation").innerHTML = "🌐 " + jobs.location;
                document.getElementById("joblocation-2").innerHTML = "🌐 " + jobs.location;
                //Printing skills set 
                const skillsArray = jobs.skills.split(",").map(skill => skill.trim());
                const listItem = document.createElement("ul");
                skillsArray.forEach(skill => {
                    const subitem = document.createElement("li");
                    subitem.textContent = skill;
                    listItem.appendChild(subitem);
                });
                document.getElementById("skills").innerHTML = listItem.outerHTML;

                document.getElementById("description").innerHTML = jobs.job_des;
                document.getElementById("experience").innerHTML = jobs.experience;
                document.getElementById("openpositioncount").innerHTML = jobs.count;
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }
    const id = getParameterByName('id');
    if (id) {
        getSingleJobPost();
    } else {
        console.error("No id parameter found in the URL.");
    }
    function getParameterByName(name) {
        let url = window.location.href;
        name = name.replace(/[[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

});
