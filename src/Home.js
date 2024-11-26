import './styling.css'

function Home() {
    return (
      <div id='container'>
        <div className='pt-3'>
          <h1>Welcome to <span id='weakerID'>Weaker</span>!</h1>
          <p>Your ultimate gym companion for strength training.</p>
    
          <p>
            Whether you're a beginner or a seasoned athlete, FitnessPro is here to help you enhance your workouts.
          </p>
    
          <h3>Discover New Exercises</h3>
          <p>
            Explore a wide range of exercises for all fitness levels. Our app connects to a comprehensive exercise database, bringing you detailed instructions, muscle groups targeted, and more.
          </p>
    
          <h3>Detailed Exercise Information</h3>
          <p>
            Dive deeper into each exercise on the "Exercises" page. Get access to images, instructions, and helpful tips to ensure you're performing each exercise correctly.
          </p>
        </div>


        <div className='pt-2'>
          <h2>How to Use This Site</h2>
          <h3>1. Browse Exercises</h3>
          <p>Visit the <a id='exercisesLinkID' href="/exercises">Exercises</a> page to explore a comprehensive list of exercises. You can search by exercise name or filter by category to find exactly what you need.</p>
          <h3>2. Get Detailed Information</h3>
          <p>Click on an exercise to view its details, including the muscles it targets, its category, and an image to guide you. This will help you ensure proper form and maximize the benefits of each workout.</p>
          <h3>3. Search and Filter</h3>
          <p>Use the search bar to quickly find specific exercises or filter by categories such as "Strength", "Cardio", "Flexibility" etc. The intuitive interface makes it easy to find exactly what you're looking for.</p>
          <h3>Start Now!</h3>
          <p>Ready to take your training to the next level? Search for exercises, filter by muscle group, and start building your perfect workout routine today!</p>
          <p>Explore the exercises and get all the details you need on our <a id='exercisesLinkID' href="/exercises">Exercises</a> page.</p>
        </div>
      </div>
    );
  }
  
  export default Home;