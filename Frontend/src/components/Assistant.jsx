import React, { useState } from 'react';

export default function Assistant() {
  const [formData, setFormData] = useState({
    gender: 'female',
    color: '#ff5733',
    clothingType: 'dress',
    occasion: 'casual',
    season: 'summer',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [designIdeas, setDesignIdeas] = useState('');
  const [error, setError] = useState('');

  const clothingOptions = {
    female: ['dress', 'blouse', 'skirt', 'jumpsuit', 'gown'],
    male: ['shirt', 'trousers', 'suit', 'jacket', 'sweater'],
    unisex: ['t-shirt', 'hoodie', 'sweatshirt', 'jeans', 'outerwear']
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const generateIdeas = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      // In a real implementation, this would call your backend API
      // which would then call the OpenAI API
      const prompt = `Generate creative fashion design ideas for a ${formData.color} ${formData.clothingType} for ${formData.gender} for ${formData.occasion} occasions in ${formData.season}. Include details about cut, material, and styling.`;
      
      // Simulating API call with timeout
      setTimeout(() => {
        // Mock response - in production this would be the actual OpenAI response
        const mockResponse = `
# Design Concept: ${formData.color.toUpperCase()} ${formData.clothingType.toUpperCase()} FOR ${formData.gender.toUpperCase()}

## Silhouette & Cut
${formData.gender === 'female' ? 
  '- Elegant A-line silhouette with subtle gathering at waist\n- Modern asymmetrical hem with side slit\n- Structured shoulders with delicate cap sleeve detail' : 
  formData.gender === 'male' ? 
  '- Tailored fit with slight tapering at waist\n- Clean lines with minimal seaming\n- Modern length with comfortable movement allowance' :
  '- Relaxed contemporary fit\n- Dropped shoulder with balanced proportions\n- Versatile length suitable for layering'}

## Material Suggestions
- Primary: ${formData.season === 'summer' ? 'Lightweight linen blend with natural drape' : 'Medium weight wool with slight stretch'}
- Accent: Contrasting ${formData.color === '#ff5733' ? 'navy' : 'ivory'} piping along key edges
- ${formData.occasion === 'formal' ? 'Subtle jacquard pattern woven throughout fabric' : 'Textured surface treatment for visual interest'}

## Color Application
- Main color: ${formData.color} as the dominant tone
- Consider: Tonal variations for design elements like collar/cuffs
- Complimentary trim in ${formData.color === '#ff5733' ? 'deep teal' : 'warm ochre'}

## Design Details
- ${formData.occasion === 'formal' ? 'Hidden closure system with covered buttons' : 'Minimal visible hardware in brushed metal finish'}
- ${formData.season === 'winter' ? 'Thoughtful insulation in key areas without bulk' : 'Strategic ventilation elements for comfort'}
- Signature pocket placement with functional depth

## Styling Recommendations
- Pair with: ${formData.gender === 'female' ? 'minimalist accessories in warm metallics' : 'tonal layering pieces for dimension'}
- Footwear: ${formData.occasion === 'casual' ? 'relaxed leather options in neutral tones' : 'structured footwear with architectural elements'}
- Complete look with ${formData.season === 'summer' ? 'lightweight, draped outer layer for evening transitions' : 'statement accessories that echo the primary color palette'}
        `;
        
        setDesignIdeas(mockResponse);
        setIsLoading(false);
      }, 1500);
      
    } catch (err) {
      setError('Failed to generate design ideas. Please try again.');
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    generateIdeas();
  };

  const getColorName = (hex) => {
    // This is a simple conversion - in a real app you might use a more comprehensive library
    const colors = {
      '#ff5733': 'coral red',
      '#33ff57': 'bright green',
      '#3357ff': 'royal blue',
      '#f3f3f3': 'light gray',
      '#222222': 'deep black'
    };
    return colors[hex] || hex;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-6 text-indigo-800">Fashion Design Assistant</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-md shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="unisex">Unisex</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                name="color"
                value={formData.color}
                onChange={handleInputChange}
                className="h-10 w-10 border border-gray-300 rounded cursor-pointer"
              />
              <span className="text-sm text-gray-500">{getColorName(formData.color)}</span>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Clothing Type</label>
            <select
              name="clothingType"
              value={formData.clothingType}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            >
              {clothingOptions[formData.gender].map(option => (
                <option key={option} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Occasion</label>
            <select
              name="occasion"
              value={formData.occasion}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="casual">Casual</option>
              <option value="formal">Formal</option>
              <option value="business">Business</option>
              <option value="athletic">Athletic</option>
              <option value="evening">Evening</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Season</label>
            <select
              name="season"
              value={formData.season}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="spring">Spring</option>
              <option value="summer">Summer</option>
              <option value="fall">Fall</option>
              <option value="winter">Winter</option>
              <option value="all-season">All Season</option>
            </select>
          </div>
        </div>
        
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? 'Generating Ideas...' : 'Generate Design Ideas'}
          </button>
        </div>
      </form>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-600 mb-6">
          {error}
        </div>
      )}
      
      {designIdeas && !isLoading && (
        <div className="bg-white p-6 rounded-md shadow">
          <h2 className="text-xl font-semibold mb-4 text-indigo-700">Design Ideas</h2>
          <div className="prose max-w-full">
            {designIdeas.split('\n').map((line, index) => {
              if (line.startsWith('# ')) {
                return <h1 key={index} className="text-2xl font-bold mt-4 mb-2">{line.substring(2)}</h1>;
              } else if (line.startsWith('## ')) {
                return <h2 key={index} className="text-xl font-semibold mt-3 mb-2 text-indigo-600">{line.substring(3)}</h2>;
              } else if (line.startsWith('- ')) {
                return <p key={index} className="ml-4 flex items-start mb-1"><span className="mr-2">•</span> {line.substring(2)}</p>;
              } else {
                return <p key={index} className="mb-2">{line}</p>;
              }
            })}
          </div>
        </div>
      )}
    </div>
  );
}