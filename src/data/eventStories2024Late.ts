type EventStory = {
  summary: string;
  paragraphs: string[];
  speakers?: string[];
  venue?: string;
  highlights?: string[];
  sourceLabel: string;
  sourceUrl?: string;
};

export const EVENT_STORIES_2024_LATE: Record<string, EventStory> = {
  "soldering-practice-and-arduino-basics": {
    summary: "First-year students practised safe soldering and explored Arduino fundamentals with the Control Systems Society.",
    paragraphs: [
      "This day-long Control Systems Society session introduced first-year students to the tools and techniques behind small electronics projects. Prof. Adarsh S R led the programme, supported by seventh-semester students Muhammad Ans and Jomon Jose.",
      "The workshop covered soldering terminology, how the process works, and safe handling before moving into Arduino basics and examples. Questions were welcomed throughout the day, allowing students to connect the introductory material with projects they could attempt next. The event report records 62 attendees.",
    ],
    speakers: ["Prof. Adarsh S R", "Muhammad Ans", "Jomon Jose"],
    venue: "EEE Computer Lab, Sahrdaya College of Engineering and Technology",
    highlights: ["Safe soldering practice", "Arduino fundamentals and examples", "62 attendees recorded"],
    sourceLabel: "IEEE Sahrdaya 2024 annual report, pp. 213–214",
  },
  "ai-workshop-by-brainbrix": {
    summary: "A hands-on GenAI Sprint with BrainBrix introduced students to generative AI and application building.",
    paragraphs: [
      "The NEC IIT Bombay Cell joined ACES, IEEE Computer Society and IEDC Sahrdaya for a one-day generative AI workshop. BrainBrix co-founders Gobish Gopalakrishnan and Gayathri Krishnan, together with branding strategist Dhruvil P Soni, led the sessions.",
      "The programme combined foundational generative AI concepts with practical application-building activities. Held in the AI Lab from 10 AM to 4 PM, it gave Computer Science students an opportunity to work directly with the visiting team and explore how the technology is used in industry. Forty participants are recorded in the event report.",
    ],
    speakers: ["Gobish Gopalakrishnan", "Gayathri Krishnan", "Dhruvil P Soni"],
    venue: "AI Lab, Main Block, Sahrdaya College of Engineering and Technology",
    highlights: ["Generative AI foundations", "Hands-on application building", "40 participants recorded"],
    sourceLabel: "IEEE Sahrdaya 2024 annual report, pp. 210–212",
  },
  "resilient-adaptive-electrical-systems-net-zero": {
    summary: "An inter-branch La Guerre 2.0 talk explored smart grids, energy management and resilient systems for net-zero buildings.",
    paragraphs: [
      "IEEE IES Sahrdaya collaborated with the IAS chapter at RSET and PELS chapters at CCE and KMEA for this online technical session under La Guerre 2.0. Mohammed Sajin S, a Chartered Engineer and State Council Member of the Institution of Engineers India, was the resource person.",
      "The discussion connected net-zero energy buildings with the electrical infrastructure needed to support them. Smart grids, adaptive electrical systems and energy-management technologies were central topics. The programme ran on Google Meet from 7 PM to 8 PM, with 50 attendees recorded across IEEE members and non-members.",
    ],
    speakers: ["Mohammed Sajin S"],
    venue: "Google Meet",
    highlights: ["Net-zero energy buildings", "Smart grids and energy management", "Collaboration across four student chapters"],
    sourceLabel: "IEEE Sahrdaya 2024 annual report, pp. 208–209",
  },
  "augmented-reality-using-unity": {
    summary: "A two-day Unity workshop helped third-year Computer Science students build their foundations in augmented reality.",
    paragraphs: [
      "The Computer Science and Engineering department, IIIC and IEEE Computer Society organised this workshop on 8 and 9 October. Elwin Jose, Technical Support Analyst at SOTI India, guided students through Unity and its use in augmented-reality applications.",
      "The sessions focused on practical experience alongside the foundational concepts needed to start building AR applications. The workshop was coordinated by Joel Dygy and Betty Elza John, with 52 students recorded in attendance.",
    ],
    speakers: ["Elwin Jose"],
    venue: "Room 3206, Decennial Block, Sahrdaya College of Engineering and Technology",
    highlights: ["Two-day workshop", "Unity fundamentals", "AR application-building practice"],
    sourceLabel: "IEEE Sahrdaya 2024 annual report, pp. 206–207",
  },
  "web-development-using-angular": {
    summary: "SOTI developers led two parallel practical Angular sessions for third-year Computer Science students.",
    paragraphs: [
      "Held over 8 and 9 October, this two-day workshop was organised by the Computer Science and Engineering department with IIIC and IEEE Computer Society. Isham Mohamed and Jobel Johny from SOTI India led sessions in the Computer Centre and AI Lab respectively.",
      "Both groups worked on foundational Angular concepts and practical web-application development. The programme connected classroom learning with the tools and approaches used by working software developers. The two workshop records list 56 and 50 participants, covering the parallel groups rather than separate events.",
    ],
    speakers: ["Isham Mohamed", "Jobel Johny"],
    venue: "Computer Centre and AI Lab, Main Block, Sahrdaya College of Engineering and Technology",
    highlights: ["Two days of Angular development", "Parallel workshop groups", "Practical web-application building"],
    sourceLabel: "IEEE Sahrdaya 2024 annual report, pp. 202–205",
  },
  "techx-infinia": {
    summary: "Three days of workshops, product thinking, a hackathon, technology expos and community experiences at Sahrdaya.",
    paragraphs: [
      "TechX Infinia brought students together at Sahrdaya College of Engineering and Technology from 27 to 29 September 2024 around the theme ‘Where Imagination Meets Technology’. The programme moved from personal branding and leadership on the opening day to hands-on technical workshops, followed by a hackathon, expos and a pre-university STEM experience.",
      "The workshop tracks covered generative AI, machine learning, cloud computing, cybersecurity, robotics, drones, Web3, Flutter and robotic process automation. Participants could work with visiting practitioners, ask questions and try the tools themselves. Cultural performances and informal activities made room for connections beyond the technical sessions.",
      "The final day combined a product-design talk with four hackathon tracks, a treasure hunt and demonstrations of robotics, remote-controlled cars, drones and origami. Bridge the Gap welcomed school students into the same environment, introducing them to machine learning and the technology exhibits.",
      "Robin Francis, Derick Davies and Sankardas Devadas coordinated the event with a team of 15 leads and 55 volunteers. The report records 300 registrations, including 186 IEEE members and 114 non-members. The individual sessions are collected below as parts of this one flagship event.",
    ],
    venue: "Sahrdaya College of Engineering and Technology, Kodakara",
    highlights: ["27–29 September 2024", "300 registrations recorded", "Nine technical workshop tracks", "Four-track hackathon and technology expos", "Pre-university STEM programme"],
    sourceLabel: "IEEE Sahrdaya 2024 annual report, pp. 128–200",
  },
  "design-on-electric-vehicle": {
    summary: "D. Navin Sam introduced battery and motor modelling for electric vehicles using MATLAB Simulink.",
    paragraphs: [
      "IEEE IAS Sahrdaya, PELS GECT, IAS Jyothi Engineering College and the IEEE IA/IE/PELS Joint Chapter Kerala collaborated on this online introduction to electric-vehicle design. D. Navin Sam, an Assistant Professor in EEE at Jyothi Engineering College, led the session.",
      "The presentation explored how MATLAB Simulink can be used to model and simulate electric-vehicle systems, including batteries, motors and motor components. The hour-long programme closed with questions from the audience, giving students a chance to clarify modelling concepts and their applications. The report records 56 participants.",
    ],
    speakers: ["D. Navin Sam"],
    venue: "Google Meet",
    highlights: ["Electric-vehicle modelling", "Battery and motor simulation", "Audience questions and discussion"],
    sourceLabel: "IEEE Sahrdaya 2024 annual report, pp. 126–127",
  },
  "ias-membership-development": {
    summary: "LAUNCHPAD brought partner chapters together to discuss IEEE membership, recruitment and member retention.",
    paragraphs: [
      "The LAUNCHPAD membership-development session was jointly organised by IAS Sahrdaya, PELS Government Engineering College Thrissur, IAS Jyothi Engineering College and the IEEE IA/IE/PELS Joint Chapter Kerala. It ran on Google Meet from 7:30 PM to 8:30 PM.",
      "Akash G. Nair and Greeshma V from the Kerala joint chapter discussed why students join IEEE and how chapters can support an active membership community. Topics included introducing new members to opportunities, keeping existing members involved and practical membership-development approaches.",
    ],
    speakers: ["Akash G. Nair", "Greeshma V"],
    venue: "Google Meet",
    highlights: ["LAUNCHPAD joint-chapter session", "Member recruitment and retention", "IEEE opportunities for students"],
    sourceLabel: "IEEE Sahrdaya 2024 annual report, pp. 124–125",
  },
  "orientation-session": {
    summary: "An interactive introduction to IEEE for first-year students, combining membership opportunities with icebreakers.",
    paragraphs: [
      "IEEE Sahrdaya welcomed first-year students to an orientation in the Multipurpose Indoor Stadium. Coordinated by Robin Francis and Krishnapriya K, the afternoon programme introduced IEEE's mission and the ways students could take part in branch activities.",
      "Students explored technical resources, international connections and professional-networking opportunities available through the community. Icebreaking activities encouraged them to interact with one another instead of only listening to a presentation. The report records 450 first-year attendees; this is an attendance figure, not a count of new memberships.",
    ],
    venue: "Multipurpose Indoor Stadium, Sahrdaya College of Engineering and Technology",
    highlights: ["First-year orientation", "Interactive icebreaking", "450 attendees recorded"],
    sourceLabel: "IEEE Sahrdaya 2024 annual report, pp. 122–123",
  },
  "skill-sharing-matlab": {
    summary: "A peer-supported MATLAB introduction for first-year students, covering formulas, basic operations and applications.",
    paragraphs: [
      "The Control Systems Society hosted a full-day MATLAB skill-sharing session in the EEE Computer Lab. Prof. Adarsh S R worked with senior students Jomon Jose, Muhammad Ans and Austin Mathew to introduce first-year participants to the software.",
      "The session focused on MATLAB fundamentals and using formulas within the application. Students could ask questions throughout the programme and discuss how these skills might be used in future projects. The event record lists 55 participants.",
    ],
    speakers: ["Prof. Adarsh S R", "Jomon Jose", "Muhammad Ans", "Austin Mathew"],
    venue: "EEE Computer Lab, Sahrdaya College of Engineering and Technology",
    highlights: ["MATLAB basics", "Working with formulas", "Peer-supported learning"],
    sourceLabel: "IEEE Sahrdaya 2024 annual report, pp. 120–121",
  },
  "ai-and-its-future": {
    summary: "Computer Science students took an introductory AI session to higher-secondary students at St. Joseph E.M.H.S.S., Aloor.",
    paragraphs: [
      "This educational outreach programme was organised by the Computer Science and Engineering department with IEEE Computer Society Sahrdaya. Five seventh-semester students visited St. Joseph E.M.H.S.S., Aloor, to lead a session on ‘AI and Its Future’.",
      "Adwaith Jayasankar, Ajith John, Alan Roy, Anand C and Delvin P B introduced artificial-intelligence fundamentals and discussed the technology's possible implications across different fields. The programme connected college-level technical learning with a school audience, giving higher-secondary students an accessible starting point for exploring AI.",
    ],
    speakers: ["Adwaith Jayasankar", "Ajith John", "Alan Roy", "Anand C", "Delvin P B"],
    venue: "St. Joseph E.M.H.S.S., Aloor",
    highlights: ["School outreach", "AI fundamentals and future applications", "Student-led technical communication"],
    sourceLabel: "IEEE Sahrdaya 2024 annual report, pp. 118–119",
  },
  "git-and-github-workshop": {
    summary: "A practical introduction to Git, open-source contribution and building a useful GitHub profile.",
    paragraphs: [
      "The Computer Science and Engineering department, TinkerHub and IEEE Computer Society joined hands for a one-day Git and GitHub workshop. Adwaith Jayashankar, GDG on Campus Sahrdaya Lead, guided the sessions.",
      "The workshop introduced version control and its relevance to collaborative software development. Participants gained practical experience with Git and explored open-source contribution and GitHub profiles. Sana Muhammed Sahi and Vivek K J coordinated the programme, which records 30 participants.",
    ],
    speakers: ["Adwaith Jayashankar"],
    venue: "Lab 3, Decennial Block, Sahrdaya College of Engineering and Technology",
    highlights: ["Git and version-control foundations", "Open-source contribution", "GitHub profile development"],
    sourceLabel: "IEEE Sahrdaya 2024 annual report, pp. 116–117",
  },
  "latex-training": {
    summary: "Biomedical Engineering students practised creating technical documents and mathematical notation in LaTeX.",
    paragraphs: [
      "The Computer Science and Engineering department and IEEE Computer Society organised this training for Biomedical Engineering students. Sonu Bijoy and Pyari M from ASAP introduced LaTeX as a tool for academic and professional document preparation.",
      "Students moved from an introduction to the system into hands-on document creation, including mathematical equations and notation. The programme was coordinated by Dr. Manishankar S and took place in the final-year Biomedical Engineering classroom. Forty-five participants are recorded in the report.",
    ],
    speakers: ["Sonu Bijoy", "Pyari M"],
    venue: "Final-year Biomedical Engineering classroom, Bio Block, Sahrdaya",
    highlights: ["Hands-on document creation", "Equations and mathematical notation", "Academic typesetting"],
    sourceLabel: "IEEE Sahrdaya 2024 annual report, pp. 114–115",
  },
  "kickstart-ctf": {
    summary: "Beginner and intermediate teams tackled cybersecurity puzzles in an INFORMATYKA 4.0 Capture the Flag competition.",
    paragraphs: [
      "Kickstart CTF brought together TinkerHub, IEEE Computer Society Kerala Chapter and Women in Computing Committees from SCET, CCE, GEC and RSET. Teams of up to three worked through cybersecurity puzzles and scenarios designed for beginner-to-intermediate participants.",
      "Each team was required to include at least one female member. The competition offered a ₹3,000 prize pool, with Team Archers, Team Heisters and Team M_M's taking the top three positions. The event report records 57 participants across IEEE members and non-members.",
    ],
    venue: "Sahrdaya College of Engineering and Technology",
    highlights: ["INFORMATYKA 4.0", "Teams of up to three", "₹3,000 prize pool", "Winners: Archers, Heisters and M_M's"],
    sourceLabel: "IEEE Sahrdaya 2024 annual report, pp. 111–113",
  },
  "ar-vr-bootcamp": {
    summary: "Five days of AR/VR theory and hands-on development with trainers from TILTEDU.",
    paragraphs: [
      "The Computer Science and Engineering department and IEEE Computer Society Sahrdaya hosted a five-day bootcamp from 5 to 9 August. TILTEDU trainers Akhilesh K S and Ajith Kumar S V guided the programme in the Accenture Lab.",
      "The bootcamp combined theoretical foundations with practical AR/VR development, exploring how immersive technologies can be used across industrial domains. Nineteen participants are recorded in the report. Derick Davies and Mahesh M coordinated the programme.",
    ],
    speakers: ["Akhilesh K S", "Ajith Kumar S V"],
    venue: "Accenture Lab, Bio Block, Sahrdaya College of Engineering and Technology",
    highlights: ["5–9 August 2024", "AR/VR development practice", "Industrial applications of immersive technology"],
    sourceLabel: "IEEE Sahrdaya 2024 annual report, pp. 109–110",
  },
  "genx-stellar": {
    summary: "A GenX quiz celebrating women whose work shaped technology and space exploration.",
    paragraphs: [
      "WIE Sahrdaya hosted ‘Stellar Women in Tech’ as part of the GenX quiz series. Participants joined through Quizizz at 7 PM to answer questions about pioneering women in technology, astronauts, historical milestones and recent innovations.",
      "The quiz paired friendly competition with recognition of contributions that can be overlooked in technical histories. Robin Francis, Krishnapriya K, Joshna B Ann and Sneha Prasanth coordinated the programme. The event record lists 33 participants.",
    ],
    venue: "Quizizz",
    highlights: ["Women in technology and space", "Historical milestones and innovations", "33 participants recorded"],
    sourceLabel: "IEEE Sahrdaya 2024 annual report, pp. 107–108",
  },
  "genx-signal-savvy": {
    summary: "A real-time Quizizz challenge on the basics of signals and signal processing.",
    paragraphs: [
      "The Signal Processing Society chapter hosted Signal Savvy as part of GenX. Forty-one participants tested their understanding of signals and signal-processing fundamentals in an online quiz.",
      "Live scoring and a leaderboard gave participants a way to compare their understanding with peers, while the questions provided a short revision of foundational concepts. Top performers were recognised at the end of the competition. Robin Francis, Nidhin Biju V, Siona Sabu and Leya Rose Shaji coordinated the event.",
    ],
    venue: "Quizizz",
    highlights: ["Signals and signal-processing basics", "Live leaderboard", "41 participants recorded"],
    sourceLabel: "IEEE Sahrdaya 2024 annual report, pp. 105–106",
  },
  "genx-luma": {
    summary: "The Photonics chapter's GenX quiz revisited light, optical fibres, quantum concepts and light theories.",
    paragraphs: [
      "LUMA invited students to test their understanding of light through an online Quizizz competition. The questions covered optical fibres, quantum ideas and different theories of light, connecting familiar classroom topics with photonics.",
      "Amala Jigo, Anvin P J and Aleena Mathews coordinated the quiz. The report records 34 participants and notes that winners were announced through the Photonics chapter's Instagram page.",
    ],
    venue: "Quizizz",
    highlights: ["Optical fibres and light theories", "Quantum concepts", "34 participants recorded"],
    sourceLabel: "IEEE Sahrdaya 2024 annual report, pp. 103–104",
  },
  "genx-biomedley": {
    summary: "A GenX technical quiz connecting biotechnology and biomedical engineering.",
    paragraphs: [
      "The Engineering in Medicine and Biology Society chapter contributed BioMedley to the GenX series. The online quiz brought together questions from biotechnology and biomedical engineering rather than focusing on a single discipline.",
      "Christin Sunil coordinated the hour-long Quizizz event. The attendance record lists 31 IEEE members and 14 non-members, bringing the total to 45 participants.",
    ],
    venue: "Quizizz",
    highlights: ["Biotechnology and biomedical engineering", "Part of the GenX quiz series", "45 participants recorded"],
    sourceLabel: "IEEE Sahrdaya 2024 annual report, pp. 101–102",
  },
  "session-on-ar-vr": {
    summary: "TILTEDU introduced students to immersive technology and the upcoming AR/VR bootcamp.",
    paragraphs: [
      "The Computer Science and Engineering department, IEEE Computer Society and TILTEDU organised an information session on augmented and virtual reality. Akhilesh K S and Naveen Sankar introduced the technologies and discussed their applications.",
      "The initial online session on 22 July was aimed at seventh-semester students and helped explain what they could explore through the forthcoming bootcamp. The report also records an in-person introduction for third- and fifth-semester students on 8 August. These were awareness sessions, distinct from the five-day hands-on bootcamp.",
    ],
    speakers: ["Akhilesh K S", "Naveen Sankar"],
    venue: "Online session and Sahrdaya campus",
    highlights: ["AR/VR applications", "Bootcamp introduction", "Online and in-person student sessions"],
    sourceLabel: "IEEE Sahrdaya 2024 annual report, pp. 99–100",
  },
  "genx-eduquest": {
    summary: "An Education Society quiz on how education has evolved over time.",
    paragraphs: [
      "EduQuest Trivia was the Education Society chapter's contribution to GenX. Forty-six participants joined the Quizizz competition at 7 PM to test their knowledge of ‘The Evolution of Education’.",
      "The quiz formed part of the wider series in which participants competed for rewards including a ticket to IEEE Young Engineers Summit and goodies. Antony took the top position in EduQuest. Hridya Suresh and Aldrin Sojan P coordinated the programme.",
    ],
    venue: "Quizizz",
    highlights: ["Evolution of education", "46 participants recorded", "EduQuest winner: Antony"],
    sourceLabel: "IEEE Sahrdaya 2024 annual report, pp. 97–98",
  },
  "genx-bit-2-byte": {
    summary: "The opening GenX quiz challenged members on artificial intelligence and data structures and algorithms.",
    paragraphs: [
      "Bit-2-Byte Trivia opened a six-quiz GenX series hosted by different IEEE Sahrdaya chapters. The Computer Society's round focused on AI and DSA, with 54 IEEE members recorded in attendance.",
      "Participants competed on Quizizz and accumulated points on the series leaderboard, working towards prizes including a ticket to IEEE YESS. Alan, Amrutha Lakshmi and Alferi Shaju were the top three in this round. Derick Davis and Vishnu Gopal coordinated the quiz.",
    ],
    venue: "Quizizz",
    highlights: ["Artificial intelligence and DSA", "Opening round of the GenX series", "Winners: Alan, Amrutha Lakshmi and Alferi Shaju"],
    sourceLabel: "IEEE Sahrdaya 2024 annual report, pp. 95–96",
  },
  "cybersecurity-in-iot": {
    summary: "An INFORMATYKA 4.0 talk examined vulnerabilities and security challenges in connected devices and IoT networks.",
    paragraphs: [
      "IEEE Computer Society Kerala Chapter partnered with the Women in Computing Committees of SCET, CEC, GEC and RSET for this virtual session. Riyaz Ahmed, a research scholar at VIT-AP University, was the resource person.",
      "The discussion focused on why cybersecurity matters in the Internet of Things, the vulnerabilities connected systems can introduce and the challenges of protecting networks and devices. The event brought students, faculty and professionals into a common discussion and records 149 attendees.",
    ],
    speakers: ["Riyaz Ahmed"],
    venue: "Google Meet",
    highlights: ["IoT vulnerabilities", "Network and device security", "INFORMATYKA 4.0 collaboration"],
    sourceLabel: "IEEE Sahrdaya 2024 annual report, pp. 93–94",
  },
  "codex-scientific-computing-python": {
    summary: "A five-day faculty-development programme on using Python in scientific computing, teaching and research.",
    paragraphs: [
      "The Computer Science and Engineering department and IEEE Computer Society organised this faculty-development programme from 1 to 5 July. Sessions ran each morning in Main Block Lab 1.",
      "Dr. Sreeraj R, Dr. Krishnadas J and Livya George led the programme, with Priya K V and Sreejith P S coordinating it. The focus was on the skills and knowledge faculty could use to integrate Python into scientific-computing courses and research activities. Thirty participants are recorded in the report.",
    ],
    speakers: ["Dr. Sreeraj R", "Dr. Krishnadas J", "Livya George"],
    venue: "Main Block Lab 1, Sahrdaya College of Engineering and Technology",
    highlights: ["1–5 July 2024", "Faculty development", "Python for scientific computing"],
    sourceLabel: "IEEE Sahrdaya 2024 annual report, pp. 91–92",
  },
  "github-copilot": {
    summary: "GitHub's Ambily K K introduced AI-assisted development and GitHub Copilot in Visual Studio.",
    paragraphs: [
      "‘Discover the Future with GitHub Copilot’ was an online technical session hosted by IEEE Sahrdaya. Ambily K K, Senior Cloud Solutions Engineer at GitHub, introduced the AI-driven development tools available through Copilot.",
      "The session explored how developers could use the tools in their coding workflow, including problem-solving and building their technical portfolios. It ran from 11:30 AM to 12:30 PM on Google Meet and records 45 participants. Robin Francis coordinated the programme.",
    ],
    speakers: ["Ambily K K"],
    venue: "Google Meet",
    highlights: ["AI-assisted coding", "GitHub Copilot in Visual Studio", "45 participants recorded"],
    sourceLabel: "IEEE Sahrdaya 2024 annual report, pp. 89–90",
  },
  "enhancer-resume": {
    summary: "IEEE Kochi Hub volunteers shared practical ways to improve resumes and professional profiles.",
    paragraphs: [
      "IEEE Sahrdaya collaborated with IEEE Kochi Hub for ENHANCER: Resume. Manu C Madhu, Anshuman Biju and Mrudul John Mathews led the one-hour evening session on Microsoft Teams.",
      "The speakers discussed how to make professional resumes more effective and create a clearer first impression in the job market. The interactive format gave attendees space to ask questions and consider changes to their own profiles. The attendance record lists 234 participants, including 176 IEEE members and 58 non-members.",
    ],
    speakers: ["Manu C Madhu", "Anshuman Biju", "Mrudul John Mathews"],
    venue: "Microsoft Teams",
    highlights: ["Resume and profile improvement", "IEEE Kochi Hub collaboration", "234 participants recorded"],
    sourceLabel: "IEEE Sahrdaya 2024 annual report, pp. 87–88",
  },
  "infoshare": {
    summary: "A multi-week Instagram knowledge-sharing initiative for the IEEE community.",
    paragraphs: [
      "InfoShare ran from 25 June to 15 July as a sequence of informational Instagram posts. Instead of a single live session, the initiative used regular visual updates to share useful topics with the wider community.",
      "Robin Francis coordinated the programme for IEEE Sahrdaya. Its format encouraged people to engage with information in smaller pieces over several weeks and take part in knowledge sharing through the branch's social channel.",
    ],
    venue: "IEEE Sahrdaya Instagram",
    highlights: ["25 June–15 July 2024", "Visual information posts", "Community knowledge sharing"],
    sourceLabel: "IEEE Sahrdaya 2024 annual report, pp. 85–86",
  },
  "echelon": {
    summary: "The student branch executive committee reviewed earlier activities and planned upcoming flagship events.",
    paragraphs: [
      "Echelon was an online executive-committee meeting led by Robin Francis. Twenty-seven IEEE members joined the one-hour Google Meet session to review the branch's recent work and discuss what should come next.",
      "The discussion combined planning for forthcoming flagship events with a review of strengths and areas for improvement in previous programmes. Members shared ideas, feedback and possible approaches, making this a working session for the volunteer team rather than a public technical workshop.",
    ],
    speakers: ["Robin Francis"],
    venue: "Google Meet",
    highlights: ["Executive-committee planning", "Review of previous activities", "27 members recorded"],
    sourceLabel: "IEEE Sahrdaya 2024 annual report, pp. 83–84",
  },
  "wie-climate-innovation-pitch": {
    summary: "Six teams pitched climate and sustainability ideas, received feedback and competed on innovation and feasibility.",
    paragraphs: [
      "The WIE Climate Innovators Pitch ran from 19 to 22 June, giving teams a platform to present solutions to environmental challenges. Six teams took part, with 20 IEEE members recorded in attendance.",
      "Teams presented their ideas, answered judges' questions and received feedback for improvement. Evaluation considered originality, feasibility, potential climate or sustainability impact, and the clarity of each presentation. The report records the selection of a winning team, but does not name that team or its proposal.",
    ],
    venue: "Google Meet",
    highlights: ["Six teams", "Climate and sustainability ideas", "Judges' questions and feedback", "Innovation, feasibility and impact criteria"],
    sourceLabel: "IEEE Sahrdaya 2024 annual report, pp. 81–82",
  },
};

