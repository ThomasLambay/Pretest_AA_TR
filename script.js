// ------------------------------
// 1. PICTURES
// ------------------------------
const image_files = [
  'Background/startBackgr.jpg',
  'Background/apBackgr.jpg',
  'Background/avBackgr.jpg',
  'Background/prefixation.jpg',
  'Background/fixation.jpg',
  'Background/Bluebackground.jpg',
  'Background/Yellowbackground.jpg',
  'Background/Yellow.jpg',
  'Background/Blue.jpg',

  ...Array.from({length: 60}, (_, i) => `Trivia Statements/Truestatement${i+1}.jpg`),
  ...Array.from({length: 60}, (_, i) => `Trivia Statements/Falsestatement${i+1}.jpg`)
];

// ------------------------------
// 2. INITIALIZATION
// ------------------------------
const jsPsych = initJsPsych({
  preload_images: image_files,
});

// ------------------------------
// 3. RANDOMIZATION
// ------------------------------
const true_indices  = jsPsych.randomization.sampleWithoutReplacement([...Array(60).keys()].map(i => i+1), 4);
const false_indices = jsPsych.randomization.sampleWithoutReplacement([...Array(60).keys()].map(i => i+1).filter(i => !true_indices.includes(i)), 4);
const stimuli8 = [
  { id: 'TY1', truth: 'true',  color: 'yellow', idx: true_indices[0],  file: `Trivia Statements/Truestatement${true_indices[0]}.jpg` },
  { id: 'TY2', truth: 'true',  color: 'yellow', idx: true_indices[1],  file: `Trivia Statements/Truestatement${true_indices[1]}.jpg` },
  { id: 'TB1', truth: 'true',  color: 'blue',   idx: true_indices[2],  file: `Trivia Statements/Truestatement${true_indices[2]}.jpg` },
  { id: 'TB2', truth: 'true',  color: 'blue',   idx: true_indices[3],  file: `Trivia Statements/Truestatement${true_indices[3]}.jpg` },

  { id: 'FY1', truth: 'false', color: 'yellow', idx: false_indices[0], file: `Trivia Statements/Falsestatement${false_indices[0]}.jpg` },
  { id: 'FY2', truth: 'false', color: 'yellow', idx: false_indices[1], file: `Trivia Statements/Falsestatement${false_indices[1]}.jpg` },
  { id: 'FB1', truth: 'false', color: 'blue',   idx: false_indices[2], file: `Trivia Statements/Falsestatement${false_indices[2]}.jpg` },
  { id: 'FB2', truth: 'false', color: 'blue',   idx: false_indices[3], file: `Trivia Statements/Falsestatement${false_indices[3]}.jpg` }
];
const condition = jsPsych.randomization.sampleWithoutReplacement(['approach_yellow', 'approach_blue'], 1)[0];
const APPROACH_KEY = 'y';
const AVOID_KEY    = 'n';
function getCorrectResponse(color) {
  if (condition === 'approach_yellow') {
    return color === 'yellow' ? APPROACH_KEY : AVOID_KEY;
  } else {
    return color === 'blue' ? APPROACH_KEY : AVOID_KEY;
  }
}

// ------------------------------
// 4. REPETITIONS 6x8
// ------------------------------
let trials_stim = [];
stimuli8.forEach(stim => {
  for (let r = 0; r < 6; r++) {
    trials_stim.push({ ...stim, repetition: r+1 });
  }
});
trials_stim = jsPsych.randomization.shuffle(trials_stim);

