import React, { FunctionComponent } from 'react';
import { Pie } from 'react-chartjs-2';

const JobChartStat: FunctionComponent = () => {
  const data = {
    datasets: [
      {
        contrats: ['CDI', 'CDD > 3 mois', 'CDD <= 3 mois', 'Intérim', 'Autre'],
        data: [42.21, 37.47, 19, 1.06, 0.26],
        backgroundColor: [
          'rgb(3, 148, 252)',
          'rgb(255, 151, 33)',
          'rgb(250, 224, 27)',
          'rgb(207, 23, 23)',
          'rgb(181, 181, 181)',
        ],
        borderWidth: 0.5,
      },
    ],
  };

  return (
    <div className="mt-8 text-sm">
      <ul className="text-lena-dark">
        <li>
          - Contrat le plus employé : <strong>CDI</strong>
        </li>
        <li>- Répartition par type de contrat :</li>
      </ul>
      <div className="flex space-x-5 items-center mt-8">
        <div className="w-1/3">
          <Pie type="pie" data={data} />
        </div>
        <ul>
          {data.datasets.map((d) =>
            d.backgroundColor.map((b, j) => (
              <li className="space-x-3 text-lena-dark">
                <span className="inline-block rounded-full" style={{ background: b, height: 10, width: 10 }} />
                <span>
                  {d.data[j]}% - {d.contrats[j]}
                </span>
              </li>
            )),
          )}
        </ul>
      </div>
      <div className="text-xs text-right mt-5">(Source Pôle emploi de janvier 2019 à décembre 2019)</div>
    </div>
  );
};

export default JobChartStat;
