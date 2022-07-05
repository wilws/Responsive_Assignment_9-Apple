let counter =1;

const sections = document.querySelectorAll("section");                // Select each section in array form
// const menu = document.querySelector(".menu");
const section1wrapper = document.querySelector(".section-1-wrapper"); // Select the front page.
const section5wrapper = document.querySelector(".section-5-wrapper");

section1wrapper.style.transform = "scale(1)";                         // Re-scale back the front page when landing


// Progress 
const progress = document.querySelector(".progress h2");             // Select progress h2 (1/5 ,2/5, etc)
const circles = document.querySelectorAll(".circle");
const progressCounter = () => {
    progress.textContent = `${counter}/${sections.length}`;

    circles.forEach((circle) => {
        circle.style.backgroundColor = "transparent";
    });
    document.querySelector(`.circle-${counter}`).style.backgroundColor = "#ddd"; //  Change to a very light shade of gray
};
// End of Progress 


// Page Control
const pageController = () => {

  let bool = true;                                         // telling caller function that the counter is within 1 to 5
                              
  if (counter > 5) {                                       // If counter > 5 (i.e. about to moved beyond the section 5)
    sections.forEach((section) => {                        // all sections' left =0, means all the sections re-appears, ordered by z-index
      section.style.left = "0";
    });

    counter = 1;                                           // Re-Set counter 1 to 0 , (set the section to be viewed as section-1)
    section1wrapper.style.transform = "scale(1)";          // Scale back section 1 wrapper (ready to display it)
    section5wrapper.style.transform = "scale(1.5)";        // Scale section 5 wrapper 
    bool = false;                                          // Set bool to fasle, telling caller that the counter is >5
  }



  if (counter < 1) {                                       // If counter1 < 1 (i.e.about to move backward beyond the section-1)
    sections.forEach((section) => {                        
        if (section.classList[0] === "section-5") {        // If it loops to  "section-5", 
        return;                                            // skip it ( as we want to keep section-5 to appear on screen )
      }
      section.style.left = "-100vw";                       // except "section-5", all sections are removed from view by pushing beyond the left
    });

    counter = 5;                                           // Re-Set counter to 5, (set to section-5)
    section1wrapper.style.transform = "scale(1.5)";        // Scale section-1 wrapper 
    section5wrapper.style.transform = "scale(1)";          // Scale back section 5 wrapper (ready to display it)
    bool = false;                                          // Set bool to fasle, telling caller  that the counter is < 1
  }
  progressCounter();
  return bool;
};

// End of Page Control


let inProgress = false
window.addEventListener("wheel", (e) => {
  const deltaY = e.deltaY > 0;    //i.e.  deltaY positive = finger up(move to next section) ; 
                                  //i.e.  deltaY negative = finger down (back to previous page) 

  if (!inProgress) {              // If no "section changing action" is in progress

        inProgress = true         // set flag stop triggering any "section change action" before the completion of the change of the current section.

        if (deltaY) {
            counter++;        
        } else {
            counter--;
        }

        if (pageController()){   // Check if counter is < 1  OR  >5. Return true if the current section is NOT section-1 or section-5
        
            if (deltaY) {          // deltaY positive = finger up(move to next section) ; 
                pageMoveForward(counter);
            } else {     // deltaY negative = finger down (back to previous page) 
                pageMoveBackward(counter);
            }
        }

        setTimeout(()=>{              // Prevent further triggering of wheel event before the completion of current action
                inProgress = false    // Reset flag after 2s (i.e. change page action complete)
        }, 1500);

  } else {
      console.log('transition not yet finish')
  }
});

// Page Move forward / backward
const pageMoveBackward = (counter)=>{
    //  (i.e. NOT about to move backward beyond section-1)
    document.querySelector(`.section-${counter}`).style.left = "0";                              // display in-coming section
    document.querySelector(`.section-${counter}-wrapper`).style.transform ="scale(1)";           // scale back in-coming section
    document.querySelector(`.section-${counter + 1}-wrapper`).style.transform ="scale(1.5)";     // scale up the out-going section
};

const pageMoveForward = (counter) =>{
    // (i.e. NOT about to move beyond section-5 )
    document.querySelector(`.section-${counter-1}`).style.left = "-100vw";                   // remove out-going section
    document.querySelector(`.section-${counter}-wrapper`).style.transform = "scale(1)";      // Scale back in-coming section
    document.querySelector(`.section-${counter-1}-wrapper`).style.transform = "scale(1.5)";  // Re - Scale back out-going section
};

// End of Page Move forward / backward


// forward & backward Buttons
document.querySelector(".left-btn").addEventListener("click", () => {
  counter--;
  if (pageController()){     // Check if counter is < 1 (current section is 1). Return true if the current section is NOT section-1
    // (i.e. NOT about to move backward beyond section-1)
    pageMoveBackward(counter);
  } 
});

document.querySelector(".right-btn").addEventListener("click", () => {
    counter++;
    if (pageController()){     // Check if counter is > 5 (current section is 5). Return true the current section is NOT section-5
        // (i.e. NOT about to move beyond section-5 )
        pageMoveForward(counter);
    }
});
// End of forward & backward Buttons

document.querySelector(".grapes-img").addEventListener("mouseover", () => {
  document.querySelector(".section-3-wrapper").style.opacity = ".5";
});

document.querySelector(".grapes-img").addEventListener("mouseout", () => {
  document.querySelector(".section-3-wrapper").style.opacity = "1";
});

// menu.addEventListener("click", () => {
//   document.querySelector(".navbar").classList.toggle("change");
// });