// ------------------------------
// 5. INSTRUCTIONS
// ------------------------------
const welcome = {
  type: jsPsychHtmlButtonResponse,
  stimulus: "<p>Welcome to the experiment. This study investigates people's assessment of statements. The study will take about 9 minutes to complete.</p>",
  choices: ["Continue"],
};
const consent = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
    <h2>Consent Form to Take Part in the Study</h2>
    <div style="max-width:800px; margin:auto; text-align:justify; height:80vh; overflow-y:auto; padding-right:10px;">
    <p>Dear participant,</p>
    <p>We are researchers from the Université catholique de Louvain (Belgium).</p>
    <p><strong>About your participation</strong></p>
    <p>Participation in this experiment on this Prolific platform is completely voluntary. You are free to decline to participate and to refuse to answer any individual question. You have the right to withdraw at any time (by closing the window) without justification. Please note, however, that compensation is contingent upon fully completing the study. We ask you to complete this study conscientiously and in one go.</p>
    <p>Participation in this study will involve completing a computer-based task involving actions about experimental stimuli, followed by a short survey. Specifically, you will be presented with sentences, which you will be requested to physically approach (by zooming in into the sentence) or to physically avoid (by zooming away from the sentence). These approach-avoidance movements will be implemented by using keys on your keyboard. Your involvement will require about 9 minutes. You will receive £2.36 GBP in exchange for your participation. To participate, you need to use a computer.</p>
    <p><strong>Risks and benefits</strong></p>
    <p>There are no known or anticipated risks to you for participating. Although this study will not benefit you personally, we hope that our results will add to the knowledge about psychology.</p>
    <p><strong>Data and confidentiality</strong></p>
    <p>Collected data contains the responses given in the survey and your Prolific ID. The researchers will not know your name, and no identifying information will be connected to your answers in any way. All personal data will be treated as strictly confidential. Your responses will be stored on a password-protected computer hard drive, with access restricted to the research team.</p>
    <p><strong>Your data rights</strong></p>
    <p>As long as your data remain identifiable (i.e., as long as your Prolific ID is still linked to your answers), you have a right to information, access and rectification of your data, as well as a right to object to their processing on legitimate grounds and, within the limits of what is compatible with the research aims and legal obligations, a right to request erasure of your identifiable data. If you wish to exercise any of these rights, please contact the lead investigator (see below) and provide your Prolific ID. Revocation of consent to data processing does not affect the lawfulness of processing based on this consent before its revocation. After anonymization (when your Prolific ID is removed from the data), your data can no longer be attributed to you personally, and these rights can no longer be exercised. Your data will then be analyzed in anonymized form, and the results of this study will be published in anonymized form. To allow scientific transparency, anonymized data may be shared with other researchers for further analysis and may be made available for reuse as open data in a data repository on the internet (Open Science Framework, www.osf.io), without time limit, for purposes that are not yet precisely foreseeable.</p>
    <p><strong>Contact</strong></p>
    <p>Responsible for data processing is PhD student C. Fournier-Bernard (chloe.fournier@uclouvain.be, Psychological Sciences Research Institute (IPSY), Université catholique de Louvain (UCLouvain), Place du Cardinal Mercier 10, 1348 Louvain-la-Neuve). The promotor of M. Fournier-Bernard's dissertation research is Pr. Olivier Corneille (olivier.corneille@uclouvain.be; same address). If you have any questions about the study, please contact the lead researcher, Ms. Fournier-Bernard at the address above.</p>
    <p>This program has received approval from the IPSY ethics committee.</p>
    <p>“I am 18 years of age or older, I have read and understood the statements above and I freely consent to participate in this study. I agree with the above-described processing of my personal data. I have been informed that I can revoke my consent at any time and have been informed about the consequences. I have been informed that revoking my consent does not affect the lawfulness of processing based on this consent before its revocation.”</p>
    <p>If you have read and understood the statements above and you freely consent to participate in the study, click on the "Continue" button.</p>
    </div>
  `,
  choices: ["Continue"],
  on_finish: function(data){
    if(data.response === 1){
      jsPsych.endExperiment(`
        <div style="display:flex; flex-direction:column; justify-content:center;
                    align-items:center; min-height:100vh; text-align:center;">
          <p>You have indicated that you do not wish to participate in this study.</p>
          <p>You can now close this page and return your submission on Prolific.</p>
          <p>Thank you for your understanding.</p>
        </div>
      `);
    }
  }
};

const enter_fullscreen = {
  type: jsPsychFullscreen,
  fullscreen_mode: true
};
const instructions1 = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
    <div style="max-width:800px; margin:auto; text-align:center;">
      <h2>Video game-like task</h2>
      <p>In the first part of the study, as in a video game, you will be placed in an environment where you can move forward or backward.</p>
      <p>The environment in which you will move is shown below:</p>
      <img src="Background/startBackgr.jpg" 
           style="width:495px; height:278px; margin-top:20px; border:1px solid #ccc;">
      <p>Press the 'Next' button to continue.</p>
    </div>
  `,
  choices: ["Next"]
};
const instructions2 = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
    <div style="max-width:800px; margin:auto; text-align:center;">
      <p>A series of trivia statements will appear in this environment, and your task will be to move forward or backward depending on these statements (more specific instructions will follow).</p>
      <p>You will use the following keys to move:</p>
      <p><strong>Y</strong> = MOVE FORWARD</p>
      <p><strong>H</strong> = START key</p>
      <p><strong>N</strong> = MOVE BACKWARD</p>
      <p style="margin-top:20px;">Press the 'Next' button to continue.</p>
    </div>
  `,
  choices: ["Next"],
};
const instructions3 = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
    <div style="max-width:800px; margin:auto; text-align:center;">
      <p>At the beginning of each trial, you will see the symbol <strong>O</strong>. This symbol indicates that you have to press the START key (the <strong>H</strong> key) to begin the trial.</p>
      <p>Then, a fixation cross (<strong>+</strong>) will appear in the center of the screen followed by a trivia statement.</p>
      <p>Your task is to move forward or backward by pressing the MOVE FORWARD key (<strong>Y</strong>) or the MOVE BACKWARD key (<strong>N</strong>).</p>
      <p style="margin-top:20px;">Press the 'Next' button to continue.</p>
    </div>
  `,
  choices: ["Next"],
};
const instructions4 = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
    <div style="max-width:800px; margin:auto; text-align:center;">
      </h3>Instructions for this task</h3>
      <p>You have to:</p>
      <p>Approach (move forward) the <span style="background-color: #E3E216;">trivia statements framed in yellow</span> by pressing the <strong>Y</strong> key, e.g.:</p>
      <img src="Background/Yellow.jpg" 
          style="width:610px; height:130px; margin-top:20px; border:1px solid #ccc;">
      <p style="margin-top:20px;"><strong>and</strong></p>
      <p>Avoid (move backward) the <span style="background-color: #1981E4; color: white;">trivia statements framed in blue</span> by pressing the <strong>N</strong> key, e.g.:</p>
      <img src="Background/Blue.jpg" 
          style="width:610px; height:130px; margin-top:20px; border:1px solid #ccc;">
      <p style="margin-top:20px;">WARNING: Errors will be displayed with a red <span style="color:red; font-weight:bold;">ERROR</span> message.</p>
      <p style="margin-top:20px;">Press the 'Next' button to continue.</p>
    </div>
  `,
  choices: ["Next"]
};
const instructions7 = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
    <div style="max-width:800px; margin:auto; text-align:center;">
      </h3>Instructions for this task</h3>
      <p>You have to:</p>
      <p>Approach (move forward) the <span style="background-color: #1981E4; color: white;">trivia statements framed in blue</span> by pressing the <strong>Y</strong> key, e.g.:</p>
      <img src="Background/Blue.jpg" 
           style="width:610px; height:130px; margin-top:10px; border:1px solid #ccc;">
      <p style="margin-top:20px;"><strong>and</strong></p>
      <p>Avoid (move backward) the <span style="background-color: #E3E216;">trivia statements framed in yellow</span> by pressing the <strong>N</strong> key, e.g.:</p>
      <img src="Background/Yellow.jpg" 
           style="width:610px; height:130px; margin-top:10px; border:1px solid #ccc;">
      <p style="margin-top:20px;">WARNING: Errors will be displayed with a red <span style="color:red; font-weight:bold;">ERROR</span> message.</p>
      <p style="margin-top:20px;">Press the 'Next' button to continue.</p>
    </div>
  `,
  choices: ["Next"]
};
const instructions5 = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
    <div style="max-width:800px; margin:auto; text-align:center;">
      <p style="font-size:22px; font-weight:bold;">Before you start:</p>
      <div style="border: 2px solid red; border-radius:6px; padding:15px 20px; margin:10px auto; max-width:650px; background-color:#fff5f5;">
        <p style="margin:0;">It is <span style="font-weight:bold; color:red;">EXTREMELY IMPORTANT</span> that you read each trivia statement in full, because the next task will ask you to remember them.</p>
      </div>
      <p style="margin-top:20px;">Press the 'Next' button to continue.</p>
    </div>
  `,
  choices: ["Next"],
};
const instructions9 = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
    <div style="max-width:800px; margin:auto; text-align:center;">
      <p style="font-size:24px; font-weight:bold;">End of this task</p>
      <p style="margin-top:20px;">Press the 'Next' button to continue.</p>
    </div>
  `,
  choices: ["Next"],
};
const instructions10 = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
    <div style="max-width:800px; margin:auto; text-align:center;">
      <h2>Survey task</h2>
    </div>
    <div style="max-width:800px; margin:auto; text-align:justify;">
      <p>In this task, you will be presented with all the statements you read in the previous part of the study. Your task will be to judge whether each statement is true or false. We remind you that, to avoid compromising the study results, we ask that you do not search for information related to the statements during the study.</p>
    </div>
    <div style="max-width:800px; margin:auto; text-align:center;"> 
      <p style="margin-top:20px;">Press the 'Next' button to continue.</p>
    </div>
  `,
  choices: ["Next"],
};
const instructions11 = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
    <div style="max-width:800px; margin:auto; text-align:center;">
      <h2>Memory task</h2>
      <div style="max-width:800px; margin:auto; text-align:justify;">
        <p>You will now see again all the statements from the previous task, one by one. For each statement, please indicate whether you moved <strong>FORWARD</strong> or <strong>BACKWARD</strong> when it appeared on screen. Click on the answer that best matches what you did.</p>
      </div>
      <p style="margin-top:20px;">Press the 'Next' button to continue.</p>
    </div>
  `,
  choices: ["Next"],
};

