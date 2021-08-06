/* eslint-disable react/require-default-props */
import React, { useState, useEffect } from 'react';
import { Question, Option } from 'common/requests/types';
import { useQuestions } from 'common/requests/questions';
import Select from './ActivitySelect';

interface Props {
  setOptionActivities: (optionsActivities: { id: string; title: string }[][]) => void;
  optionActivities: { id: string; title: string }[][];
  index: number;
  handleValidate?: (valid: boolean, index: number) => void;
  clearValid?: (index: number) => void;
}

const QuestionList = ({ setOptionActivities, optionActivities, index, handleValidate, clearValid }: Props) => {
  const [open, setOpen] = useState(false);

  const [questions, setQuestions] = useState([] as Question[]);

  const { data } = useQuestions({ variables: { path: optionActivities[index].map((o) => o.id) } });

  useEffect(() => {
    if (data) {
      const question = data.questions.data.sort((a, b) => {
        if (!a.parent) return -1;
        if (!b.parent) return 1;
        if (a.id === b.parent.id) return -1;
        if (b.id === a.parent.id) return 1;
        return 0;
      });
      setQuestions(question);
    }

    // eslint-disable-next-line
  }, [data?.questions.data]);

  useEffect(() => {
    if (handleValidate) {
      handleValidate(!questions.find((q, i) => !optionActivities[index][i]), index);
    }
    // eslint-disable-next-line
  }, [questions, optionActivities]);

  const openActivity = () => {
    setOpen(true);
  };

  const handleChange = (option: Option, i: number) => {
    const nextOptionsActivities = [...optionActivities];
    const newValuesRow = nextOptionsActivities[index];
    const newOptionsValues = newValuesRow.slice(0, i);
    newOptionsValues[i] = { id: option.id, title: option.title };
    nextOptionsActivities[index] = newOptionsValues;
    setOptionActivities(nextOptionsActivities);
  };

  const deleteActivity = () => {
    if (optionActivities.length > 1) {
      if (clearValid) clearValid(index);
      setOptionActivities(optionActivities.filter((act, i) => i !== index));
    } else {
      setOptionActivities([[]]);
    }
  };
  console.log('questions', questions);
  return (
    <div>
      {questions.map((question, i) => (
        <div key={question.id}>
          <div>
            <Select
              index={i}
              openActivity={openActivity}
              onChange={(e) => handleChange(e, i)}
              value={optionActivities && optionActivities[index][i] ? optionActivities[index][i].id : ''}
              setOpen={setOpen}
              open={open}
              question={question}
              parent={optionActivities[index]
                .slice(0, i)
                .map((e) => e.id)
                .join(',')}
            />
          </div>
        </div>
      ))}
      {(optionActivities.length > 1 || questions.length > 1) && <div onClick={deleteActivity}>X</div>}
    </div>
  );
};
export default QuestionList;
