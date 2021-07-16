import React, { useEffect, useRef, useState } from "react";
import { useHistory } from 'react-router-dom';
import { ReactComponent as HelpSvg } from 'assets/svg/help_yellow.svg';
import { ReactComponent as ArrowSvg } from 'assets/images/svg/picto/arrow-left.svg';
import { ReactComponent as PointSvg } from 'assets/svg/point.svg';
import { ReactComponent as PolygoneSvg } from 'assets/svg/polygon.svg';
import { ReactComponent as StepInactiveSvg } from 'assets/svg/step_inactive.svg';
import { ReactComponent as StepActiveSvg } from 'assets/svg/step_active.svg';
import CollectifSvg from 'assets/svg/collectif.svg';
import IndividuelSvg from 'assets/svg/individuel.svg';
import SelectorTest from 'components/design-system/SelectorTest';
import useWindowSize from "hooks/useWindowSize";
import classNames from "common/utils/classNames";
import useMediaQuery from "hooks/useMediaQuery";
import Flicking, { ERROR_CODE, FlickingError } from "@egjs/react-flicking";
import { Fade } from "@egjs/flicking-plugins";
import "@egjs/flicking-plugins/dist/arrow.css";
import ParcoursLayout from "../layout/ParcoursLayout";

type InterestContent = {
  id: string;
  description: string;
};

type InterestProps = {
  position: number;
  content: InterestContent[];
};

