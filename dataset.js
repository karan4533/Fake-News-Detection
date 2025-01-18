export const dataset = {
  genuine: [
    "The Earth completes one rotation around its axis in approximately 24 hours.",
    "Water freezes at 0 degrees Celsius at standard atmospheric pressure.",
    "The human body has 206 bones in adulthood.",
    "Mount Everest is the highest mountain above sea level.",
    "The Great Wall of China was built over multiple dynasties.",
    "The first successful powered flight was achieved by the Wright brothers in 1903.",
    "The human heart beats approximately 100,000 times per day.",
    "Tokyo is the capital city of Japan.",
    "The human brain is a complex organ that controls thought, memory, emotion, touch, motor skills, vision, breathing, temperature, hunger, and every process that regulates our body. The central nervous system (CNS) is made up of the brain and spinal cord and is covered with three layers of protective coverings called meninges. The brain itself contains billions of neurons organized into local circuits that process information.",
    "Photosynthesis is the process by which plants convert light energy into chemical energy. During photosynthesis, plants take in carbon dioxide from the air and water from the soil. Using the energy from sunlight, the plants convert these ingredients into glucose and oxygen. The glucose is used by the plant for energy and growth, while the oxygen is released into the atmosphere as a byproduct.",
    "The Great Barrier Reef is the world's largest coral reef system, stretching over 2,300 kilometers along the northeast coast of Australia. It consists of over 2,900 individual reefs and 900 islands. The reef supports a wide diversity of life, including many vulnerable or endangered species. The reef system has been developed over millions of years, with the living outer reef growing on top of older reef platforms.",
    "Climate change is caused by the increase of greenhouse gases in Earth's atmosphere. When sunlight reaches Earth's surface, it can either be reflected back into space or absorbed by Earth. Once absorbed, the planet releases some of the energy back into the atmosphere as heat. Greenhouse gases like carbon dioxide, methane, and water vapor trap some of this heat, causing Earth's average temperature to rise over time."
  ],
  fake: [
    "Drinking hot water will cure all diseases instantly.",
    "5G networks are spreading viruses through radio waves.",
    "The Earth is completely flat and all photos from space are fake.",
    "Humans only use 10% of their brains.",
    "Reading in dim light will permanently damage your eyes.",
    "Lightning never strikes the same place twice.",
    "Cracking your knuckles causes arthritis.",
    "Bulls get angry when they see the color red.",
    "Scientists have discovered a secret underground civilization that has been living beneath the Earth's surface for thousands of years. These advanced beings possess technology far beyond our understanding and have been controlling world events through telepathic communication with world leaders. They have managed to remain hidden by using advanced cloaking technology that makes them invisible to all modern detection methods.",
    "A revolutionary new diet pill has been discovered that allows you to eat whatever you want and still lose weight instantly. This miracle supplement, made from a rare plant found only in the deepest parts of the Amazon rainforest, reprograms your DNA to burn fat 1000 times faster than normal. Doctors and pharmaceutical companies are trying to suppress this information because it would put them out of business.",
    "Time travelers from the year 3000 have been secretly living among us, controlling the development of human technology to prevent us from discovering their presence. They have infiltrated major tech companies and are deliberately slowing down technological progress to maintain their advantage. All major technological breakthroughs of the past century were actually given to us by these time travelers to maintain their preferred timeline.",
    "The moon landing was filmed in a secret Hollywood studio, and no human has ever actually been to space. All space agencies around the world are part of an elaborate hoax to convince people that space travel is real. The stars we see at night are actually just tiny lights attached to a giant dome covering our flat Earth. NASA spends billions of dollars maintaining this illusion using advanced hologram technology."
  ]
};

export function analyzeText(inputText) {
  if (!inputText || typeof inputText !== 'string') {
    return { result: "INVALID" };
  }

  // Check if text is mostly unreadable (contains high percentage of non-word characters)
  const nonWordPattern = /[^a-zA-Z\s]/g;
  const nonWordCount = (inputText.match(nonWordPattern) || []).length;
  const totalLength = inputText.length;
  
  if (totalLength === 0 || (nonWordCount / totalLength) > 0.3) {
    return { result: "INVALID" };
  }
  
  inputText = inputText.toLowerCase();
  
  // Initialize scores
  let genuineScore = 0;
  let fakeScore = 0;
  
  // Check for common patterns in genuine texts
  const genuinePatterns = [
    /\b(scientific|research|study|evidence)\b/,
    /\b(approximately|about|around|estimated)\b/,
    /\b(according to|based on)\b/,
    /\b(discovered|found|observed)\b/,
    /\b(process|system|structure)\b/,
    /\b(measured|documented|recorded)\b/,
    /\b(gradually|over time|period)\b/,
    /\b(analysis|data|results)\b/
  ];
  
  // Check for common patterns in fake texts
  const fakePatterns = [
    /\b(miracle|instant|cure-all|perfect)\b/,
    /\b(conspiracy|secret|they don't want you to know)\b/,
    /\b(never|always|every|all)\b/,
    /\b(guaranteed|proven|100%)\b/,
    /\b(suppressed|hidden truth|covered up)\b/,
    /\b(ancient secret|forbidden|mysterious)\b/,
    /\b(revolutionary|breakthrough|miracle cure)\b/,
    /\b(government hiding|they're lying|conspiracy)\b/
  ];
  
  // Compare with genuine dataset
  for (const sample of dataset.genuine) {
    if (calculateSimilarity(inputText, sample.toLowerCase()) > 0.3) {
      genuineScore += 25;
    }
  }
  
  // Compare with fake dataset
  for (const sample of dataset.fake) {
    if (calculateSimilarity(inputText, sample.toLowerCase()) > 0.3) {
      fakeScore += 25;
    }
  }
  
  // Check patterns
  genuinePatterns.forEach(pattern => {
    if (pattern.test(inputText)) genuineScore += 10;
  });
  
  fakePatterns.forEach(pattern => {
    if (pattern.test(inputText)) fakeScore += 10;
  });
  
  // Calculate final score and determine if text is real or fake
  const finalScore = genuineScore - fakeScore;
  
  return {
    result: finalScore >= 0 ? "REAL" : "FAKE"
  };
}

function calculateSimilarity(text1, text2) {
  const words1 = text1.split(/\s+/);
  const words2 = text2.split(/\s+/);
  const commonWords = words1.filter(word => words2.includes(word));
  return commonWords.length / Math.max(words1.length, words2.length);
}