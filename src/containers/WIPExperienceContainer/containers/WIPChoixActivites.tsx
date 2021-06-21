import React, { FunctionComponent, useState } from 'react';
import ParcoursLayout from '../ParcoursLayout';
import SelectorTest from '../../../components/design-system/SelectorTest';

type NewActivity = {
  onSend: (e: string) => void;
  onClose: () => void;
};

const AddNewActivity = ({ onSend, onClose }: NewActivity) => {
  const [text, setText] = useState(String);

  const handleSend = () => {
    if (text.length > 0) {
      onSend.call(null, text);
      onClose.call(null);
    }
  };

  return (
    <div className="p-14">
      <h3 className="text-lena-blue-dark mb-7">
        Si elle n’est pas dans la liste, décrivez vous-même <strong>une activité</strong> que vous pratiquez :
      </h3>
      <textarea
        placeholder="ex: J'invente des recettes"
        maxLength={140}
        value={text}
        onChange={(e) => setText(e.currentTarget.value)}
        className="w-full rounded-md ring-0 border-lena-lightgray2"
        rows={2}
      />
      <span className="text-sm text-lena-pink mt-2 block">
        {140 - text.length} caractère{140 - text.length > 1 && 's'} restant{140 - text.length > 1 && 's'}
      </span>
      <button
        onClick={handleSend}
        className="mt-6 rounded-md focus:ring-0 focus:outline-none w-full bg-lena-blue text-white py-3 text-center font-bold text-lg"
      >
        Valider
      </button>
      <button
        onClick={() => onClose.call(null)}
        className="mt-2 rounded-md focus:ring-0 focus:outline-none w-full bg-lena-pink-dark text-white py-3 text-center font-bold text-lg"
      >
        Annuler
      </button>
    </div>
  );
};

const WipChoixActivites: FunctionComponent = () => {
  const [activitiesChecked, setActivitiesChecked] = useState<Array<any>>([]);
  const [activities, setActivity] = useState<Array<any>>([
    {
      id: 1,
      name: 'yolo',
    },
    {
      id: 2,
      name: 'mpim',
    },
    { id: 3, name: 'ptezzedr' },
    { id: 4, name: 'ptdsdsdr' },
    { id: 5, name: 'ptedr' },
  ]);
  const [showNewActivity, setShowNewActivity] = useState(false);

  const handleCheck = (value: any, checked: boolean) => {
    if (checked) {
      setActivitiesChecked([...activitiesChecked, value]);
    } else {
      const filteredAry = activitiesChecked.filter(function (e) {
        return e !== value;
      });
      setActivitiesChecked(filteredAry);
    }
  };

  const verifyIfCheck = (value: any) => {
    const filteredAry = activitiesChecked.filter(function (e) {
      return e === value;
    });
    return filteredAry.length > 0;
  };

  const handleAddNewActivity = (value: string) => {
    // @ts-ignore
    const min = Math.ceil(10000000);
    const max = Math.floor(999999999999);
    const newId = Math.floor(Math.random() * (max - min)) + min;
    setActivity([...activities, { id: newId, name: value }]);
    setActivitiesChecked([...activitiesChecked, newId]);
  };

  return (
    <ParcoursLayout>
      {!showNewActivity ? (
        <div className="md:p-14 md:w-1/2 md:mx-auto">
          <div className="relative min-h-full md:min-h-0">
            <div className="text-lena-blue-dark">
              Dans le cadre de la boulangerie, quelles sont les <strong>activités</strong> que vous pratiquez ?
            </div>
            <div className="italic mt-2">Plusieurs choix possibles</div>
          </div>
          <div className="w-full mt-8 relative mb-24">
            <div className="md:grid md:grid-cols-2 gap-4 space-y-3 md:space-y-0">
              {activities.map((acti) => (
                <SelectorTest onClick={(e) => handleCheck(acti.id, e)} checked={verifyIfCheck(acti.id)}>
                  {acti.name}
                </SelectorTest>
              ))}
            </div>
            <div className="flex justify-center md:mt-10">
              <button onClick={() => setShowNewActivity(true)} className="text-lena-blue-dark font-bold mt-2">
                Ajouter une activité non listée
              </button>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="fixed bottom-0 left-0 right-0 md:relative">
              <button className="focus:ring-0 focus:outline-none w-full bg-lena-blue text-white py-3 text-center font-bold text-lg md:w-72 md:rounded-lg">
                Valider
              </button>
            </div>
          </div>
        </div>
      ) : (
        <AddNewActivity onSend={(e: string) => handleAddNewActivity(e)} onClose={() => setShowNewActivity(false)} />
      )}
    </ParcoursLayout>
  );
};

export default WipChoixActivites;