const Interest = ({ position, content }: InterestProps) => {
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
          {content &&
            content.map((v) => (
              <div className="mb-3">
                <SelectorTest key={v.id} color="yellow" size="small" checked={false}>
                  {v.description}
                </SelectorTest>
              </div>
            ))
          }
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
      <div className="px-1 relative">
        <div
          style={{ height: 100, width: 100, top: -55, transform: `translate(${sizeWindow.width / 2 - 55}px, 0)` }}
          className="relative z-20"
        >
          <div
            style={{
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
      {step === 0 ? <div className="overlay-1" /> : <div className="overlay-2" />}
    </div>
  );
};

const InterestDesktop = ({ position, content }: InterestProps) => {
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
      className="mt-10 bg-white rounded-lg"
      style={{ filter: 'drop-shadow(0px -4px 4px rgba(0, 0, 0, 0.15))' }}
    >
      <div style={{ zIndex: 100 }} className="absolute -top-7 flex justify-between w-full">
        {renderPolygone()}
      </div>
      <div className="z-30 relative p-6 grid grid-cols-3 gap-2">
        {content &&
          content.map((v) => (
            <div key={v.id} className="bg-lena-yellow-light text-center py-5 px-5 rounded-md cursor-pointer">
              {v.description}
            </div>
          ))
        }

        <div className="bg-lena-yellow text-center py-5 px-5 rounded-md cursor-pointer border-2 border-lena-yellow-dark">
          selected
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
  const [width, setWidth] = useState(0);
  const sizeWindow = useWindowSize();
  const mediaQueryMD = useMediaQuery('md');
  const plugins: any = [new Fade("", 0.7)];
  const flickingRef = useRef<any>();
  const [flickingDisabled, setFlickingDisabled] = useState(false);

  const fakeData1: Array<InterestContent> = [
    {
      id: "a",
      description: "test 1"
    },
    {
      id: "b",
      description: "test 2"
    },
    {
      id: "c",
      description: "test 3"
    },
    {
      id: "d",
      description: "test 4"
    }
  ];
  const fakeData2: Array<InterestContent> = [
    {
      id: "e",
      description: "test 1"
    },
    {
      id: "f",
      description: "test 2"
    },
    {
      id: "g",
      description: "test 3"
    },
    {
      id: "h",
      description: "test 4"
    }
  ];
  const fakeData3: Array<InterestContent> = [
    {
      id: "i",
      description: "test 1"
    },
    {
      id: "j",
      description: "test 2"
    },
    {
      id: "k",
      description: "test 3"
    },
    {
      id: "l",
      description: "test 4"
    }
  ];
  const fakeData4: Array<InterestContent> = [
    {
      id: "m",
      description: "test 1"
    },
    {
      id: "n",
      description: "test 2"
    },
    {
      id: "o",
      description: "test 3"
    },
    {
      id: "p",
      description: "test 4"
    }
  ];
  const fakeData5: Array<InterestContent> = [
    {
      id: "q",
      description: "test 1"
    },
    {
      id: "r",
      description: "test 2"
    },
    {
      id: "s",
      description: "test 3"
    },
    {
      id: "t",
      description: "test 4"
    }
  ];

  const handleChange = async (e: any) => {
    if(!flickingDisabled) {
      setRangeValue(e);
    }
    if (mediaQueryMD) {
      try {
        setFlickingDisabled(true);
        await flickingRef.current.moveTo(e);
      } catch (err) {
        if (err instanceof FlickingError) {
          if (err.code === ERROR_CODE.ANIMATION_ALREADY_PLAYING) {
            console.error("Animation is already playing!");
          } else if (err.code === ERROR_CODE.ANIMATION_INTERRUPTED) {
            console.error("Animation is interrupted by user.");
          }
        }
      }
    } else {
      setTranslate(width * e);
    }
  };

  useEffect(() => {
    const widthWindow = sizeWindow.width;
    setWidth(widthWindow);
    setTranslate(widthWindow * rangeValue);
  }, [sizeWindow]);

  return (
    <ParcoursLayout withMobile={false}>
      <div
        className="flex flex-col flex-1 min-h-screen h-full flex flex-col overflow-x-hidden"
        style={{ backgroundColor: mediaQueryMD ? '#fff' : '#e5e5e5' }}
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
            {!mediaQueryMD && (
              <button className="focus:ring-0 focus:outline-none">
                <HelpSvg />
              </button>
            )}
          </div>
          <h2 className={
            classNames(
              "text-lena-blue-dark text-center text-sm px-7 mx-auto py-3",
              !mediaQueryMD ? "font-bold" : "text-md pb-5"
            )
          }>
            {mediaQueryMD ? (
              <>Faites glisser le curseur le long de l’axe et <br/>sélectionnez autant de centres d’intérêts que vous le souhaitez :</>
            ) : (
              <>Faites glisser le curseur et sélectionnez autant de centres d’intérêts que vous le souhaitez :</>
            )}
          </h2>
        </header>

        <div className={classNames(
          "container",
          mediaQueryMD ? "bg-lena-gray-light-2 py-14" : "mt-4"
        )}>
          <div className="relative">
            <div className="flex items-center flex-col w-full">
              <div
                style={{ width: mediaQueryMD ? 'calc(80% + 110px)' : 'calc(80% + 60px)' }}
                className={
                  classNames(
                    "flex justify-between text-center text-lena-blue-dark mx-4 relative",
                    mediaQueryMD && "mb-3"
                  )
                }
              >
                <span className="flex flex-col items-center">
                  <img className="mb-1" src={CollectifSvg} alt="Svg" />
                  Travail {!mediaQueryMD && <br />}
                  collectif
                </span>
                <span className="flex flex-col items-center">
                  <img className="mb-1" src={IndividuelSvg} alt="Svg" />
                  Travail {!mediaQueryMD && <br />}
                  individuel
                </span>
              </div>
            </div>
            <div ref={axisRef} className="w-full bg-lena-yellow-light h-3 mt-2 rounded-full relative">
              <div className="absolute w-full flex justify-center" style={{ marginTop: 9 }}>
                <input
                  max={4}
                  min={0}
                  step={mediaQueryMD ? 1 : 0.05}
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
            className={
              classNames(
                mediaQueryMD && 'hidden',
                'relative'
              )
            }
            style={{
              transform: `translate(-${translate}px, 0px)`,
            }}
          >
            <Interest content={fakeData1} position={0} />
            <Interest content={fakeData2} position={1} />
            <Interest content={fakeData3} position={2} />
            <Interest content={fakeData4} position={3} />
            <Interest content={fakeData5} position={4} />
          </div>
          <div className={
            classNames(
              !mediaQueryMD && 'hidden'
            )
          }>
            <Flicking circularEnabled={false} onMoveEnd={() => setFlickingDisabled(false)} ref={flickingRef} horizontal={true} plugins={plugins}>
              <div className="relative flickingDiv">
                <InterestDesktop content={fakeData1} position={0} />
              </div>
              <div className="relative flickingDiv">
                <InterestDesktop content={fakeData2} position={1} />
              </div>
              <div className="relative flickingDiv">
                <InterestDesktop content={fakeData3} position={2} />
              </div>
              <div className="relative flickingDiv">
                <InterestDesktop content={fakeData4} position={3} />
              </div>
              <div className="relative flickingDiv">
                <InterestDesktop content={fakeData5} position={4} />
              </div>
            </Flicking>
          </div>
        </div>
        <div className="fixed bottom-0 left-0 right-0 md:relative md:mt-4 md:flex md:justify-center">
          <button className="focus:ring-0 focus:outline-none w-full bg-lena-blue text-white py-3 text-center font-bold text-lg md:w-96 md:rounded-md">
            Valider
          </button>
        </div>
      </div>
    </ParcoursLayout>
  );
};

export default SelectInterest;