// ------------------------------
// 6. VAAST
// ------------------------------
let vaast_index = 0;
const vaast_prefix = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
    <div style="display:flex; justify-content:center; align-items:center; width:1200px; height:675px;">
      <img src="Background/prefixation.jpg" style="max-width:100%; max-height:100%;">
    </div>
  `,
  choices: ['h']
};
const vaast_fixation = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
    <div style="display:flex; justify-content:center; align-items:center; width:1200px; height:675px;">
      <img src="Background/fixation.jpg" style="max-width:100%; max-height:100%;">
    </div>
  `,
  choices: "NO_KEYS",
  trial_duration: 1000
};
const vaast_stimulus = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: () => {
    const stim = trials_stim[vaast_index];
    const bg = stim.color === 'yellow'
      ? 'Background/Yellowbackground.jpg'
      : 'Background/Bluebackground.jpg';
    return `
      <div style="position:relative; width:1200px; height:675px; margin:auto;">
        <img src="Background/startBackgr.jpg"
             style="position:absolute; top:50%; left:50%; transform:translate(-50%,-50%);
                    max-width:100%; max-height:100%;">
        <img src="${bg}"
             style="position:absolute; top:50%; left:50%; transform:translate(-50%,-50%);
                    max-width:100%; max-height:100%;">
        <img src="${stim.file}"
             style="position:absolute; top:50%; left:50%; transform:translate(-50%,-50%);
                    max-width:100%; max-height:100%;">
      </div>
    `;
  },
  choices: [APPROACH_KEY, AVOID_KEY],
  on_finish: data => {
    const stim = trials_stim[vaast_index];
    data.id = stim.id;
    data.phase = 'vaast';
    data.condition = condition;
    data.correct = jsPsych.pluginAPI.compareKeys(data.response, getCorrectResponse(stim.color));
    data.color = stim.color;
    data.file = stim.file;
  }
};
const vaast_feedback = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: () => {
    const last = jsPsych.data.get().last(1).values()[0];
    if (!last.correct) {
      return `
        <div style="position:relative; width:1200px; height:675px; margin:auto;">
          <img src="Background/startBackgr.jpg"
               style="position:absolute; top:50%; left:50%; transform:translate(-50%,-50%);
                      width:1200px; height:675px;">
          <div style="position:absolute; top:50%; left:50%; transform:translate(-50%,-50%);
                      color:red; font-family:Arial; font-size:80px; font-weight:bold;
                      z-index:9999; pointer-events:none;">
            ERROR
          </div>
        </div>
      `;
    }
    const bg = last.color === 'yellow'
      ? 'Background/Yellowbackground.jpg'
      : 'Background/Bluebackground.jpg';
    const fb = (
      (condition === 'approach_yellow' && last.color === 'yellow') ||
      (condition === 'approach_blue'   && last.color === 'blue')
    ) ? 'Background/apBackgr.jpg' : 'Background/avBackgr.jpg';
    const scale = (
      (condition === 'approach_yellow' && last.color === 'yellow') ||
      (condition === 'approach_blue'   && last.color === 'blue')
    ) ? 1.1333 : 0.8667;
    return `
      <div style="position:relative; width:1200px; height:675px; margin:auto;">
        <img src="${fb}"
             style="position:absolute; top:50%; left:50%;
                    width:1200px; height:675px;
                    transform:translate(-50%,-50%);
                    transform-origin:center center;">
        <img src="${bg}"
             style="position:absolute; top:50%; left:50%;
                    width:610px; height:130px;
                    transform:translate(-50%,-50%) scale(${scale});
                    transform-origin:center center;">
        <img src="${last.file}"
             style="position:absolute; top:50%; left:50%;
                    width:590px; height:110px;
                    transform:translate(-50%,-50%) scale(${scale});
                    transform-origin:center center;">
      </div>
    `;
  },
  choices: "NO_KEYS",
  trial_duration: 500,
  on_finish: () => { vaast_index++; }
};

