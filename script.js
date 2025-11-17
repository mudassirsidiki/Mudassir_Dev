function loco() {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector(".main"),
        smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy(".main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
    });



    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();

}

document.addEventListener('contextmenu', event => event.preventDefault());

function menu() {
    const menu = document.getElementById('nav');

    let isOpen = false;

    menu.addEventListener('click', () => {
        if (isOpen) {
            gsap.to(".menuanim1", {
                '--clip': "140%",
                ease: Power2,
                duration: 1
            })
            gsap.to(".menuanim2", {
                '--clip': "140%",
                ease: Power2,
                duration: 1,
                delay: .5
            })
        } else {
            gsap.to(".menuanim1", {
                '--clip': "0%",
                ease: Power2,
                duration: 1,
                delay: .5
            })
            gsap.to(".menuanim2", {
                '--clip': "0%",
                ease: Power2,
                duration: 1,

            })
        }
        isOpen = !isOpen;
    });


    var frame1 = document.querySelector(".menu-text1")
    var frame2 = document.querySelector(".menu-text2")
    var frame3 = document.querySelector(".menu-text3")
    var frame4 = document.querySelector(".menu-text4")

    frame1.addEventListener("mousemove", function (dets) {
        gsap.to("#text", {
            duration: .3,
            y: "-5vw"
        })
    })
    frame1.addEventListener("mouseleave", function (dets) {
        gsap.to("#text", {
            duration: .3,
            y: 0
        })
    })




    frame2.addEventListener("mousemove", function (dets) {
        gsap.to("#text2", {
            duration: .3,
            y: "-5vw"
        })
    })
    frame2.addEventListener("mouseleave", function (dets) {
        gsap.to("#text2", {
            duration: .3,
            y: 0
        })
    })



    frame3.addEventListener("mousemove", function (dets) {
        gsap.to("#text3", {
            duration: .3,
            y: "-5vw"
        })
    })
    frame3.addEventListener("mouseleave", function (dets) {
        gsap.to("#text3", {
            duration: .3,
            y: 0
        })
    })



    frame4.addEventListener("mousemove", function (dets) {
        gsap.to("#text4", {
            duration: .3,
            y: "-5vw"
        })
    })
    frame4.addEventListener("mouseleave", function (dets) {
        gsap.to("#text4", {
            duration: .3,
            y: 0
        })
    })
}
menu();

function botton() {
    var btn = document.querySelector(".bttn")
    var CV = document.querySelector(".CV")
    btn.addEventListener("mousemove", function (dets) {
        gsap.to(".btn-text", {
            y: "-1.2vw",
            duration: .2,
        })
    })
    btn.addEventListener("mouseleave", function (dets) {
        gsap.to(".btn-text", {
            y: 0,
            duration: .2,
        })
    })

    CV.addEventListener("mousemove", function (dets) {
        gsap.to(".CV-text", {
            y: "-1.2vw",
            duration: .2,
        })
    })
    CV.addEventListener("mouseleave", function (dets) {
        gsap.to(".CV-text", {
            y: 0,
            duration: .2,
        })
    })
}
botton();



Shery.mouseFollower();
Shery.makeMagnet(".magnet");


function homeAnimation() {
    var tl = gsap.timeline()
    tl.from(".home", {
        transform: "scaleX(.7) translateY(90%)",
        borderRadius: "100px",
        duration: 2.5,
        ease: "expo.out"
    })
    tl.from(".nav", {
        y: -100,
        stagger: 0.2,
        duration: 0.8
    })
    tl.from(".home div", {
        opacity: 0
    })
    tl.from(".avinasxhhh h1 span", {
        y: 300,
        stagger: 0.2,
        duration: 1
    }, "a")
    tl.from(".paragraph", {
        x: 600,
        // stagger:0.2,
        duration: 1.5
    }, "a")
    tl.from(".h-line", {
        x: -700,
        duration: 2.5,
        ease: "expo.out",
    }, "a")
    tl.from(".v-line", {
        y: -700,
        duration: 2.5,
        ease: "expo.out",
    }, "a")
    tl.from(".num", {
        y: 400,
        duration: 2.5,
        ease: "expo.out",
    }, "a")

}

