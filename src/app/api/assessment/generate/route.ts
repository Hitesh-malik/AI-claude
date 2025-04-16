// src/app/api/assessment/generate/route.ts

import { NextResponse } from 'next/server';

// Generate unique IDs for questions
function generateUniqueId(): string {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}

// Interface for the questions
interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  topic: string;
  subtopic?: string;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { topic, subtopic, count = 10 } = body;
    
    if (!topic) {
      return NextResponse.json(
        { error: 'Topic is required' },
        { status: 400 }
      );
    }

    // In production, we would generate these with Claude AI
    // For now, let's use mock questions
    let questions = getMockQuestions(topic, subtopic, count);
    
    // If we have Claude API key, use it to generate questions
    if (process.env.ANTHROPIC_API_KEY) {
      try {
        const aiQuestions = await generateQuestionsWithAI(topic, subtopic, count);
        if (aiQuestions.length > 0) {
          questions = aiQuestions;
        }
      } catch (error) {
        console.error('Error generating questions with AI, using mock questions:', error);
        // We'll use mock questions as fallback, already set above
      }
    }
    
    return NextResponse.json({ questions });
  } catch (error: any) {
    console.error('Error generating assessment questions:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate assessment questions' },
      { status: 500 }
    );
  }
}

/**
 * Generates assessment questions using Claude AI
 */
