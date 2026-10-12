/* =========================
   COURSE INFORMATION
========================= */

const courses = {

    obedience: {
        name: "Canine Obedience Training",
        duration: "12 Weeks",
        fee: 1500,
        description:
            "Learn practical techniques for training dogs and improving obedience using positive reinforcement.",
        topics: [
            "Basic commands",
            "Leash training",
            "Behaviour correction",
            "Positive reinforcement",
            "Socialisation techniques"
        ],
        image:
            "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=900&q=80"
    },

    grooming: {
        name: "Pet Grooming",
        duration: "12 Weeks",
        fee: 1500,
        description:
            "Learn professional grooming techniques that help maintain the health and appearance of pets.",
        topics: [
            "Coat care",
            "Bathing techniques",
            "Nail trimming",
            "Ear and eye cleaning",
            "Grooming equipment"
        ],
        image:
            "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=900&q=80"
    },

    behaviour: {
        name: "Animal Behaviour",
        duration: "12 Weeks",
        fee: 1500,
        description:
            "Understand animal psychology and learn how to identify and manage different behaviours.",
        topics: [
            "Animal psychology",
            "Reading body language",
            "Stress management",
            "Behaviour modification",
            "Enrichment activities"
        ],
        image:
            "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=900&q=80"
    },

    business: {
        name: "Pet Business Management",
        duration: "12 Weeks",
        fee: 1500,
        description:
            "Develop business skills needed to start and manage a successful pet-care business.",
        topics: [
            "Customer service",
            "Marketing",
            "Business planning",
            "Financial management",
            "Legal requirements"
        ],
        image:
            "https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=900&q=80"
    },

    puppy: {
        name: "Puppy Care",
        duration: "6 Weeks",
        fee: 750,
        description:
            "Learn how to provide puppies with proper care during their early stages of development.",
        topics: [
            "Feeding",
            "Vaccinations",
            "Toilet training",
            "Exercise",
            "Socialisation"
        ],
        image:
            "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=900&q=80"
    },

    firstaid: {
        name: "Pet First Aid",
        duration: "6 Weeks",
        fee: 750,
        description:
            "Learn basic emergency procedures that can help protect pets during accidents and emergencies.",
        topics: [
            "Minor injuries",
            "CPR basics",
            "Poison awareness",
            "Heatstroke",
            "Emergency transport"
        ],
        image:
            "https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=900&q=80"
    },

    walking: {
        name: "Basic Dog Walking",
        duration: "6 Weeks",
        fee: 750,
        description:
            "Learn safe and professional techniques for walking and handling dogs.",
        topics: [
            "Walking equipment",
            "Handling multiple dogs",
            "Safety procedures",
            "Exercise routines"
        ],
        image:
            "https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=crop&w=900&q=80"
    }

};


/* =========================
   DISPLAY COURSE DETAILS
========================= */

function displayCourse() {

    const parameters =
        new URLSearchParams(window.location.search);

    const courseID =
        parameters.get("course");

    if (!courseID) {
        return;
    }

    const course =
        courses[courseID];

    if (!course) {
        document.getElementById("courseTitle").textContent =
            "Course Not Found";

        return;
    }


    document.getElementById("courseTitle").textContent =
        course.name;

    document.getElementById("courseName").textContent =
        course.name;

    document.getElementById("courseDescription").textContent =
        course.description;

    document.getElementById("courseDuration").textContent =
        course.duration;

    document.getElementById("courseFee").textContent =
        course.fee.toLocaleString();

    document.getElementById("courseImage").src =
        course.image;


    const topicList =
        document.getElementById("courseTopics");

    topicList.innerHTML = "";


    course.topics.forEach(function(topic) {

        const listItem =
            document.createElement("li");

        listItem.textContent =
            topic;

        topicList.appendChild(listItem);

    });

}


/* =========================
   FEE CALCULATOR
========================= */

function calculateFees() {

    const name =
        document.getElementById("customerName").value.trim();

    const phone =
        document.getElementById("phone").value.trim();

    const email =
        document.getElementById("email").value.trim();


    const errorMessage =
        document.getElementById("errorMessage");


    errorMessage.textContent = "";


    /* NAME VALIDATION */

    if (name.length < 2) {

        errorMessage.textContent =
            "Please enter a valid full name.";

        return;
    }


    /* PHONE VALIDATION */

    const phonePattern =
        /^[0-9]{10}$/;

    if (!phonePattern.test(phone)) {

        errorMessage.textContent =
            "Please enter a valid 10-digit South African phone number.";

        return;
    }


    /* EMAIL VALIDATION */

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {

        errorMessage.textContent =
            "Please enter a valid email address.";

        return;
    }


    /* SELECTED COURSES */

    const selectedCourses =
        document.querySelectorAll(
            'input[name="course"]:checked'
        );


    if (selectedCourses.length === 0) {

        errorMessage.textContent =
            "Please select at least one course.";

        return;
    }


    /* CALCULATE SUBTOTAL */

    let subtotal = 0;

    const invoiceCourses =
        document.getElementById("invoiceCourses");

    invoiceCourses.innerHTML = "";


    selectedCourses.forEach(function(course) {

        const fee =
            Number(course.value);

        subtotal += fee;


        const row =
            document.createElement("tr");


        row.innerHTML =
            `<td>${course.dataset.name}</td>
             <td>R${fee.toLocaleString()}</td>`;


        invoiceCourses.appendChild(row);

    });


    /* DISCOUNT */

    let discountRate = 0;

    const numberOfCourses =
        selectedCourses.length;


    if (numberOfCourses === 2) {

        discountRate = 5;

    } else if (numberOfCourses === 3) {

        discountRate = 10;

    } else if (numberOfCourses > 3) {

        discountRate = 15;

    }


    const discountAmount =
        subtotal * (discountRate / 100);


    const discountedSubtotal =
        subtotal - discountAmount;


    /* VAT */

    const vat =
        discountedSubtotal * 0.15;


    /* FINAL TOTAL */

    const total =
        discountedSubtotal + vat;


    /* DISPLAY INVOICE */

    document.getElementById("invoiceName").textContent =
        name;

    document.getElementById("invoicePhone").textContent =
        phone;

    document.getElementById("invoiceEmail").textContent =
        email;


    document.getElementById("subtotal").textContent =
        subtotal.toFixed(2);


    document.getElementById("discountPercentage").textContent =
        discountRate;


    document.getElementById("discountAmount").textContent =
        discountAmount.toFixed(2);


    document.getElementById("vatAmount").textContent =
        vat.toFixed(2);


    document.getElementById("totalAmount").textContent =
        total.toFixed(2);


    document.getElementById("invoice").style.display =
        "block";

}


/* =========================
   CONTACT FORM
========================= */

const contactForm =
    document.getElementById("contactForm");


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const name =
                document.getElementById("name").value.trim();

            const email =
                document.getElementById("contactEmail").value.trim();

            const message =
                document.getElementById("message").value.trim();


            const output =
                document.getElementById("contactMessage");


            if (
                name === "" ||
                email === "" ||
                message === ""
            ) {

                output.textContent =
                    "Please complete all fields.";

                return;
            }


            output.textContent =
                "Thank you! Your message has been received.";

            contactForm.reset();

        }
    );

}


/* =========================
   PAGE LOAD
========================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        displayCourse();

    }
);