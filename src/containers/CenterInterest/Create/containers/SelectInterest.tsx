import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ReactComponent as HelpSvg } from 'assets/svg/help_yellow.svg';
import { ReactComponent as ArrowSvg } from 'assets/images/svg/picto/arrow-left.svg';
import { ReactComponent as PointSvg } from 'assets/svg/point.svg';
import { ReactComponent as PolygoneSvg } from 'assets/svg/polygon.svg';
import { ReactComponent as PointBlueSvg } from 'assets/svg/point_blue.svg';
import { ReactComponent as StepInactiveSvg } from 'assets/svg/step_inactive.svg';
import { ReactComponent as StepActiveSvg } from 'assets/svg/step_active.svg';
import SelectorTest from 'components/design-system/SelectorTest';
import useWindowSize from 'hooks/useWindowSize';

type InterestProps = {
  position: number;
};

const Interest = ({ position }: InterestProps) => {
  const [width, setWidth] = useState(0);
  const sizeWindow = useWindowSize();

  useEffect(() => {
    const getWidth = sizeWindow.width;
    setWidth(getWidth);
  }, [sizeWindow]);

  const renderPolygone = () => {
    const poly = [];

    for (let i = 0; i < 5; i++) {
      if (i === position) {
        poly.push(<PolygoneSvg width={50} />);
      } else {
        poly.push(<div style={{ width: 50 }} />);
      }
    }

    return poly;
  };

  return (
    <div
      className="relative"
      style={{
        transform: `translate(${width * position}px, 0px)`,
      }}
    >
      <div
        className="mt-10 bg-white rounded-lg absolute w-full"
        style={{ filter: 'drop-shadow(0px -4px 4px rgba(0, 0, 0, 0.15))' }}
      >
        <div style={{ zIndex: 100 }} className="absolute -top-7 flex justify-around w-full">
          {renderPolygone()}
        </div>
        <div className="z-30 relative p-3">
          <div className="mb-3">
            <SelectorTest color="yellow" size="small" checked={false}>
              lol {width * (position + 1)}
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

const Tutorial1 = () => {
  return (
    <>
      <header className="absolute top-0 left-0 right-0 z-50 bg-lena-blue-darkest text-white text-center py-6 font-bold">
        <h2>Tutoriel</h2>
        <span>1/3</span>
      </header>
      <div className="px-1">
        <div style={{ height: 204, top: -120 }} className="relative z-20">
          <div
            style={{
              backgroundColor: 'rgb(229,229,229)',
              height: 190,
              top: -56,
              borderRadius: '55%',
            }}
          />
          <div className="container text-white font-bold mt-5 px-10 text-xl">
            Chaque famille de centres d’intérêt est rangée selon un axe regroupant des pôles opposés.
          </div>
        </div>
      </div>
    </>
  );
};

const Tutorial2 = () => {
  const sizeWindow = useWindowSize();
  return (
    <>
      <header className="absolute top-0 left-0 right-0 z-50 bg-lena-blue-darkest text-white text-center py-6 font-bold">
        <h2>Tutoriel</h2>
        <span>2/3</span>
      </header>
      <div className="px-1">
        <div
          style={{ height: 100, width: 100, top: -55, transform: `translate(${sizeWindow.width / 2 - 55}px, 0)` }}
          className="relative z-20"
        >
          <div
            style={{
              backgroundColor: 'rgb(229,229,229)',
              height: 100,
              borderRadius: '100%',
            }}
          />
          <div className="container text-white font-bold mt-5 px-10 text-xl">
            Chaque famille de centres d’intérêt est rangée selon un axe regroupant des pôles opposés.
          </div>
        </div>
      </div>
    </>
  );
};

const RenderTutorial = () => {
  const [step, setStep] = useState(0);

  const generateStep = () => {
    const icons = [];

    for (let i = 0; i < 3; i++) {
      if (i === step) {
        icons.push(<StepActiveSvg />);
      } else {
        icons.push(<StepInactiveSvg />);
      }
    }

    return icons;
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return <Tutorial1 />;
      case 1:
        return <Tutorial2 />;
      default:
        return <Tutorial1 />;
    }
  };

  const handleStep = () => {
    if (step === 2) {
      alert('fini');
    } else {
      setStep(step + 1);
    }
  };

  return (
    <div>
      {renderStep()}
      <div className="absolute bottom-0 left-0 right-0 z-40">
        <div className="flex justify-center space-x-4 mb-8">{generateStep()}</div>
        <button
          onClick={handleStep}
          className="focus:ring-0 focus:outline-none w-full bg-lena-blue text-white py-3 text-center font-bold text-lg"
        >
          {step === 2 ? 'OK, compris !' : 'Suivant'}
        </button>
      </div>
      <div className="bg-lena-blue-darkest bg-opacity-80 fixed z-10 top-0 bottom-0 left-0 right-0" />
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
  const [width, setWidth] = useState(0);
  const sizeWindow = useWindowSize();

  const handleChange = (e: any) => {
    setRangeValue(e);
    setTranslate(width * e);
  };

  useEffect(() => {
    const widthWindow = sizeWindow.width;
    setWidth(widthWindow);
    setTranslate(widthWindow * rangeValue);
  }, [sizeWindow]);

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
        <div className="z-40 relative">
          <div className="flex items-center flex-col w-full">
            <div
              style={{ width: 'calc(80% + 60px)' }}
              className="flex justify-between text-center text-lena-blue-dark mx-4 relative"
            >
              <span>
                Travail <br />
                collectif
              </span>
              <span>
                Travail <br />
                individuel
              </span>
            </div>
          </div>
          <div ref={axisRef} className="w-full bg-lena-yellow-light h-3 mt-2 rounded-full relative">
            <div className="absolute w-full flex justify-center" style={{ marginTop: 9 }}>
              <input
                max={4}
                min={0}
                step={0.05}
                value={rangeValue}
                onChange={(e) => handleChange(e.currentTarget.value)}
                type="range"
                className="w-full thumb thumb--left"
                style={{ width: 'calc(80% + 40px)' }}
              />
            </div>
            <div className="flex absolute w-full justify-center " style={{ marginTop: -3.7 }}>
              <div style={{ width: '20%' }} className="flex justify-center">
                <PointSvg height={20} width={20} />
              </div>
              <div style={{ width: '20%' }} className="flex justify-center">
                <PointSvg height={20} width={20} />
              </div>
              <div style={{ width: '20%' }} className="flex justify-center">
                <PointSvg height={20} width={20} />
              </div>
              <div style={{ width: '20%' }} className="flex justify-center">
                <PointSvg height={20} width={20} />
              </div>
              <div style={{ width: '20%' }} className="flex justify-center">
                <PointSvg height={20} width={20} />
              </div>
            </div>
          </div>
        </div>
        <div
          className="relative"
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
      <RenderTutorial />
    </div>
  );
};

export default SelectInterest;
