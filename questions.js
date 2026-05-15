/* ════════════════════════════════════════════════════════════
   BUILD THE ELECTRO BRICKS — questions.js
   Shared question bank used by both app.js and admin.js
   ════════════════════════════════════════════════════════════ */

"use strict";

window.ANALOG_QUESTIONS = [
  {
    id: "A1",
    text: `After the events of a massive global energy crisis, the Avengers Science & Technology Division launched a mission to bring sustainable electricity to remote regions across the world. Deep within the hilly terrain of Kudajharia Village, located 15 km away from the nearest town, the villagers have never experienced electric power. Due to steep mountains, dense forests, and dangerous terrain, building high-voltage transmission lines is nearly impossible — even for Stark Industries.
To solve this challenge, 
A team led by Chief Engineer Tony Stark and supported by Shuri from Wakanda installs a small-scale micro-hydroelectric generator near a fast-flowing mountain stream. The system powers around 50 households using alternating current (AC).
However, to ensure uninterrupted power during emergencies and to store energy for future use, the Avengers decide to charge a large battery backup system.
As the chief engineer of the mission, your task is to design a robust Single-Phase Full-Wave Bridge Rectifier that converts the AC output of the generator into usable DC power for battery storage

The Problem
Your task is to design a single-phase full-wave bridge rectifier to convert the AC output of the mini-generator into functional DC.`,
    images: ["Q1.png"]
  },
  {
    id: "A2",
    text: `2.	 A student at Stark Industries Lab builds a phone charger using a rectifier circuit for Spider-Man’s             emergency web shooter supply.
It charges, but suddenly:
•	the screen flickers, 
•	the charger heats up, 
•	and the output becomes unstable. 
Seeing this, Spider-Man:
“Dude, this charger is giving shock therapy, not charging”
Then Captain America asks the engineering team:
•	What solution in the circuit need to modify for better outcome?
`,
    images: ["Q2.png"]
  },
  {
    id: "A3",
    text: `3.	A smart city installs LED street lights using a power system designed by Rocket in Thor’s New Asgard technology lab. At night, the lights flicker rapidly and the brightness changes continuously.
After checking the system, Thor says:
“The supply is DC… but not stable DC!”
After resolving the problem, the voltage waveform shown appears in the above waveform. 
After checking current, it shows the above waveform.
•	What is causing this problem and What should be done to solve it? 
`,
    images: ["Q3.png"]
  },
  {
    id: "A4",
    text: `4.	Peter Parkar buys a cheap ring light online to record videos for the Avengers social media channel.
During recording:
The light flickers
The video quality looks terrible.
NOW, Frustratedly he says:
		“Mr. Stark… this is NOT Aesthetic”
Stark checks the setup and calls Bruce Banner to inspect the waveform on the monitor
And says:
“The light output isn’t stable. Something’s causing rapid    fluctuation”
Bruce Banner replies:
	“Looks like a classic flicker problem caused by unstable power delivery”

NOW answer:
1.	What is causing the flicker problem?
2.	Identify the waveform shown.
3.	What’s the solution of it?
`,
    images: ["Q4png.png"]
  },
  {
    id: "A5",
    text: `During the electronics lab demo at Stark Industries, Spider-Man suddenly notices that the bridge rectifier output is showing 0.0 V on the meter.
Spider-Man panics:
“Mr. Stark!! The output is ZERO Did I just destroy the whole circuit?!”
Tony Stark checks the bridge rectifier carefully and says:
“Relax, kid. Someone reversed one of the diodes in the bridge rectifier.”
Bruce Banner looks at the circuit diagram and explains:
“A bridge rectifier works only when all four diodes are connected in the correct direction. If even one diode is reversed, current flow gets blocked or the circuit path becomes incorrect.”
Spider-Man asks:
“So that’s why no DC output is coming?”
Bruce replies:
“Exactly. The rectification process fails, so the multimeter shows nearly zero output voltage.”
Tony Stark adds:
“In some cases, reversing a diode can even create a short-circuit path and damage the components. Always check diode polarity before powering the circuit.”
•	Rectification fails 
•	Current cannot flow properly 
•	Output voltage becomes nearly zero 
 What is the solution of it?

`,
    images: ["Q5.png"]
  },
  {
    id: "A6",
    text: `Inside the Stark Industries lab, Spider-Man connects a resistor in a communication circuit designed by Black Panther. During testing, the circuit overheats and the LED becomes dim.
Hawkeye laughs and says:
“You sure you read the resistor color bands correctly?”
Captain America checks the resistor and asks:
•	Determine the resistor value using the given color code bands. 
•	What happens if the wrong resistor value is connected in the circuit?
`,
    images: ["Q6.gif"]
  },
  {
    id: "A7",
    text: `During an emergency power crisis caused by Thanos, the Avengers set up a transformer inside the Wakandan defense lab to restore electricity for the city shield system. While Thor, Captain America, Black Panther, Spider-Man, and Doctor Strange monitor the setup, the transformer suddenly starts overheating and produces a loud humming sound.
Thor says:
“This machine sounds like it’s preparing for Ragnarok.”
Black Panther quickly checks the readings and asks:
•	What causes overheating and humming in a transformer? 
•	How can these problems be reduced?
`,
    images: []
  },
  {
    id: "A8",
    text: `After the events of Avengers: Endgame, Rocket, Ant-Man, Captain Marvel, Thor, and Black Panther work together in a temporary lab to repair a damaged Quantum Tunnel control circuit. During testing, warning alarms suddenly activate, the indicator lamp turns OFF, and the circuit output becomes zero.
Loki smirks and says:
“Perhaps Midgard technology is too fragile.”
Rocket immediately checks the circuit and notices that one diode has been connected in the wrong direction.
Captain Marvel asks the engineering team:
•	What happens when a diode is connected in reverse bias in a circuit?
•	How can the circuit be corrected?

`,
    images: []
  },
  {
    id: "A9",
    text: `Inside the Guardians’ spaceship, Rocket, Thor, Captain America, Black Widow, and Spider-Man are repairing the power control panel after a battle damaged the system. Suddenly, every screen starts turning ON and OFF repeatedly for a few seconds.
Spider-Man says:
“Why does the whole ship blink like a disco light whenever Thor touches the controls?”
Thor replies:
“I only used a little lightning.”
Rocket checks the circuit and notices a swollen capacitor on the board.
Black Widow asks:
•	What is the function of the capacitor in the circuit? 
•	If the capacitor becomes damaged or fails, what will be the solution of it?

`,
    images: []
  },
  {
    id: "A10",
    text: `During a mission at the Avengers headquarters, a sudden power failure shuts down the entire training arena while Spider-Man, Thor, Captain America, Black Panther, and Ant-Man are inside. Tony Stark quickly connects a transformer to restore emergency power for the system.
At first everything works normally, but after a few minutes:
•	the transformer becomes very hot, 
•	a loud humming sound starts, 
•	and the output voltage becomes lower than expected. 
Spider-Man says:
“Mr. Stark… the transformer sounds like it’s about to transform into a villain.”
Thor taps the transformer with Mjolnir and says:
“This tiny metal box struggles more than Loki.”
Tony Stark checks the readings and asks the engineering team:

What will be the solution, if transformer gets overheated and output becomes unstable?
`,
    images: []
  }
];

