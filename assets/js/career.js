document.addEventListener("DOMContentLoaded", function () {
    async function getAllJobPosts() {
        try {
            const response = await fetch("http://localhost:8000/career-jobpost", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            if (response.ok) {
                const jobs = await response.json();
                displayJobPosts(jobs);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to send message. Please try again later.");
        }
    }
    function displayJobPosts(jobs) {
        const jobPostsContainer = document.getElementById("jobPostsContainer");
        jobPostsContainer.innerHTML = '';
        let openingcount = jobs.length
        document.getElementById("openingpositioncount").innerHTML =  openingcount ;
        jobs.forEach(job => {
            const jobElement = document.createElement("div");
            jobElement.classList.add("position-box");
            jobElement.innerHTML = `
                <div class="position-text">
                    <h5>${job.jobname}</h5>
                    <div class="labels">
                        <span>📍</span>
                        <label>${job.jobtype}</label>
                        <label>${job.location}</label>
                    </div>
                </div>
                <a href="./current-opening.html?id=${job.count}" class="btn btn-blue">Job Details</a>
            `;
            jobPostsContainer.appendChild(jobElement);
        });
    }
    getAllJobPosts();
});
