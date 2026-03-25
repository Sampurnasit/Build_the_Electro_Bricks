/* ════════════════════════════════════════════════════════════
   BUILD THE ELECTRO BRICKS — questions.js
   Shared question bank used by both app.js and admin.js
   ════════════════════════════════════════════════════════════ */

"use strict";

window.ANALOG_QUESTIONS = [
  {
    id: "A1",
    text: "A BJT is configured in common-emitter mode with RC = 4.7 kΩ and RE = 1 kΩ. Given β = 100 and VCC = 12 V, calculate the Q-point (ICQ, VCEQ) and the small-signal AC voltage gain.",
  },
  {
    id: "A2",
    text: "Design a second-order Butterworth low-pass active filter with a cutoff frequency of 1 kHz using an op-amp. Determine all component values and draw the circuit schematic.",
  },
  {
    id: "A3",
    text: "An op-amp (LM741) is wired in inverting configuration with R1 = 10 kΩ and Rf = 100 kΩ. Input is a 0.5 V peak sinusoid at 500 Hz. Calculate the closed-loop gain, sketch the output waveform, and state the phase relationship.",
  },
  {
    id: "A4",
    text: "Explain the working principle of a Wien Bridge Oscillator. Derive the expression for the frequency of oscillation and state the gain condition required for sustained, undistorted oscillation.",
  },
  {
    id: "A5",
    text: "A full-wave bridge rectifier with a capacitor filter is powered by a 12 V RMS transformer. For RL = 1 kΩ and C = 1000 μF, calculate the DC output voltage, peak-to-peak ripple voltage, and ripple factor.",
  },
  {
    id: "A6",
    text: "Compare Class A, Class B, and Class AB power amplifiers. Discuss their biasing strategies, theoretical maximum efficiency, crossover distortion characteristics, and typical application areas.",
  },
  {
    id: "A7",
    text: "Design a Colpitts oscillator to generate a signal at 455 kHz. Specify the inductor and capacitor values, draw the circuit, and explain the positive feedback mechanism that sustains oscillation.",
  },
  {
    id: "A8",
    text: "An LM741 op-amp is configured as a non-inverting Schmitt trigger with R1 = 10 kΩ and R2 = 100 kΩ and ±15 V supply rails. Calculate the Upper Threshold Point (UTP) and Lower Threshold Point (LTP), and draw the complete transfer characteristic (hysteresis curve).",
  },
];