window.DIGITAL_QUESTIONS = [
  {
    id: "D1",
    text: `The Avengers Helicarrier Access System

A high-security S.H.I.E.L.D. Helicarrier control room has installed an advanced security system that opens only when the correct logical conditions are satisfied.

The system uses four verification modules:

A – Tony Stark AI facial authorization
B – S.H.I.E.L.D. access badge verification
C – Secret Avengers command code verification
D – Threat scanner detection

The control room unlocks under the following conditions:

If Tony Stark AI authorization and S.H.I.E.L.D. badge verification are both correct, the room opens only if the threat scanner detects no danger.
If the command code is correct but Tony Stark authorization fails, the room can still open only when the S.H.I.E.L.D. badge is correct.
If both Tony Stark authorization and the command code are correct, the room opens regardless of the threat scanner.
If the threat scanner detects danger, the room must remain locked unless both Tony Stark authorization and the command code are correct.

Task
Form the Boolean expression for the Helicarrier access system.`
  },
  {
    id: "D2",
    text: "The City Development Approval System\n\nIn a large metropolitan region, the city council plans infrastructure projects such as bridges, parks, and transport systems. However, the council does not directly decide whether a project should proceed. Instead, a computerized decision system collects signals from three influential advisory groups before giving the final approval.\n\n• The first signal A comes from the Traditional Planning Council, a group that represents long-established administrative members of the city.\n• The second signal B comes from the Reform Committee, a newer group that often proposes alternative approaches to development.\n• The third signal C comes from the Citizens' Review Board, which represents public opinion collected through surveys and civic meetings.\n\nThe computerized system follows a special rule. A project will be approved if both advisory groups A and B agree on it, since agreement between these two groups indicates strong stability in the decision.\nHowever, if the two advisory groups disagree, the system still allows the project to move forward if the Citizens' Review Board supports the project and at least one of the advisory groups also supports it.\nIf none of these conditions are satisfied, the project is rejected by the system.\n\nTasks:\n Identify the Boolean expression representing the approval output F."
  },
  {
    id: "D3",
    text: "The Event Permission Monitoring Network\n\nA city uses an automated monitoring network to manage large public gatherings. Because the city often experiences simultaneous activities from different social organizations, the administration built a digital system that decides whether an event permit should be granted.\n\nThree sensors provide signals to the system:\n• X indicates that Organization X has announced a large gathering.\n• Y indicates that Organization Y has announced a large gathering.\n• Z indicates that the city security department has issued a safety alert.\n\nThe city administration has observed that if both organizations plan gatherings at the same time, managing the crowd becomes extremely difficult. Therefore, the permit system is designed to allow an event only when exactly one organization plans a gathering.\nHowever, even if only one organization plans an event, the system will not allow the permit if the security department has issued a safety alert.\nOnly when one and only one organization is planning a gathering and there is no security alert will the system automatically issue the permit.\n\nTasks:\n Write the Boolean expression for the permit output P.\n"
  },
  {
    id: "D4",
    text: "The Debate Broadcast Controller\n\nA major broadcasting network organizes live debates between representatives of two influential civic groups. These debates are extremely popular among viewers and help citizens understand different viewpoints on public issues.\nThe broadcasting studio operates using an automated system that decides whether the live transmission should begin. \n\nThree digital signals are used as inputs to the system.\n• Signal A becomes 1 when the representative of Group A arrives at the studio.\n• Signal B becomes 1 when the representative of Group B arrives.\n• Signal M becomes 1 when the moderator responsible for managing the debate is present in the studio.\n\nThe broadcasting policy states that a debate can only be aired if the moderator is present, because discussions cannot proceed without supervision.\nAdditionally, at least one representative from either group must be present for the debate to make sense.\nIf the moderator is absent, the broadcast must never start regardless of the representatives' presence. If the moderator is present and at least one representative arrives, the system will begin the live broadcast.\n\nTasks: \nDerive the Boolean expression for the broadcast signal F.\n"
  },
  {
    id: "D5",
    text: "The Regional Opinion Analyzer\n\nA research institute conducts surveys across three major zones of a large region: the northern zone, the central zone, and the southern zone. Each zone sends a digital signal indicating whether the majority of respondents in that area support a new policy proposal.\n\nThe signals are defined as follows:\n• P = 1 if the northern zone supports the proposal\n• Q = 1 if the central zone supports the proposal\n• R = 1 if the southern zone supports the proposal\n\nTo maintain fairness, the institute decided that a proposal should be considered popular only if at least two regions support it. If support comes from fewer than two regions, the proposal will be classified as lacking sufficient public backing.\nA digital circuit is used to automatically evaluate the three signals and generate the final output indicating whether the proposal is widely supported.\n\nTasks:\nA) Develop the Boolean expression for the output F.\n"
  },
  {
    id: "D6",
    text: "The Surprise Gift Plan\n\nRahul wants to surprise his girlfriend Neha with a special gift. However, the surprise should only happen under specific circumstances so that it remains meaningful.\n\nThe system monitoring the plan has three inputs:\nR = Rahul has bought the gift\nN = Neha is at home\nF = Neha's best friend is present to help organize the surprise\n\nThe surprise celebration will occur if Rahul has the gift and Neha is home.\nHowever, if Neha is not at home yet, the surprise can still proceed if Rahul has the gift and her friend is present to help set up everything before Neha arrives.\nIf Rahul hasn't bought the gift, the plan obviously cannot happen.\n\nTasks:\nDetermine the Boolean expression for output S (surprise happens).\n"
  },
  {
    id: "D7",
    text: "The Study Date\n\nTwo college students, Aman and Riya, often meet in the library for study sessions. However, they only meet when certain conditions make the meeting productive.\n\nThree conditions are monitored:\n• A = Aman has completed his assignments\n• R = Riya has completed her assignments\n• L = The library is open\n\nTheir rule is simple:\nThe study session happens only if the library is open and at least one of them has completed their assignments so that they can help the other person.\nIf the library is closed, the meeting is automatically cancelled.\n\nTasks\nA) Write the Boolean expression for output F (study date occurs).\n"
  },
  {
    id: "D8",
    text: "The Apology Detector\n\nAfter a small argument, Kunal and Tara decide to reconcile only when genuine effort is shown. Their friends jokingly design a \"reconciliation detector\" circuit to determine when things are likely to be resolved.\n\nThree signals are used:\n• K = Kunal apologizes\n• T = Tara apologizes\n• C = A close friend encourages them to talk\n\nThe reconciliation signal becomes 1 only when exactly two of these signals are active. This means that reconciliation is most likely when:\nOne of them apologizes and the friend encourages them, or Both apologize without outside intervention.\nIf all three signals occur at the same time or fewer than two occur, the detector does not activate.\n\nTasks:\nWrite the Boolean expression for the reconciliation output F.\n"
  },
  {
    id: "D9",
    text: "The Multiverse Portal Controller\n\nDoctor Strange has built a digital controller that determines when it is safe to open a portal to another dimension.\n\nThe controller receives three signals:\n• S = Sorcerer Hero is concentrating on the portal\n• W = Witch Hero is stabilizing the energy field\n• V = Vision Unit confirms dimensional stability\n\nThe portal can open if:\nBoth S and W are stabilizing the portal together, OR\nVision confirms stability and at least one of the two heroes is assisting.\nIf none of these conditions are satisfied, the portal must remain closed to prevent a multiverse catastrophe.\n\nTasks:\n Write the Boolean expression for output Portal.\n"
  },
  {
    id: "D10",
    text: "The Avengers Team Assembly Signal\n\nBefore launching a major operation, Avengers headquarters uses an automated signal to determine whether the team assembly meeting should start.\n\nThree signals are monitored:\n• H = Hulk has arrived at headquarters\n• B = Archer Hero has arrived\n• M = The meeting coordinator has arrived\n\nThe meeting should only begin if the coordinator is present, because without coordination the meeting cannot proceed.\nIn addition, at least one Avenger must be present for the meeting to be meaningful.\nIf the coordinator is absent, the meeting cannot start even if the Avengers arrive.\n\nTasks:\n Derive the Boolean expression for output Meeting.\n"
  }
];