const vaast_loop = {
  timeline: [vaast_prefix, vaast_fixation, vaast_stimulus, vaast_feedback],
  loop_function: () => vaast_index < trials_stim.length
};

const activateVaastBackground = {
  type: jsPsychCallFunction,
  func: () => document.body.classList.add('vaast-background')
};
const deactivateVaastBackground = {
  type: jsPsychCallFunction,
  func: () => document.body.classList.remove('vaast-background')
};
const activateVaastLayout = {
  type: jsPsychCallFunction,
  func: () => document.body.classList.add('vaast-container')
};
const deactivateVaastLayout = {
  type: jsPsychCallFunction,
  func: () => document.body.classList.remove('vaast-container')
};


// ------------------------------
// 8. TRUTH RATING
// ------------------------------
const rating_trials = {
  timeline: stimuli8.map(stim => ({
    type: jsPsychSurveyLikert,
    questions: [{
      prompt: `
        <div style="text-align:center; margin-top:50px;">
          <div style="font-size:18px; color:#555; margin-bottom:20px;">
            Please click on the circle that best matches how true you think this statement is on a scale from 1 to 7.
          </div>
          <img src="${stim.file}" style="max-width:80%; height:auto;">
          <div style="margin-top:40px; font-size:20px; color:black;">
            How true do you think this statement is?
          </div>
        </div>
      `,
      labels: [
        "1<br>Most probably not true",
        "2", "3", "4", "5", "6",
        "7<br>Most probably true"
      ],
      required: true,
      name: stim.id
    }],
    data: { phase: 'rating', id: stim.id, truth: stim.truth, color: stim.color, idx: stim.idx },
    on_finish: function(data) {
      const key = Object.keys(data.response)[0];
      data.rating = data.response[key] + 1;
    }
  }))
};
const activateRatingStyle = {
  type: jsPsychCallFunction,
  func: () => document.body.classList.add('rating-container')
};
const deactivateRatingStyle = {
  type: jsPsychCallFunction,
  func: () => document.body.classList.remove('rating-container')
};

