export default function AboutPage() {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">About Learning Path Advisor</h1>
          
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="prose prose-purple max-w-none">
              <p>
                Learning Path Advisor is an AI-powered platform designed to help learners create personalized 
                educational journeys based on their goals, current skills, and interests.
              </p>
              
              <h2>Our Mission</h2>
              <p>
                Our mission is to make quality education more accessible by providing personalized learning
                guidance powered by artificial intelligence. We believe everyone deserves a learning path
                that's tailored to their unique needs and goals.
              </p>
              
              <h2>How It Works</h2>
              <p>
                Learning Path Advisor uses Claude AI to analyze your learning goals, current skill level,
                and areas of interest to generate a comprehensive learning path. This includes:
              </p>
              
              <ul>
                <li>Sequential topics arranged in a logical learning order</li>
                <li>Recommended resources for each stage of learning</li>
                <li>Estimated time commitments for each section</li>
                <li>Project ideas to reinforce your learning</li>
                <li>Visual representations to help you plan your journey</li>
              </ul>
              
              <h2>Coming Soon</h2>
              <p>
                We're currently in beta, but we have exciting features in development:
              </p>
              
              <ul>
                <li>User accounts to save and track multiple learning paths</li>
                <li>Progress tracking and milestone achievements</li>
                <li>Community features to connect with others on similar learning journeys</li>
                <li>Enhanced visualizations and interactive learning tools</li>
              </ul>
              
              <p>
                Stay tuned for our official launch!
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }