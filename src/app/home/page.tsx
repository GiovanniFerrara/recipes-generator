'use client';
import React, { useState } from 'react';

const RecipeGenerator = () => {
  const [ingredients, setIngredients] = useState(['']);
  const [kitchenType, setKitchenType] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');

  const handleGenerateRecipe = () => {
    // TODO: Implement your recipe generation logic here.
    alert('Recipe generated! (Logic not implemented)');
  };

  return (
    <div className='container mx-auto p-4'>
      {/* Ingredients Section */}
      <div className='mb-4'>
        <h2 className='mb-2 text-xl font-semibold'>Ingredients</h2>
        {ingredients.map((ingredient, idx) => (
          // text color black
          <div key={idx} className='mb-2'>
            <input
              type='text'
              value={ingredient}
              onChange={(e) => {
                const newIngredients = [...ingredients];
                newIngredients[idx] = e.target.value;
                setIngredients(newIngredients);
              }}
              className='w-full rounded border p-2 text-black'
            />
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
        <h2 className='mb-2 text-xl font-semibold'>Kitchen Type</h2>
        <div className='flex space-x-4'>
          {['Italian', 'French', 'Asian'].map((type) => (
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

      {/* Additional Information Section */}
      <div className='mb-4'>
        <h2 className='mb-2 text-xl font-semibold'>Additional Information</h2>
        <textarea
          value={additionalInfo}
          onChange={(e) => setAdditionalInfo(e.target.value)}
          className='h-32 w-full rounded border p-2'
        ></textarea>
      </div>

      {/* Generate Recipe Button */}
      <button
        className='rounded bg-green-500 p-2 text-white'
        onClick={handleGenerateRecipe}
      >
        Generate Recipe
      </button>
    </div>
  );
};

export default RecipeGenerator;