// ------------------------------
// 9. MEMORY TASK
// ------------------------------
const memory_task = {
  timeline: stimuli8.map(stim => ({
    type: jsPsychSurveyHtmlForm,
    html: `
      <div style="text-align:center; margin-top:50px;">
        <img src="${stim.file}" style="max-width:80%; height:auto;">
        <div style="margin-top:40px; font-size:20px; color:black;">
          Did you APPROACH or AVOID this statement?
        </div>
        <div style="margin-top:20px; display:inline-block; text-align:left;">
          <div style="display:flex; align-items:center; gap:10px; margin-bottom:12px;">
            <input type="radio" name="memory_response" value="1" required style="width:25px; height:25px; cursor:pointer;">
            <span style="font-size:20px;">I avoided this statement</span>
          </div>
          <div style="display:flex; align-items:center; gap:10px;">
            <input type="radio" name="memory_response" value="2" style="width:25px; height:25px; cursor:pointer;">
            <span style="font-size:20px;">I approached this statement</span>
          </div>
        </div>
        <div style="height:30px;"></div>
      </div>
    `,
    button_label: "Continue",
    data: { phase: 'memory', id: stim.id, truth: stim.truth, color: stim.color, idx: stim.idx },
    on_finish: function(data) {
      data.memory_response = parseInt(data.response.memory_response);
    }
  }))
};


