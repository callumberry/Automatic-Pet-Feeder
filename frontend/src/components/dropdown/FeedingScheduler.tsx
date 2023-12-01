// src/PetFeeder.tsx
import React from 'react';
import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form';

interface FormData {
  feedingTimes: { time: string; servings: number }[];
}

const PetFeeder: React.FC = () => {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isDirty, isSubmitSuccessful },
  } = useForm<FormData>({
    defaultValues: { feedingTimes: [{ time: '00:00', servings: 1 }] },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'feedingTimes',
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    // Handle the submission logic here (e.g., save to state or trigger API)
    console.log('Form Data:', data);
  };

  const addTime = () => {
    append({ time: '00:00', servings: 1 });
  };

  const removeTime = (index: number) => {
    remove(index);
  };

  return (
    <div>
      <h1>Pet Feeder Schedule</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ display: 'flex', marginBottom: '10px' }}>
          <div style={{ flex: 1, textAlign: 'left' }}>
            <strong>Time</strong>
          </div>
          <div style={{ flex: 1, marginLeft: '0px', textAlign: 'left' }}>
            <strong>Servings</strong>
          </div>
        </div>

        {fields.map((field, index) => (
          <div
            key={field.id}
            style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}
          >
            <div style={{ flex: 1 }}>
              <label>
                {errors.feedingTimes?.[index]?.time && <span style={{ color: 'red', marginRight: '-5px' }}>!</span>}
                <input
                  type="time"
                  {...register(`feedingTimes.${index}.time`, { required: true })}
                  defaultValue="00:00"
                />
              </label>
            </div>

            <div style={{ flex: 1, marginLeft: '20px', textAlign: 'left' }}>
              <label>
                {errors.feedingTimes?.[index]?.servings && (
                  <span style={{ color: 'red', marginRight: '-5px' }}>!</span>
                )}
                <input
                  type="number"
                  {...register(`feedingTimes.${index}.servings`, {
                    required: true,
                    min: { value: 1, message: 'Minimum servings is 1' },
                  })}
                  style={{ width: '40px' }}
                  min={1}
                />
              </label>
            </div>

            <div style={{ marginLeft: '10px' }}>
              <button type="button" onClick={() => removeTime(index)}>
                Remove
              </button>
            </div>
          </div>
        ))}

        <div style={{ marginBottom: '10px' }}>
          <button
            type="button"
            onClick={addTime}
            style={{ marginRight: '10px' }}
          >
            Add Time
          </button>

          <button type="submit" disabled={!isDirty || Object.keys(errors).length > 0}>
            Save
          </button>
        </div>

        {isSubmitSuccessful && (
          <p style={{ color: 'green' }}>Schedule saved successfully!</p>
        )}
      </form>
    </div>
  );
};

export default PetFeeder;