import { useState, useRef } from "react";
import { TiLocationArrow } from "react-icons/ti";
import "./features.css";

export const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!itemRef.current) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();

    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  return (
    <div
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

export const BentoCard = ({
  imgSrc,
  src,
  title,
  description,
  isComingSoon,
  content,
  Register_Link,
  More_Link,
}) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoverOpacity, setHoverOpacity] = useState(0);
  const hoverButtonRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!hoverButtonRef.current) return;
    const rect = hoverButtonRef.current.getBoundingClientRect();

    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const openPDF = (reflink) => {
    window.open(reflink, '_blank'); // Use the relative path if in public folder
  };

  const handleMouseEnter = () => setHoverOpacity(1);
  const handleMouseLeave = () => setHoverOpacity(0);

  return (
    <div className="card" id="events">
      <div className="relative size-full card_whole_body" id="register">
        <div className="cardBody">
          <div className="card__side card__side--front">
            <div className="card__theme">
              <video
                src={src}
                loop
                muted
                autoPlay
                className="absolute left-0 top-0 size-full object-cover object-center"
              />

              <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
                <div>
                  <h1 className="bento-title special-font">{title}</h1>
                  {description && (
                    <p className="mt-3 max-w-64 text-xs md:text-base">
                      {description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="card__side card__side--back">
            <div className="card__details">{content}</div>
          </div>
        </div>

        <div className="Buttons_cards">
          <a
            href={Register_Link}
            target="_blank"
            rel="noopener noreferrer"
            className="border-hsla relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-black px-5 py-2 text-xs uppercase text-white/20"
          >
            <div
              ref={hoverButtonRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
              style={{
                opacity: hoverOpacity,
                background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #656fe288, #00000026)`,
              }}
            />
            {/* <TiLocationArrow className="relative z-20" /> */}
            <p className="relative z-20 text-white btn_text_bento_card">Registration</p>
          </a>


          {/* More button */}
          <a
            onClick={() => openPDF(More_Link)}
            // href={More_Link}
            target="_blank"
            rel="noopener noreferrer"
            className="border-hsla relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-black px-5 py-2 text-xs uppercase text-white/20"
          >
            <div
              ref={hoverButtonRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
              style={{
                opacity: hoverOpacity,
                background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #656fe288, #00000026)`,
              }}
            />
            {/* <TiLocationArrow className="relative z-20" /> */}
            <p className="relative z-20 text-white btn_text_bento_card">More ...</p>
          </a>
        </div>
      </div>
    </div>
  );
};
const Features = () => (
  <section className="bg-black pb-52">
    <div className="container mx-auto px-3 md:px-10">
      <div className="px-5 py-32">
        <p className="font-circular-web text-lg text-blue-50">
          Into the events
        </p>
        <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50">
          Immerse yourself in a rich universe where a vibrant array of events
          are waiting for you.
        </p>
      </div>

      <BentoTilt className="border-hsla relative mb-7 w-full overflow-hidden rounded-md prepathon">
        <BentoCard
          src="/videos/prepathon.mp4"
          title={
            <>
              prep-<b>a</b>-thon
            </>
          }
          content="PREP-A-THON SAGA is a hackathon that focuses on basic interview aspects for the company to hire. This event will contain all the topics needed for preparation of a company. The questions will be as per the most simple and commonly asked questions in interviews, the event team will be responsible to integrate the questions in the gaming hackathon that is PREP-A-THON. There will be 6 stages to this Prep-a-thon:
          Aptitude 
          enigmaLogical 
          cascadeBingo 
          triviaTechsolve 
          crosswordDebugging 
          ParadoxCodeFlux"
          description="PREP-A-THON is a hackathon that focuses on basic interview aspects for the company to hire. This event will contain all the topics needed for preparation of a company. The questions will be set by the sponsor company."
          isComingSoon
          Register_Link="https://docs.google.com/forms/d/e/1FAIpQLSdwuA5TUWwnUkw2Q0ELgXnA4htv5xrpCYDRNbd2oAA4qKxEMg/viewform?usp=dialog"
          More_Link="/pdf/PREPATHON.pdf"
        />
      </BentoTilt>

      <div className="grid  w-full grid-cols-2 grid-rows-5 gap-7 main_card_body">
        <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2 cardL">
          <BentoCard
            src="videos/callofduty.mp4"
            title={
              <>
                project paragon & call <b>of</b> duty
              </>
            }
            content="Call of Duty Mobile Tournament

Gear up, Battleground Heroes! 🎮
Get ready for an adrenaline-pumping two-day showdown as we bring you the Call of Duty Mobile Tournament at our college event on 3rd & 4th Feb 2025. Brace yourself for high-octane Battle Royale action, where your skills and strategies will be put to the ultimate test.

Two ultimate champions will rise victorious"
            description="Come join us for the Battle Royale and show us your amazing gaming skills and win cash prizes."
            isComingSoon
            Register_Link="https://forms.gle/CzKoofPv3HKyayZp8"
            More_Link="/pdf/Callofduty.pdf"
          ></BentoCard>
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0 cardR">
          <BentoCard
            src="./videos/BGMI.mp4"
            title={
              <>
                BG<b>M</b>I
              </>
            }
            content="Hey Battleground Heroes! 🎮
Get ready for the thrill of a lifetime as we bring you the BGMI Tournament, one of the most exciting events of our college fest! Brace yourself for two days of high-octane Battle Royale action, where your skills and strategies will be put to the ultimate test.

Let the battlegrounds decide who truly reigns supreme!"
            description="Solve challenging clues and navigate through obstacles to win."
            isComingSoon
            Register_Link="https://forms.gle/VDLC3MzevbzS34EWA"
            More_Link="/pdf/IT_TECHNOBASH.pdf"
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0 cardL">
          <BentoCard
            src="videos/ff.mp4"
            title={
              <>
                <b>free fire</b>
              </>
            }
            content="FREE FIRE SHOWDOWN is a thrilling event that puts participants' gaming skills to the test in an intense battle for survival. In Round 1, players will compete in high-stakes matches, showcasing their strategy, accuracy, and quick decision-making. Only the top-performing players will advance to the next stage. In Round 2, the competition intensifies as finalists face off in a series of challenging battle royale rounds. Precision, teamwork, and survival instincts will determine the ultimate champion. FREE FIRE SHOWDOWN offers an adrenaline-fueled experience, bringing together gaming enthusiasts to prove their skills in the ultimate survival challenge."
            description="To showcase exceptional gaming skills through strategic battles and intense survival challenges."
            isComingSoon
            Register_Link="https://docs.google.com/forms/d/e/1FAIpQLScK4PLwI2rBWJOzr8qh9j9PSCyw95EzG9N7q9IrUcl6D3tU3A/viewform"
            More_Link="/pdf/FF.pdf"
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 ms-32 md:col-span-1 md:ms-0 cardR">
          <BentoCard
            src="videos/Digitalposter.mp4"
            title={<>Digital Poster Competition on Innovative Business Ideas</>}
            content="Are you brimming with creativity and innovation? Do you have a groundbreaking business idea that could transform industries or create a better future? Here's your chance to showcase your entrepreneurial spirit and creativity in the Digital Poster Competition on Innovative Business Ideas!"
            description="Come join us for a thrilling coding competition to solve challenging problems and showcase your programming skills."
            isComingSoon
            Register_Link="https://forms.gle/6kKnUmmhwVvz856x6"
            More_Link="/pdf/MBA.pdf"
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1  md:col-span-1  row-span-1 md:row-span-2 cardL">
          <BentoCard
            src="videos/ENTC1.mp4"
            title={
              <>
                Mr <b>B</b>EAST TECHNO GAMES
              </>
            }
            content="Each Team will be of two players.
Day 1:
Round 1: SQUID GAMES - Red Light, Green Light
Players must stop on Red Light and move on Green Light. Eliminated players restart.
Round 2: Weight Lifting
Teams must lift weights faster than others.
Round 3: Mini Games
Players with one leg tied compete in 4 mini-games. Faster times lead to advancement.

Day 2:
Round 1: Technical Challenge
Round 2: Elimination Round
Details of these rounds will be revealed on the day."
            description="Unleash your artistic creativity in this hands-on crafting event."
            isComingSoon
            Register_Link="https://forms.gle/oVmqPLC72wP2oy6a8"
            More_Link="/pdf/ENTC.pdf"
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0 cardR">
          <BentoCard
            src="./videos/tagitright.mp4"
            title={<>TAG IT RIGHT : HTML Challenges!</>}
            content="•	Creativity: Design visually appealing Webpages.
                    •	Technical Proficiency : Use advanced HTML 5 features like semantic elements, forms and multimedia.
                    •	Problem Solving : Implement a task using HTML with constraints or challenges"
            description="Build and program robots to compete in thrilling challenges."
            isComingSoon
            Register_Link="https://forms.gle/k1wVeQVZSXMveYnP7"
            More_Link="/pdf/MCA.pdf"
          />
        </BentoTilt>
        <BentoTilt className="bento-tilt_1 parallelchild row-span-1 md:col-span-1 md:row-span-2 cardL">
          <BentoCard
            src="videos/Civilcatwars.mp4"
            title={<>Cat-War</>}
            content="Each participant needs to draw a common given drawing in specified duration
                    Specific time will be provided to each participant. 
                    Slots will be conveyed on 3rd & 4th Feb 2025.
                    Jury will evaluated each participant’s drawing
                    Depending on number of participants, number of rounds will be decided
                    A final round will be conducted on 4th Feb 2025"
            description="Showcase your culinary skills and compete to win exciting prizes."
            isComingSoon
            Register_Link="https://docs.google.com/forms/d/e/1FAIpQLSfcSfgBbHdJDsTyb9tpqdKwlLEB8U4_aw9xrM7mPk6SE0h4dw/viewform?usp=header"
            More_Link="/pdf/CATWAR.pdf"
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 parallelchild row-span-1 ms-32 md:col-span-1 md:ms-0 md:row-span-1 cardR">
          <BentoCard
            src="videos/feature-3.mp4"
            title={<>Ecovision 2k25</>}
            content="Solutions for Plastic Pollution
                    * Our Land, Our Future: Generation Restoration
                    * Land Restoration: Desertification & Drought Resilience"
            description="Dive into the world of streaming and compete with your content creation skills."
            isComingSoon
            Register_Link="https://docs.google.com/forms/d/e/1FAIpQLSe-OYIghaqr8w6F-Qp77azcvYqz5E0MbbDLQT5FHZrf4zW63Q/viewform?usp=dialog"
            More_Link="https://technobash.shanacoder.com"
          />
        </BentoTilt>


      </div>
      <div className="grid w-full grid-cols-2 grid-rows-1 gap-7 main_card_body2 mt-[20px] h-fit">

      <BentoTilt className="bento-tilt_1 parallelchild row-span-1 md:col-span-1 md:row-span-1 cardL">
          <BentoCard
            src="videos/flash.mp4"
            title={<>flash</>}
            content="We will give you a chit with 5 clues you have to Find that And Take A Selfie With it. The team which will come within given time With clear Selfie including the Clues Will be Qualified For Next Round."
            description=""
            isComingSoon
            Register_Link="https://example.com/register1"
            More_Link="/pdf/newEvent1.pdf"
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 parallelchild row-span-1 ms-32 md:col-span-1 md:ms-0 cardR">
          <BentoCard
            src="videos/feature-4.mp4"
            title={<>project paragon </>}
            content="Project Paragon is a plaƞorm for students to showcase their innovaƟve projects and soluƟons across various domains, including ArƟficial Intelligence, Data Science, IoT, RoboƟcs, and more. The event is aimed at fostering creaƟvity, technical skills, and presentaƟon abiliƟes among parƟcipants."
            description=""
            isComingSoon
            Register_Link="https://docs.google.com/forms/d/e/1FAIpQLSd2L9pTWAy0P-evN5IAV99uXVd01vHNGMbg2-f3lhO5-f2khg/viewform"
            More_Link="/pdf/PP.pdf"
          />
        </BentoTilt>
      </div>
    </div>
  </section>
);

export default Features;