import Course from '../models/Course.js';
import Groq from 'groq-sdk';
import axios from 'axios';

export const createCourse = async (req, res) => {
    const { topic, units, level } = req.body;
    const groq = new Groq({ apiKey: process.env.API_KEY });

    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "You are an elite software engineer and technical educator. Return ONLY valid JSON."
                },
                {
                    role: "user",
                    content: `Create a practical technical course about "${topic}" for "${level}" level.
                    Generate EXACTLY ${units} units.

                    STRICT RULES:
                    - EXPLANATION DEPTH: The 'summary' field MUST be 500-600 words of deep technical explanation.
                    - NO ESSAYS: Break the summary into 5 massive sections using the "|" character ONLY.
                    - CONTENT: Focus on real-world implementation, syntax, and engineering logic.
                    - QUIZ: "correct" must be a NUMBER (0-3).

                    JSON FORMAT:
                    {
                      "units": [
                        {
                          "title": "Unit Title",
                          "summary": "Deep Logic Section 1... | Deep Logic Section 2... | Deep Logic Section 3... | Deep Logic Section 4...",
                          "explanation": "Clear technical overview.",
                          "syntax": "Syntax reference.",
                          "exampleCode": "Real working code.",
                          "outputExplanation": "Logic analysis.",
                          "bestPractices": ["Practice 1"],
                          "commonMistakes": ["Mistake 1"],
                          "quiz": [{"text": "Question?", "options": ["A", "B", "C", "D"], "correct": 0}]
                        }
                      ]
                    }`
                }
            ],
            model: "llama-3.1-8b-instant",
            response_format: { type: "json_object" } 
        });

        const aiData = JSON.parse(chatCompletion.choices[0].message.content);
        const unitsArray = aiData.units || [];
        const finalizedUnits = [];

        for (const unit of unitsArray) {
            try {
                const ytRes = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
                    params: {
                        part: 'snippet',
                        q: `advanced ${topic} ${unit.title} implementation`,
                        key: process.env.YOUTUBE_API_KEY,
                        maxResults: 1,
                        type: 'video',
                    }
                });
                const videoId = ytRes.data.items[0]?.id?.videoId || "w7ejDZ8SWv8";

                // Merge specific fields into the 'summary' string for the Dashboard logic
                const fullSummary = [
                    unit.summary,
                    `**Implementation Logic:** ${unit.explanation}`,
                    `**Syntax Specification:** \`${unit.syntax}\``,
                    `**Code Implementation:** \n \`${unit.exampleCode}\``,
                    `**Engineering Analysis:** ${unit.outputExplanation}`,
                    `**Best Practices:** ${unit.bestPractices?.join(' • ')}`,
                    `**Common Mistakes:** ${unit.commonMistakes?.join(' • ')}`
                ].join(' | ');

                finalizedUnits.push({ 
                    title: unit.title,
                    quiz: unit.quiz,
                    videoId: videoId,
                    summary: fullSummary 
                });

            } catch (err) {
                finalizedUnits.push({ 
                    ...unit, 
                    videoId: (err.response?.status === 403) ? "unavailable" : "w7ejDZ8SWv8" 
                });
            }
        }

        const newCourse = new Course({ userId: req.userId, title: topic, level, units: finalizedUnits });
        await newCourse.save();
        res.status(201).json(newCourse);
    } catch (error) {
        res.status(500).json({ message: "Forging failed", error: error.message });
    }
};

export const getCourses = async (req, res) => {
    try {
        const courses = await Course.find({ userId: req.userId }).sort({ createdAt: -1 });
        res.status(200).json(courses);
    } catch (error) {
        res.status(404).json({ message: "No courses found" });
    }
};