window.DIGITAL_QUESTIONS = [
  {
    id: "D1",
    text: "The Security Vault System\n\nA high-security research lab has installed a digital vault that opens only when the correct logical conditions are satisfied.\nThe vault uses four sensors:\n\nA – Biometric authentication\nB – Access card verification\nC – PIN code verification\nD – Motion detector clearance\n\nThe vault unlocks when the following conditions are satisfied:\nIf biometric authentication and access card verification are both correct, the vault opens only if the motion detector shows no threat.\nIf PIN verification is correct but biometric fails, the vault can still open only when the access card is correct.\nIf both biometric and PIN are correct, the vault opens regardless of the motion detector.\nIf motion detector detects threat, the vault must remain locked unless both biometric and PIN are correct.\n\nTasks\n1. Form the Boolean expression for the vault unlocking system.\n2. Implement the simplified circuit using only NAND gates."
  },
  {
    id: "D2",
    text: "The City Development Approval System\n\nIn a large metropolitan region, the city council plans infrastructure projects such as bridges, parks, and transport systems. However, the council does not directly decide whether a project should proceed. Instead, a computerized decision system collects signals from three influential advisory groups before giving the final approval.\n\n• The first signal A comes from the Traditional Planning Council, a group that represents long-established administrative members of the city.\n• The second signal B comes from the Reform Committee, a newer group that often proposes alternative approaches to development.\n• The third signal C comes from the Citizens' Review Board, which represents public opinion collected through surveys and civic meetings.\n\nThe computerized system follows a special rule. A project will be approved if both advisory groups A and B agree on it, since agreement between these two groups indicates strong stability in the decision.\nHowever, if the two advisory groups disagree, the system still allows the project to move forward if the Citizens' Review Board supports the project and at least one of the advisory groups also supports it.\nIf none of these conditions are satisfied, the project is rejected by the system.\n\nTasks\nA) Identify the Boolean expression representing the approval output F.\nB) Determine the minimum number of gates required."
  },
  {
    id: "D3",
    text: "The Event Permission Monitoring Network\n\nA city uses an automated monitoring network to manage large public gatherings. Because the city often experiences simultaneous activities from different social organizations, the administration built a digital system that decides whether an event permit should be granted.\n\nThree sensors provide signals to the system:\n• X indicates that Organization X has announced a large gathering.\n• Y indicates that Organization Y has announced a large gathering.\n• Z indicates that the city security department has issued a safety alert.\n\nThe city administration has observed that if both organizations plan gatherings at the same time, managing the crowd becomes extremely difficult. Therefore, the permit system is designed to allow an event only when exactly one organization plans a gathering.\nHowever, even if only one organization plans an event, the system will not allow the permit if the security department has issued a safety alert.\nOnly when one and only one organization is planning a gathering and there is no security alert will the system automatically issue the permit.\n\nTasks\nA) Write the Boolean expression for the permit output P.\nB) Design the corresponding logic gate circuit."
  },
  {
    id: "D4",
    text: "The Debate Broadcast Controller\n\nA major broadcasting network organizes live debates between representatives of two influential civic groups. These debates are extremely popular among viewers and help citizens understand different viewpoints on public issues.\nThe broadcasting studio operates using an automated system that decides whether the live transmission should begin. \n\nThree digital signals are used as inputs to the system.\n• Signal A becomes 1 when the representative of Group A arrives at the studio.\n• Signal B becomes 1 when the representative of Group B arrives.\n• Signal M becomes 1 when the moderator responsible for managing the debate is present in the studio.\n\nThe broadcasting policy states that a debate can only be aired if the moderator is present, because discussions cannot proceed without supervision.\nAdditionally, at least one representative from either group must be present for the debate to make sense.\nIf the moderator is absent, the broadcast must never start regardless of the representatives' presence. If the moderator is present and at least one representative arrives, the system will begin the live broadcast.\n\nTasks\nA) Derive the Boolean expression for the broadcast signal F.\nB) Draw the logic gate circuit for the system."
  },
  {
    id: "D5",
    text: "The Regional Opinion Analyzer\n\nA research institute conducts surveys across three major zones of a large region: the northern zone, the central zone, and the southern zone. Each zone sends a digital signal indicating whether the majority of respondents in that area support a new policy proposal.\n\nThe signals are defined as follows:\n• P = 1 if the northern zone supports the proposal\n• Q = 1 if the central zone supports the proposal\n• R = 1 if the southern zone supports the proposal\n\nTo maintain fairness, the institute decided that a proposal should be considered popular only if at least two regions support it. If support comes from fewer than two regions, the proposal will be classified as lacking sufficient public backing.\nA digital circuit is used to automatically evaluate the three signals and generate the final output indicating whether the proposal is widely supported.\n\nTasks:\nA) Develop the Boolean expression for the output F.\nB) Construct the logic gate circuit using AND and OR gates.\nC) Draw the truth table for the system."
  },
  {
    id: "D6",
    text: "The Surprise Gift Plan\n\nRahul wants to surprise his girlfriend Neha with a special gift. However, the surprise should only happen under specific circumstances so that it remains meaningful.\n\nThe system monitoring the plan has three inputs:\nR = Rahul has bought the gift\nN = Neha is at home\nF = Neha's best friend is present to help organize the surprise\n\nThe surprise celebration will occur if Rahul has the gift and Neha is home.\nHowever, if Neha is not at home yet, the surprise can still proceed if Rahul has the gift and her friend is present to help set up everything before Neha arrives.\nIf Rahul hasn't bought the gift, the plan obviously cannot happen.\n\nTasks:\nA) Determine the Boolean expression for output S (surprise happens).\nB) Draw the corresponding logic circuit."
  },
  {
    id: "D7",
    text: "The Study Date\n\nTwo college students, Aman and Riya, often meet in the library for study sessions. However, they only meet when certain conditions make the meeting productive.\n\nThree conditions are monitored:\n• A = Aman has completed his assignments\n• R = Riya has completed her assignments\n• L = The library is open\n\nTheir rule is simple:\nThe study session happens only if the library is open and at least one of them has completed their assignments so that they can help the other person.\nIf the library is closed, the meeting is automatically cancelled.\n\nTasks\nA) Write the Boolean expression for output F (study date occurs).\nB) Design the logic circuit."
  },
  {
    id: "D8",
    text: "The Apology Detector\n\nAfter a small argument, Kunal and Tara decide to reconcile only when genuine effort is shown. Their friends jokingly design a \"reconciliation detector\" circuit to determine when things are likely to be resolved.\n\nThree signals are used:\n• K = Kunal apologizes\n• T = Tara apologizes\n• C = A close friend encourages them to talk\n\nThe reconciliation signal becomes 1 only when exactly two of these signals are active. This means that reconciliation is most likely when:\nOne of them apologizes and the friend encourages them, or Both apologize without outside intervention.\nIf all three signals occur at the same time or fewer than two occur, the detector does not activate.\n\nTasks\nA) Write the Boolean expression for the reconciliation output F.\nB) Design the logic gate implementation."
  },
  {
    id: "D9",
    text: "The Multiverse Portal Controller\n\nDoctor Strange has built a digital controller that determines when it is safe to open a portal to another dimension.\n\nThe controller receives three signals:\n• S = Sorcerer Hero is concentrating on the portal\n• W = Witch Hero is stabilizing the energy field\n• V = Vision Unit confirms dimensional stability\n\nThe portal can open if:\nBoth S and W are stabilizing the portal together, OR\nVision confirms stability and at least one of the two heroes is assisting.\nIf none of these conditions are satisfied, the portal must remain closed to prevent a multiverse catastrophe.\n\nTasks\nA) Write the Boolean expression for output Portal.\nB) Draw the corresponding logic circuit."
  },
  {
    id: "D10",
    text: "The Avengers Team Assembly Signal\n\nBefore launching a major operation, Avengers headquarters uses an automated signal to determine whether the team assembly meeting should start.\n\nThree signals are monitored:\n• H = Hulk has arrived at headquarters\n• B = Archer Hero has arrived\n• M = The meeting coordinator has arrived\n\nThe meeting should only begin if the coordinator is present, because without coordination the meeting cannot proceed.\nIn addition, at least one Avenger must be present for the meeting to be meaningful.\nIf the coordinator is absent, the meeting cannot start even if the Avengers arrive.\n\nTasks\nA) Derive the Boolean expression for output Meeting.\nB) Construct the logic circuit."
  }
];