async function generateQuestionsWithAI(
  topic: string,
  subtopic?: string,
  count: number = 10
): Promise<Question[]> {
  if (!process.env.ANTHROPIC_API_KEY) {
    return getMockQuestions(topic, subtopic, count);
  }
  
  try {
    // Structured prompt for consistent question generation
    const prompt = `Generate ${count} multiple-choice questions to assess knowledge of ${topic}${
      subtopic ? ` (specifically ${subtopic})` : ''
    }. 
    
    Create a mix of questions with these difficulty levels:
    - 40% beginner level questions
    - 40% intermediate level questions
    - 20% advanced level questions
    
    For each question:
    1. Provide a clear question text
    2. Provide exactly 4 options (A, B, C, D)
    3. Indicate which option is correct (0-3, where 0=A, 1=B, 2=C, 3=D)
    4. Assign a difficulty level (beginner, intermediate, or advanced)
    
    Format your response as a valid JSON array with no additional formatting or explanation. Each question should have this structure:
    {
      "text": "Question text here?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": 0,
      "difficulty": "beginner"
    }`;

    // Call Claude API
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: "claude-3-opus-20240229",
        max_tokens: 4000,
        temperature: 0.7,
        system: "You are an assessment question generator. Your task is to create high-quality multiple-choice questions with exactly 4 options for each question. Follow the user's instructions precisely and return only valid JSON.",
        messages: [
          { role: "user", content: prompt }
        ]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Claude API Error:', errorText);
      throw new Error(`Claude API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const aiResponse = data.content[0].text;
    
    // Parse the JSON response
    try {
      const questionsArray = JSON.parse(aiResponse);
      
      // Add IDs and topic/subtopic to each question
      return questionsArray.map((q: Omit<Question, 'id' | 'topic' | 'subtopic'>) => ({
        ...q,
        id: generateUniqueId(),
        topic,
        subtopic
      }));
    } catch (error) {
      console.error('Error parsing AI response:', error);
      throw new Error('Failed to parse AI-generated questions');
    }
  } catch (error) {
    console.error('Error calling Claude API:', error);
    return getMockQuestions(topic, subtopic, count);
  }
}

/**
 * Provides mock questions for development/fallback
 */
function getMockQuestions(topic: string, subtopic?: string, count: number = 10): Question[] {
  // We'll create mock questions with a distribution of difficulty levels
  const beginnerCount = Math.floor(count * 0.4);
  const intermediateCount = Math.floor(count * 0.4);
  const advancedCount = count - beginnerCount - intermediateCount;
  
  // Create mock questions for different programming topics
  const mockQuestionTemplates: Record<string, Array<Omit<Question, 'id' | 'topic' | 'subtopic'>>> = {
    // Java specific questions
    "Java": [
      // Beginner questions
      {
        text: "Which keyword is used to create an instance of a class in Java?",
        options: ["new", "this", "create", "instance"],
        correctAnswer: 0,
        difficulty: "beginner"
      },
      {
        text: "What is the correct way to declare a main method in Java?",
        options: [
          "public void main(String[] args)",
          "public static void main(String args[])",
          "static public void main(String[] args)",
          "public static void main(String[] args)"
        ],
        correctAnswer: 3,
        difficulty: "beginner"
      },
      {
        text: "Which of the following is NOT a primitive data type in Java?",
        options: ["int", "boolean", "String", "double"],
        correctAnswer: 2,
        difficulty: "beginner"
      },
      {
        text: "What is the default value of an int variable in a class?",
        options: ["0", "null", "undefined", "1"],
        correctAnswer: 0,
        difficulty: "beginner"
      },
      {
        text: "Which statement is used to make a decision in Java?",
        options: ["for", "while", "if", "switch"],
        correctAnswer: 2,
        difficulty: "beginner"
      },
      {
        text: "What symbol is used for single-line comments in Java?",
        options: ["//", "/*", "#", "<!--"],
        correctAnswer: 0,
        difficulty: "beginner"
      },
      // Intermediate questions
      {
        text: "What is method overriding in Java?",
        options: [
          "Defining a method in a subclass with the same name as in the superclass",
          "Defining multiple methods with the same name but different parameters",
          "Hiding variables of a superclass",
          "None of the above"
        ],
        correctAnswer: 0,
        difficulty: "intermediate"
      },
      {
        text: "Which access modifier makes a class member accessible only within its package?",
        options: ["public", "protected", "private", "default (no modifier)"],
        correctAnswer: 3,
        difficulty: "intermediate"
      },
      {
        text: "What is the purpose of the 'final' keyword when applied to a class?",
        options: [
          "The class cannot be instantiated",
          "The class cannot be extended (inherited)",
          "The class cannot be garbage collected",
          "The class methods cannot be overridden"
        ],
        correctAnswer: 1,
        difficulty: "intermediate"
      },
      {
        text: "Which collection type should be used when you need to ensure that elements are unique?",
        options: ["ArrayList", "LinkedList", "HashMap", "HashSet"],
        correctAnswer: 3,
        difficulty: "intermediate"
      },
      {
        text: "What does the 'super' keyword do in Java?",
        options: [
          "Refers to the superclass object",
          "Creates a new instance of the superclass",
          "Makes a class superior to others",
          "Increases the priority of a thread"
        ],
        correctAnswer: 0,
        difficulty: "intermediate"
      },
      {
        text: "What is an interface in Java?",
        options: [
          "A class that cannot be instantiated",
          "A blueprint that contains only abstract methods and constants",
          "A class with all static methods",
          "A graphical user interface component"
        ],
        correctAnswer: 1,
        difficulty: "intermediate"
      },
      // Advanced questions
      {
        text: "What is the difference between 'throw' and 'throws' in Java exception handling?",
        options: [
          "'throw' is used to explicitly throw an exception, while 'throws' declares exceptions that might be thrown",
          "'throw' is used for checked exceptions, while 'throws' is for unchecked exceptions",
          "'throw' is used in the method body, while 'throws' is used in the method declaration",
          "Both A and C"
        ],
        correctAnswer: 3,
        difficulty: "advanced"
      },
      {
        text: "What is the purpose of the 'volatile' keyword in Java?",
        options: [
          "To prevent a variable from being modified",
          "To make a variable thread-safe by ensuring its visibility across threads",
          "To improve performance by storing the variable in CPU registers",
          "To mark a variable for garbage collection"
        ],
        correctAnswer: 1,
        difficulty: "advanced"
      },
      {
        text: "Which of the following is true about Java's memory management?",
        options: [
          "Java has automatic garbage collection but no manual memory management",
          "Java allows explicit memory deallocation using the 'delete' keyword",
          "Java objects are always created on the stack",
          "Primitive variables in Java are stored on the heap"
        ],
        correctAnswer: 0,
        difficulty: "advanced"
      }
    ],
    // Default questions that work for any topic
    "default": [
      // Beginner questions
      {
        text: `What is the primary purpose of ${topic}?`,
        options: [
          `To solve real-world problems`,
          `To run only on specific hardware`,
          `To make development more complex`,
          `To replace all other technologies`
        ],
        correctAnswer: 0,
        difficulty: "beginner"
      },
      {
        text: `Which of these is NOT a common characteristic of ${topic}?`,
        options: [
          `Flexibility`,
          `Reusability`,
          `Limited compatibility`,
          `Standardization`
        ],
        correctAnswer: 2,
        difficulty: "beginner"
      },
      {
        text: `Which approach is best for beginners learning ${topic}?`,
        options: [
          `Memorizing all concepts at once`,
          `Starting with advanced concepts`,
          `Learning step-by-step with practical exercises`,
          `Reading academic papers on the subject`
        ],
        correctAnswer: 2,
        difficulty: "beginner"
      },
      {
        text: `What is a common beginner mistake when learning ${topic}?`,
        options: [
          `Taking too many notes`,
          `Trying to understand everything at once`,
          `Practicing too much`,
          `Following tutorials too closely`
        ],
        correctAnswer: 1,
        difficulty: "beginner"
      },
      // Intermediate questions
      {
        text: `What's the best approach to learn ${topic} effectively?`,
        options: [
          `Memorize all concepts without practice`,
          `Practice with real projects while learning the theory`,
          `Focus only on theory and ignore practical applications`,
          `Learn without understanding the fundamentals`
        ],
        correctAnswer: 1,
        difficulty: "intermediate"
      },
      {
        text: `Which statement about ${topic} is most accurate?`,
        options: [
          `It's only useful for large enterprises`,
          `It's too complex for beginners to learn`,
          `It has both advantages and limitations`,
          `It will be obsolete within a year`
        ],
        correctAnswer: 2,
        difficulty: "intermediate"
      },
      {
        text: `How do professionals typically improve their skills in ${topic}?`,
        options: [
          `By reading about it once a year`,
          `By continuous learning and practical application`,
          `By avoiding new developments in the field`,
          `By focusing only on theoretical knowledge`
        ],
        correctAnswer: 1,
        difficulty: "intermediate"
      },
      {
        text: `What is a key factor for success when working with ${topic} in a team environment?`,
        options: [
          `Working independently without collaboration`,
          `Clear communication and documentation`,
          `Hiding your code from others`,
          `Avoiding feedback from peers`
        ],
        correctAnswer: 1,
        difficulty: "intermediate"
      },
      // Advanced questions
      {
        text: `In the context of ${topic}, what is meant by "best practices"?`,
        options: [
          `The most expensive approaches`,
          `Proven methods that lead to better results`,
          `The fastest implementation regardless of quality`,
          `Techniques only usable by experts`
        ],
        correctAnswer: 1,
        difficulty: "advanced"
      },
      {
        text: `What is typically the most challenging aspect of mastering ${topic}?`,
        options: [
          `Understanding the core concepts`,
          `Keeping up with evolving standards and practices`,
          `Finding learning resources`,
          `Installing the necessary tools`
        ],
        correctAnswer: 1,
        difficulty: "advanced"
      },
      {
        text: `How do advanced practitioners of ${topic} differ from beginners?`,
        options: [
          `They memorize more information`,
          `They understand underlying principles and can adapt to new situations`,
          `They use more complex tools`,
          `They avoid simple solutions`
        ],
        correctAnswer: 1,
        difficulty: "advanced"
      },
      {
        text: `What approach should be taken when encountering a new problem in ${topic}?`,
        options: [
          `Always use the first solution that comes to mind`,
          `Analyze the problem, consider multiple approaches, and choose the most appropriate one`,
          `Immediately ask for help without trying to solve it`,
          `Use the most complex solution possible to show expertise`
        ],
        correctAnswer: 1,
        difficulty: "advanced"
      }
    ]
  };
  
  // Select appropriate question set
  let questionsToUse = mockQuestionTemplates[topic] || mockQuestionTemplates["default"];
  
  // Filter by difficulty and create the final questions array
  let result: Question[] = [];
  
  // Add beginner questions
  const beginnerQuestions = questionsToUse.filter(q => q.difficulty === "beginner");
  for (let i = 0; i < beginnerCount; i++) {
    if (beginnerQuestions.length > 0) {
      const question = beginnerQuestions[i % beginnerQuestions.length];
      result.push({
        ...question,
        id: generateUniqueId(),
        topic,
        subtopic
      });
    }
  }
  
  // Add intermediate questions
  const intermediateQuestions = questionsToUse.filter(q => q.difficulty === "intermediate");
  for (let i = 0; i < intermediateCount; i++) {
    if (intermediateQuestions.length > 0) {
      const question = intermediateQuestions[i % intermediateQuestions.length];
      result.push({
        ...question,
        id: generateUniqueId(),
        topic,
        subtopic
      });
    }
  }
  
  // Add advanced questions
  const advancedQuestions = questionsToUse.filter(q => q.difficulty === "advanced");
  for (let i = 0; i < advancedCount; i++) {
    if (advancedQuestions.length > 0) {
      const question = advancedQuestions[i % advancedQuestions.length];
      result.push({
        ...question,
        id: generateUniqueId(),
        topic,
        subtopic
      });
    }
  }
  
  // Shuffle the questions for randomized order
  return result.sort(() => Math.random() - 0.5);
}