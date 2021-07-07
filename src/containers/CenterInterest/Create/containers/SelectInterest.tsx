import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ReactComponent as HelpSvg } from 'assets/svg/help_yellow.svg';
import { ReactComponent as ArrowSvg } from 'assets/images/svg/picto/arrow-left.svg';
import { ReactComponent as PointSvg } from 'assets/svg/point.svg';
import { ReactComponent as PolygoneSvg } from 'assets/svg/polygon.svg';
import { ReactComponent as PointBlueSvg } from 'assets/svg/point_blue.svg';
import SelectorTest from 'components/design-system/SelectorTest';

type InterestProps = {
  position: number;
};

const Interest = ({ position }: InterestProps) => {
  const getWidth = window.innerWidth;

  const renderPolygone = () => {
    const poly = [];

    for (let i = 0; i < 5; i++) {
      if (i === position) {
        poly.push(<PolygoneSvg />);
      } else {
        poly.push(<div style={{ width: 70 }} />);
      }
    }

    return poly;
  };

  return (
    <div
      className="relative"
      style={{
        transform: `translate(${getWidth * position}px, 0px)`,
      }}
    >
      <div
        className="mt-10 bg-white rounded-lg absolute w-full"
        style={{ filter: 'drop-shadow(0px -4px 4px rgba(0, 0, 0, 0.15))' }}
      >
        <div className="absolute z-10 -top-7 flex justify-around w-full">{renderPolygone()}</div>
        <div className="z-30 relative p-3">
          <div className="mb-3">
            <SelectorTest color="yellow" size="small" checked={false}>
              lol {getWidth * (position + 1)}
            </SelectorTest>
          </div>
          <div className="mb-3">
            <SelectorTest color="yellow" size="small" checked={false}>
              lol
            </SelectorTest>
          </div>
          <div className="mb-3">
            <SelectorTest color="yellow" size="small" checked={false}>
              lol
            </SelectorTest>
          </div>
          <div className="mb-3">
            <SelectorTest color="yellow" size="small" checked={false}>
              lol
            </SelectorTest>
          </div>
          <div className="mb-3">
            <SelectorTest color="yellow" size="small" checked={false}>
              lol
            </SelectorTest>
          </div>
          <div>
            <SelectorTest color="yellow" size="small" checked={false}>
              lol
            </SelectorTest>
          </div>
        </div>
      </div>
    </div>
  );
};

type Props = {
  onBack: () => void;
  onStep: () => void;
};

const SelectInterest = ({ onStep, onBack }: Props) => {
  const history = useHistory();
  const axisRef = useRef<any>(null);
  const [translate, setTranslate] = useState(0);
  const [rangeValue, setRangeValue] = useState(0);

  const handleChange = (e: any) => {
    setRangeValue(e);
    const width = window.innerWidth;
    setTranslate(width * e);
  };

  return (
    <div
      className="flex flex-col flex-1 min-h-screen h-full flex flex-col overflow-x-hidden"
      style={{ backgroundColor: '#e5e5e5' }}
    >
      <header style={{ boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.15)' }} className="bg-white pt-2">
        <div className="flex justify-between items-center container">
          <button
            className="flex items-center space-x-2 focus:outline-none focus:ring-0"
            onClick={() => onBack.call(null)}
          >
            <ArrowSvg />
            <span className="mt-1 text-sm text-lena-blue-dark">Retour</span>
          </button>
          <button className="focus:ring-0 focus:outline-none">
            <HelpSvg />
          </button>
        </div>
        <h2 className="font-bold text-lena-blue-dark text-center text-sm px-7 mx-auto py-3">
          Faites glisser le curseur et sélectionnez autant de centres d’intérêts que vous le souhaitez :
        </h2>
      </header>
      <div className="container mt-4">
        <div className="flex justify-between text-center text-lena-blue-dark mx-4">
          <span>
            Travail <br />
            collectif
          </span>
          <span>
            Travail <br />
            individuel
          </span>
        </div>
        <div ref={axisRef} className="w-full bg-lena-yellow-light h-3 mt-2 rounded-full relative">
          <div className="absolute z-50 w-full" style={{ marginTop: 9 }}>
            <input
              max={4}
              min={0}
              step={0.05}
              value={rangeValue}
              onChange={(e) => handleChange(e.currentTarget.value)}
              type="range"
              className="w-full thumb thumb--left px-7"
            />
          </div>
          <div className="flex justify-around absolute w-full" style={{ marginTop: -3.7 }}>
            <PointSvg height={20} width={20} />
            <PointSvg height={20} width={20} />
            <PointSvg height={20} width={20} />
            <PointSvg height={20} width={20} />
            <PointSvg height={20} width={20} />
          </div>
        </div>
        <div
          style={{
            transform: `translate(-${translate}px, 0px)`,
          }}
        >
          <Interest position={0} />
          <Interest position={1} />
          <Interest position={2} />
          <Interest position={3} />
          <Interest position={4} />
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0">
        <button className="focus:ring-0 focus:outline-none w-full bg-lena-blue text-white py-3 text-center font-bold text-lg">
          Valider
        </button>
      </div>
    </div>
  );
};

export default SelectInterest;