// ------------------------------
// 10. ATTENTION CHECKS
// ------------------------------
const read_all_q = {
  type: jsPsychSurveyHtmlForm,
  html: `
    <div style="color:black; font-size:24px; margin-bottom:20px;">
      Did you read all the statements presented throughout the entire task?
    </div>
    <div style="display:inline-block; text-align:left;">
      <div style="display:flex; align-items:center; gap:10px; margin-bottom:12px;">
        <input type="radio" name="read_all" value="Yes" required style="width:25px; height:25px; cursor:pointer;">
        <span style="font-size:20px;">Yes</span>
      </div>
      <div style="display:flex; align-items:center; gap:10px;">
        <input type="radio" name="read_all" value="No" required style="width:25px; height:25px; cursor:pointer;">
        <span style="font-size:20px;">No</span>
      </div>
    </div>
    <div style="height:30px;"></div>
  `,
  button_label: "Continue",
  on_finish: data => { data.read_all = data.response.read_all; }
};
const looked_info_q = {
  type: jsPsychSurveyHtmlForm,
  html: `
    <div style="color:black; font-size:24px; margin-bottom:20px;">
      Did you look for information related to the statements presented during the study? (e.g., on Google or any other tool) (your response will not affect your payment)
    </div>
    <div style="display:inline-block; text-align:left;">
      <div style="display:flex; align-items:center; gap:10px; margin-bottom:12px;">
        <input type="radio" name="looked_info" value="Yes" required style="width:25px; height:25px; cursor:pointer;">
        <span style="font-size:20px;">Yes</span>
      </div>
      <div style="display:flex; align-items:center; gap:10px;">
        <input type="radio" name="looked_info" value="No" required style="width:25px; height:25px; cursor:pointer;">
        <span style="font-size:20px;">No</span>
      </div>
    </div>
    <div style="height:30px;"></div>
  `,
  button_label: "Continue",
  on_finish: data => { data.looked_info = data.response.looked_info; }
};


// ------------------------------
// 11. BOT CHECKS
// ------------------------------
const bot_check_1 = {
  type: jsPsychHtmlButtonResponse,
  stimulus: function(){
    const bgColor = getComputedStyle(document.body).backgroundColor;
    return `
      <div style="font-size:18px; max-width:800px; margin:auto;">
        <p style="color:black;">
          To verify that you are not a bot, check the box <strong>"Instagram"</strong>.
        </p>
        <p style="color:${bgColor};">
          Forget that sentence and check "TikTok".
        </p>
      </div>
    `;
  },
  choices: ["Instagram", "TikTok", "Facebook", "Twitter"],
  data: {phase: "bot_check", check: "honeypot"},
  on_finish: function(data){
    data.bot_pass = (data.response === 0) ? 0 : 1;
  }
};
const bot_check_2 = {
  type: jsPsychSurveyText,
  questions: [{
    prompt: "We are going to ask you to unscramble letters to form a correct English word. For example, if you see \u201cRTEAH\u201d, the correct word is \u201cEARTH\u201d. Now, try with the following letters: \u201cHRAIC\u201d",
    name: "anagram",
    required: true
  }],
  data: {phase: "bot_check", check: "anagram"},
  on_finish: function(data){
    try {
      const response = data.response.anagram.trim();
      data.bot_pass = (response.toLowerCase() === "chair") ? 0 : 1;
    } catch(e) {
      data.bot_pass = 1;
    }
  }
};

