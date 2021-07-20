import React, { useEffect, useRef, useState } from 'react';
import { ReactComponent as HelpSvg } from 'assets/svg/help_yellow.svg';
import { ReactComponent as ArrowSvg } from 'assets/images/svg/picto/arrow-left.svg';
import { ReactComponent as PointSvg } from 'assets/svg/point.svg';
import { ReactComponent as PolygoneSvg } from 'assets/svg/polygon.svg';
import { ReactComponent as StepInactiveSvg } from 'assets/svg/step_inactive.svg';
import { ReactComponent as StepActiveSvg } from 'assets/svg/step_active.svg';
import CollectifSvg from 'assets/svg/collectif.svg';
import IndividuelSvg from 'assets/svg/individuel.svg';
import SelectorTest from 'components/design-system/SelectorTest';
import useWindowSize from 'hooks/useWindowSize';
import classNames from 'common/utils/classNames';
import useMediaQuery from 'hooks/useMediaQuery';
import Flicking, { ERROR_CODE, FlickingError } from '@egjs/react-flicking';
import { Fade } from '@egjs/flicking-plugins';
import '@egjs/flicking-plugins/dist/arrow.css';
import InterestsParcoursLayout from '../layout/InterestsParcoursLayout';
import { useInterest } from '../../../../common/requests/interests';
import AppLoader from '../../../../components/ui/AppLoader';

type InterestContent = {
  id: string;
  title: string;
};

type InterestProps = {
  position: number;
  content: InterestContent[];
  onToggleInterest: (interestId: string) => void;
  selectedInterests: string[];
};

const InterestCardForMobile = ({ position, content, onToggleInterest, selectedInterests }: InterestProps) => {
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
        poly.push(<PolygoneSvg key={i} width={50} />);
      } else {
        poly.push(<div key={i} style={{ width: 50 }} />);
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
                <SelectorTest
                  key={v.id}
                  color="yellow"
                  size="small"
                  checked={selectedInterests.includes(v.id)}
                  onClick={(value) => onToggleInterest?.call(null, v.id)}
                >
                  {v.title}
                </SelectorTest>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

const InterestCardForDesktop = ({ position, content, onToggleInterest, selectedInterests }: InterestProps) => {
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
    <div className="mt-10 bg-white rounded-lg" style={{ filter: 'drop-shadow(0px -4px 4px rgba(0, 0, 0, 0.15))' }}>
      <div style={{ zIndex: 100 }} className="absolute -top-7 flex justify-between w-full">
        {renderPolygone()}
      </div>
      <div className="z-30 relative p-6 grid grid-cols-3 gap-2">
        {content &&
          content.map((v) => (
            <div
              key={v.id}
              className={classNames(
                'text-center py-5 px-5 border-2 rounded-md cursor-pointer',
                selectedInterests.includes(v.id)
                  ? 'bg-lena-yellow border-lena-yellow-dark'
                  : 'bg-lena-yellow-light border-transparent',
              )}
              onClick={(value) => onToggleInterest?.call(null, v.id)}
            >
              {v.title}
            </div>
          ))}
      </div>
    </div>
  );
};

type Props = {
  onBack: () => void;
  onStep: (familyId: string, selected: string[]) => void;
  familyId: string;
};

