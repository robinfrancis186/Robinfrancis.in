export type EventStory = {
  summary: string;
  paragraphs: string[];
  speakers?: string[];
  venue?: string;
  highlights?: string[];
  sourceLabel: string;
  sourceUrl?: string;
};

const sourceLabel = "IEEE Sahrdaya Student Branch Annual Report 2024";

export const EVENT_STORIES_2024: Record<string, EventStory> = {
  "membership-drive": {
    summary: "Classroom conversations introduced students to IEEE resources, professional networks and opportunities to volunteer.",
    paragraphs: ["The branch took its membership campaign into individual classrooms, reaching students beyond the first year. Robin Francis explained how membership connects students with technical resources, activities and a wider engineering community.", "The campaign ran over three days beginning on 6 February. More than 500 students participated and expressed interest, according to the annual report; this is an engagement figure, not a count of completed memberships."],
    speakers: ["Robin Francis"], venue: "Sahrdaya College classrooms", sourceLabel,
  },
  "ar-vr-workshop": {
    summary: "Third-year computer science students explored augmented and virtual reality through a day of practical activities.",
    paragraphs: ["IEEE Computer Society brought Kerala ASAP's AR/VR trainer Suryadev D to campus for a workshop running from 10:00 AM to 3:30 PM. ASAP programme coordinator Pyary supported the session.", "Students worked through activities that introduced immersive technology beyond classroom theory, with opportunities to interact with the trainer and explore AR/VR in practice."],
    speakers: ["Suryadev D"], sourceLabel,
  },
  "deep-learning-workshop": {
    summary: "A two-day introduction to deep learning paired explanations with practical examples for third-year computer science students.",
    paragraphs: ["Arvin Jeostus led the Computer Society workshop on 13 and 14 February. The programme focused on making deep learning concepts approachable through guided examples and activities.", "The event brought together 62 participants. Its emphasis was on learning by doing and connecting the concepts to students' academic work, rather than only listening to a lecture."],
    speakers: ["Arvin Jeostus"], sourceLabel,
  },
  "machine-learning-workshop": {
    summary: "Dr. Anju Pratap led two days of machine learning training for third-year computer science students.",
    paragraphs: ["The Computer Society workshop introduced machine learning with guidance from Dr. Anju Pratap of Saintgits College of Engineering. Kerala ASAP's Vinay C Mathew and Pyarylan supported the class arrangements and learning sessions.", "Sixty students took part in the training on 13 and 14 February. The programme gave students a structured opportunity to explore machine learning with an academic specialist."],
    speakers: ["Dr. Anju Pratap"], venue: "Decennial Block, Sahrdaya", sourceLabel,
  },
  "quiz-b": {
    summary: "The second Quiz-B edition tested students on artificial intelligence in bioengineering using the Slido quiz platform.",
    paragraphs: ["IEEE EMBS Sahrdaya organised an online technical quiz connecting AI with biomedical applications. Twenty-one participants joined the session, answering questions through Slido.", "Every participant received an e-certificate, while the three highest scorers received a special mention. The format offered a short, interactive way to explore a topic shared by computing and biomedical engineering."],
    venue: "Online, Slido", sourceLabel,
  },
  "pcb-workshop-kicad": {
    summary: "A hands-on KiCad workshop took students from schematic capture to PCB placement, routing and design validation.",
    paragraphs: ["IEEE Circuits and Systems Society and the Electronics and Communication Engineering department hosted Prof. Jagadeesh Kumar P from Model Engineering College, alongside MEC students Harish Hari and Aparna M Sunil.", "Participants worked directly with KiCad to explore the stages of PCB design. Guided exercises and questions covered schematic capture, component placement, routing and validation, giving students a practical starting point for their own hardware projects."],
    speakers: ["Prof. Jagadeesh Kumar P", "Harish Hari", "Aparna M Sunil"], venue: "Accenture Lab, Bio Block", sourceLabel,
  },
  "grand-100th-day-rtl-challenge": {
    summary: "The 100RTL Days Challenge concluded with a book release, participant recognition and a hands-on RTL design session.",
    paragraphs: ["IEEE CASS Sahrdaya marked the challenge's hundredth day with Dr. Sreelal S of ISRO and Dr. Subrahmanyam Mula of IIT Palakkad. The programme included the release of the challenge edition, certificate distribution and a participant's account of the learning journey.", "Dr. Mula led a technical class and set a grand challenge. Students also interacted with the speakers about RTL coding, which describes the behaviour of digital circuits before implementation."],
    speakers: ["Dr. Sreelal S", "Dr. Subrahmanyam Mula"], venue: "Accenture Lab, Sahrdaya", sourceLabel,
  },
  "annual-general-meeting": {
    summary: "The branch welcomed its new leadership, recognised volunteer service and introduced its new branch counsellor.",
    paragraphs: ["Robin Francis opened the 2024 Annual General Meeting in the Accenture Lab. The gathering recognised former advisers Dr. R. Sundar and Dr. R. Satheesh Kumar, and acknowledged Robin's Outstanding Student Volunteer Award 2023.", "Principal Dr. Nixon Kuruvila announced Anil Antony as the new branch counsellor. Former student leaders Safa Abdul Salaam and Jeslin Joshy welcomed the incoming executive committee and shared guidance for its year of volunteering."],
    venue: "Accenture Lab, Bio Block", highlights: ["64 IEEE members attended", "Leadership handover and recognition of service"], sourceLabel,
  },
  "biomed-insight": {
    summary: "First-year biomedical engineering students explored the field's specialisms, career options and scope through a talk and quiz.",
    paragraphs: ["IEEE EMBS Sahrdaya and the Biomedical Engineering department designed BioMed Insight as an introduction for new students. The session covered different areas within biomedical engineering and the kinds of jobs they can lead to.", "A quiz at the end checked participants' understanding, with a prize for the winner. The afternoon programme brought together 43 students in the biomedical classroom."],
    venue: "Biomedical Engineering classroom, Main Block", sourceLabel,
  },
  "riseher": {
    summary: "A day of talks, performances and conversations celebrated women's achievements and encouraged students to pursue their interests.",
    paragraphs: ["RiseHER combined a membership development session by Robin Francis with RJ Paulsy's interactive spotlight session. The programme also recognised women heads of department and created space for participants to share their talents.", "After lunch, performances and icebreaking activities were followed by a talk from Kalanilayam Gayathri Padmanabhan about pursuing one's passions. The day closed with participant feedback and a group photograph."],
    speakers: ["RJ Paulsy", "Kalanilayam Gayathri Padmanabhan", "Robin Francis"], venue: "Multimedia Conference Room, Knowledge Centre", sourceLabel,
  },
  "robotics-process-automation": {
    summary: "Students used UiPath Studio to automate a familiar workflow: logging into ET Lab and retrieving previous results.",
    paragraphs: ["Merlin Joseph of TCS introduced robotic process automation and its industry applications in the morning. Alen Paul of Novigo Solutions joined the practical session after lunch.", "Working on systems with UiPath Studio installed, participants practised automating the student-profile login and results retrieval process. The workshop connected a real campus workflow with the tools used in business automation."],
    speakers: ["Alen Paul", "Merlin Joseph"], venue: "CS Lab 2, Main Block", sourceLabel,
  },
  "efficient-linkedin-workshop": {
    summary: "A practical online session covered stronger LinkedIn profiles, professional networking and staying active on the platform.",
    paragraphs: ["Yashin Majeed Afsal, a robotics trainer at RoboChamps and mechatronics student at REVA University, guided participants through headlines, summaries and work-experience sections.", "The discussion extended to connecting with industry peers and joining relevant groups. A question-and-answer session let students ask about their own profiles and networking choices."],
    speakers: ["Yashin Majeed Afsal"], venue: "Google Meet", highlights: ["94 participants", "Profile writing, networking and questions"], sourceLabel,
  },
  "path-to-internationalization": {
    summary: "Final-year students explored international internships, research collaborations and postgraduate study with Shone Jose.",
    paragraphs: ["Shone Jose, then chair of the IEEE Kerala Section Student Activities Committee, discussed how students could approach international opportunities and use IEEE's wider network.", "The session invited questions about internships, research and higher studies. Three hundred students attended the one-hour programme, making it an opportunity to compare possible routes beyond graduation."],
    speakers: ["Shone Jose"], venue: "Multipurpose Indoor Stadium", sourceLabel,
  },
  "unleash-your-power": {
    summary: "Executive committee training introduced volunteers to IEEE funding, scholarships, awards, networking and event reporting.",
    paragraphs: ["Shone Jose led the training for the incoming executive committee, focusing on active participation in IEEE and opportunities for personal and professional development.", "The programme included vTools training alongside discussion of funding and recognition opportunities. A closing question-and-answer session let volunteers clarify how to apply the information in their branch roles."],
    speakers: ["Shone Jose"], venue: "Accenture Lab, Bio Block", highlights: ["56 IEEE members attended", "Two-hour volunteer training programme"], sourceLabel,
  },
  "python-machine-learning-internship": {
    summary: "A collaboration with Revertech IT Solutions combined online Python and machine learning training with an offline internship and project.",
    paragraphs: ["Beginning on 22 March, the programme included 15 days of online training followed by two offline internship days and project work. Mentors supported participants through practical exercises and questions.", "The programme concluded on 13 May, with 44 participants recorded in the annual report. The mixed format connected guided learning with the experience of working on projects."],
    venue: "Google Meet and Revertech IT Solutions", sourceLabel,
  },
  "power-transformer-design-talk": {
    summary: "Reji John from TELK introduced the design, manufacture and testing of power transformers.",
    paragraphs: ["The Control Systems Society session connected electrical engineering concepts with industrial practice. Reji John, head of engineering at TELK, discussed how power transformers move through design, manufacturing and testing.", "The talk brought together 105 students at the Multipurpose Indoor Stadium. It offered a view of transformer engineering from someone working directly in the industry."],
    speakers: ["Reji John"], venue: "Multipurpose Indoor Stadium", sourceLabel,
  },
  "optiq": {
    summary: "An online optics quiz challenged students on light, optical instruments and related physical phenomena.",
    paragraphs: ["The Photonics chapter organised Optiq as a technical knowledge challenge. Questions explored core optics concepts and the behaviour and properties of light.", "Thirty-five students participated. The competition provided an accessible way to revisit optics outside a conventional lecture."],
    venue: "Online", sourceLabel,
  },
  "wie-triathlon": {
    summary: "Three colleges teamed up for a three-day challenge combining a current-affairs quiz, group discussion and stress interview.",
    paragraphs: ["IEEE WIE groups from RSET, SSET and SCET collaborated with IEEE WIE Kerala Section for the online Triathlon. The first evening tested current-affairs knowledge, including technology and wider developments.", "Day two moved into group discussions, and the final day used simulated high-pressure interview scenarios. The sequence challenged knowledge, communication and composure in different settings."],
    venue: "Google Meet", highlights: ["1 April: current-affairs quiz", "2 April: group discussions", "3 April: stress interviews"], sourceLabel,
  },
  "reel-it-up": {
    summary: "A short-video competition gave engineering students a platform to practise videography and editing.",
    paragraphs: ["The Control Systems Society team, led by Benit Joseph, invited students to tell stories through reels. The competition focused on creative media-making alongside technical study.", "Three winners were selected and the reels were shared on social platforms including Facebook and Instagram. Prize money added a competitive element to the exercise."],
    sourceLabel,
  },
  "openai-business-impact-talk": {
    summary: "Microsoft's Lijo George discussed generative AI, its business applications and the changing landscape of job opportunities.",
    paragraphs: ["The Computer Science and Engineering department and IEEE Computer Society hosted Lijo George, then India Enterprise Sales Head for Data and AI Solutions at Microsoft. The session was intended for fourth-, sixth- and eighth-semester CSE students.", "The talk connected generative AI with future market trends. Students followed it with questions about the technology and its implications for their careers."],
    speakers: ["Lijo George"], venue: "Multipurpose Indoor Stadium", sourceLabel,
  },
  "elementos": {
    summary: "A campus treasure hunt evolved into a coding and Capture the Flag challenge for 25 three-person teams.",
    paragraphs: ["Seventy-five participants began with riddles, puzzles and a scavenger hunt, supported by around 30 volunteers. The Computer Society combined movement around campus with technical problem-solving.", "Ten teams progressed to the coding round and five reached the Capture the Flag final. Team Archers, Team Kidilam and Team Heisters were listed as the winners, with Team M&M and Team Kronos as runners-up."],
    venue: "Sahrdaya campus and CS labs", highlights: ["25 teams and 75 participants", "Riddles, puzzles, scavenger hunt, coding and CTF"], sourceLabel,
  },
  "basics-game-development": {
    summary: "A peer-led game development workshop encouraged participants to move from playing games to building them.",
    paragraphs: ["Rishikesh and Anandjith T J from SSET led the hands-on online workshop as part of WiEmerge. IEEE WIE Kerala Section and the WIE groups of RSET, SSET and SCET collaborated on the programme.", "The session introduced practical game-making skills and gave enthusiasts a place to explore their ideas with student mentors. The annual report records 157 participants."],
    speakers: ["Rishikesh", "Anandjith T J"], venue: "Google Meet", sourceLabel,
  },
  "vtools-session": {
    summary: "A focused volunteer workshop explained how to keep IEEE event records current in vTools.",
    paragraphs: ["Branch secretary Devika T V guided executive committee members through updating event information in vTools. The session explained why consistent reporting matters for branch activities.", "Fourteen volunteers joined the one-hour online session and could ask questions as the workflow was demonstrated. It was designed around a practical task they would repeat throughout the year."],
    speakers: ["Devika T V"], venue: "Google Meet", sourceLabel,
  },
  "take-off": {
    summary: "Ribin Mathew explored mechatronics at the intersection of mechanical engineering, electronics and computing.",
    paragraphs: ["The webinar looked at the role of mechatronics in robotics, automotive engineering, aerospace and manufacturing. Examples connected the interdisciplinary subject to real engineering applications.", "The discussion also covered career paths such as systems integration and robotics design. Fifty-one participants joined the session to explore where these combined skills can lead."],
    speakers: ["Ribin Mathew"], venue: "Online", sourceLabel,
  },
  "edusphere": {
    summary: "Students designed presentations imagining the future of educational technology in the Education Week contest.",
    paragraphs: ["IEEE Sahrdaya and NIT Calicut student branches invited students across Kerala to create presentations on ‘Journeying into tomorrow's EdTech’. Entries were submitted online during the 14–20 April programme.", "Forty-three students participated. Afreen M H from Sahrdaya won the contest and its ₹500 prize, recognising both the ideas and the way they were communicated visually."],
    venue: "Online", sourceLabel,
  },
  "eli5": {
    summary: "An educational-video contest challenged students to explain AI or quantum mechanics as simply as they would to a five-year-old.",
    paragraphs: ["The Education Week collaboration with NIT Calicut invited participants to turn complex ideas into accessible teaching videos. Students could choose between AI and quantum mechanics.", "Adwaith Jayasanker of Sahrdaya won the contest and the ₹500 prize. The challenge celebrated clarity and inventive teaching rather than technical vocabulary alone."],
    venue: "Online", sourceLabel,
  },
  "innovate-ed": {
    summary: "An Education Week idea-pitching contest asked students to propose innovative solutions for equal access to education.",
    paragraphs: ["Sahrdaya and NIT Calicut student branches opened the online competition to students across Kerala. Participants submitted written proposals addressing the theme ‘Innovative Solutions for Equal Education’.", "The contest recorded 43 participants. Al ImtiYas from Sree Chitra Thirunal College of Engineering, Thiruvananthapuram, won the ₹500 prize."],
    venue: "Online", sourceLabel,
  },
  "trailblazer": {
    summary: "The Emerging Trailblazer Award brought together idea pitching, presentation design and teaching, followed by a finalist interview.",
    paragraphs: ["The Education Society used performances in InnovateEd, EduSphere and ELI5 to shortlist six participants. Together, the activities tested ideas for equal education, visual communication and the ability to explain a difficult subject simply.", "The shortlisted students attended a formal online interview. Adwaith Jayasankar of Sahrdaya received the Emerging Trailblazer Award and a ₹750 prize."],
    venue: "Google Meet", sourceLabel,
  },
  "watts-up": {
    summary: "A poster competition invited students to visualise sustainable transportation through original design.",
    paragraphs: ["IEEE PES Sahrdaya collaborated with GECT and MEC student branches on Watts Up, a poster competition about sustainable transportation. Robin Francis coordinated the Sahrdaya activity.", "Entries were assessed for creativity, visual impact and how clearly they communicated the sustainability theme. The competition connected design skills with a conversation about the future of transport."],
    venue: "Online", sourceLabel,
  },
  "sparkfix": {
    summary: "A problem-solving competition challenged teams to develop creative responses to engineering scenarios under time constraints.",
    paragraphs: ["IEEE PES Sahrdaya collaborated with IEEE MEA Student Branch Chapter on Sparkfix. Robin Francis coordinated the Sahrdaya activity.", "Teams worked through challenging scenarios and compared possible approaches. Twenty participants were recorded, with the exercise focused on analytical thinking and inventive solutions."],
    venue: "Online", sourceLabel,
  },
  "prompt-pulse": {
    summary: "Eighty-four participants used DreamStudio to respond to image-based challenges in a timed prompt-engineering competition.",
    paragraphs: ["Prompt Pulse was part of the IEEE Kerala Section Students Technical Consortium 2024. Participants received four sets of images and used the AI image tool DreamStudio within a one-hour session.", "Each submission had to include its prompt and screenshots for verification. The format made the creative process visible, not just the final generated result."],
    venue: "Online, DreamStudio", sourceLabel,
  },
  "powerpack": {
    summary: "An IAS webinar combined smart-grid and renewable-energy discussions with IEEE membership and travel-grant guidance.",
    paragraphs: ["Dr. Shashank Vyas discussed smart grids, renewable-energy integration and regulatory frameworks. Akshay O R followed with IEEE membership benefits, while Abel J M introduced travel-grant opportunities.", "The programme ended with an industry-knowledge quiz. Its mix of technical discussion and professional opportunities brought 155 participants into the same conversation."],
    speakers: ["Dr. Shashank Vyas", "Akshay O R", "Abel J M"], venue: "Google Meet", sourceLabel,
  },
};
