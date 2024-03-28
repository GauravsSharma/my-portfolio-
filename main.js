function init() {
    gsap.registerPlugin(ScrollTrigger);
    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true
    });
    locoScroll.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    ScrollTrigger.refresh();

}
init()
let nav = document.querySelector(".mobile-nav");
let line2 = document.querySelector(".span2");
let line1 = document.querySelector(".span1");
let line3 = document.querySelector(".span3");
let icon = document.querySelector(".flex");
let form = document.querySelector(".conRight")
let skillInfo = document.querySelector(".skills-info")
let skillCard = document.querySelectorAll(".skill-card");
let spinner = document.querySelector("#spinner")
let success = document.querySelector("#success")
console.log(success);
form.addEventListener("submit", (e) => {
    e.preventDefault();
    spinner.style.display="block";
    let fd = new FormData(form);

    const firstName = fd.get('first_name').trim();
    const lastName = fd.get('last_name').trim();
    const email = fd.get('email_id').trim();
    const message = fd.get('message').trim();

    const firstNameError = document.getElementById('firstNameError');
    const lastNameError = document.getElementById('lastNameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');

    let isValid = true;

    if (firstName === '') {
        firstNameError.style.display = 'block';
        isValid = false;
    } else {
        firstNameError.style.display = 'none';
    }

    if (lastName === '') {
        lastNameError.style.display = 'block';
        isValid = false;
    } else {
        lastNameError.style.display = 'none';
    }

    if (email === '') {
        emailError.style.display = 'block';
        isValid = false;
    } else {
        emailError.style.display = 'none';
    }

    if (message === '') {
        messageError.style.display = 'block';
        isValid = false;
    } else {
        messageError.style.display = 'none';
    }
    
    if (isValid) {
        // Proceed with sending email
        let params = Object.fromEntries(fd);
        params = {...params, from_name: firstName + " " + lastName};

        delete params.first_name;
        delete params.last_name;

        emailjs.send("service_428b6wp", "template_hmdmih5", params)
            .then(() => {
                form.reset(); 
                spinner.style.display="none";// Clearing the form after successful submission
                success.style.display="block"
            })
            .catch((error) => {
                console.error("Error:", error);
            });

        console.log(params);
    }
    else{
        spinner.style.display="none";
    }
    setTimeout(()=>{
        success.style.display="none"
    },5000)
});

 
skillCard.forEach((cart) => {
    cart.addEventListener("click", () => {
        removeAll()
        cart.className += " active2"
        let title = cart.querySelector("span").textContent;
        if (title === "Frontend") {
            skillInfo.innerHTML = ""
            let h4 = document.createElement('h4')
            h4.innerHTML = "Frontend Skills"
            let skillgrp1 = createSkillGroup("HTML", "80%", "CSS", "70%")
            let skillgrp2 = createSkillGroup("Javasript", "80%", "Typescript", "30%")
            let skillgrp3 = createSkillGroup("Tailwind CSS", "75%", "Boostrap", "50%")
            skillInfo.appendChild(h4)
            skillInfo.appendChild(skillgrp1)
            skillInfo.appendChild(skillgrp2)
            skillInfo.appendChild(skillgrp3)
        }
        if (title === "Backend") {
            skillInfo.innerHTML = ""
            let h4 = document.createElement('h4')
            h4.innerHTML = "Backend Skills"
            let skillgrp1 = createSkillGroup("Firebase", "60%", "Node", "50%")
            skillInfo.appendChild(h4)
            skillInfo.appendChild(skillgrp1)
        }
        if (title === "Tools") {
            skillInfo.innerHTML = ""
            let h4 = document.createElement('h4')
            h4.innerHTML = "Tools"
            let skillgrp1 = createSkillGroup("Visual Studio Code", "90%", "Git/Github", "80%")
            skillInfo.appendChild(h4)
            skillInfo.appendChild(skillgrp1)
        }
    })
})
function removeAll() {
    skillCard.forEach((cart) => {
        cart.classList.remove("active2")
    })
}
icon.addEventListener("click", () => {
    if (line2.className === "span2") {
        line2.className += " hidden"
        line1.className += " rotate"
        line3.className += " rotate2"
        icon.className += " gap"
        nav.style.display = "flex"
    }
    else {
        line2.className = "span2"
        line1.className = "span1"
        line3.className = "span3"
        icon.classList.remove("gap");
        nav.style.display = "none"
    }
})
function createSkillGroup(skill1, skill1per, skill2, skill2per) {
    let skillgrp = document.createElement("div")
    skillgrp.className = "skill-grp"
    skillgrp.appendChild(createSkillElem(skill1, skill1per))
    skillgrp.appendChild(createSkillElem(skill2, skill2per))
    return skillgrp;
}
function createSkillElem(title, percentage) {
    let left = document.createElement("div")
    left.className = "left";
    let skillTitle = document.createElement('div')
    skillTitle.className = "skill-title"
    let head1 = document.createElement("h6")
    let head2 = document.createElement("h6")
    head1.innerText = title;
    head2.innerText = percentage
    skillTitle.appendChild(head1)
    skillTitle.appendChild(head2)
    let skillPer = document.createElement("div")
    skillPer.className = "skill-per"
    let innerDiv = document.createElement("div")
    innerDiv.style.width = percentage
    skillPer.appendChild(innerDiv)
    left.appendChild(skillTitle)
    left.appendChild(skillPer)
    return left;
}
var typeOf = new Typed("#auto-type", {
    strings: ["Frontend Developer", "React Developer", "Web Developer", "Coder", "Frontend Developer"],
    typeSpeed: 150,
    backSpeed: 150,
    looped: true
})
let tl1 = gsap.timeline({
    scrollTrigger: {
        trigger: ".projects",
        scroller: "#main",
        start: "top center",
        end: "top 60%",
        scrub: 3,

    }
})
tl1.to("#main", {
    background: "#020021",
    duration: 1,
})
let tl2 = gsap.timeline();
tl2.from(".profile-info div h5", {
    y: 100,
    opacity: 0,
})
tl2.from(".profile-info div h2", {
    y: 100,
    opacity: 0,
})
tl2.from(".profile-info p", {
    y: 100,
    opacity: 0,
})
tl2.from(".profile-info .resume", {
    y: 100,
    opacity: 0,
})
tl2.from("#light", {
    x: 100,
    opacity: 0,
})
gsap.from(".cart1", {
    opacity: 0.2,
    y: 100,

    scrollTrigger: {
        trigger: ".cart1",
        scroller: "#main",
        // 
        start: "top 80%",
        end: "top 60%",
        scrub: true
    }
})
gsap.from(".cart2", {
    opacity: 0.2,
    y: 100,

    scrollTrigger: {
        trigger: ".cart2",
        scroller: "#main",
        
        start: "top 80%",
        end: "top 60%",
        scrub: true
    }
})
gsap.from(".cart3", {
    opacity: 0.2,
    y: 100,

    scrollTrigger: {
        trigger: ".cart3",
        scroller: "#main",
        
        start: "top 80%",
        end: "top 60%",
        scrub: true
    }
})
gsap.from(".cart4", {
    opacity: 0.2,
    y: 100,

    scrollTrigger: {
        trigger: ".cart4",
        scroller: "#main",
        
        start: "top 80%",
        end: "top 60%",
        scrub: true
    }
})
gsap.from(".cart5", {
    opacity: 0.2,
    y: 100,

    scrollTrigger: {
        trigger: ".cart5",
        scroller: "#main",
        
        start: "top 80%",
        end: "top 60%",
        scrub: true
    }
})
gsap.from(".cart6", {
    opacity: 0.2,
    y: 100,

    scrollTrigger: {
        trigger: ".cart6",
        scroller: "#main",
        
        start: "top 80%",
        end: "top 60%",
        scrub: true
    }
})