homeAnimation();



function nameAnimation() {
    var t1 = gsap.timeline({
        scrollTrigger: {
            trigger: ".name",
            start: "top bottom",
            end: "bottom top",
            // markers: true,
            scrub: 2
        },
    })

    t1.to(".ls", {
        xPercent: 30,
        duration: 7
    }, 'a')
    t1.to(".rs", {
        xPercent: -30,
        duration: 7
    }, 'a')
}
nameAnimation();

function skillsAnimation() {
    var t2 = gsap.timeline({
        scrollTrigger: {
            trigger: ".skills",
            start: "center center",
            end: "bottom top",
            // markers: true,
            pin: true,
            scrub: 4,
        },
    })
    t2
        .to(".top", {
            top: "-50%"
        }, "a")
        .to(".bottom", {
            bottom: "-50%"
        }, "a")
        .to(".top-h", {
            top: "80%"
        }, "a")
        .to(".bottom-h", {
            bottom: "80%"
        }, "a")
        .from(".where h1", {
            x: -900,
            duration: 4,
            ease: "expo.out",
        }, "b")
        .from(".num-3", {
            y: 400,
            duration: 4,
            ease: "expo.out",
        }, "b")
        .from(".logo img", {
            y: 400,
            stagger: 0.5,
            duration: 4,
            ease: "expo.out",
        }, "a")
        .from(".hs-line", {
            x: -700,
            duration: 4,
            ease: "expo.out",
        }, "a")

}

skillsAnimation();

function explorepageAnimation() {
    var t3 = gsap.timeline({
        scrollTrigger: {
            trigger: ".explore",
            start: "top top",
            end: "bottom bottom",
            // markers: true,
            scrub: 4
        },

    })
    t3.to(".slide", {
        xPercent: -76,
        ease: Power4,
        duration: 4
    }, "a");
}

// explorepageAnimation();

function exploreTextAnimation() {
    var tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".explore",
            // markers:true,
            top: "top bottom",
            end: "70% 50%",
            scrub: 1
        }
    })
    tl.from(".e-cont h1 span", {
        y: 900,
        stagger: 4,
        duration: 3
    }, "a")

}
exploreTextAnimation();

function projectAnimation() {
    var tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".projects",
            // markers:true,
            start: "top 40%",
            end: "top top",
            scrub: 2,
            // pin:true 

        }
    })

    tl.from(".num-p", {
        y: 300,
        stagger: 4,
        duration: 3
    }, "a")
    tl.to(".box1", {
        x: -700,
        duration: 4,
        ease: "expo.out"
    }, "a")
    tl.to(".box2", {
        x: 700,
        duration: 4,
        ease: "expo.out"
    }, "a")
    tl.from('.p-names', {
        y: -30,
        stagger: 0.2,
        duration: 0.2
    })
    tl.from('.t-names', {
        y: -30,
        stagger: 0.2,
        duration: 0.2
    })

    var Btn = document.querySelector(".b-btn")
    Btn.addEventListener("mousemove", function (dets) {
        gsap.to(".p-btn", {
            y: "-1.2vw",
            duration: .2,
        })
    })
    Btn.addEventListener("mouseleave", function (dets) {
        gsap.to(".p-btn", {
            y: 0,
            duration: .2,
        })
    })

}
projectAnimation();


