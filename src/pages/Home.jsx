import React from 'react'
import { Search, Headphones, Mic2, Radio } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


export default function Home() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/episode'); 
  };

  const sampleSearchTerms = ['The Daily', 'Serial', 'TED Talks Daily', 'How I Built This', 'Stuff You Should Know'];


  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-purple-900 text-white">
    {/* Hero Section */}
    <div className="container mx-auto px-4 pt-1 pb-32 ">
      <div className="max-w-4xl mx-auto text-center 2xl:mt-40">
        <div className="flex justify-center mb-8">
          <Headphones className="w-20 h-20 text-purple-300" />
        </div>
        <h1 className="text-5xl font-bold mb-6 leading-tight">
          Discover Your Next Favorite Podcast
        </h1>
        <p className="text-xl text-purple-200 mb-8">
          Search through millions of podcasts instantly. Find exactly what you want to listen to.
        </p>
        <button
          onClick={handleClick}
          className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-4 px-8 rounded-full text-lg transition-all transform hover:scale-105 flex items-center mx-auto gap-2"
        >
          <Search className="w-5 h-5" />
          Start Exploring
        </button>
      </div>
    </div>

  

    {/* Sample Search Terms */}
    <div className="container mx-auto px-4  2xl:mt-42">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Popular Search Terms</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {sampleSearchTerms.map((term) => (
            <div
              key={term}
              className="bg-purple-800/50 px-6 py-3 rounded-full hover:bg-purple-700/50 cursor-pointer transition-colors"
            >
              {term}
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
  )
}