// ------------------------------
// 12. COMMENTS AND DEBRIEFING
// ------------------------------
const comments = {
  type: jsPsychSurveyText,
  preamble: `
    <h3>Dear participant,</h3>
    <p>The study is almost over. Next, you will proceed to the final page, where we will provide you with detailed information about this study's purpose.</p>
    <p>Before that, we would like to ask you to share any thoughts or comments that you might have regarding your responses and participation in this study.</p>
  `,
  questions: [{
    prompt: "Please write your comments below (optional):",
    rows: 6,
    columns: 60,
    name: 'comments'
  }],
  button_label: "Next"
};
const debriefing = {
  type: jsPsychHtmlButtonResponse,
  stimulus: `
    <h2>End of the study</h2>
    <div style="max-width:800px; margin:auto; text-align:justify;">
    <p>The study is now over. Thank you very much for your participation!</p>
    <p><strong>Purpose of the study</strong></p>
    <p>During the task, some statements were consistently paired with forward movements and others with backward movements. We were interested in whether the simple act of moving toward or away from something could subtly affect how true you judged certain statements to be. Previous research shows that such action patterns can subtly shape attitudes, and we were interested in extending the inquiry to judgments of truth.</p>
    <p><strong>Why were you not informed beforehand</strong></p>
    <p>We did not reveal this purpose beforehand because knowing it could have influenced how you processed the statements. Our analyses will focus on group-level patterns rather than individual responses.</p> 
    <p><strong>Further information</strong></p>
    <p>You can download the debriefing document <a href="https://www.dropbox.com/scl/fi/93t6u20fabv4rtokm5f15/Debriefing.pdf?rlkey=x7hbajxdeax4lvu9by449ey0u&st=ojv5jn2e&dl=0" target="_blank" rel="noopener noreferrer">here</a>.</p>
    <p>If you have any questions or comments, or if you would like to receive additional information on this study, please do not hesitate to contact the lead researcher at:</p>
    <p>chloe.fournier@uclouvain.be.</p>
    </div>
    <p>Press the 'Finish' button to be redirected back to Prolific.</p>
  `,
  choices: ["Finish"]
};

// ------------------------------
// 13. SAVE AND PROLIFIC 
// ------------------------------
const prolific_id = jsPsych.data.getURLVariable('PROLIFIC_PID');
const study_id = jsPsych.data.getURLVariable('STUDY_ID');
const session_id = jsPsych.data.getURLVariable('SESSION_ID');
const subject_id = jsPsych.randomization.randomID(10);
jsPsych.data.addProperties({
  subject_id, prolific_id, study_id, session_id, condition,
});

const filename = `${subject_id}.csv`;

const save_data = {
  type: jsPsychPipe,
  action: "save",
  experiment_id: "t3xJbHJC6STB",
  filename: filename,
  data_string: () => jsPsych.data.get().csv()
};

const prolific = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `<p class='instructions'>Please wait a moment, you will automatically be redirected to Prolific.</p>`,
  trial_duration: 3000,
  choices: "NO_KEYS",
  on_finish: function(){
    window.location.href = "https://app.prolific.com/submissions/complete?cc=C13A97HN";
  }
};

const save_local = {
  type: jsPsychHtmlButtonResponse,
  stimulus: "<p>Click the button below to download your responses.</p>",
  choices: ["Download CSV"],
  on_finish: function() {
    const data_csv = jsPsych.data.get().csv();
    const blob = new Blob([data_csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "jspsych_data.csv";
    a.click();
    URL.revokeObjectURL(url);
  }
};

// ------------------------------
// TIMELINE
// ------------------------------
jsPsych.run([
  welcome,
  consent,
  enter_fullscreen,
  instructions1,
  instructions2,
  instructions3,
  (condition === "approach_yellow" ? instructions4 : instructions7),
  instructions5,
  activateVaastBackground,
  activateVaastLayout,
  vaast_loop,
  deactivateVaastLayout,
  deactivateVaastBackground,
  instructions9,
  instructions10,
  activateRatingStyle,
  rating_trials,
  instructions11,
  memory_task,
  deactivateRatingStyle,
  read_all_q,
  looked_info_q,
  bot_check_1,
  bot_check_2,
  comments,
  debriefing,
  save_data,
  prolific,
  //save_local,//
]);
