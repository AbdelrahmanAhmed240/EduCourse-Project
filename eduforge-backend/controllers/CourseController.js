import Course from '../models/Course.js';
import Groq from 'groq-sdk';
import axios from 'axios';

// Helper function to convert ISO 8601 duration (e.g., PT14M32S) into total seconds
const parseISO8601Duration = (durationString) => {
    const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
    const matches = durationString.match(regex);
    if (!matches) return 0;
    
    const hours = parseInt(matches[1] || 0, 10);
    const minutes = parseInt(matches[2] || 0, 10);
    const seconds = parseInt(matches[3] || 0, 10);
    
    return (hours * 3600) + (minutes * 60) + seconds;
};

export const createCourse = async (req, res) => {
    const { topic, units, level } = req.body;
    const groq = new Groq({ apiKey: process.env.API_KEY });

    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "You are an elite software engineer and technical educator. You respond exclusively in English via flawless, raw JSON objects conforming exactly to the user's schema definition. Never include unescaped quotes or raw backticks inside JSON values."
                },
                {
                    role: "user",
                    content: `Create a comprehensive, highly structured academic and practical course about "${topic}" tailored for a "${level}" level.
                    Generate EXACTLY ${units} independent learning units.

                    STRICT RULES:
                    - LANGUAGE: All content MUST be written in fluent, professional English only.
                    - EXPLANATION DEPTH: The 'summary' field MUST be roughly 100-150 words of deep technical explanation. Keep it dense but concise so all ${units} units fit perfectly within rate limits without truncating.
                    - NO ESSAYS: Break the summary into exactly 5 separate sections using the "|" character ONLY.
                    - CONTENT: Focus on real-world implementation, syntax, and engineering logic.
                    - FORMAT VERSATILITY: Ensure the fields work for any technical topic. Do not write raw markdown backticks or unescaped double quotes inside the string values.
                    - QUIZ: 'correct' must be a valid integer index (0-3).

                    JSON FORMAT:
                    {
                      "units": [
                        {
                          "title": "Distinct Subtopic Title",
                          "summary": "Core definition section 1... | Deep theoretical breakdown section 2... | Mathematical/Engineering model section 3... | Real-world application case section 4... | Advanced problem-solving analysis section 5...",
                          "explanation": "Clear technical overview sentence outlining the core educational goal.",
                          "syntax": "Syntax reference or core law blueprint structure.",
                          "exampleCode": "Real working code or functional case example.",
                          "outputExplanation": "Logic and trace analysis.",
                          "bestPractices": ["Practice 1"],
                          "commonMistakes": ["Mistake 1"],
                          "quiz": [{"text": "Question?", "options": ["A", "B", "C", "D"], "correct": 0}]
                        }
                      ]
                    }`
                }
            ],
            model: "llama-3.1-8b-instant",
            response_format: { type: "json_object" },
            max_tokens: 3000,
            temperature: 0.1
        });

        const aiData = JSON.parse(chatCompletion.choices[0].message.content);
        const unitsArray = aiData.units || [];
        const finalizedUnits = [];
        const globalUsedVideos = new Set();

        for (const unit of unitsArray) {
            try {
                const searchQuery = `"${topic}" ${unit.title} lecture tutorial`.trim();
                const ytSearchRes = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
                    params: {
                        part: 'snippet',
                        q: searchQuery,
                        key: process.env.YOUTUBE_API_KEY,
                        maxResults: 12,
                        type: 'video',
                        videoEmbeddable: 'true',
                        relevanceLanguage: 'en' 
                    }
                });

                const searchItems = ytSearchRes.data.items || [];
                const candidateIds = searchItems.map(item => item.id?.videoId).filter(Boolean);
                let assignedVideoId = "w7ejDZ8SWv8";

                if (candidateIds.length > 0) {
                    const ytDetailsRes = await axios.get(`https://www.googleapis.com/youtube/v3/videos`, {
                        params: {
                            part: 'contentDetails,snippet',
                            id: candidateIds.join(','),
                            key: process.env.YOUTUBE_API_KEY
                        }
                    });

                    const detailedItems = ytDetailsRes.data.items || [];

                    for (const videoItem of detailedItems) {
                        const currentId = videoItem.id;
                        const videoTitle = videoItem.snippet?.title?.toLowerCase() || "";
                        const isoDuration = videoItem.contentDetails?.duration || "";
                        
                        const durationInSeconds = parseISO8601Duration(isoDuration);

                        if (currentId && !globalUsedVideos.has(currentId)) {
                            if (videoTitle.includes("#shorts") || videoTitle.includes("youtube shorts") || durationInSeconds < 300) {
                                continue; 
                            }
                            
                            assignedVideoId = currentId;
                            globalUsedVideos.add(currentId); 
                            break;
                        }
                    }
                }
                if (assignedVideoId === "w7ejDZ8SWv8" && candidateIds.length > 0) {
                    assignedVideoId = candidateIds[0];
                }
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
                    videoId: assignedVideoId,
                    summary: fullSummary 
                });

            } catch (err) {
                console.error("YouTube Engine Core Fallback:", err.message);
                finalizedUnits.push({ 
                    title: unit.title,
                    quiz: unit.quiz,
                    videoId: "w7ejDZ8SWv8", 
                    summary: unit.summary || "Content processing fallback structure error."
                });
            }
        }

        const newCourse = new Course({ userId: req.userId, title: topic, level, units: finalizedUnits });
        await newCourse.save();
        res.status(201).json(newCourse);
    } catch (error) {
        console.error("Critical Forging Exception Failure:", error);
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