export const INFINIA_SESSION_STORIES: Record<string, { summary: string; speakers?: string[] }> = {
  "infinia-inaugural-ceremony": {
    summary: "Benny Behanan MP inaugurated the flagship event. IEEE Kerala Section MDC Chair Jithin K Jose and Sahrdaya's leadership addressed the gathering, opening three days of technical learning and collaboration.",
    speakers: ["Benny Behanan", "Jithin K Jose", "Dr. Nixon Kuruvila"],
  },
  "infinia-personal-branding": {
    summary: "Sarika Nair from IBM discussed professional identity, online presence, networking and continuous skill development. Audience questions connected the advice with participants' own career plans.",
    speakers: ["Sarika Nair"],
  },
  "infinia-igniting-leader": {
    summary: "Babu Sanker S led games and team activities that helped delegates introduce themselves, communicate and work together. The icebreaking session connected leadership with collaboration and problem-solving.",
    speakers: ["Babu Sanker S"],
  },
  "infinia-musical-night": {
    summary: "Sreerag Menon and Sreerag's Collectives performed at the end of the opening day, bringing delegates together for a shared cultural programme after the talks and icebreakers.",
    speakers: ["Sreerag Menon and Sreerag's Collectives"],
  },
  "infinia-webtrix": {
    summary: "Sai Poorna and Satish Chandra Chowdary Yadlapalli explored Web3, decentralised applications and blockchain beyond cryptocurrency, with examples from finance and healthcare and an audience Q&A.",
    speakers: ["Sai Poorna", "Satish Chandra Chowdary Yadlapalli"],
  },
  "infinia-cre-8-ai": {
    summary: "Dr. Anil Raj introduced generative-model architecture, training data and practical applications. Participants explored AI tools and models and collaborated on mini-projects with guidance from the IBM team.",
    speakers: ["Dr. Anil Raj"],
  },
  "infinia-aerox": {
    summary: "Participants explored drone design, assembly, sensors, control and aerodynamics with Arshif Thumbil and Mohamed Maheen. Hands-on building was paired with questions about calibration, stability and flight control.",
    speakers: ["Arshif Thumbil", "Mohamed Maheen"],
  },
  "infinia-robolve": {
    summary: "Anil Antu and Limna Rin M introduced robotics applications in industry and education. Demonstrations, hands-on activities and questions connected robotics with problem-solving, student projects and possible careers.",
    speakers: ["Anil Antu", "Limna Rin M"],
  },
  "infinia-cloudify": {
    summary: "Vipin Madhummal introduced cloud-computing concepts and AWS through demonstrations. Participants then worked on an employee-management system to connect the concepts with a practical application.",
    speakers: ["Vipin Madhummal"],
  },
  "infinia-cybarmor": {
    summary: "Rinto M Prince and Alex Davy from Redteam Hacker Academy discussed the dark web, VPN use and examples of cyberattacks, giving participants context for protecting systems and data.",
    speakers: ["Rinto M Prince", "Alex Davy"],
  },
  "infinia-flut-drive": {
    summary: "GADS LLP's Abhishek V M and Gokul C M led an introduction to cross-platform Flutter development. Practical activities covered widget trees, state and API integration.",
    speakers: ["Abhishek V M", "Gokul C M"],
  },
  "infinia-opimaml": {
    summary: "Don C John guided students from machine-learning fundamentals to building and training a model. The hands-on workflow covered data preparation, training and evaluation using datasets.",
    speakers: ["Don C John"],
  },
  "infinia-rpa-forge": {
    summary: "Alen Paul, Alphy Ann George and Melbin T L introduced robotic process automation with UiPath. Participants explored workflows and created automation bots to understand practical business-process applications.",
    speakers: ["Alen Paul", "Alphy Ann George", "Melbin T L"],
  },
  "infinia-membership-development": {
    summary: "Robin Francis introduced the technical resources, professional networks and skill-development opportunities available through IEEE, helping delegates understand how to take part in the student community.",
    speakers: ["Robin Francis"],
  },
  "infinia-essentials-of-life": {
    summary: "RJ Paulsy used humour and audience discussion to explore balance between personal wellbeing, professional growth and social connections, with an emphasis on supporting one another.",
    speakers: ["RJ Paulsy"],
  },
  "infinia-cultural-night": {
    summary: "Rhythmic Squad performed in the auditorium before delegates moved to the football ground for a Lantern Fest, closing the second day with dance and a shared cultural experience.",
  },
  "infinia-product-design": {
    summary: "Vishal Nair explored the move from a Minimum Viable Product to a Minimum Lovable Product, focusing on user empathy, feedback and design iteration through examples and discussion.",
    speakers: ["Vishal Nair"],
  },
  "infinia-hackathon": {
    summary: "Seventy-nine students competed across Artificial Intelligence, Blockchain/Web3, Circuit Showdown and General tracks. Teams developed solutions within the daytime challenge; the report records ₹60,000 distributed across prize categories.",
  },
  "infinia-robotics-expo": {
    summary: "The exhibition combined robotic soccer with student-built underwater robots. Visitors could interact with the soccer robots and watch aquatic demonstrations while discussing the engineering behind them.",
  },
  "infinia-origami-expo": {
    summary: "Origami displays connected creative paper folding with precision and mathematical ideas. Interactive exhibits invited visitors to explore the relationship between art, geometry and engineering.",
  },
  "infinia-rc-car-expo": {
    summary: "Remote-controlled cars were demonstrated through displays and racing activities, introducing visitors to vehicle mechanics, customisation and the possibilities of remote-control technology.",
  },
  "infinia-drone-expo": {
    summary: "Drone displays and practical demonstrations introduced visitors to aerial technology and its applications, alongside conversations about design and possible uses of drone systems.",
  },
  "infinia-puzzlers": {
    summary: "Teams followed clues, puzzles and riddles around the venue in a treasure hunt run with IEEE Puzzlers. The challenge combined shared problem-solving with exploration of the event space.",
  },
  "infinia-bridge-the-gap": {
    summary: "School students explored the robotics, origami, remote-control and drone exhibits, then joined a machine-learning basics session with Dr. Sreeraj R. The report records 100 students in this pre-university STEM programme.",
    speakers: ["Dr. Sreeraj R"],
  },
  "infinia-awards-closing": {
    summary: "The closing ceremony recognised hackathon teams and reflected on the three-day programme. College and branch representatives spoke about collaboration, learning and the work contributed by participants and volunteers.",
    speakers: ["Dr. Nixon Kuruvila", "Dr. Manishankar S", "Dr. Asha S", "Dr. Sreeraj R", "Anil Antony", "Robin Francis"],
  },
};
