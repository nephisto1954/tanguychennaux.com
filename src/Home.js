import React from "react";
import Mountain from './Mountain'

// import {gsap} from 'gsap'
// import {ScrollTrigger} from "gsap/src/ScrollTrigger";


export default function Home() {
    
//     gsap.registerPlugin(ScrollTrigger)

//     const intro = document.getElementById("intro");
//     const project = document.getElementById("project");
//     const contact = document.getElementById("contact");
//     const wrap = document.getElementById("wrap");

//     if (wrap){
//         gsap.to(wrap, {
//             delay: 2.8,
//             top: "-100%",
//             ease: "expo.inOut"
//         });
//     }


//     // let o = {a:0}
//     // gsap.to(o,{
//     //     a: 1,
//     //     scrollTrigger: {
//     //         trigger:'.wrap',
//     //         markers: true,
//     //         start: 'top top',
//     //         end: 'bottom bottom',
//     //         onUpdate: (self)=>{
//     //             console.log(self.progress);
//     //         }
//     //     }
//     // })

    return (
        <div>
            <Mountain className="model" />
            {/* <div id="wrap">
                <section className="section" id="intro">
                    <h1>
                    I am a Front-End Developer looking for my next role, preferably involving 3D technologies (three and Blender).
                    </h1>
                </section>
                <section className="section" id="project">
                    <h1>
                    Whilst working for Mumsnet, I was the lead developer for their Alexa Skill. Try Mumsnet Pregnancy Advice. It's free, fun and informative.
                    </h1>
                </section>
                <section className="section" id="contact">
                    <h1>
                    The best way to get in touch with me is via my Linkedin profile.
                    </h1>
                </section>
            </div> */}
        </div>
    );
}
