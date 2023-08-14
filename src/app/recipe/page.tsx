'use client';
import React, { useState } from 'react';

const RecipeGenerator = () => {
  const [ingredients, setIngredients] = useState(['']);
  const [kitchenType, setKitchenType] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [recipe, setRecipe] = useState<null | string>(null);

  const handleGenerateRecipe = async () => {
    setIsLoading(true);
    const response = await fetch('/api/recipe', {
      method: 'POST',
      body: JSON.stringify({
        ingredients,
        kitchenType,
        additionalInfo,
      }),
    });

    const data = await response.json();
    setIsLoading(false);
    setRecipe(data.response);
  };

  const handleRemoveIngredient = (index: number) => {
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
  };

  return (
    <div className='container mx-auto p-4'>
      <div className='mb-4'>
        <h2 className='mb-2 text-xl font-semibold'>Ingredients</h2>
        {ingredients.map((ingredient, idx) => (
          <div key={idx} className='mb-2 flex items-center space-x-2'>
            <input
              type='text'
              value={ingredient}
              onChange={(e) => {
                const newIngredients = [...ingredients];
                newIngredients[idx] = e.target.value;
                setIngredients(newIngredients);
              }}
              className='flex-grow rounded border p-2 text-black'
            />
            <button
              className='rounded bg-red-500 p-2 text-white'
              onClick={() => handleRemoveIngredient(idx)}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          className='mt-2 rounded bg-blue-500 p-2 text-white'
          onClick={() => setIngredients([...ingredients, ''])}
        >
          + Add Ingredient
        </button>
      </div>

      {/* Kitchen Type Section */}
      <div className='mb-4'>
        <h2 className='mb-2 text-xl font-semibold'>Kitchen Style</h2>
        <div className='mb-2 flex flex-wrap space-x-4'>
          {[
            'Italian',
            'French',
            'Asian',
            'Mediterranean',
            'Mexican',
            'Indian',
          ].map((type) => (
            <button
              key={type}
              className={`rounded p-2 ${
                kitchenType === type ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
              onClick={() => setKitchenType(type)}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className='mb-4'>
        <h2 className='mb-2 text-xl font-semibold'>Additional Information</h2>
        <textarea
          value={additionalInfo}
          onChange={(e) => setAdditionalInfo(e.target.value)}
          className='h-32 w-full rounded border p-2'
        ></textarea>
      </div>

      <button
        className='rounded bg-green-500 p-2 text-white'
        onClick={handleGenerateRecipe}
      >
        {isLoading ? '👨‍🍳 The pot is boiling...' : 'Generate Recipe'}
      </button>

      {recipe && !isLoading && (
        <div className='mt-4'>
          <h2 className='mb-2 text-xl font-semibold'>Recipe</h2>
          <div className='mb-2'>
            <div
              dangerouslySetInnerHTML={{ __html: recipe?.replace('"', '') }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeGenerator;