function footerAnimation() {
    var t2 = gsap.timeline()
    var t1 = gsap.timeline({
        scrollTrigger: {
            trigger: ".foot",
            start: "top 90%",
            end: "bottom 100%",
            scrub: 2
        },
    })

    t1.from(".feel", {
        y: 750,
        duration: 2.5,

    })
    t2.from(".back-top", {
        scale: 0,
        opacity: 0
    })
    t2.to(".back-top", {
        y: 20,
        repeat: -1,
        duration: 0.7,
        yoyo: true
    })


    var foot1 = document.querySelector(".foot-1")
    var foot2 = document.querySelector(".foot-2")
    var foot3 = document.querySelector(".foot-3")

    foot1.addEventListener("mousemove", function (dets) {
        gsap.to(".foot-1", {
            color: "#95D442",
            duration: .3,
        })
    })
    foot1.addEventListener("mouseleave", function (dets) {
        gsap.to(".foot-1", {
            color: "transparent",
            duration: .3,
        })
    })

    foot2.addEventListener("mousemove", function (dets) {
        gsap.to(".foot-2", {
            color: "#95D442",
            duration: .3,
        })
    })
    foot2.addEventListener("mouseleave", function (dets) {
        gsap.to(".foot-2", {
            color: "transparent",
            duration: .3,
        })
    })

    foot3.addEventListener("mousemove", function (dets) {
        gsap.to(".foot-3", {
            color: "#95D442",
            duration: .3,
        })
    })
    foot3.addEventListener("mouseleave", function (dets) {
        gsap.to(".foot-3", {
            color: "transparent",
            duration: .3,
        })
    })

}
footerAnimation();

const photowaala = new SplitType('.btn-text')


function projectPageAnimations() {
    // var tl = gsap.timeline()
    gsap.registerPlugin(ScrollTrigger);
    gsap.from(".num-pro", {
        y: 300,
        stagger: 4,
        duration: 3
    }, "a")
    gsap.to(".boxx1", {
        scrollTrigger: ".boxx1",
        y: -700,
        duration: 5,
        ease: "expo.out"
    })
    gsap.to(".boxx2", {
        scrollTrigger: ".boxx2",
        y: -700,
        duration: 5,
        ease: "expo.out"
    })
    gsap.to(".boxx3", {
        scrollTrigger: ".boxx3",
        y: -700,
        duration: 5,
        ease: "expo.out"
    })
    gsap.to(".boxx4", {
        scrollTrigger: ".boxx4",
        y: -700,
        duration: 5,
        ease: "expo.out"
    })
    gsap.to(".boxx5", {
        scrollTrigger: ".boxx5",
        y: -700,
        duration: 5,
        ease: "expo.out"
    })
    gsap.to(".boxx6", {
        scrollTrigger: ".boxx6",
        y: -700,
        duration: 5,
        ease: "expo.out"
    })
    gsap.to(".boxx7", {
        scrollTrigger: ".boxx7",
        y: -700,
        duration: 5,
        ease: "expo.out"
    })
    gsap.to(".boxx8", {
        scrollTrigger: ".boxx8",
        y: -700,
        duration: 5,
        ease: "expo.out"
    })
    gsap.to(".boxx9", {
        scrollTrigger: ".boxx9",
        y: -700,
        duration: 5,
        ease: "expo.out"
    })
    gsap.to(".boxx10", {
        scrollTrigger: ".boxx10",
        y: -700,
        duration: 5,
        ease: "expo.out"
    })
    gsap.to(".boxx11", {
        scrollTrigger: ".boxx11",
        y: -700,
        duration: 5,
        ease: "expo.out"
    })
    gsap.to(".boxx12", {
        scrollTrigger: ".boxx12",
        y: -700,
        duration: 5,
        ease: "expo.out"
    })
    gsap.to(".boxx13", {
        scrollTrigger: ".boxx13",
        y: -700,
        duration: 5,
        ease: "expo.out"
    })
    gsap.to(".boxx14", {
        scrollTrigger: ".boxx14",
        y: -700,
        duration: 5,
        ease: "expo.out"
    })
    gsap.to(".boxx15", {
        scrollTrigger: ".boxx15",
        y: -700,
        duration: 5,
        ease: "expo.out"
    })
    gsap.to(".boxx16", {
        scrollTrigger: ".boxx16",
        y: -700,
        duration: 5,
        ease: "expo.out"
    })
    gsap.to(".boxx17", {
        scrollTrigger: ".boxx17",
        y: -700,
        duration: 5,
        ease: "expo.out"
    })
    gsap.from('.p-name', {
        y: -50,
        stagger: 0.5,
        duration: 2
    })
}
projectPageAnimations();



loco();