const SelectInterest = ({ onStep, onBack, familyId }: Props) => {
  const axisRef = useRef<any>(null);
  const [translate, setTranslate] = useState(0);
  const [rangeValue, setRangeValue] = useState(0);
  const [width, setWidth] = useState(0);
  const sizeWindow = useWindowSize();
  const mediaQueryMD = useMediaQuery('md');
  const plugins: any = [new Fade('', 0.7)];
  const flickingRef = useRef<any>();
  const [flickingDisabled, setFlickingDisabled] = useState(false);
  const [getInterestCall, getInterestState] = useInterest();
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  useEffect(() => {
    if (familyId) getInterestCall({ variables: { familyId } });
  }, [familyId]);

  const handleChange = async (e: any) => {
    if (!flickingDisabled) {
      setRangeValue(e);
    }
    if (mediaQueryMD) {
      try {
        setFlickingDisabled(true);
        await flickingRef.current.moveTo(e);
      } catch (err) {
        /* if (err instanceof FlickingError) {
          if (err.code === ERROR_CODE.ANIMATION_ALREADY_PLAYING) {
            console.error('Animation is already playing!');
          } else if (err.code === ERROR_CODE.ANIMATION_INTERRUPTED) {
            console.error('Animation is interrupted by user.');
          }
        } */
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

  const handleToggleInterest = (interestId: string) => {
    const updatedArray = selectedInterests.includes(interestId)
      ? selectedInterests.filter((v) => v !== interestId)
      : [...selectedInterests, interestId];
    setSelectedInterests(updatedArray);
  };

  const handleValidateInterests = () => {
    onStep?.call(null, familyId, selectedInterests);
  };

  return (
    <InterestsParcoursLayout withMobile={false}>
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
          <h2
            className={classNames(
              'text-lena-blue-dark text-center text-sm px-7 mx-auto py-3',
              !mediaQueryMD ? 'font-bold' : 'text-md pb-5',
            )}
          >
            {mediaQueryMD ? (
              <>
                Faites glisser le curseur le long de l'axe et <br />
                sélectionnez autant de centres d'intérêts que vous le souhaitez :
              </>
            ) : (
              <>Faites glisser le curseur et sélectionnez autant de centres d'intérêts que vous le souhaitez :</>
            )}
          </h2>
        </header>

        <div className={classNames('container', mediaQueryMD ? 'bg-lena-gray-light-2 py-14' : 'mt-4')}>
          {getInterestState.loading && <AppLoader variant="yellow" />}
          {getInterestState.data && (
            <>
              <div className="relative">
                <div className="flex items-center flex-col w-full">
                  <div
                    style={{ width: mediaQueryMD ? 'calc(80% + 110px)' : 'calc(80% + 60px)' }}
                    className={classNames(
                      'flex justify-between text-center text-lena-blue-dark mx-4 relative',
                      mediaQueryMD && 'mb-3',
                    )}
                  >
                    <span className="flex flex-col items-center">
                      <img className="mb-1" src={CollectifSvg} alt="Svg" />
                      <span>{getInterestState.data?.interest.title.split(' - ')[0]}</span>
                    </span>
                    <span className="flex flex-col items-center">
                      <img className="mb-1" src={IndividuelSvg} alt="Svg" />
                      <span>{getInterestState.data?.interest.title.split(' - ')[1]}</span>
                    </span>
                  </div>
                </div>
                <div ref={axisRef} className="w-full bg-lena-yellow-light h-3 mt-2 rounded-full relative">
                  <div className="absolute w-full flex justify-center" style={{ marginTop: 9 }}>
                    <input
                      max={(getInterestState.data?.interest.cursors.length || 1) - 1}
                      min={0}
                      step={mediaQueryMD ? 1 : 1}
                      value={rangeValue}
                      onChange={(e) => handleChange(e.currentTarget.value)}
                      type="range"
                      className="w-full thumb thumb--left"
                      style={{ width: 'calc(80% + 40px)' }}
                    />
                  </div>
                  <div className="flex absolute w-full justify-center " style={{ marginTop: -3.7 }}>
                    {getInterestState.data?.interest.cursors.map((v, index) => (
                      <div
                        key={index}
                        style={{ width: `${100 / (getInterestState.data?.interest?.cursors?.length || 1)}%` }}
                        className="flex justify-center"
                      >
                        <PointSvg height={20} width={20} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div
                className={classNames(mediaQueryMD && 'hidden', 'relative')}
                style={{
                  transform: `translate(-${translate}px, 0px)`,
                }}
              >
                {getInterestState.data?.interest.cursors.map((v, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <InterestCardForMobile
                    key={index}
                    content={v}
                    position={index}
                    onToggleInterest={handleToggleInterest}
                    selectedInterests={selectedInterests}
                  />
                ))}
              </div>
              <div className={classNames(!mediaQueryMD && 'hidden')}>
                {getInterestState.data && (
                  <Flicking
                    circularEnabled={false}
                    onMoveEnd={(e) => {
                      setRangeValue(e.currentTarget.index + 1);
                      setFlickingDisabled(false);
                    }}
                    defaultIndex={0}
                    ref={flickingRef}
                    horizontal={true}
                    plugins={plugins}
                  >
                    {getInterestState.data?.interest.cursors.map((v, index) => (
                      // eslint-disable-next-line react/no-array-index-key
                      <div key={index} className="relative flickingDiv">
                        <InterestCardForDesktop
                          content={v}
                          position={index}
                          onToggleInterest={handleToggleInterest}
                          selectedInterests={selectedInterests}
                        />
                      </div>
                    ))}
                  </Flicking>
                )}
              </div>
            </>
          )}
        </div>
        <div className="fixed bottom-0 left-0 right-0 md:relative md:mt-4 md:flex md:justify-center">
          <button
            className="focus:ring-0 focus:outline-none w-full bg-lena-blue text-white py-3 text-center font-bold text-lg md:w-96 md:rounded-md disabled:opacity-50"
            onClick={handleValidateInterests}
            disabled={selectedInterests.length <= 0}
          >
            Valider
          </button>
        </div>
      </div>
    </InterestsParcoursLayout>
  );
};

export default SelectInterest;
